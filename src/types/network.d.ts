// Network Information API type definitions
export interface NetworkInformation extends EventTarget {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'other'
    | 'unknown'
    | 'wifi'
    | 'wimax';
  onchange?: ((this: NetworkInformation, ev: Event) => any) | null;
}

interface NavigatorNetworkInformation {
  readonly connection?: NetworkInformation;
}

interface Navigator extends NavigatorNetworkInformation {}

export {};
