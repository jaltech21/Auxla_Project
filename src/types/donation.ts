// Donation and payment types

export type DonationType = 'one-time' | 'monthly';

export type PaymentMethod = 'stripe' | 'paypal' | 'bank-transfer';

export type DonationAmount = 25 | 50 | 100 | 250;

export interface DonationForm {
  amount: number;
  type: DonationType;
  paymentMethod: PaymentMethod;
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
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  paymentProofUrl?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  verifiedBy?: string;
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
  data?: Donation;
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

export interface BankTransferDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  reference: string;
}

export interface PaymentProof {
  donationId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verified: boolean;
}

export interface PayPalOrder {
  orderId: string;
  approveUrl: string;
  amount: number;
}
