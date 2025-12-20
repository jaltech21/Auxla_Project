import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Using test mode.');
}

export const stripePromise = loadStripe(
  stripePublishableKey || 'pk_test_51placeholder'
);

// Stripe appearance theme
export const stripeAppearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#0D9488',
    colorBackground: '#ffffff',
    colorText: '#1f2937',
    colorDanger: '#ef4444',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
};
