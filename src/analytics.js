import ReactGA from 'react-ga4';

export const GA_MEASUREMENT_ID = 'G-Z0FQTFJMP9';

let analyticsInitialized = false;
const TRAFFIC_CONTEXT_KEY = 'bck_analytics_traffic_context_v1';

export function initializeAnalytics() {
  if (analyticsInitialized) return;
  ReactGA.initialize(GA_MEASUREMENT_ID);
  analyticsInitialized = true;
}

export function getDeviceType() {
  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getTrafficContext() {
  try {
    const storedContext = sessionStorage.getItem(TRAFFIC_CONTEXT_KEY);
    if (storedContext) return JSON.parse(storedContext);
  } catch {
    // Fall back to current page context when session storage is unavailable.
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer ? new URL(document.referrer).hostname : '';

  const trafficContext = {
    traffic_source: params.get('utm_source') || (referrer ? 'referral' : 'direct'),
    traffic_medium: params.get('utm_medium') || (referrer ? 'referral' : 'none'),
    traffic_campaign: params.get('utm_campaign') || '',
    referrer_domain: referrer,
  };

  try {
    sessionStorage.setItem(TRAFFIC_CONTEXT_KEY, JSON.stringify(trafficContext));
  } catch {
    // Ignore storage errors.
  }

  return trafficContext;
}

export function trackPageView(pathname, search = '') {
  const pagePath = `${pathname}${search}`;

  ReactGA.send({
    hitType: 'pageview',
    page: pagePath,
    title: document.title,
  });

  trackEvent('page_context', {
    page_path: pagePath,
  });
}

export function trackEvent(eventName, params = {}) {
  ReactGA.event(eventName, {
    device_type: getDeviceType(),
    page_path: `${window.location.pathname}${window.location.search}`,
    ...getTrafficContext(),
    ...params,
  });
}