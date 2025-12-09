import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPaymentIntent,
  confirmDonation,
  getDonation,
  getDonationStats,
  getRecentDonations,
  sendReceipt,
} from '@/services/donationService';
import { DonationForm } from '@/types/donation';
import { toast } from 'sonner';

/**
 * Hook to create payment intent
 */
export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (donationForm: DonationForm) => createPaymentIntent(donationForm),
    onError: (error: Error) => {
      toast.error('Payment initiation failed', {
        description: error.message || 'Unable to process payment. Please try again.',
      });
    },
  });
}

/**
 * Hook to confirm donation after payment
 */
export function useConfirmDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentIntentId, donationForm }: { paymentIntentId: string; donationForm: DonationForm }) =>
      confirmDonation(paymentIntentId, donationForm),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Donation successful!', {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ['donation-stats'] });
        queryClient.invalidateQueries({ queryKey: ['recent-donations'] });
      } else {
        toast.error('Donation failed', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Donation failed', {
        description: error.message || 'An error occurred. Please contact support.',
      });
    },
  });
}

/**
 * Hook to get donation by ID
 */
export function useDonation(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['donation', id],
    queryFn: () => getDonation(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get donation statistics
 */
export function useDonationStats() {
  return useQuery({
    queryKey: ['donation-stats'],
    queryFn: getDonationStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

/**
 * Hook to get recent donations
 */
export function useRecentDonations(limit: number = 10) {
  return useQuery({
    queryKey: ['recent-donations', limit],
    queryFn: () => getRecentDonations(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to resend donation receipt
 */
export function useSendReceipt() {
  return useMutation({
    mutationFn: (donationId: string) => sendReceipt(donationId),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Receipt sent', {
          description: data.message,
        });
      } else {
        toast.error('Failed to send receipt', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to send receipt', {
        description: error.message || 'Please try again.',
      });
    },
  });
}
