/// <reference types="@types/google.maps" />

export type GoogleMap = google.maps.Map;
export type GoogleInfoWindow = google.maps.InfoWindow;

declare global {
  interface Window {
    google?: typeof google;
    initMap?: () => void;
  }
}

export {};
