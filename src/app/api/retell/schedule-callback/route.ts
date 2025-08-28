import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { sendEmail } from '@/lib/email';
import { selectVoiceAgent } from '@/services/retell/agent-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      preferredDate,
      preferredTime,
      language = 'en',
      topic,
      urgency = 'normal',
      message,
    } = body;

    // Validate required fields
    if (!name || !phone || !preferredDate || !preferredTime || !topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate scheduled time
    const scheduledFor = new Date(`${preferredDate} ${preferredTime}`);

    // Check if scheduled time is valid (not in the past)
    if (scheduledFor < new Date()) {
      return NextResponse.json({ error: 'Cannot schedule callback in the past' }, { status: 400 });
    }

    // Determine appropriate agent
    const agentType = selectVoiceAgent({
      language,
      department: topic,
      isEmergency: urgency === 'emergency',
    });

    // Create lead if email provided
    let leadId: string | null = null;
    if (email || phone) {
      try {
        // First create or update contact
        const contact = await prisma.contact.upsert({
          where: { phone: phone || 'unknown' },
          update: {
            email: email || undefined,
            name: name || undefined,
          },
          create: {
            phone: phone || 'unknown',
            email: email || undefined,
            name: name || undefined,
            source: 'callback_request',
          },
        });

        // Then create lead
        const lead = await prisma.lead.create({
          data: {
            contactId: contact.id,
            source: 'callback_request',
            status: 'new',
            urgency:
              urgency === 'emergency' ? 'critical' : urgency === 'urgent' ? 'high' : 'medium',
            metadata: {
              preferredLanguage: language,
              topic,
              message,
            },
          },
        });
        leadId = lead.id;
      } catch (dbError) {
        logger.error('Failed to create lead:', errorToLogMeta(dbError));
      }
    }

    // Create callback task
    const callbackTask = await prisma.task.create({
      data: {
        type: 'callback',
        status: 'pending',
        priority: urgency === 'emergency' ? 'urgent' : urgency === 'urgent' ? 'high' : 'medium',
        title: `Callback request from ${name}`,
        dueDate: scheduledFor,
        createdById: 'system', // This needs to be handled properly
        metadata: {
          name,
          phone,
          email,
          topic,
          message,
          language,
          agentType,
          leadId,
          requestedAt: new Date().toISOString(),
        },
      },
    });

    // Send confirmation email if provided
    if (email) {
      try {
        const emailContent =
          language === 'es'
            ? {
                subject: 'Confirmación de Llamada - Vasquez Law Firm',
                text: `Hola ${name},\n\nHemos recibido su solicitud de llamada.\n\nFecha: ${preferredDate}\nHora: ${preferredTime}\nTema: ${topic}\n\nUno de nuestros representantes le llamará al ${phone} a la hora programada.\n\nSi necesita cambiar la hora, por favor llame al 1-844-YO-PELEO.\n\nGracias,\nVasquez Law Firm`,
                html: `
                <h2>Confirmación de Llamada</h2>
                <p>Hola ${name},</p>
                <p>Hemos recibido su solicitud de llamada.</p>
                <ul>
                  <li><strong>Fecha:</strong> ${preferredDate}</li>
                  <li><strong>Hora:</strong> ${preferredTime}</li>
                  <li><strong>Tema:</strong> ${topic}</li>
                  <li><strong>Teléfono:</strong> ${phone}</li>
                </ul>
                <p>Uno de nuestros representantes le llamará a la hora programada.</p>
                <p>Si necesita cambiar la hora, por favor llame al <strong>1-844-YO-PELEO</strong>.</p>
                <p>Gracias,<br>Vasquez Law Firm</p>
              `,
              }
            : {
                subject: 'Callback Confirmation - Vasquez Law Firm',
                text: `Hello ${name},\n\nWe have received your callback request.\n\nDate: ${preferredDate}\nTime: ${preferredTime}\nTopic: ${topic}\n\nOne of our representatives will call you at ${phone} at the scheduled time.\n\nIf you need to reschedule, please call 1-844-YO-PELEO.\n\nThank you,\nVasquez Law Firm`,
                html: `
                <h2>Callback Confirmation</h2>
                <p>Hello ${name},</p>
                <p>We have received your callback request.</p>
                <ul>
                  <li><strong>Date:</strong> ${preferredDate}</li>
                  <li><strong>Time:</strong> ${preferredTime}</li>
                  <li><strong>Topic:</strong> ${topic}</li>
                  <li><strong>Phone:</strong> ${phone}</li>
                </ul>
                <p>One of our representatives will call you at the scheduled time.</p>
                <p>If you need to reschedule, please call <strong>1-844-YO-PELEO</strong>.</p>
                <p>Thank you,<br>Vasquez Law Firm</p>
              `,
              };

        await sendEmail({
          to: email,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html,
        });
      } catch (emailError) {
        logger.error('Failed to send confirmation email:', errorToLogMeta(emailError));
      }
    }

    // Send notification to staff
    try {
      const staffNotification = {
        to: process.env.STAFF_NOTIFICATION_EMAIL || 'callbacks@vasquezlawnc.com',
        subject: `${urgency === 'emergency' ? '🚨 URGENT' : urgency === 'urgent' ? '⚠️ Urgent' : '📞 New'} Callback Request - ${topic}`,
        text: `New callback request received:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nTopic: ${topic}\nUrgency: ${urgency}\nScheduled: ${preferredDate} at ${preferredTime}\nLanguage: ${language}\nMessage: ${message || 'None'}\n\nTask ID: ${callbackTask.id}`,
        html: `
          <h2>New Callback Request</h2>
          <table border="1" cellpadding="5">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email || 'Not provided'}</td></tr>
            <tr><td><strong>Topic:</strong></td><td>${topic}</td></tr>
            <tr><td><strong>Urgency:</strong></td><td>${urgency}</td></tr>
            <tr><td><strong>Scheduled:</strong></td><td>${preferredDate} at ${preferredTime}</td></tr>
            <tr><td><strong>Language:</strong></td><td>${language}</td></tr>
            <tr><td><strong>Message:</strong></td><td>${message || 'None'}</td></tr>
            <tr><td><strong>Task ID:</strong></td><td>${callbackTask.id}</td></tr>
          </table>
        `,
      };

      await sendEmail(staffNotification);
    } catch (notificationError) {
      logger.error('Failed to send staff notification:', errorToLogMeta(notificationError));
    }

    logger.info('Callback scheduled successfully', {
      taskId: callbackTask.id,
      scheduledFor,
      urgency,
      topic,
    });

    return NextResponse.json({
      success: true,
      message: 'Callback scheduled successfully',
      taskId: callbackTask.id,
      scheduledFor,
      confirmationSent: !!email,
    });
  } catch (error) {
    logger.error('Error scheduling callback:', errorToLogMeta(error));

    return NextResponse.json({ error: 'Failed to schedule callback' }, { status: 500 });
  }
}
