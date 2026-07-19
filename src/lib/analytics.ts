/**
 * Analytics tracking helper.
 * Logs to the console in development mode.
 * Safe for production hooks without loading heavy third-party packages.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    console.log(`[Analytics Event]: ${eventName}`, properties || "");
  }
  // In production, this can be wired to standard endpoints like Google Analytics or Plausible if needed.
};
