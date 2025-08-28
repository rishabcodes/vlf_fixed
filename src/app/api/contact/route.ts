/**
 * OLD CONTACT API - COMMENTED OUT
 * Replaced with new enhanced version at /src/client-intake-automation/api/contact-v2.ts
 * This file used the old GHL integration which was broken
 * Keeping for reference and potential rollback
 */

// import { NextRequest, NextResponse } from 'next/server';
// import { getPrismaClient } from '@/lib/prisma';
// import { apiLogger } from '@/lib/safe-logger';
// import { emailService } from '@/services/email.service';
// import { contactFormSchema } from '@/lib/validations/forms';
// import { contactFormLimiter } from '@/lib/rate-limiter';
// import { createGHLContact, getPracticeAreaTags } from '@/lib/ghl';
// import { withLeadCaptureTracing } from '@/lib/telemetry/api-middleware';

// // Force dynamic rendering since we need to access headers and IP
// async function handlePOST(req: NextRequest) {
//   // const requestId = apiLogger?.request ? apiLogger.request(req.method, req.url, {}) : 'no-logger';

//   try {
//     // Apply rate limiting
//     const rateLimitResponse = await contactFormLimiter({
//       headers: Object.fromEntries(req.headers.entries()),
//       ip: req.headers.get('x-forwarded-for') || req.ip || undefined,
//     });
//     if (rateLimitResponse) {
//       return rateLimitResponse;
//     }

//     const body = await req.json();

//     // Validate input
//     const validatedData = contactFormSchema.parse(body);

//     // Check honeypot
//     if (validatedData.website) {
//       if (apiLogger && apiLogger.warn) {
//         apiLogger.warn('Honeypot triggered', { ip: req.headers.get('x-forwarded-for') });
//       }
//       // Return success to not reveal honeypot
//       return NextResponse.json({
//         success: true,
//         message: 'Thank you for contacting us.',
//       });
//     }

//     const prisma = getPrismaClient();

//     // Check if user already exists
//     let user = await prisma.user.findUnique({
//       where: { email: validatedData.email },
//     });

//     if (!user) {
//       // Create new user
//       user = await prisma.user.create({
//         data: {
//           email: validatedData.email,
//           name: validatedData.name,
//           phone: validatedData.phone,
//           language: validatedData.language || 'en',
//           role: 'CLIENT',
//         },
//       });
//     } else {
//       // Update existing user's info
//       user = await prisma.user.update({
//         where: { id: user.id },
//         data: {
//           name: validatedData.name,
//           phone: validatedData.phone,
//           language: validatedData.language || user.language,
//           lastActive: new Date(),
//         },
//       });
//     }

//     // Create task for follow-up
//     const task = await prisma.task.create({
//       data: {
//         title: `New Contact Form Submission - ${validatedData.name}`,
//         description: `
//           Case Type: ${validatedData.caseType}
//           Message: ${validatedData.message}
//           Preferred Contact: ${validatedData.preferredContact}
//           Location: ${validatedData.location || 'Not specified'}
//         `,
//         type: 'follow_up',
//         priority: 'high',
//         status: 'pending',
//         createdById: user.id,
//         metadata: validatedData,
//       },
//     });

//     // Send email notifications
//     await emailService.sendContactFormNotification(validatedData);

//     // Create contact in GoHighLevel
//     const ghlTags = getPracticeAreaTags(validatedData.caseType, validatedData.message);
//     ghlTags.push('Contact Form Lead');
//     if (validatedData.language === 'es') ghlTags.push('Spanish Speaker');

//     const ghlResult = await createGHLContact({
//       firstName: validatedData.name.split(' ')[0],
//       lastName: validatedData.name.split(' ').slice(1).join(' ') || '',
//       email: validatedData.email,
//       phone: validatedData.phone,
//       source: 'Website Contact Form',
//       tags: ghlTags,
//       customFields: {
//         practice_area: validatedData.caseType,
//         initial_message: validatedData.message,
//         preferred_contact: validatedData.preferredContact,
//         location: validatedData.location || 'Not specified',
//         language: validatedData.language || 'en',
//         lead_source: 'Contact Form',
//         website_user_id: user.id.toString(),
//       },
//     });

//     // Log successful submission
//     apiLogger?.info &&
//       apiLogger.info('contact-form-success', {
//         userId: user.id,
//         taskId: task.id,
//         caseType: validatedData.caseType,
//         ghlResult: ghlResult.success ? 'success' : 'failed',
//         ghlContactId: ghlResult.contactId,
//       });

//     return NextResponse.json({
//       success: true,
//       message:
//         validatedData.language === 'es'
//           ? 'Gracias por contactarnos. Le responderemos dentro de 1 hora hábil.'
//           : 'Thank you for contacting us. We will respond within 1 business hour.',
//       userId: user.id,
//     });
//   } catch (error) {
//     apiLogger?.error
//       ? apiLogger.error('contact-form', error as Error)
//       : console.error('contact-form', error);

//     if (error instanceof Error && 'errors' in error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Validation error',
//           details: error.errors,
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to submit contact form. Please try again or call us directly.',
//       },
//       { status: 500 }
//     );
//   }
// }

// // Export with telemetry wrapper
// export const POST = withLeadCaptureTracing(handlePOST);

/**
 * NEW CONTACT API - Using enhanced GHL MCP integration
 */
import { POST } from '@/client-intake-automation/api/contact-v2';

// Re-export the POST handler for Next.js App Router
export { POST };
