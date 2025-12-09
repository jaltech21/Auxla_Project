// Donation and payment types

export type DonationType = 'one-time' | 'monthly';

export type DonationAmount = 25 | 50 | 100 | 250;

export interface DonationForm {
  amount: number;
  type: DonationType;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  anonymous?: boolean;
  dedicatedTo?: string;
  message?: string;
  coverFees?: boolean;
}

export interface Donation {
  id: string;
  amount: number;
  type: DonationType;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    anonymous: boolean;
  };
  paymentMethod: string;
  stripePaymentIntentId?: string;
  dedicatedTo?: string;
  message?: string;
  createdAt: string;
  receiptUrl?: string;
}

export interface DonationImpact {
  amount: number;
  description: string;
  icon: string;
}

export interface DonationStats {
  totalRaised: number;
  totalDonors: number;
  averageDonation: number;
  monthlyRecurring: number;
  recentDonations: Donation[];
  goal: number;
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface DonationAPIResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface DonationReceipt {
  id: string;
  amount: number;
  date: string;
  donorName: string;
  donorEmail: string;
  receiptUrl?: string;
  taxDeductible: boolean;
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
}
