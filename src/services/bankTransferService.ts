import { BankTransferDetails, Donation, DonationForm } from '@/types/donation';

// Generate unique donation ID
const generateDonationId = () => {
  return `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Submit bank transfer donation
export const submitBankTransfer = async (
  donationData: DonationForm,
  proofUrl?: string
): Promise<Donation> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const reference = `OCSLAA-${Date.now().toString().slice(-8)}`;

  const donation: Donation = {
    id: generateDonationId(),
    amount: donationData.amount,
    type: donationData.type,
    status: 'pending',
    paymentMethod: 'bank-transfer',
    paymentProofUrl: proofUrl,
    verificationStatus: 'pending',
    donor: {
      firstName: donationData.firstName || 'Anonymous',
      lastName: donationData.lastName || 'Donor',
      email: donationData.email,
      anonymous: donationData.anonymous || false
    },
    dedicatedTo: donationData.dedicatedTo,
    message: donationData.message,
    createdAt: new Date().toISOString()
  };

  // Save to localStorage
  const existingDonations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];
  existingDonations.push(donation);
  localStorage.setItem('donations', JSON.stringify(existingDonations));

  // Save bank transfer reference
  localStorage.setItem(`bank_transfer_${donation.id}`, reference);

  // Mock: Send admin notification
  console.log('📧 Admin notification sent:', {
    donationId: donation.id,
    amount: donation.amount,
    donorEmail: donation.donor.email,
    reference,
    hasProof: !!proofUrl
  });

  // Mock: Send donor confirmation
  console.log('📧 Donor confirmation sent:', {
    to: donation.donor.email,
    subject: 'Bank Transfer Instructions - AUXLA Donation',
    reference,
    amount: donation.amount
  });

  return donation;
};

// Get bank transfer details for a donation
export const getBankTransferReference = (donationId: string): string | null => {
  return localStorage.getItem(`bank_transfer_${donationId}`);
};

// Admin: Verify bank transfer donation
export const verifyBankTransfer = async (
  donationId: string,
  adminId: string
): Promise<Donation> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const donations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];

  const donationIndex = donations.findIndex((d) => d.id === donationId);

  if (donationIndex === -1) {
    throw new Error('Donation not found');
  }

  const donation = donations[donationIndex];

  if (donation.paymentMethod !== 'bank-transfer') {
    throw new Error('Not a bank transfer donation');
  }

  // Update donation
  donations[donationIndex] = {
    ...donation,
    status: 'completed',
    verificationStatus: 'verified',
    verifiedAt: new Date().toISOString(),
    verifiedBy: adminId,
    receiptUrl: `https://receipts.auxla.org/${donationId}.pdf`
  };

  localStorage.setItem('donations', JSON.stringify(donations));

  // Mock: Send receipt email
  console.log('📧 Receipt sent to:', donation.donor.email);

  return donations[donationIndex];
};

// Admin: Reject bank transfer donation
export const rejectBankTransfer = async (
  donationId: string,
  adminId: string,
  reason: string
): Promise<Donation> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const donations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];

  const donationIndex = donations.findIndex((d) => d.id === donationId);

  if (donationIndex === -1) {
    throw new Error('Donation not found');
  }

  const donation = donations[donationIndex];

  donations[donationIndex] = {
    ...donation,
    status: 'failed',
    verificationStatus: 'rejected',
    verifiedAt: new Date().toISOString(),
    verifiedBy: adminId
  };

  localStorage.setItem('donations', JSON.stringify(donations));

  // Mock: Send rejection email
  console.log('📧 Rejection notification sent:', {
    to: donation.donor.email,
    reason
  });

  return donations[donationIndex];
};

// Get all pending bank transfers (for admin)
export const getPendingBankTransfers = async (): Promise<Donation[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const donations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];

  return donations.filter(
    (d) =>
      d.paymentMethod === 'bank-transfer' && d.verificationStatus === 'pending'
  );
};
