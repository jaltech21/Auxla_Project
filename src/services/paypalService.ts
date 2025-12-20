import { Donation, DonationForm, PayPalOrder } from '@/types/donation';

// Generate unique donation ID
const generateDonationId = () => {
  return `don_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create PayPal order (mock)
export const createPayPalOrder = async (
  amount: number,
  donationData: DonationForm
): Promise<PayPalOrder> => {
  // In production, this would call backend API to create PayPal order
  await new Promise((resolve) => setTimeout(resolve, 500));

  const orderId = `PAYPAL-${Date.now()}`;

  return {
    orderId,
    approveUrl: `https://www.paypal.com/checkoutnow?token=${orderId}`,
    amount
  };
};

// Capture PayPal payment (mock)
export const capturePayPalPayment = async (
  orderId: string,
  donationData: DonationForm
): Promise<Donation> => {
  // In production, this would call backend API to capture PayPal payment
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const donation: Donation = {
    id: generateDonationId(),
    amount: donationData.amount,
    type: donationData.type,
    status: 'completed',
    paymentMethod: 'paypal',
    paypalOrderId: orderId,
    donor: {
      firstName: donationData.firstName || 'Anonymous',
      lastName: donationData.lastName || 'Donor',
      email: donationData.email,
      anonymous: donationData.anonymous || false
    },
    dedicatedTo: donationData.dedicatedTo,
    message: donationData.message,
    createdAt: new Date().toISOString(),
    receiptUrl: `https://receipts.auxla.org/${generateDonationId()}.pdf`
  };

  // Save to localStorage
  const existingDonations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];
  existingDonations.push(donation);
  localStorage.setItem('donations', JSON.stringify(existingDonations));

  // Mock: Send receipt email
  console.log('📧 Receipt sent via PayPal:', {
    to: donation.donor.email,
    amount: donation.amount,
    orderId
  });

  return donation;
};

// Get PayPal donation by order ID
export const getPayPalDonation = async (orderId: string): Promise<Donation | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const donations = JSON.parse(
    localStorage.getItem('donations') || '[]'
  ) as Donation[];

  return donations.find((d) => d.paypalOrderId === orderId) || null;
};
