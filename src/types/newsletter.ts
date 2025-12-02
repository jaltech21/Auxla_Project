// Newsletter subscription types

export type NewsletterFrequency = 'daily' | 'weekly' | 'monthly';

export interface NewsletterSubscription {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  preferences: {
    frequency: NewsletterFrequency;
    topics: string[];
  };
  status: 'active' | 'unsubscribed' | 'bounced';
  confirmedAt?: string;
  unsubscribedAt?: string;
  createdAt: string;
}

export interface NewsletterForm {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface NewsletterPreferences {
  frequency: NewsletterFrequency;
  topics: string[];
}

export interface UnsubscribeRequest {
  email: string;
  reason?: string;
}
