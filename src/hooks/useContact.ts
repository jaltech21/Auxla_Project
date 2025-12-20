import { useMutation, useQuery } from '@tanstack/react-query';
import {
  submitContactForm,
  submitVolunteerApplication,
  submitPartnershipInquiry,
  submitMediaInquiry,
  getContactInquiry,
  getAllContactInquiries,
} from '@/services/contactService';
import {
  ContactForm,
  VolunteerApplication,
  PartnershipInquiry,
  MediaInquiry,
} from '@/types/contact';
import { toast } from 'sonner';

/**
 * Hook to submit general contact form
 */
export function useSubmitContactForm() {
  return useMutation({
    mutationFn: (formData: ContactForm) => submitContactForm(formData),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Message sent!', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Submission failed', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}

/**
 * Hook to submit volunteer application
 */
export function useSubmitVolunteerApplication() {
  return useMutation({
    mutationFn: (application: VolunteerApplication) =>
      submitVolunteerApplication(application),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Application submitted!', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Submission failed', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}

/**
 * Hook to submit partnership inquiry
 */
export function useSubmitPartnershipInquiry() {
  return useMutation({
    mutationFn: (inquiry: PartnershipInquiry) => submitPartnershipInquiry(inquiry),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Inquiry submitted!', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Submission failed', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}

/**
 * Hook to submit media inquiry
 */
export function useSubmitMediaInquiry() {
  return useMutation({
    mutationFn: (inquiry: MediaInquiry) => submitMediaInquiry(inquiry),
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Inquiry submitted!', {
          description: data.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error('Submission failed', {
        description: error.message || 'Please try again later.',
      });
    },
  });
}

/**
 * Hook to get single contact inquiry
 */
export function useContactInquiry(id: string) {
  return useQuery({
    queryKey: ['contact-inquiry', id],
    queryFn: () => getContactInquiry(id),
    enabled: !!id,
  });
}

/**
 * Hook to get all contact inquiries (admin)
 */
export function useAllContactInquiries() {
  return useQuery({
    queryKey: ['contact-inquiries'],
    queryFn: () => getAllContactInquiries(),
  });
}
