// Next.js extensions and compatibility types for Next.js 15 + React 19

import { NextRequest as OriginalNextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest extends OriginalNextRequest {
    ip?: string; // IP address may not always be available
  }

declare module 'next/headers' {
  // Fix for async headers() function in Next.js 15
  interface ReadonlyHeaders {
    get(name: string): string | null;
    has(name: string): boolean;
    forEach(
      callbackfn: (value: string, key: string, parent: ReadonlyHeaders) => void,
      thisArg?: unknown
    ): void;
    entries(): IterableIterator<[string, string]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
  }
}

// PDF parse module declaration
declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
    text: string;
  }

  interface PDFParseOptions {
    pagerender?: (pageData: { pageIndex: number; pageInfo: Record<string, unknown>; view: Float32Array }) => Promise<string>;
    max?: number;
    version?: string;
  }

  function PDFParse(buffer: Buffer, options?: PDFParseOptions): Promise<PDFData>;
  export = PDFParse;
}

// Argon2 options fix
declare module 'argon2' {
  interface Options {
    type?: number;
    memoryCost?: number;
    timeCost?: number;
    parallelism?: number;
    hashLength?: number;
    saltLength?: number;
    raw?: boolean;
  }

  export function hash(password: string | Buffer, options?: Options): Promise<string>;
  export function verify(hash: string, password: string | Buffer): Promise<boolean>;
}

// Million.js compatibility for React 19
declare module 'million/react' {
  import { ComponentType } from 'react';

  export function block<T extends ComponentType<unknown>>(component: T): T;
}

// React forwardRef compatibility
declare global {
  namespace React {
    function forwardRef<T, P = {}>(
      render: (props: P & RefAttributes<T>, ref: Ref<T>) => ReactElement | null
    ): ForwardRefExoticComponent<P & RefAttributes<T>>;
  }
}
}
