import {
  NewsletterSubscription,
  UnsubscribeRequest,
  VerifyEmailRequest,
  UpdatePreferencesRequest,
  NewsletterAPIResponse,
  Subscriber,
} from '@/types/newsletter';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Subscribe a user to the newsletter
 * Sends a confirmation email with verification token
 */
export async function subscribeToNewsletter(
  subscription: NewsletterSubscription
): Promise<NewsletterAPIResponse> {
  try {
    // TODO: Replace with actual API call
    // For now, using mock implementation
    const response = await mockSubscribe(subscription);
    return response;
    
    // Actual implementation would be:
    // const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(subscription),
    // });
    // return await response.json();
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw new Error('Failed to subscribe to newsletter. Please try again.');
  }
}

/**
 * Verify email address using token from confirmation email
 */
export async function verifyEmail(
  request: VerifyEmailRequest
): Promise<NewsletterAPIResponse> {
  try {
    // TODO: Replace with actual API call
    const response = await mockVerifyEmail(request);
    return response;
  } catch (error) {
    console.error('Email verification error:', error);
    throw new Error('Failed to verify email. Please try again or request a new confirmation email.');
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(
  request: UnsubscribeRequest
): Promise<NewsletterAPIResponse> {
  try {
    // TODO: Replace with actual API call
    const response = await mockUnsubscribe(request);
    return response;
  } catch (error) {
    console.error('Unsubscribe error:', error);
    throw new Error('Failed to unsubscribe. Please try again.');
  }
}

/**
 * Update subscription preferences
 */
export async function updatePreferences(
  request: UpdatePreferencesRequest
): Promise<NewsletterAPIResponse> {
  try {
    // TODO: Replace with actual API call
    const response = await mockUpdatePreferences(request);
    return response;
  } catch (error) {
    console.error('Update preferences error:', error);
    throw new Error('Failed to update preferences. Please try again.');
  }
}

/**
 * Get subscriber information
 */
export async function getSubscriber(email: string, token: string): Promise<Subscriber | null> {
  try {
    // TODO: Replace with actual API call
    const response = await mockGetSubscriber(email, token);
    return response;
  } catch (error) {
    console.error('Get subscriber error:', error);
    return null;
  }
}

// ============================================================================
// MOCK IMPLEMENTATIONS (Remove when backend is ready)
// ============================================================================

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function mockSubscribe(subscription: NewsletterSubscription): Promise<NewsletterAPIResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Store in localStorage for demo purposes
  const token = generateToken();
  const subscriber: Subscriber = {
    id: generateToken(),
    email: subscription.email,
    firstName: subscription.firstName,
    lastName: subscription.lastName,
    subscriptionDate: new Date().toISOString(),
    status: 'pending',
    verificationToken: token,
    preferences: {
      frequency: 'weekly',
      topics: [],
      weeklyUpdates: subscription.preferences?.weeklyUpdates ?? true,
      monthlyNewsletter: subscription.preferences?.monthlyNewsletter ?? true,
      eventNotifications: subscription.preferences?.eventNotifications ?? false,
      resourceAlerts: subscription.preferences?.resourceAlerts ?? true,
    },
  };

  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  subscribers.push(subscriber);
  localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

  // Mock sending confirmation email
  console.log('📧 Mock Confirmation Email Sent:');
  console.log(`To: ${subscription.email}`);
  console.log(`Verification Link: /newsletter/confirm?token=${token}`);

  return {
    success: true,
    message: 'Subscription successful! Please check your email to confirm.',
    data: { token },
  };
}

async function mockVerifyEmail(request: VerifyEmailRequest): Promise<NewsletterAPIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  const subscriberIndex = subscribers.findIndex(
    (s: Subscriber) => s.verificationToken === request.token
  );

  if (subscriberIndex === -1) {
    return {
      success: false,
      message: 'Invalid or expired verification token.',
    };
  }

  subscribers[subscriberIndex].status = 'active';
  subscribers[subscriberIndex].confirmedAt = new Date().toISOString();
  delete subscribers[subscriberIndex].verificationToken;
  localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

  return {
    success: true,
    message: 'Email verified successfully! Welcome to our community.',
  };
}

async function mockUnsubscribe(request: UnsubscribeRequest): Promise<NewsletterAPIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  const subscriberIndex = subscribers.findIndex((s: Subscriber) => s.email === request.email);

  if (subscriberIndex === -1) {
    return {
      success: false,
      message: 'Email address not found.',
    };
  }

  subscribers[subscriberIndex].status = 'unsubscribed';
  subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
  localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

  return {
    success: true,
    message: 'You have been unsubscribed successfully.',
  };
}

async function mockUpdatePreferences(
  request: UpdatePreferencesRequest
): Promise<NewsletterAPIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  const subscriberIndex = subscribers.findIndex((s: Subscriber) => s.email === request.email);

  if (subscriberIndex === -1) {
    return {
      success: false,
      message: 'Subscriber not found.',
    };
  }

  subscribers[subscriberIndex].preferences = request.preferences;
  localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

  return {
    success: true,
    message: 'Preferences updated successfully.',
  };
}

async function mockGetSubscriber(email: string, token: string): Promise<Subscriber | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  const subscriber = subscribers.find(
    (s: Subscriber) => s.email === email && (s.verificationToken === token || s.status === 'active')
  );

  return subscriber || null;
}
