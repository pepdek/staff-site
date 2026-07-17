// Thin wrapper around Plausible's window.plausible() so call sites don't
// need to know it might not be loaded (no NEXT_PUBLIC_PLAUSIBLE_DOMAIN
// set, ad blocker, etc.) — every call is a safe no-op in that case.
//
// Event names are documented in README.md under "Analytics events" —
// keep that list in sync when adding a new trackEvent call.
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined") {
    window.plausible?.(name, props ? { props } : undefined);
  }
}
