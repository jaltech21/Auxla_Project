// Crisis and emergency resources
export const CRISIS_HOTLINES = {
  suicide: {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: 'Free and confidential support 24/7',
    url: 'https://988lifeline.org',
  },
  crisis: {
    name: 'Crisis Text Line',
    phone: '741741',
    sms: 'Text HELLO to 741741',
    description: 'Free 24/7 crisis support via text',
    url: 'https://www.crisistextline.org',
  },
  samhsa: {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Substance abuse and mental health services',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
  },
  veterans: {
    name: 'Veterans Crisis Line',
    phone: '988',
    extension: 'Press 1',
    description: 'Support for veterans and their families',
    url: 'https://www.veteranscrisisline.net',
  },
  domestic: {
    name: 'National Domestic Violence Hotline',
    phone: '1-800-799-7233',
    description: 'Support for domestic violence survivors',
    url: 'https://www.thehotline.org',
  },
} as const;

// Resource categories
export const RESOURCE_CATEGORIES = [
  { value: 'anxiety', label: 'Anxiety', color: 'blue' },
  { value: 'depression', label: 'Depression', color: 'purple' },
  { value: 'stress', label: 'Stress Management', color: 'green' },
  { value: 'support', label: 'Support Groups', color: 'orange' },
  { value: 'crisis', label: 'Crisis Resources', color: 'red' },
  { value: 'therapy', label: 'Therapy', color: 'teal' },
  { value: 'medication', label: 'Medication', color: 'indigo' },
  { value: 'self-help', label: 'Self-Help', color: 'pink' },
  { value: 'general', label: 'General', color: 'gray' },
] as const;

// Blog categories
export const BLOG_CATEGORIES = [
  { value: 'wellness-tips', label: 'Wellness Tips' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'community', label: 'Community' },
  { value: 'personal-stories', label: 'Personal Stories' },
  { value: 'research', label: 'Research' },
  { value: 'treatment', label: 'Treatment' },
  { value: 'prevention', label: 'Prevention' },
] as const;

// Provider specialties
export const SPECIALTIES = [
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'trauma', label: 'Trauma & PTSD' },
  { value: 'addiction', label: 'Addiction' },
  { value: 'couples', label: 'Couples Therapy' },
  { value: 'family', label: 'Family Therapy' },
  { value: 'child', label: 'Child & Adolescent' },
  { value: 'grief', label: 'Grief & Loss' },
  { value: 'eating-disorders', label: 'Eating Disorders' },
  { value: 'bipolar', label: 'Bipolar Disorder' },
  { value: 'schizophrenia', label: 'Schizophrenia' },
  { value: 'ocd', label: 'OCD' },
  { value: 'ptsd', label: 'PTSD' },
] as const;

// Insurance providers
export const INSURANCE_PROVIDERS = [
  { value: 'aetna', label: 'Aetna' },
  { value: 'blue-cross', label: 'Blue Cross Blue Shield' },
  { value: 'cigna', label: 'Cigna' },
  { value: 'united', label: 'UnitedHealthcare' },
  { value: 'medicare', label: 'Medicare' },
  { value: 'medicaid', label: 'Medicaid' },
  { value: 'out-of-pocket', label: 'Out of Pocket' },
] as const;

// Inquiry types
export const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Support Request' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'media', label: 'Media Inquiry' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
] as const;

// Donation preset amounts
export const DONATION_AMOUNTS = [25, 50, 100, 250] as const;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_PAGE = 1;

// API timeouts
export const API_TIMEOUT = 30000; // 30 seconds

// Form validation
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
