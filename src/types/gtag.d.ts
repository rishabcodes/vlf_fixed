declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams | Date
    ) => void;
    dataLayer?: Array<unknown>;
    fbq?: (
      command: string,
      action: string,
      params?: {
        content_type?: string;
        content_ids?: string[];
        content_name?: string;
        content_category?: string;
        language?: string;
        content_id?: string;
        method?: string;
        [key: string]: string | string[] | number | boolean | undefined;
      }
    ) => void;
  }
}

declare namespace Gtag {
  interface ConfigParams {
    page_path?: string;
    page_title?: string;
    page_location?: string;
    send_page_view?: boolean;
    [key: string]: string | number | boolean | string[] | undefined;
  }

  interface EventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: string | number | boolean | string[] | undefined;
  }

  interface ControlParams {
    groups?: string | string[];
    send_to?: string | string[];
    event_callback?: () => void;
    event_timeout?: number;
  }
}

export {};