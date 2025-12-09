// Newsletter subscription types

export type NewsletterFrequency = 'daily' | 'weekly' | 'monthly';

export interface Subscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscriptionDate: string;
  status: 'pending' | 'active' | 'unsubscribed' | 'bounced';
  verificationToken?: string;
  preferences: SubscriptionPreferences;
  confirmedAt?: string;
  unsubscribedAt?: string;
}

export interface SubscriptionPreferences {
  frequency: NewsletterFrequency;
  topics: string[];
  weeklyUpdates: boolean;
  monthlyNewsletter: boolean;
  eventNotifications: boolean;
  resourceAlerts: boolean;
}

export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  preferences?: Partial<SubscriptionPreferences>;
  consent: boolean;
}

export interface NewsletterForm {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UnsubscribeRequest {
  email: string;
  token?: string;
  reason?: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface UpdatePreferencesRequest {
  email: string;
  token: string;
  preferences: SubscriptionPreferences;
}

export interface NewsletterAPIResponse {
  success: boolean;
  message: string;
  data?: any;
}
