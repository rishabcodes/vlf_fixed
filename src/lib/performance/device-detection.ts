'use client';

export interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  hasReducedMotion: boolean;
  connectionType: 'slow' | 'medium' | 'fast' | 'unknown';
  deviceMemory: number | undefined;
  hardwareConcurrency: number;
  supportWebGL: boolean;
}

// Extended Navigator interface for experimental APIs
interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
    downlink?: number;
  };
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      isMobile: false,
      hasReducedMotion: false,
      connectionType: 'unknown',
      deviceMemory: undefined,
      hardwareConcurrency: 4,
      supportWebGL: true,
    };
  }

  const nav = navigator as ExtendedNavigator;

  // Detect mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  // Detect reduced motion preference
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect device memory (Chrome only)
  const deviceMemory = nav.deviceMemory;

  // Detect CPU cores
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  // Detect connection type
  let connectionType: DeviceCapabilities['connectionType'] = 'unknown';
  if (nav.connection) {
    const effectiveType = nav.connection.effectiveType;
    const saveData = nav.connection.saveData;

    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      connectionType = 'slow';
    } else if (effectiveType === '3g') {
      connectionType = 'medium';
    } else if (effectiveType === '4g') {
      connectionType = 'fast';
    }
  }

  // Detect WebGL support
  let supportWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    supportWebGL = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    supportWebGL = false;
  }

  // Determine if device is low-end
  const isLowEnd =
    (deviceMemory !== undefined && deviceMemory <= 4) ||
    hardwareConcurrency <= 2 ||
    connectionType === 'slow' ||
    (isMobile && !supportWebGL);

  return {
    isLowEnd,
    isMobile,
    hasReducedMotion,
    connectionType,
    deviceMemory,
    hardwareConcurrency,
    supportWebGL,
  };
}

// React hook for device capabilities
import { useState, useEffect } from 'react';

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    isMobile: false,
    hasReducedMotion: false,
    connectionType: 'unknown',
    deviceMemory: undefined,
    hardwareConcurrency: 4,
    supportWebGL: true,
  });

  useEffect(() => {
    // Set initial capabilities on client
    setCapabilities(detectDeviceCapabilities());
    // Update on resize (mobile detection)
    const handleResize = () => {
      setCapabilities(detectDeviceCapabilities());
    };

    // Update on connection change
    const handleConnectionChange = () => {
      setCapabilities(detectDeviceCapabilities());
    };

    // Update on motion preference change
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setCapabilities(detectDeviceCapabilities());
    };

    window.addEventListener('resize', handleResize);

    const navigatorWithConnection = navigator as Navigator & { connection?: EventTarget };
    if ('connection' in navigator && navigatorWithConnection.connection) {
      navigatorWithConnection.connection.addEventListener('change', handleConnectionChange);
    }

    if (motionMediaQuery.addEventListener) {
      motionMediaQuery.addEventListener('change', handleMotionChange);
    } else {
      // Fallback for older browsers
      motionMediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);

      if ('connection' in navigator && navigatorWithConnection.connection) {
        navigatorWithConnection.connection.removeEventListener('change', handleConnectionChange);
      }

      if (motionMediaQuery.removeEventListener) {
        motionMediaQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionMediaQuery.removeListener(handleMotionChange);
        }
};
  }, []);

  return capabilities;
}
