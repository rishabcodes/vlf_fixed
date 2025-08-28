'use client';

import { useState } from 'react';
import { logger } from '@/lib/safe-logger';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, User, MessageSquare, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GHLContactFormProps {
  formType?: 'contact' | 'consultation' | 'case-evaluation';
  redirectUrl?: string;
  tags?: string[];
  campaignId?: string;
}

export default function GHLContactForm({
  formType = 'contact',
  redirectUrl = '/thank-you',
  tags = ['website-lead'],
  campaignId,
}: GHLContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseType: '',
    message: '',
    preferredContact: 'phone',
    urgency: 'normal',
    source: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  const caseTypes = [
    'Immigration Law',
    'Personal Injury',
    'Criminal Defense',
    'Family Law',
    'Workers Compensation',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to GHL via our API
      const ghlResponse = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: [...tags, formType, formData.caseType.toLowerCase().replace(/\s+/g, '-')],
          customFields: {
            urgency: formData.urgency,
            preferredContact: formData.preferredContact,
            formType,
            source: formData.source,
            campaignId,
          },
        }),
      });

      if (!ghlResponse.ok) throw new Error('Failed to submit');

      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'YOUR_CONVERSION_ID',
          value: formType === 'consultation' ? 150 : 0,
          currency: 'USD',
        });
      }

      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push(redirectUrl);
      }, 2000);
    } catch (error) {
      logger.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
        }
};

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-16 text-center">
          <div
className="mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your information has been received. We'll contact you within 1 business hour.
          </p>
          <p className="text-sm text-gray-500">
            For immediate assistance, call:{' '}
            <a href="tel:844-967-3536" className="text-burgundy-700 font-semibold">
              844-967-3536
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {formType === 'consultation' ? 'Schedule Free Consultation' : 'Contact Us'}
        </CardTitle>
        <CardDescription>
          {formType === 'consultation'
            ? 'Get expert legal advice with no obligation'
            : "We'll respond within 1 business hour"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                  value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Case Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Case Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                required
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500 appearance-none"
                value={formData.caseType} onChange={e => setFormData({ ...formData, caseType: e.target.value })}
              >
                <option value="">Select your case type</option>
                {caseTypes.map(type => (
                  <option key={type}

                value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Tell us about your case</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                rows={4}

                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                placeholder="Please provide a brief description of your legal matter..."
                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={e => setFormData({ ...formData, preferredContact: e.target.value })}
              className="mr-2"
                  />
                  Phone Call
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={e => setFormData({ ...formData, preferredContact: e.target.value })}
              className="mr-2"
                  />
                  Email
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    value="text"
                    checked={formData.preferredContact === 'text'}
                    onChange={e => setFormData({ ...formData, preferredContact: e.target.value })}
              className="mr-2"
                  />
                  Text Message
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">How urgent is your matter?</label>
              <select
                className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-burgundy-500"
                value={formData.urgency} onChange={e => setFormData({ ...formData, urgency: e.target.value })}
              >
                <option value="normal">Normal (1-2 days)</option>
                <option value="urgent">Urgent (Within 24 hours)</option>
                <option value="emergency">Emergency (ASAP)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-burgundy-700 hover:bg-burgundy-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>{formType === 'consultation' ? 'Schedule Consultation' : 'Send Message'}</>
            )}
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our{' '}
            <a href="/privacy-policy" className="text-burgundy-700 hover:underline">
              Privacy Policy
            </a>{' '}
            and consent to receive communications from Vasquez Law Firm.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
