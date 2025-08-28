# ResourceLeadCaptureForm Component

A comprehensive lead capture form component designed for resource downloads and gated content. This component supports multiple languages, GDPR compliance, and various resource delivery methods.

## Features

- ✅ Collects name, email, phone (optional), and ZIP code
- ✅ Advanced email validation
- ✅ US ZIP code validation (5 or 5+4 format)
- ✅ Stores leads in database via existing API
- ✅ Shows success message with resource delivery
- ✅ Fully reusable across all resource pages
- ✅ English and Spanish language support
- ✅ GDPR/privacy compliance with required and optional checkboxes
- ✅ Three resource delivery methods: download, email, redirect
- ✅ Google Analytics conversion tracking
- ✅ Accessible with ARIA labels
- ✅ Beautiful animations and loading states

## Usage

### Basic Usage (Download Resource)

```tsx
import ResourceLeadCaptureForm from '@/components/ResourceLeadCaptureForm';

export default function ImmigrationGuidePage() {
  return (
    <ResourceLeadCaptureForm
      resourceId="immigration-guide-2024"
      resourceTitle="2024 Immigration Law Guide"
      resourceUrl="/resources/immigration-guide-2024.pdf"
      resourceType="download"
      practiceArea="immigration"
      language="en"
    />
  );
}
```

### Email Delivery

```tsx
<ResourceLeadCaptureForm
  resourceId="case-evaluation-checklist"
  resourceTitle="Free Case Evaluation Checklist"
  resourceType="email" // Resource will be sent via email
  practiceArea="personalInjury"
  language="en"
  customThankYouMessage="We've emailed you the checklist. Check your inbox!"
/>
```

### Redirect After Signup

```tsx
<ResourceLeadCaptureForm
  resourceId="video-consultation-guide"
  resourceTitle="Video Consultation Preparation Guide"
  resourceUrl="/protected/consultation-guide"
  resourceType="redirect" // Redirects to protected page after signup
  practiceArea="criminal"
  language="es"
/>
```

### With Custom Success Handler

```tsx
<ResourceLeadCaptureForm
  resourceId="legal-dictionary"
  resourceTitle="Legal Terms Dictionary"
  resourceUrl="/downloads/legal-dictionary.pdf"
  resourceType="download"
  onSuccess={data => {
    console.log('Lead captured:', data.email);
    // Custom tracking, notifications, etc.
  }}
/>
```

## Props

| Prop                    | Type                                | Required | Default    | Description                            |
| ----------------------- | ----------------------------------- | -------- | ---------- | -------------------------------------- |
| `resourceId`            | string                              | Yes      | -          | Unique identifier for the resource     |
| `resourceTitle`         | string                              | Yes      | -          | Display title of the resource          |
| `resourceUrl`           | string                              | No       | -          | URL for download or redirect           |
| `resourceType`          | 'download' \| 'email' \| 'redirect' | No       | 'download' | How to deliver the resource            |
| `practiceArea`          | string                              | No       | -          | Pre-select practice area if applicable |
| `language`              | 'en' \| 'es'                        | No       | 'en'       | Form language                          |
| `onSuccess`             | function                            | No       | -          | Callback after successful submission   |
| `className`             | string                              | No       | ''         | Additional CSS classes                 |
| `customThankYouMessage` | string                              | No       | -          | Override default success message       |

## Form Fields

1. **Name** (Required)

   - Full name field
   - Automatically split into firstName/lastName for API

2. **Email** (Required)

   - Validated with regex pattern
   - Must be valid email format

3. **Phone** (Optional)

   - Not required for resource downloads
   - Useful for high-value resources

4. **ZIP Code** (Required)

   - US format validation (12345 or 12345-6789)
   - Helps with location-based follow-up

5. **Privacy Consent** (Required)

   - Must agree to privacy policy
   - Links to privacy policy page

6. **Marketing Consent** (Optional)
   - Opt-in for marketing communications
   - Not required to download resource

## API Integration

The form submits to `/api/leads/capture` with the following payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "919-555-0123",
  "practiceArea": "immigration",
  "formId": "resource-immigration-guide-2024",
  "source": "resource-download",
  "language": "en",
  "message": "Downloaded resource: 2024 Immigration Law Guide",
  "metadata": {
    "resourceId": "immigration-guide-2024",
    "resourceTitle": "2024 Immigration Law Guide",
    "zipCode": "27601",
    "privacyConsent": true,
    "marketingConsent": false
  }
}
```

## Styling

The component uses Tailwind CSS and follows the design system:

- Primary color: `#6B1F2E` (brand red)
- Hover color: `#8B2635`
- Success colors: Green gradients
- Error colors: Red with proper contrast
- Dark mode supported

## Accessibility

- All form fields have proper labels
- ARIA attributes for validation states
- Keyboard navigation supported
- Screen reader friendly error messages
- Focus indicators on all interactive elements

## Examples

### Landing Page with Gated eBook

```tsx
export default function PersonalInjuryEbook() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Free eBook: Maximum Compensation for Your Injury</h1>
      <p className="text-gray-600 mb-8">
        Learn the insider secrets insurance companies don't want you to know.
      </p>

      <ResourceLeadCaptureForm
        resourceId="pi-compensation-ebook"
        resourceTitle="Maximum Compensation Guide"
        resourceUrl="/downloads/compensation-guide.pdf"
        resourceType="download"
        practiceArea="personalInjury"
        language="en"
      />
    </div>
  );
}
```

### Multi-Language Resource Page

```tsx
export default function BilingualResource() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  return (
    <div className="max-w-2xl mx-auto p-8">
      <button onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
        {language === 'en' ? 'Español' : 'English'}
      </button>

      <ResourceLeadCaptureForm
        resourceId="immigration-checklist"
        resourceTitle={
          language === 'en'
            ? 'Immigration Document Checklist'
            : 'Lista de Documentos de Inmigración'
        }
        resourceUrl="/downloads/immigration-checklist.pdf"
        resourceType="download"
        practiceArea="immigration"
        language={language}
      />
    </div>
  );
}
```

## Testing

The component includes comprehensive validation:

- Empty field validation
- Email format validation
- ZIP code format validation
- Required consent validation
- API error handling
- Network failure handling

## Notes

- Phone numbers are optional but stored as 'not-provided' if empty
- The component tracks conversions via Google Analytics
- Resources can be hosted on CDN or local server
- Email delivery requires backend implementation
- All leads are scored and prioritized automatically
