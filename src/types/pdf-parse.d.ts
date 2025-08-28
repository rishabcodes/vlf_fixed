declare module 'pdf-parse' {
  interface PDFInfo {
    PDFFormatVersion?: string;
    IsAcroFormPresent?: boolean;
    IsXFAPresent?: boolean;
    Title?: string;
    Author?: string;
    Subject?: string;
    Keywords?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
    Trapped?: string;
  }

  interface PDFMetadata {
    _metadata?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }

  interface PDFData {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: PDFMetadata;
    text: string;
    version: string;
  }

  interface PDFPageData {
    pageIndex: number;
    pageInfo: Record<string, unknown>;
    view: Float32Array;
  }

  interface PDFOptions {
    pagerender?: (pageData: PDFPageData) => Promise<string>;
    max?: number;
    version?: string;
  }

  function pdfParse(
    dataBuffer: Buffer | ArrayBuffer | Uint8Array,
    options?: PDFOptions
  ): Promise<PDFData>;

  export = pdfParse;
}
