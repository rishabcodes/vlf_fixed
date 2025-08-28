import * as nodemailer from 'nodemailer';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import { z } from 'zod';
import { emailQueue } from '@/lib/queue/bull';
import pRetry from 'p-retry';
import { performance } from 'perf_hooks';
import type { EmailTemplateData } from '@/types/services';

// Email template types
export type EmailTemplate =
  | 'contact-form'
  | 'case-evaluation'
  | 'appointment-confirmation'
  | 'appointment-reminder'
  | 'newsletter-welcome'
  | 'client-notification'
  | 'attorney-notification'
  | 'user-welcome'
  | 'urgent-lead-notification'
  | 'password-reset'
  | 'case-update'
  | 'document-ready'
  | 'payment-receipt'
  | 'consultation-followup';

// Email attachment interface
interface EmailAttachment {
  filename: string;
  content?: Buffer | string;
  path?: string;
  contentType?: string;
  encoding?: string;
  cid?: string; // For embedded images
}

// Email options interface
interface EmailOptions {
  to: string | string[];
  subject: string;
  template: EmailTemplate;
  data: EmailTemplateData;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
  replyTo?: string;
  priority?: 'high' | 'normal' | 'low';
  headers?: Record<string, string>;
  // Queue-specific options
  queueOptions?: {
    delay?: number;
    attempts?: number;
    backoff?: {
      type: 'fixed' | 'exponential';
      delay: number;
    };
    priority?: number;
  };
}

// Email result interface
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  response?: string;
  retryCount?: number;
  duration?: number;
}

// Email validation schemas
const emailSchema = z.string().email();
const emailArraySchema = z.union([emailSchema, z.array(emailSchema).min(1)]);

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
};

// Create transporter with connection pooling
const transporter = process.env.SMTP_USER ? nodemailer.createTransport(emailConfig) : null;

// Email templates with enhanced styling and responsive design
const templates: Record<
  EmailTemplate,
  (data: EmailTemplateData) => { html: string; text: string }
> = {
  'contact-form': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Case Type:</strong> ${data.caseType}</p>
          <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
          ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
          ${data.sourceUrl ? `<p><strong>Source:</strong> <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>` : ''}
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent from the Vasquez Law Firm website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Case Type: ${data.caseType}
Preferred Contact: ${data.preferredContact}
${data.location ? `Location: ${data.location}` : ''}

Message:
${data.message}

${data.sourceUrl ? `Source: ${data.sourceUrl}` : ''}
    `.trim(),
  }),

  'case-evaluation': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">New Case Evaluation Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.preferredLanguage ? `<p><strong>Preferred Language:</strong> ${data.preferredLanguage}</p>` : ''}
          
          <h3>Case Details</h3>
          <p><strong>Case Type:</strong> ${data.caseType}</p>
          ${data.incidentDate ? `<p><strong>Incident Date:</strong> ${new Date(data.incidentDate).toLocaleDateString()}</p>` : ''}
          <p><strong>Urgency:</strong> <span style="color: ${data.urgency === 'Immediate' ? '#ff0000' : data.urgency === 'This Week' ? '#ff9900' : '#009900'};">${data.urgency}</span></p>
          <p><strong>Previous Attorney:</strong> ${data.previousAttorney ? 'Yes' : 'No'}</p>
          ${data.courtDate ? `<p><strong>Court Date:</strong> <span style="color: #ff0000; font-weight: bold;">${new Date(data.courtDate).toLocaleDateString()}</span></p>` : ''}
          <p><strong>Documents Available:</strong> ${data.documentsAvailable ? 'Yes' : 'No'}</p>
          
          <h3>Description</h3>
          <p style="white-space: pre-wrap;">${data.description}</p>
          
          <h3>Contact Preferences</h3>
          <p><strong>Preferred Contact Method:</strong> ${data.preferredContact}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          
          ${
            data.leadScore
              ? `
          <h3>Lead Analysis</h3>
          <p><strong>Lead Score:</strong> <span style="font-size: 20px; color: ${data.leadScore >= 80 ? '#ff0000' : data.leadScore >= 60 ? '#ff9900' : '#009900'};">${data.leadScore}/100</span></p>
          `
              : ''
          }
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This case evaluation was submitted through the Vasquez Law Firm website.
        </p>
      </div>
    `,
    text: `
New Case Evaluation Request

PERSONAL INFORMATION
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
${data.preferredLanguage ? `Preferred Language: ${data.preferredLanguage}` : ''}

CASE DETAILS
Case Type: ${data.caseType}
${data.incidentDate ? `Incident Date: ${new Date(data.incidentDate).toLocaleDateString()}` : ''}
Urgency: ${data.urgency}
Previous Attorney: ${data.previousAttorney ? 'Yes' : 'No'}
${data.courtDate ? `Court Date: ${new Date(data.courtDate).toLocaleDateString()}` : ''}
Documents Available: ${data.documentsAvailable ? 'Yes' : 'No'}

DESCRIPTION
${data.description}

CONTACT PREFERENCES
Preferred Contact Method: ${data.preferredContact}
Preferred Time: ${data.preferredTime}

${data.leadScore ? `LEAD ANALYSIS\nLead Score: ${data.leadScore}/100` : ''}
    `.trim(),
  }),

  'appointment-confirmation': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Appointment Confirmation</h2>
        <p>Dear ${data.firstName},</p>
        <p>Your appointment with Vasquez Law Firm has been confirmed.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Appointment Details</h3>
          <p><strong>Date:</strong> ${data.appointmentDate ? new Date(data.appointmentDate).toLocaleDateString() : 'Not specified'}</p>
          <p><strong>Time:</strong> ${data.appointmentTime}</p>
          <p><strong>Type:</strong> ${data.appointmentType}</p>
          <p><strong>Attorney:</strong> ${data.attorneyName || 'To be assigned'}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          ${
            data.meetingType === 'virtual'
              ? `
          <p><strong>Meeting Link:</strong> Will be sent 24 hours before your appointment</p>
          `
              : ''
          }
          ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0;">What to Bring:</h4>
          <ul>
            <li>Valid ID</li>
            <li>Any relevant documents related to your case</li>
            <li>List of questions you'd like to ask</li>
            <li>Insurance information (if applicable)</li>
          </ul>
        </div>
        
        <p>If you need to reschedule or cancel, please call us at <strong>1-844-YO-PELEO (967-3536)</strong> at least 24 hours in advance.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/appointments/manage?id=${data.appointmentId || ''}" 
             style="background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Manage Appointment
          </a>
        </div>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Dear ${data.firstName},

Your appointment with Vasquez Law Firm has been confirmed.

APPOINTMENT DETAILS
Date: ${data.appointmentDate ? new Date(data.appointmentDate).toLocaleDateString() : 'Not specified'}
Time: ${data.appointmentTime}
Type: ${data.appointmentType}
Attorney: ${data.attorneyName || 'To be assigned'}
Location: ${data.location}
${data.meetingType === 'virtual' ? 'Meeting Link: Will be sent 24 hours before your appointment' : ''}
${data.notes ? `Notes: ${data.notes}` : ''}

WHAT TO BRING:
- Valid ID
- Any relevant documents related to your case
- List of questions you'd like to ask
- Insurance information (if applicable)

If you need to reschedule or cancel, please call us at 1-844-YO-PELEO (967-3536) at least 24 hours in advance.

Manage your appointment: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/appointments/manage?id=${data.appointmentId || ''}

Best regards,
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'appointment-reminder': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Appointment Reminder</h2>
        <p>Dear ${data.firstName},</p>
        <p>This is a reminder about your upcoming appointment with Vasquez Law Firm.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Appointment Details</h3>
          <p><strong>Date:</strong> ${data.appointmentDate ? new Date(data.appointmentDate).toLocaleDateString() : 'Not specified'}</p>
          <p><strong>Time:</strong> ${data.appointmentTime}</p>
          <p><strong>Attorney:</strong> ${data.attorneyName}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          ${
            data.meetingType === 'virtual'
              ? `
          <div style="background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0;"><strong>Virtual Meeting Link:</strong></p>
            <p style="margin: 5px 0;"><a href="${data.meetingLink || '#'}" style="color: #0066cc;">${data.meetingLink || 'Link will be provided'}</a></p>
            <p style="margin: 0; font-size: 14px;">Please join 5 minutes early to test your connection.</p>
          </div>
          `
              : ''
          }
        </div>
        
        <p>If you need to reschedule, please contact us as soon as possible at <strong>1-844-YO-PELEO (967-3536)</strong>.</p>
        
        <p>We look forward to meeting with you.</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Dear ${data.firstName},

This is a reminder about your upcoming appointment with Vasquez Law Firm.

APPOINTMENT DETAILS
Date: ${data.appointmentDate ? new Date(data.appointmentDate).toLocaleDateString() : 'Not specified'}
Time: ${data.appointmentTime}
Attorney: ${data.attorneyName}
Location: ${data.location}
${data.meetingType === 'virtual' ? `\nVirtual Meeting Link: ${data.meetingLink || 'Link will be provided'}\nPlease join 5 minutes early to test your connection.` : ''}

If you need to reschedule, please contact us as soon as possible at 1-844-YO-PELEO (967-3536).

We look forward to meeting with you.

Best regards,
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'newsletter-welcome': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Welcome to Vasquez Law Firm Newsletter</h2>
        <p>Hello${data.firstName ? ` ${data.firstName}` : ''},</p>
        <p>Thank you for subscribing to our newsletter! You'll receive updates on:</p>
        <ul>
          <li>Important legal news and updates</li>
          <li>Tips for protecting your rights</li>
          <li>Community events and resources</li>
          <li>Success stories from our clients</li>
        </ul>
        <p>We respect your privacy and will never share your information with third parties.</p>
        <p>If you have any questions or need legal assistance, don't hesitate to contact us at <strong>1-844-YO-PELEO (967-3536)</strong>.</p>
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          You're receiving this email because you subscribed to our newsletter. 
          If you wish to unsubscribe, please <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/unsubscribe?email=${encodeURIComponent(data.email || '')}&token=${data.unsubscribeToken || ''}">click here</a>.
        </p>
      </div>
    `,
    text: `
Welcome to Vasquez Law Firm Newsletter

Hello${data.firstName ? ` ${data.firstName}` : ''},

Thank you for subscribing to our newsletter! You'll receive updates on:
- Important legal news and updates
- Tips for protecting your rights
- Community events and resources
- Success stories from our clients

We respect your privacy and will never share your information with third parties.

If you have any questions or need legal assistance, don't hesitate to contact us at 1-844-YO-PELEO (967-3536).

Best regards,
Vasquez Law Firm
YO PELEO POR TI™

---
You're receiving this email because you subscribed to our newsletter. 
To unsubscribe, visit: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/unsubscribe?email=${encodeURIComponent(data.email || '')}&token=${data.unsubscribeToken || ''}
    `.trim(),
  }),

  'client-notification': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Thank You for Contacting Vasquez Law Firm</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and respond within 1 business day.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>What Happens Next?</h3>
          <ol>
            <li>Our intake team will review your information</li>
            <li>An attorney will evaluate your case</li>
            <li>We'll contact you to discuss your legal options</li>
          </ol>
        </div>
        
        <p><strong>Need immediate assistance?</strong></p>
        <p>Call us at <strong>1-844-YO-PELEO (967-3536)</strong> or use our AI assistant available 24/7 on our website.</p>
        
        <p>Thank you for choosing Vasquez Law Firm. We look forward to helping you.</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Dear ${data.name},

We have received your message and appreciate you reaching out to us. Our team will review your inquiry and respond within 1 business day.

WHAT HAPPENS NEXT?
1. Our intake team will review your information
2. An attorney will evaluate your case
3. We'll contact you to discuss your legal options

Need immediate assistance?
Call us at 1-844-YO-PELEO (967-3536) or use our AI assistant available 24/7 on our website.

Thank you for choosing Vasquez Law Firm. We look forward to helping you.

Best regards,
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'attorney-notification': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">New ${data.formType} Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Submission Type:</strong> ${data.formType}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Priority:</strong> <span style="color: ${data.priority === 'High' ? '#ff0000' : data.priority === 'Medium' ? '#ff9900' : '#009900'};">${data.priority || 'Normal'}</span></p>
          ${data.summary ? `<p><strong>Summary:</strong> ${data.summary}</p>` : ''}
          ${data.assignedTo ? `<p><strong>Assigned To:</strong> ${data.assignedTo}</p>` : ''}
        </div>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/admin/submissions/${data.id || ''}" 
             style="background-color: #C9974D; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Full Details
          </a>
        </p>
      </div>
    `,
    text: `
New ${data.formType} Submission

Submission Type: ${data.formType}
Submitted At: ${new Date().toLocaleString()}
Priority: ${data.priority || 'Normal'}
${data.summary ? `Summary: ${data.summary}` : ''}
${data.assignedTo ? `Assigned To: ${data.assignedTo}` : ''}

View full details at: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/admin/submissions/${data.id || ''}
    `.trim(),
  }),

  'user-welcome': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Welcome to Vasquez Law Firm</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for creating an account with Vasquez Law Firm. We're honored that you've chosen us for your legal needs.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Account Benefits</h3>
          <ul>
            <li>Access to our secure client portal</li>
            <li>Track your case status in real-time</li>
            <li>Direct messaging with your legal team</li>
            <li>Upload and manage documents securely</li>
            <li>Schedule appointments online</li>
          </ul>
        </div>
        
        <p><strong>Getting Started</strong></p>
        <p>You can now log in to your account at any time to:</p>
        <ul>
          <li>Complete your profile information</li>
          <li>Submit a case evaluation</li>
          <li>Schedule a consultation</li>
          <li>Access our legal resources</li>
        </ul>
        
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard" 
             style="background-color: #C9974D; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Access Your Dashboard
          </a>
        </p>
        
        <p><strong>Need Help?</strong></p>
        <p>Our team is here to assist you. Call us at <strong>1-844-YO-PELEO (967-3536)</strong> or use our AI assistant available 24/7 on our website.</p>
        
        <p>We look forward to serving you and fighting for your rights.</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This email was sent to ${data.email} because you created an account on our website. 
          If you did not create this account, please contact us immediately.
        </p>
      </div>
    `,
    text: `
Welcome to Vasquez Law Firm

Dear ${data.name},

Thank you for creating an account with Vasquez Law Firm. We're honored that you've chosen us for your legal needs.

YOUR ACCOUNT BENEFITS
- Access to our secure client portal
- Track your case status in real-time
- Direct messaging with your legal team
- Upload and manage documents securely
- Schedule appointments online

GETTING STARTED
You can now log in to your account at any time to:
- Complete your profile information
- Submit a case evaluation
- Schedule a consultation
- Access our legal resources

Access Your Dashboard: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard

NEED HELP?
Our team is here to assist you. Call us at 1-844-YO-PELEO (967-3536) or use our AI assistant available 24/7 on our website.

We look forward to serving you and fighting for your rights.

Best regards,
Vasquez Law Firm
YO PELEO POR TI™

---
This email was sent to ${data.email} because you created an account on our website. 
If you did not create this account, please contact us immediately.
    `.trim(),
  }),

  'urgent-lead-notification': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ff4444; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; color: white;">🚨 URGENT LEAD NOTIFICATION</h2>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #C9974D; margin-top: 0;">Lead Details</h3>
            <p><strong>Name:</strong> ${data.lead?.firstName || 'N/A'} ${data.lead?.lastName || ''}</p>
            <p><strong>Email:</strong> ${data.lead?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${data.lead?.phone || 'N/A'}</p>
            <p><strong>Practice Area:</strong> ${data.lead?.practiceArea ? data.lead.practiceArea.replace(/_/g, ' ') : 'N/A'}</p>
            <p><strong>Lead Score:</strong> <span style="font-size: 24px; color: ${(data.lead?.score || 0) >= 80 ? '#ff4444' : (data.lead?.score || 0) >= 60 ? '#ff9944' : '#44aa44'};">${data.lead?.score || 0}/100</span></p>
            <p><strong>Source:</strong> ${data.lead?.source || 'N/A'}</p>
            <p><strong>Language:</strong> ${data.lead?.language === 'es' ? 'Spanish' : 'English'}</p>
            <p><strong>Created:</strong> ${data.lead?.createdAt ? new Date(data.lead.createdAt).toLocaleString() : 'N/A'}</p>
            ${data.lead?.courtDate ? `<p><strong>Court Date:</strong> <span style="color: #ff0000; font-weight: bold;">${new Date(data.lead.courtDate).toLocaleDateString()}</span></p>` : ''}
          </div>
          
          ${
            data.lead?.message
              ? `
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #C9974D; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.lead.message}</p>
          </div>
          `
              : ''
          }
          
          <div style="background-color: #fff9e6; border-left: 4px solid #C9974D; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Action Required:</strong> This lead requires immediate attention. Please contact them within the next hour.</p>
            ${data.lead?.preferredContactTime ? `<p style="margin: 5px 0 0 0;"><strong>Preferred Contact Time:</strong> ${data.lead.preferredContactTime}</p>` : ''}
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/admin/leads/${data.lead?.id || data.leadId || ''}" 
               style="display: inline-block; background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View Lead in Dashboard
            </a>
          </div>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
          This is an automated notification from Vasquez Law Firm's lead management system.
        </p>
      </div>
    `,
    text: `
🚨 URGENT LEAD NOTIFICATION

LEAD DETAILS
Name: ${data.lead?.firstName} ${data.lead?.lastName}
Email: ${data.lead?.email}
Phone: ${data.lead?.phone}
Practice Area: ${data.lead?.practiceArea?.replace(/_/g, ' ')}
Lead Score: ${data.lead?.score}/100
Source: ${data.lead?.source}
Language: ${data.lead?.language === 'es' ? 'Spanish' : 'English'}
Created: ${data.lead?.createdAt ? new Date(data.lead.createdAt).toLocaleString() : 'N/A'}
${data.lead?.courtDate ? `Court Date: ${new Date(data.lead.courtDate).toLocaleDateString()}` : ''}

${data.lead?.message ? `MESSAGE\n${data.lead.message}\n\n` : ''}

ACTION REQUIRED: This lead requires immediate attention. Please contact them within the next hour.
${data.lead?.preferredContactTime ? `Preferred Contact Time: ${data.lead.preferredContactTime}` : ''}

View lead in dashboard: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/admin/leads/${data.lead?.id || data.leadId || ''}

This is an automated notification from Vasquez Law Firm's lead management system.
    `.trim(),
  }),

  'password-reset': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Password Reset Request</h2>
        <p>Dear ${data.name},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>To reset your password, click the button below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${data.resetLink || '#'}" 
               style="background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">This link will expire in 1 hour for security reasons.</p>
        </div>
        
        <p>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
        <p style="word-break: break-all; color: #0066cc;">${data.resetLink || 'Reset link not available'}</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This is an automated security email. If you didn't request a password reset, please contact us immediately.
        </p>
      </div>
    `,
    text: `
Password Reset Request

Dear ${data.name},

We received a request to reset your password. If you didn't make this request, you can safely ignore this email.

To reset your password, visit this link:
${data.resetLink || 'Reset link not available'}

This link will expire in 1 hour for security reasons.

Best regards,
Vasquez Law Firm
YO PELEO POR TI™

---
This is an automated security email. If you didn't request a password reset, please contact us immediately.
    `.trim(),
  }),

  'case-update': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Case Update: ${data.updateTitle}</h2>
        <p>Dear ${data.clientName},</p>
        <p>We have an important update regarding your case.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Case Number:</strong> ${data.caseNumber}</p>
          <p><strong>Update Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Attorney:</strong> ${data.attorneyName}</p>
          
          <h3>Update Details</h3>
          <div style="background-color: white; padding: 15px; border-radius: 5px;">
            ${data.updateContent}
          </div>
          
          ${
            data.nextSteps && data.nextSteps.length > 0
              ? `
          <h3>Next Steps</h3>
          <ol>
            ${(data.nextSteps as string[]).map(step => `<li>${step}</li>`).join('')}
          </ol>
          `
              : ''
          }
          
          ${
            data.documentsNeeded && data.documentsNeeded.length > 0
              ? `
          <h3>Documents Needed</h3>
          <ul>
            ${(data.documentsNeeded as string[]).map(doc => `<li>${doc}</li>`).join('')}
          </ul>
          `
              : ''
          }
        </div>
        
        <p>If you have any questions about this update, please don't hesitate to contact us at <strong>1-844-YO-PELEO (967-3536)</strong> or reply to this email.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard/cases/${data.caseId || ''}" 
             style="background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Case Details
          </a>
        </div>
        
        <p>Best regards,<br>${data.attorneyName}<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Case Update: ${data.updateTitle}

Dear ${data.clientName},

We have an important update regarding your case.

Case Number: ${data.caseNumber}
Update Date: ${new Date().toLocaleDateString()}
Attorney: ${data.attorneyName}

UPDATE DETAILS
${data.updateContent}

${data.nextSteps && data.nextSteps.length > 0 ? `NEXT STEPS\n${(data.nextSteps as string[]).map((step, i) => `${i + 1}. ${step}`).join('\n')}\n` : ''}

${data.documentsNeeded && data.documentsNeeded.length > 0 ? `DOCUMENTS NEEDED\n${(data.documentsNeeded as string[]).map(doc => `- ${doc}`).join('\n')}\n` : ''}

If you have any questions about this update, please don't hesitate to contact us at 1-844-YO-PELEO (967-3536) or reply to this email.

View case details: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard/cases/${data.caseId || ''}

Best regards,
${data.attorneyName}
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'document-ready': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Document Ready for Review</h2>
        <p>Dear ${data.clientName},</p>
        <p>The following document is now ready for your review:</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Document:</strong> ${data.documentName}</p>
          <p><strong>Type:</strong> ${data.documentType}</p>
          <p><strong>Prepared by:</strong> ${data.preparedBy}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          ${
            data.description
              ? `
          <p><strong>Description:</strong></p>
          <p>${data.description}</p>
          `
              : ''
          }
          
          ${
            data.actionRequired
              ? `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p style="margin: 0;"><strong>Action Required:</strong> ${data.actionRequired}</p>
            ${data.deadline ? `<p style="margin: 5px 0 0 0;"><strong>Deadline:</strong> ${new Date(data.deadline).toLocaleDateString()}</p>` : ''}
          </div>
          `
              : ''
          }
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard/documents/${data.documentId || ''}" 
             style="background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Document
          </a>
        </div>
        
        <p>If you have any questions about this document, please contact us at <strong>1-844-YO-PELEO (967-3536)</strong>.</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Document Ready for Review

Dear ${data.clientName},

The following document is now ready for your review:

Document: ${data.documentName}
Type: ${data.documentType}
Prepared by: ${data.preparedBy}
Date: ${new Date().toLocaleDateString()}

${data.description ? `Description:\n${data.description}\n` : ''}

${data.actionRequired ? `ACTION REQUIRED: ${data.actionRequired}${data.deadline ? `\nDeadline: ${new Date(data.deadline).toLocaleDateString()}` : ''}\n` : ''}

View document: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/dashboard/documents/${data.documentId || ''}

If you have any questions about this document, please contact us at 1-844-YO-PELEO (967-3536).

Best regards,
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'payment-receipt': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Payment Receipt</h2>
        <p>Dear ${data.clientName},</p>
        <p>Thank you for your payment. This email serves as your official receipt.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Payment Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Receipt Number:</strong></td>
              <td style="padding: 8px 0;">${data.receiptNumber || data.transactionId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Date:</strong></td>
              <td style="padding: 8px 0;">${data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Amount:</strong></td>
              <td style="padding: 8px 0; font-size: 20px; color: #28a745;">$${data.amount?.toFixed(2) || '0.00'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px 0;">${data.paymentMethod}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Description:</strong></td>
              <td style="padding: 8px 0;">${data.description}</td>
            </tr>
            ${
              data.caseNumber
                ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Case Number:</strong></td>
              <td style="padding: 8px 0;">${data.caseNumber}</td>
            </tr>
            `
                : ''
            }
          </table>
          
          ${
            data.balance !== undefined
              ? `
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0;"><strong>Account Balance:</strong> $${data.balance.toFixed(2)}</p>
            ${data.nextPaymentDue ? `<p style="margin: 5px 0 0 0;"><strong>Next Payment Due:</strong> ${new Date(data.nextPaymentDue).toLocaleDateString()}</p>` : ''}
          </div>
          `
              : ''
          }
        </div>
        
        <p>Please keep this receipt for your records. If you need a copy of this receipt or have any questions about your payment, please contact us at <strong>1-844-YO-PELEO (967-3536)</strong>.</p>
        
        <p>Thank you for your continued trust in Vasquez Law Firm.</p>
        
        <p>Best regards,<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Payment Receipt

Dear ${data.clientName},

Thank you for your payment. This email serves as your official receipt.

PAYMENT DETAILS
Receipt Number: ${data.receiptNumber || data.transactionId}
Date: ${data.date ? new Date(data.date).toLocaleDateString() : 'N/A'}
Amount: $${data.amount?.toFixed(2) || '0.00'}
Payment Method: ${data.paymentMethod}
Description: ${data.description}
${data.caseNumber ? `Case Number: ${data.caseNumber}` : ''}

${data.balance !== undefined ? `\nAccount Balance: $${data.balance.toFixed(2)}${data.nextPaymentDue ? `\nNext Payment Due: ${new Date(data.nextPaymentDue).toLocaleDateString()}` : ''}` : ''}

Please keep this receipt for your records. If you need a copy of this receipt or have any questions about your payment, please contact us at 1-844-YO-PELEO (967-3536).

Thank you for your continued trust in Vasquez Law Firm.

Best regards,
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),

  'consultation-followup': data => ({
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9974D;">Thank You for Your Consultation</h2>
        <p>Dear ${data.clientName},</p>
        <p>Thank you for meeting with us on ${data.consultationDate ? new Date(data.consultationDate).toLocaleDateString() : '[consultation date]'}. We appreciate the opportunity to discuss your legal matter.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Consultation Summary</h3>
          <p><strong>Attorney:</strong> ${data.attorneyName}</p>
          <p><strong>Practice Area:</strong> ${data.practiceArea}</p>
          ${data.summary ? `<p>${data.summary}</p>` : ''}
          
          ${
            data.recommendations && data.recommendations.length > 0
              ? `
          <h4>Our Recommendations:</h4>
          <ul>
            ${(data.recommendations as string[]).map(rec => `<li>${rec}</li>`).join('')}
          </ul>
          `
              : ''
          }
          
          ${
            data.quote
              ? `
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <h4 style="margin-top: 0;">Fee Estimate</h4>
            <p>${data.quote}</p>
            <p style="font-size: 14px; color: #666;">This estimate is valid for 30 days from the consultation date.</p>
          </div>
          `
              : ''
          }
        </div>
        
        <p><strong>Next Steps:</strong></p>
        <p>If you would like to proceed with our representation, please:</p>
        <ol>
          <li>Review and sign the retainer agreement (if provided)</li>
          <li>Submit any additional documents we discussed</li>
          <li>Contact us to schedule your next appointment</li>
        </ol>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/contact" 
             style="background-color: #C9974D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Get Started
          </a>
        </div>
        
        <p>If you have any questions or need clarification on anything we discussed, please don't hesitate to contact us at <strong>1-844-YO-PELEO (967-3536)</strong>.</p>
        
        <p>We look forward to the opportunity to represent you.</p>
        
        <p>Best regards,<br>${data.attorneyName}<br>Vasquez Law Firm<br>YO PELEO POR TI™</p>
      </div>
    `,
    text: `
Thank You for Your Consultation

Dear ${data.clientName},

Thank you for meeting with us on ${data.consultationDate ? new Date(data.consultationDate).toLocaleDateString() : '[consultation date]'}. We appreciate the opportunity to discuss your legal matter.

CONSULTATION SUMMARY
Attorney: ${data.attorneyName}
Practice Area: ${data.practiceArea}
${data.summary ? `\n${data.summary}` : ''}

${data.recommendations && data.recommendations.length > 0 ? `\nOUR RECOMMENDATIONS:\n${(data.recommendations as string[]).map(rec => `- ${rec}`).join('\n')}` : ''}

${data.quote ? `\nFEE ESTIMATE\n${data.quote}\nThis estimate is valid for 30 days from the consultation date.` : ''}

NEXT STEPS:
If you would like to proceed with our representation, please:
1. Review and sign the retainer agreement (if provided)
2. Submit any additional documents we discussed
3. Contact us to schedule your next appointment

Get started: ${process.env.NEXT_PUBLIC_URL || 'https://www.vasquezlawnc.com'}/contact

If you have any questions or need clarification on anything we discussed, please don't hesitate to contact us at 1-844-YO-PELEO (967-3536).

We look forward to the opportunity to represent you.

Best regards,
${data.attorneyName}
Vasquez Law Firm
YO PELEO POR TI™
    `.trim(),
  }),
};

// Email service class with enhanced functionality
class EmailService {
  private isConfigured: boolean;
  private retryOptions = {
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 10000,
    randomize: true,
  };

  constructor() {
    this.isConfigured = !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;
    if (!this.isConfigured) {
      logger.warn('Email service not configured. Emails will be logged but not sent.');
    }

    // Skip SMTP verification during build time
    if (
      this.isConfigured &&
      transporter &&
      process.env.NODE_ENV !== 'production' &&
      !process.env.NEXT_PHASE &&
      !process.env.DISABLE_EMAIL_SERVICE
    ) {
      // Defer verification to avoid build-time connection attempts
      setTimeout(() => {
        this.verifyConnection();
      }, 5000);
    }
  }

  // Verify SMTP connection
  private async verifyConnection(): Promise<void> {
    if (!this.isConfigured) {
      logger.info('Email service not configured, skipping verification');
      return;
    }
    try {
      if (!transporter) {
        logger.warn('SMTP not configured, skipping verification');
        return;
      }
      await transporter.verify();
      logger.info('SMTP connection verified successfully');
    } catch (error) {
      logger.error('SMTP connection verification failed', errorToLogMeta(error));
    }
  }

  // Validate email options
  private validateEmailOptions(options: EmailOptions): void {
    // Validate email addresses
    try {
      emailArraySchema.parse(options.to);
      if (options.cc) emailArraySchema.parse(options.cc);
      if (options.bcc) emailArraySchema.parse(options.bcc);
    } catch (error) {
      throw new Error('Invalid email address format');
    }

    // Validate template exists
    if (!templates[options.template]) {
      throw new Error(`Email template '${options.template}' not found`);
    }
  }

  // Send email with retry logic
  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    const startTime = performance.now();

    try {
      // Validate options
      this.validateEmailOptions(options);

      const { to, subject, template, data, cc, bcc, attachments, replyTo, priority, headers } =
        options;

      // Get template
      const templateFn = templates[template];
      const { html, text } = templateFn(data);

      // Log email for debugging
      logger.info('Sending email', {
        to,
        subject,
        template,
        configured: this.isConfigured,
        hasAttachments: !!attachments?.length,
      });

      // If email not configured, just log and return
      if (!this.isConfigured || !transporter) {
        logger.info('Email content (not sent - no SMTP config)', {
          to,
          subject,
          text: text.substring(0, 200) + '...',
        });
        return {
          success: true,
          messageId: 'mock-' + Date.now(),
          duration: performance.now() - startTime,
        };
      }

      // Prepare mail options
      const mailOptions: nodemailer.SendMailOptions = {
        from: `"Vasquez Law Firm" <${process.env.SMTP_USER}>`,
        to: Array.isArray(to) ? to.join(', ') : (to as string),
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
        subject,
        text,
        html: this.wrapInEmailLayout(html, subject),
        attachments: attachments?.map(att => ({
          filename: att.filename,
          content: att.content as Buffer,
          path: att.path,
          contentType: att.contentType,
          encoding: att.encoding as 'base64' | '7bit' | 'quoted-printable' | undefined,
          cid: att.cid,
        })),
        replyTo,
        priority,
        headers: {
          'X-Priority': priority === 'high' ? '1' : priority === 'low' ? '5' : '3',
          'X-MSMail-Priority': priority === 'high' ? 'High' : priority === 'low' ? 'Low' : 'Normal',
          ...headers,
        },
      };

      // Send email with retry logic
      const info = await pRetry(
        async () => {
          if (!transporter) {
            throw new Error('SMTP transporter not configured');
          }
          const result = await transporter.sendMail(mailOptions);
          return result;
        },
        {
          ...this.retryOptions,
          onFailedAttempt: error => {
            logger.warn(`Email send attempt ${error.attemptNumber} failed`, {
              error: error.message,
              retriesLeft: error.retriesLeft,
              to,
              subject,
            });
          },
        }
      );

      const duration = performance.now() - startTime;

      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to,
        subject,
        duration,
        response: info.response,
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
        duration,
      };
    } catch (error) {
      const duration = performance.now() - startTime;

      logger.error('Failed to send email', {
        error,
        to: options.to,
        subject: options.subject,
        template: options.template,
        duration,
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
        duration,
      };
    }
  }

  // Queue email for asynchronous sending
  async queueEmail(options: EmailOptions): Promise<void> {
    if (!emailQueue) {
      logger.warn('Email queue not available, sending directly');
      await this.sendEmail(options);
      return;
    }
    const { queueOptions, ...emailOptions } = options;

    await emailQueue.add('send-email', emailOptions, {
      delay: queueOptions?.delay,
      attempts: queueOptions?.attempts || 3,
      backoff: queueOptions?.backoff || {
        type: 'exponential',
        delay: 5000,
      },
      priority: queueOptions?.priority,
    });

    logger.info('Email queued for sending', {
      to: options.to,
      subject: options.subject,
      template: options.template,
      delay: queueOptions?.delay,
    });
  }

  // Send bulk emails with batching
  async sendBulkEmails(
    recipients: string[],
    template: EmailTemplate,
    baseData: EmailTemplateData,
    options: {
      batchSize?: number;
      delayBetweenBatches?: number;
      personalizeData?: (email: string) => Partial<EmailTemplateData>;
    } = {}
  ): Promise<{ sent: number; failed: number; errors: Array<{ email: string; error: string }> }> {
    const { batchSize = 50, delayBetweenBatches = 1000, personalizeData } = options;
    const results = { sent: 0, failed: 0, errors: [] as Array<{ email: string; error: string }> };

    // Process in batches
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      // Queue each email in the batch
      const batchPromises = batch.map(async email => {
        try {
          const data = personalizeData ? { ...baseData, ...personalizeData(email) } : baseData;

          await this.queueEmail({
            to: email,
            subject: baseData.subject || 'Newsletter from Vasquez Law Firm',
            template,
            data,
            priority: 'low',
          });

          results.sent++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            email,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      });

      await Promise.all(batchPromises);

      // Delay between batches to avoid rate limits
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    logger.info('Bulk email operation completed', {
      total: recipients.length,
      sent: results.sent,
      failed: results.failed,
    });

    return results;
  }

  // Wrap email content in branded layout
  private wrapInEmailLayout(content: string, title: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 0;">
              <!-- Header -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background-color: #6B1F2E; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Vasquez Law Firm</h1>
                    <p style="color: #C9974D; margin: 10px 0 0 0; font-size: 16px;">YO PELEO POR TI™</p>
                  </td>
                </tr>
              </table>
              
              <!-- Content -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td class="content" style="padding: 40px;">
                    ${content}
                  </td>
                </tr>
              </table>
              
              <!-- Footer -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                      <strong>Vasquez Law Firm, PLLC</strong><br>
                      1-844-YO-PELEO (1-844-967-3536)
                    </p>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                      <a href="https://www.vasquezlawnc.com" style="color: #6B1F2E; text-decoration: none;">www.vasquezlawnc.com</a>
                    </p>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">
                      Offices in Raleigh, Charlotte, Winston-Salem, and Orlando
                    </p>
                    <p style="margin: 0; color: #999; font-size: 11px;">
                      © ${new Date().getFullYear()} Vasquez Law Firm. All rights reserved.<br>
                      This email and any attachments are confidential and may be legally privileged.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  // Convenience methods for common email types
  async sendContactFormNotification(data: EmailTemplateData): Promise<EmailResult> {
    // Send to law firm
    const attorneyResult = await this.sendEmail({
      to: process.env.CONTACT_EMAIL || 'leads@vasquezlawfirm.com',
      subject: `New Contact Form - ${data.caseType}`,
      template: 'contact-form',
      data,
      priority: data.urgency === 'Immediate' ? 'high' : 'normal',
    });

    // Send confirmation to client
    await this.queueEmail({
      to: data.email || '',
      subject: 'Thank you for contacting Vasquez Law Firm',
      template: 'client-notification',
      data,
    });

    return attorneyResult;
  }

  async sendCaseEvaluationNotification(data: EmailTemplateData): Promise<EmailResult> {
    // Calculate priority based on urgency and court date
    const priority = data.urgency === 'Immediate' || data.courtDate ? 'high' : 'normal';

    // Send to attorneys
    const attorneyResult = await this.sendEmail({
      to: process.env.ATTORNEY_EMAIL || 'attorneys@vasquezlawnc.com',
      subject: `New Case Evaluation - ${data.caseType} - ${data.urgency}`,
      template: 'case-evaluation',
      data,
      priority,
    });

    // Send confirmation to client
    await this.queueEmail({
      to: data.email || '',
      subject: 'Case Evaluation Request Received',
      template: 'client-notification',
      data: {
        name: `${data.firstName} ${data.lastName}`,
        ...data,
      },
    });

    return attorneyResult;
  }

  async sendAppointmentConfirmation(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.email || '',
      subject: 'Appointment Confirmation - Vasquez Law Firm',
      template: 'appointment-confirmation',
      data,
    });
  }

  async sendAppointmentReminder(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.email || '',
      subject: 'Appointment Reminder - Vasquez Law Firm',
      template: 'appointment-reminder',
      data,
      priority: 'high',
    });
  }

  async sendNewsletterWelcome(data: EmailTemplateData): Promise<EmailResult> {
    // Generate unsubscribe token
    const unsubscribeToken = Buffer.from(`${data.email}:${Date.now()}`).toString('base64');

    return this.sendEmail({
      to: data.email || '',
      subject: 'Welcome to Vasquez Law Firm Newsletter',
      template: 'newsletter-welcome',
      data: {
        ...data,
        unsubscribeToken,
      },
    });
  }

  async sendPasswordReset(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.email || '',
      subject: 'Password Reset Request - Vasquez Law Firm',
      template: 'password-reset',
      data,
      priority: 'high',
    });
  }

  async sendCaseUpdate(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.clientEmail || '',
      subject: `Case Update: ${data.updateTitle}`,
      template: 'case-update',
      data,
    });
  }

  async sendDocumentReady(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.clientEmail || '',
      subject: `Document Ready: ${data.documentName}`,
      template: 'document-ready',
      data,
      priority: data.actionRequired ? 'high' : 'normal',
    });
  }

  async sendPaymentReceipt(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.clientEmail || '',
      subject: `Payment Receipt - Vasquez Law Firm`,
      template: 'payment-receipt',
      data,
    });
  }

  async sendConsultationFollowup(data: EmailTemplateData): Promise<EmailResult> {
    return this.sendEmail({
      to: data.clientEmail || '',
      subject: 'Thank You for Your Consultation - Vasquez Law Firm',
      template: 'consultation-followup',
      data,
    });
  }

  async sendUrgentLeadNotification(data: EmailTemplateData): Promise<EmailResult> {
    const leadData = data.lead as
      | {
          practiceArea?: string;
          score?: number;
          id?: string;
        }
      | undefined;
    // Send to multiple attorneys for urgent leads
    const attorneyEmails = process.env.URGENT_LEAD_EMAILS?.split(',') || [
      'attorneys@vasquezlawnc.com',
    ];

    return this.sendEmail({
      to: attorneyEmails,
      subject: `🚨 URGENT: New ${leadData?.practiceArea?.replace(/_/g, ' ') || 'Unknown'} Lead - Score: ${leadData?.score || 0}`,
      template: 'urgent-lead-notification',
      data,
      priority: 'high',
    });
  }

  /**
   * Simple sendRawEmail wrapper for campaign manager
   * Provides a simpler interface for sending emails with raw HTML
   */
  async sendRawEmail(options: {
    to: string;
    subject: string;
    html: string;
    text: string;
    attachments?: EmailAttachment[];
  }): Promise<EmailResult> {
    // Use the internal sendEmail method with minimal options
    return this.sendEmail({
      to: options.to,
      subject: options.subject,
      template: 'client-notification' as EmailTemplate,
      data: {
        html: options.html,
        text: options.text
      },
      attachments: options.attachments
    });
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export types
export type { EmailOptions, EmailResult, EmailAttachment };
