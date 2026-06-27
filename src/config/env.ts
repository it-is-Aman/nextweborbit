// Environment configuration

export const env = {
  // Application
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Next Web Orbit',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://nextweborbit.in',

  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',

  // Auth
  authTrustHost: process.env.AUTH_TRUST_HOST === 'true',
  authUrl: process.env.AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://nextweborbit.in',

  // Features
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDebug: process.env.NODE_ENV === 'development',

  // External Services
  unsplashApiKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY || '',
} as const;

