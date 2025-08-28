declare module '@builder.io/partytown/react' {
  import { FC } from 'react';

  export interface PartytownConfig {
    debug?: boolean;
    forward?: string[];
    resolveUrl?: (url: URL, location: Location) => URL | undefined;
    loadScriptsOnMainThread?: string[];
  }

  export const Partytown: FC<PartytownConfig>;
}
