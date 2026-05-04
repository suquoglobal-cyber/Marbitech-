
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, Analytics, logEvent } from "firebase/analytics";

// Marbitech Properties and Investment Ltd Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9jHB3DTEVRXzONChqdMJXOwgxw4YANy4",
  authDomain: "marbitech-a80a5.firebaseapp.com",
  projectId: "marbitech-a80a5",
  storageBucket: "marbitech-a80a5.firebasestorage.app",
  messagingSenderId: "63690680853",
  appId: "1:63690680853:web:5cde45ee4d74b68a2afc1c",
  measurementId: "G-CMSWKFCGKV"
};

// Initialize Firebase singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: Analytics | null = null;

// Initialize Analytics conditionally as it depends on browser environment support
isSupported().then(yes => {
  if (yes && !analytics) {
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Firebase Analytics could not be initialized:", e);
    }
  }
});

/**
 * Log a custom event to Firebase Analytics
 * @param name Event name
 * @param params Optional event parameters
 */
export const logAnalyticsEvent = (name: string, params?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, name, params);
  } else {
    // Analytics might not be ready or supported, we log to console in dev
    console.debug(`[Analytics-Queued]: ${name}`, params);
  }
};

export { app, analytics };
