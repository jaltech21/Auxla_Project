import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  subscribeToNewsletter,
  verifyEmail,
  unsubscribeFromNewsletter,
  updatePreferences,
  getSubscriber,
} from '@/services/newsletterService';
import {
  NewsletterSubscription,
  UnsubscribeRequest,
  VerifyEmailRequest,
  UpdatePreferencesRequest,
} from '@/types/newsletter';
import { toast } from 'sonner';

/**
 * Hook to subscribe to newsletter
 */
export function useSubscribeNewsletter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscription: NewsletterSubscription) => subscribeToNewsletter(subscription),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Subscription successful!', {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ['newsletter'] });
      } else {
        toast.error('Subscription failed', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Subscription failed', {
        description: error.message || 'An error occurred. Please try again.',
      });
    },
  });
}

/**
 * Hook to verify email with token
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: (request: VerifyEmailRequest) => verifyEmail(request),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Email verified!', {
          description: data.message,
        });
      } else {
        toast.error('Verification failed', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Verification failed', {
        description: error.message || 'An error occurred. Please try again.',
      });
    },
  });
}

/**
 * Hook to unsubscribe from newsletter
 */
export function useUnsubscribe() {
  return useMutation({
    mutationFn: (request: UnsubscribeRequest) => unsubscribeFromNewsletter(request),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Unsubscribed', {
          description: data.message,
        });
      } else {
        toast.error('Unsubscribe failed', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Unsubscribe failed', {
        description: error.message || 'An error occurred. Please try again.',
      });
    },
  });
}

/**
 * Hook to update subscription preferences
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdatePreferencesRequest) => updatePreferences(request),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Preferences updated!', {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ['subscriber'] });
      } else {
        toast.error('Update failed', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Update failed', {
        description: error.message || 'An error occurred. Please try again.',
      });
    },
  });
}

/**
 * Hook to get subscriber information
 */
export function useSubscriber(email: string, token: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['subscriber', email, token],
    queryFn: () => getSubscriber(email, token),
    enabled: enabled && !!email && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
