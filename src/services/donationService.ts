import {
  DonationForm,
  Donation,
  PaymentIntent,
  DonationAPIResponse,
  DonationStats,
} from '@/types/donation';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Create a payment intent for donation (Stripe only)
 */
export async function createPaymentIntent(
  donationForm: DonationForm
): Promise<PaymentIntent> {
  // Only create payment intent for Stripe payments
  if (donationForm.paymentMethod !== 'stripe') {
    throw new Error('Payment intent is only for Stripe payments');
  }

  try {
    // Calculate total amount with processing fee
    const processingFee = donationForm.coverFees ? Math.round(donationForm.amount * 0.029 + 30) / 100 : 0;
    const totalAmount = donationForm.amount + processingFee;

    const response = await fetch(`${API_BASE_URL}/api/donations/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'usd',
        donorEmail: donationForm.email,
        donorName: donationForm.anonymous ? 'Anonymous' : `${donationForm.firstName} ${donationForm.lastName}`,
        designation: donationForm.dedicatedTo || 'general',
        isAnonymous: donationForm.anonymous,
        message: donationForm.message || ''
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create payment intent');
    }

    return {
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
    };
  } catch (error) {
    console.error('Create payment intent error:', error);
    throw new Error('Failed to create payment intent. Please try again.');
  }
}

/**
 * Confirm donation after successful payment
 * Note: The backend webhook handles this automatically for Stripe payments
 * This function is mainly for client-side state management
 */
export async function confirmDonation(
  paymentIntentId: string,
  donationForm: DonationForm
): Promise<DonationAPIResponse> {
  try {
    // For Stripe payments, the webhook handles the donation record and receipt email
    // We just need to return success to update the UI
    // The backend has already processed everything via the webhook
    
    // Store locally for immediate display
    const donation: Donation = {
      id: 'don_' + Math.random().toString(36).substring(2, 15),
      amount: donationForm.amount,
      type: donationForm.type,
      paymentMethod: donationForm.paymentMethod,
      status: 'completed',
      donor: {
        firstName: donationForm.firstName || 'Anonymous',
        lastName: donationForm.lastName || '',
        email: donationForm.email,
        phone: donationForm.phone,
        anonymous: donationForm.anonymous || false,
      },
      dedicatedTo: donationForm.dedicatedTo,
      message: donationForm.message,
      createdAt: new Date().toISOString(),
      paymentIntentId: paymentIntentId,
      receiptUrl: '#', // Backend generates this
    };

    // Store for display purposes
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));

    console.log('✅ Donation confirmed. Receipt email sent by backend webhook.');

    return {
      success: true,
      message: 'Donation successful! Thank you for your generosity. Receipt sent to your email.',
      data: donation,
    };
  } catch (error) {
    console.error('Confirm donation error:', error);
    throw new Error('Failed to confirm donation. Please contact support.');
  }
}

/**
 * Get donation by ID
 */
export async function getDonation(id: string): Promise<Donation | null> {
  try {
    // TODO: Replace with actual API call
    const response = await mockGetDonation(id);
    return response;
  } catch (error) {
    console.error('Get donation error:', error);
    return null;
  }
}

/**
 * Get donation statistics
 */
export async function getDonationStats(): Promise<DonationStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/donations/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch donation stats');
    }

    const data = await response.json();
    
    return {
      totalRaised: data.totalRaised || 0,
      totalDonors: data.donorCount || 0,
      averageDonation: data.donorCount > 0 ? data.totalRaised / data.donorCount : 0,
      monthlyRecurring: data.monthlyRecurring || 0,
      goal: data.goal || 50000,
    };
  } catch (error) {
    console.error('Get donation stats error:', error);
    // Return fallback data instead of throwing
    return {
      totalRaised: 0,
      totalDonors: 0,
      averageDonation: 0,
      monthlyRecurring: 0,
      goal: 50000,
    };
  }
}

/**
 * Get recent donations
 */
export async function getRecentDonations(limit: number = 10): Promise<Donation[]> {
  try {
    // TODO: Replace with actual API call
    const response = await mockGetRecentDonations(limit);
    return response;
  } catch (error) {
    console.error('Get recent donations error:', error);
    return [];
  }
}

/**
 * Send donation receipt email
 */
export async function sendReceipt(donationId: string): Promise<DonationAPIResponse> {
  try {
    // TODO: Replace with actual API call
    const response = await mockSendReceipt(donationId);
    return response;
  } catch (error) {
    console.error('Send receipt error:', error);
    throw new Error('Failed to send receipt. Please try again.');
  }
}

// ============================================================================
// MOCK IMPLEMENTATIONS (Remove when backend is ready)
// ============================================================================

function generateId(): string {
  return 'don_' + Math.random().toString(36).substring(2, 15);
}

function generateClientSecret(): string {
  return 'pi_' + Math.random().toString(36).substring(2, 25) + '_secret_' + Math.random().toString(36).substring(2, 25);
}

async function mockCreatePaymentIntent(donationForm: DonationForm): Promise<PaymentIntent> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calculate total amount (add processing fee if selected)
  const processingFee = donationForm.coverFees ? Math.round(donationForm.amount * 0.029 + 30) / 100 : 0;
  const totalAmount = Math.round((donationForm.amount + processingFee) * 100); // Convert to cents

  const clientSecret = generateClientSecret();
  
  return {
    clientSecret,
    paymentIntentId: clientSecret.split('_secret_')[0],
    amount: totalAmount,
    currency: 'usd',
  };
}

async function mockConfirmDonation(
  paymentIntentId: string,
  donationForm: DonationForm
): Promise<DonationAPIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const donation: Donation = {
    id: generateId(),
    amount: donationForm.amount,
    type: donationForm.type,
    status: 'completed',
    donor: {
      firstName: donationForm.firstName || 'Anonymous',
      lastName: donationForm.lastName || '',
      email: donationForm.email,
      anonymous: donationForm.anonymous || false,
    },
    paymentMethod: donationForm.paymentMethod || 'stripe',
    stripePaymentIntentId: paymentIntentId,
    dedicatedTo: donationForm.dedicatedTo,
    message: donationForm.message,
    createdAt: new Date().toISOString(),
    receiptUrl: `/receipts/${generateId()}.pdf`,
  };

  // Store in localStorage for demo
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  donations.push(donation);
  localStorage.setItem('donations', JSON.stringify(donations));

  // Update stats
  const stats = JSON.parse(localStorage.getItem('donation_stats') || JSON.stringify({
    totalRaised: 0,
    totalDonors: 0,
    averageDonation: 0,
    monthlyRecurring: 0,
    goal: 50000,
  }));
  
  stats.totalRaised += donation.amount;
  stats.totalDonors += 1;
  stats.averageDonation = stats.totalRaised / stats.totalDonors;
  if (donation.type === 'monthly') {
    stats.monthlyRecurring += donation.amount;
  }
  
  localStorage.setItem('donation_stats', JSON.stringify(stats));

  console.log('📧 Mock Receipt Email Sent:');
  console.log(`To: ${donation.donor.email}`);
  console.log(`Amount: $${donation.amount}`);
  console.log(`Receipt URL: ${donation.receiptUrl}`);

  return {
    success: true,
    message: 'Donation successful! Thank you for your generosity.',
    data: donation,
  };
}

async function mockGetDonation(id: string): Promise<Donation | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  const donation = donations.find((d: Donation) => d.id === id);

  return donation || null;
}

async function mockGetDonationStats(): Promise<DonationStats> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const defaultStats: DonationStats = {
    totalRaised: 127500,
    totalDonors: 1234,
    averageDonation: 103,
    monthlyRecurring: 12400,
    recentDonations: [],
    goal: 200000,
  };

  const savedStats = JSON.parse(
    localStorage.getItem('donation_stats') || JSON.stringify(defaultStats)
  );

  return { ...defaultStats, ...savedStats };
}

async function mockGetRecentDonations(limit: number): Promise<Donation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  return donations
    .sort((a: Donation, b: Donation) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

async function mockSendReceipt(donationId: string): Promise<DonationAPIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const donation = await mockGetDonation(donationId);

  if (!donation) {
    return {
      success: false,
      message: 'Donation not found.',
    };
  }

  console.log('📧 Mock Receipt Re-sent:');
  console.log(`To: ${donation.donor.email}`);
  console.log(`Donation ID: ${donation.id}`);

  return {
    success: true,
    message: 'Receipt sent successfully.',
  };
}
