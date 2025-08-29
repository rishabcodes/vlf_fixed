import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import { emailService } from '@/services/email.service';
import { contactFormLimiter } from '@/lib/rate-limiter';
import { getGHLIntegration } from '@/services/ghl-integration-wrapper';

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  caseType: z.string().optional(),
  language: z.enum(['en', 'es']).default('en'),
  source: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await contactFormLimiter({
      headers: Object.fromEntries(req.headers.entries()),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
    });
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();
    
    // Validate input
    const validatedData = contactFormSchema.parse(body);
    
    // Check honeypot field
    if (validatedData.website) {
      apiLogger.warn('Honeypot triggered', { 
        ip: req.headers.get('x-forwarded-for') 
      });
      // Return success to not reveal honeypot
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us.',
      });
    }

    const prisma = getPrismaClient();
    
    // Check if user already exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          ...(validatedData.phone ? [{ phone: validatedData.phone }] : []),
        ],
      },
    });

    // Create or update user
    if (!user) {
      const [firstName, ...lastNameParts] = validatedData.name.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      user = await prisma.user.create({
        data: {
          email: validatedData.email,
          phone: validatedData.phone,
          firstName,
          lastName,
          language: validatedData.language,
          metadata: {
            source: validatedData.source || 'contact-form',
            caseType: validatedData.caseType,
          },
        },
      });
    }

    // Create task for follow-up
    const task = await prisma.task.create({
      data: {
        title: `Contact Form: ${validatedData.name}`,
        description: validatedData.message,
        priority: validatedData.caseType === 'urgent' ? 'HIGH' : 'MEDIUM',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        assignedToId: process.env.DEFAULT_ATTORNEY_ID || null,
        userId: user.id,
        metadata: {
          caseType: validatedData.caseType,
          language: validatedData.language,
          source: validatedData.source || 'contact-form',
        },
      },
    });

    // Send email notification
    try {
      await emailService.sendContactFormNotification({
        to: process.env.CONTACT_FORM_EMAIL || 'contact@vasquezlawnc.com',
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        caseType: validatedData.caseType,
        language: validatedData.language,
      });
    } catch (emailError) {
      apiLogger.error('Failed to send email notification', emailError as Error);
      // Continue even if email fails
    }

    // Sync with GoHighLevel using MCP client
    try {
      const ghlIntegration = await getGHLIntegration();
      
      if (ghlIntegration.isConfigured()) {
        const [firstName, ...lastNameParts] = validatedData.name.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        
        const ghlContact = await ghlIntegration.createOrUpdateContact({
          firstName,
          lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          tags: [
            'contact-form',
            validatedData.language,
            validatedData.caseType || 'general',
          ].filter(Boolean),
          source: validatedData.source || 'Website Contact Form',
          customFields: {
            message: validatedData.message,
            caseType: validatedData.caseType,
            language: validatedData.language,
          },
        });

        apiLogger.info('Contact synced to GHL', {
          userId: user.id,
          ghlContactId: ghlContact?.id,
        });
      }
    } catch (ghlError) {
      apiLogger.error('Failed to sync with GHL', ghlError as Error);
      // Continue even if GHL sync fails
    }

    // Send confirmation email to user
    if (validatedData.language === 'es') {
      await emailService.sendEmail({
        to: validatedData.email,
        subject: 'Gracias por contactarnos - Bufete de Abogados Vásquez',
        html: `
          <h2>Gracias por contactarnos</h2>
          <p>Hola ${validatedData.name},</p>
          <p>Hemos recibido su mensaje y le responderemos dentro de 1 hora hábil.</p>
          <p>Si su caso es urgente, por favor llámenos al 1-844-YO-PELEO (1-844-967-3536).</p>
          <br>
          <p>Atentamente,<br>Bufete de Abogados Vásquez</p>
        `,
      });
    } else {
      await emailService.sendEmail({
        to: validatedData.email,
        subject: 'Thank you for contacting us - Vasquez Law Firm',
        html: `
          <h2>Thank you for contacting us</h2>
          <p>Hello ${validatedData.name},</p>
          <p>We have received your message and will respond within 1 business hour.</p>
          <p>If your case is urgent, please call us at 1-844-YO-PELEO (1-844-967-3536).</p>
          <br>
          <p>Best regards,<br>Vasquez Law Firm</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message:
        validatedData.language === 'es'
          ? 'Gracias por contactarnos. Le responderemos dentro de 1 hora hábil.'
          : 'Thank you for contacting us. We will respond within 1 business hour.',
      userId: user.id,
    });
  } catch (error) {
    apiLogger.error('Contact form error', error as Error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form. Please try again or call us directly.',
      },
      { status: 500 }
    );
  }
}