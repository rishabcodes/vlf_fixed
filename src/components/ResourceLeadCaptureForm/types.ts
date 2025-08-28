export interface ResourceLeadCaptureFormProps {
  /**
   * Unique identifier for the resource
   */
  resourceId: string;

  /**
   * Display title of the resource
   */
  resourceTitle: string;

  /**
   * URL for download or redirect (optional for email type)
   */
  resourceUrl?: string;

  /**
   * How to deliver the resource to the user
   * - download: Direct file download
   * - email: Send via email (requires backend implementation)
   * - redirect: Redirect to protected page after signup
   */
  resourceType?: 'download' | 'email' | 'redirect';

  /**
   * Pre-selected practice area
   */
  practiceArea?: string;

  /**
   * Form language
   */
  language?: 'en' | 'es';

  /**
   * Callback function after successful form submission
   */
  onSuccess?: (data: SuccessCallbackData) => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom thank you message to display on success
   */
  customThankYouMessage?: string;
}

export interface SuccessCallbackData {
  /**
   * Email address of the lead
   */
  email: string;

  /**
   * Whether the resource was successfully delivered
   */
  resourceDelivered: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  practiceArea: string;
  language: 'en' | 'es';
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  privacyConsent?: string;
}

export interface LeadCapturePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  practiceArea: string;
  formId: string;
  pageUrl: string;
  source: string;
  language: 'en' | 'es';
  message: string;
  metadata: {
    resourceId: string;
    resourceTitle: string;
    zipCode: string;
    privacyConsent: boolean;
    marketingConsent: boolean;
  };
}

export interface Translations {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  privacyLabel: string;
  marketingLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  successDownload: string;
  errorMessage: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    zipRequired: string;
    zipInvalid: string;
    privacyRequired: string;
  };
}

export type TranslationKey = 'en' | 'es';

export type TranslationsMap = Record<TranslationKey, Translations>;
