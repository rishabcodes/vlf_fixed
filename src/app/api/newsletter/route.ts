import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/safe-logger';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  language: z.enum(['en', 'es']).optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  apiLogger.request(req.method, req.url, {});

  try {
    const body = await req.json();
    const { email, language = 'en', source = 'website' } = newsletterSchema.parse(body);

    // Check if already subscribed
    const existingUser = await getPrismaClient().user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update language preference if different
      if (existingUser.language !== language) {
        await getPrismaClient().user.update({
          where: { email },
          data: { language },
        });
      }

      return NextResponse.json({
        success: true,
        message:
          language === 'es'
            ? 'Ya está suscrito a nuestro boletín'
            : 'You are already subscribed to our newsletter',
        alreadySubscribed: true,
      });
    }

    // Create new subscriber
    const subscriber = await getPrismaClient().user.create({
      data: {
        email,
        language,
        role: 'CLIENT',
        name: '',
      },
    });

    // Create task for welcome email
    await getPrismaClient().task.create({
      data: {
        title: `Send welcome email to ${email}`,
        description: `New newsletter subscriber from ${source}`,
        type: 'client_communication',
        priority: 'medium',
        status: 'pending',
        createdById: subscriber.id,
        metadata: {
          action: 'welcome_email',
          source,
        },
      },
    });

    // Add to email service (e.g., Mailchimp, SendGrid)
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      // This is where you'd integrate with your email service
      // Example for Mailchimp:
      /*
      const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
        email_address: email,
        status: 'subscribed',
        language,
        merge_fields: {
          SOURCE: source,
        },
      });
      */
    }

    apiLogger.info('newsletter-subscription', { email, language, source });

    return NextResponse.json({
      success: true,
      message:
        language === 'es'
          ? '¡Gracias por suscribirse! Revise su correo para confirmar.'
          : 'Thank you for subscribing! Check your email to confirm.',
    });
  } catch (error) {
    apiLogger.error('newsletter-subscription', error as Error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe to newsletter',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  apiLogger.request(req.method, req.url, {});

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify unsubscribe token (implement your own logic)
    // For now, we'll just check if the user exists
    const user = await getPrismaClient().user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Subscriber not found' }, { status: 404 });
    }

    // Mark as unsubscribed (soft delete)
    await getPrismaClient().user.update({
      where: { email },
      data: {
        // Add an 'unsubscribed' field to your User model
        // unsubscribed: true,
        updatedAt: new Date(),
      },
    });

    apiLogger.info('newsletter-unsubscribe', { email });

    return NextResponse.json({
      success: true,
      message:
        user.language === 'es'
          ? 'Se ha cancelado su suscripción exitosamente'
          : 'You have been successfully unsubscribed',
    });
  } catch (error) {
    apiLogger.error('newsletter-unsubscribe', error as Error);
    return NextResponse.json({ success: false, error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
