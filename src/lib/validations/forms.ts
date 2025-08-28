import { z } from 'zod';

// Phone number validation regex for US phone numbers
const phoneRegex = /^(\+1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Common field validations
export const nameValidation = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const emailValidation = z
  .string()
  .email('Please enter a valid email address')
  .max(100, 'Email must be less than 100 characters');

export const phoneValidation = z
  .string()
  .regex(phoneRegex, 'Please enter a valid US phone number')
  .transform(val => val.replace(/\D/g, '')); // Remove non-digits

export const messageValidation = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message must be less than 1000 characters');

// Contact form schema
export const contactFormSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  caseType: z.string().min(1, 'Please select a case type'),
  message: messageValidation,
  preferredContact: z.enum(['email', 'phone', 'text']),
  location: z.string().optional(),
  language: z.enum(['en', 'es']).default('en'),
  website: z.string().max(0), // Honeypot field - should be empty
});

// Case evaluation form schema
export const caseEvaluationSchema = z.object({
  // Personal Information
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,

  // Case Information
  caseType: z.string().min(1, 'Please select a case type'),
  incidentDate: z.string().optional(),
  description: z
    .string()
    .min(50, 'Please provide at least 50 characters describing your case')
    .max(2000, 'Description must be less than 2000 characters'),

  // Additional Details
  previousAttorney: z.boolean().default(false),
  courtDate: z.string().optional(),
  documentsAvailable: z.boolean().default(false),

  // Contact Preferences
  preferredContact: z.enum(['email', 'phone', 'text']),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).default('anytime'),
  urgency: z.enum(['immediate', 'soon', 'planning']).default('soon'),

  // Legal
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),

  website: z.string().max(0), // Honeypot
});

// Newsletter signup schema
export const newsletterSchema = z.object({
  email: emailValidation,
  firstName: z.string().optional(),
  language: z.enum(['en', 'es']).default('en'),
  topics: z.array(z.string()).optional(),
  website: z.string().max(0), // Honeypot
});

// Appointment scheduling schema
export const appointmentSchema = z.object({
  // Personal Information
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,

  // Appointment Details
  appointmentType: z.enum(['consultation', 'follow-up', 'document-review', 'other']),
  practiceArea: z.string().min(1, 'Please select a practice area'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  alternateDate: z.string().optional(),
  alternateTime: z.string().optional(),

  // Meeting Preferences
  meetingType: z.enum(['in-person', 'video', 'phone']).default('in-person'),
  location: z.string().optional(), // Required if in-person

  // Additional Information
  reason: z.string().min(10, 'Please briefly describe the reason for your appointment'),
  newClient: z.boolean().default(true),

  // Notifications
  reminderEmail: z.boolean().default(true),
  reminderSms: z.boolean().default(false),

  website: z.string().max(0), // Honeypot
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CaseEvaluationData = z.infer<typeof caseEvaluationSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type AppointmentData = z.infer<typeof appointmentSchema>;
