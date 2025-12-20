import {
  ContactForm,
  ContactInquiry,
  VolunteerApplication,
  PartnershipInquiry,
  MediaInquiry,
  ContactSubmissionResponse,
} from '@/types/contact';
import { sendContactEmails } from './emailService';
import { generateReferenceId } from '@/utils/emailUtils';
import { getResponseTime } from '@/constants/emailTemplates';

// Mock API - replace with actual backend endpoints
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Submit general contact form
 */
export async function submitContactForm(
  formData: ContactForm
): Promise<ContactSubmissionResponse> {
  try {
    // Mock implementation
    const response = await mockSubmitContact(formData);
    return response;

    // Actual implementation:
    // const response = await fetch(`${API_BASE_URL}/contact`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // return await response.json();
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to submit contact form. Please try again.');
  }
}

/**
 * Submit volunteer application
 */
export async function submitVolunteerApplication(
  application: VolunteerApplication
): Promise<ContactSubmissionResponse> {
  try {
    const response = await mockSubmitVolunteer(application);
    return response;
  } catch (error) {
    console.error('Volunteer application error:', error);
    throw new Error('Failed to submit volunteer application. Please try again.');
  }
}

/**
 * Submit partnership inquiry
 */
export async function submitPartnershipInquiry(
  inquiry: PartnershipInquiry
): Promise<ContactSubmissionResponse> {
  try {
    const response = await mockSubmitPartnership(inquiry);
    return response;
  } catch (error) {
    console.error('Partnership inquiry error:', error);
    throw new Error('Failed to submit partnership inquiry. Please try again.');
  }
}

/**
 * Submit media inquiry
 */
export async function submitMediaInquiry(
  inquiry: MediaInquiry
): Promise<ContactSubmissionResponse> {
  try {
    const response = await mockSubmitMedia(inquiry);
    return response;
  } catch (error) {
    console.error('Media inquiry error:', error);
    throw new Error('Failed to submit media inquiry. Please try again.');
  }
}

/**
 * Get contact inquiry by ID
 */
export async function getContactInquiry(id: string): Promise<ContactInquiry | null> {
  try {
    const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
    return inquiries.find((i: ContactInquiry) => i.id === id) || null;
  } catch (error) {
    console.error('Get contact inquiry error:', error);
    return null;
  }
}

/**
 * Get all contact inquiries (for admin)
 */
export async function getAllContactInquiries(): Promise<ContactInquiry[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
    return inquiries;
  } catch (error) {
    console.error('Get all inquiries error:', error);
    return [];
  }
}

// ============================================================================
// MOCK IMPLEMENTATIONS
// ============================================================================

function generateId(): string {
  return 'inq_' + Math.random().toString(36).substring(2, 15);
}

async function mockSubmitContact(
  formData: ContactForm
): Promise<ContactSubmissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const referenceId = generateReferenceId(formData.inquiryType);
  const submittedAt = new Date().toISOString();

  const inquiry: ContactInquiry = {
    id: referenceId,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    inquiryType: formData.inquiryType,
    subject: formData.subject,
    message: formData.message,
    organization: formData.organization,
    status: 'new',
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };

  // Save to localStorage
  const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
  inquiries.push(inquiry);
  localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));

  // Send emails (user confirmation + admin notification)
  const emailResults = await sendContactEmails(
    {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      referenceId,
      inquiryType: formData.inquiryType,
      subject: formData.subject,
      message: formData.message,
      submittedAt,
      expectedResponseTime: getResponseTime(formData.inquiryType),
      includesCrisisResources: formData.inquiryType === 'support',
    },
    {
      referenceId,
      inquiryType: formData.inquiryType,
      submittedAt,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      subject: formData.subject,
      message: formData.message,
    }
  );

  console.log('📧 Contact Form Submission:', referenceId);
  console.log(`From: ${inquiry.firstName} ${inquiry.lastName} <${inquiry.email}>`);
  console.log(`Type: ${inquiry.inquiryType}`);
  console.log(`Subject: ${inquiry.subject}`);
  console.log('User email:', emailResults.userEmail.success ? '✅' : '❌');
  console.log('Admin email:', emailResults.adminEmail.success ? '✅' : '❌');

  return {
    success: true,
    message: `Thank you for contacting us! We will respond within ${getResponseTime(formData.inquiryType)}. Reference ID: ${referenceId}`,
    submissionId: referenceId,
    data: inquiry,
  };
}

async function mockSubmitVolunteer(
  application: VolunteerApplication
): Promise<ContactSubmissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const referenceId = generateReferenceId('volunteer');
  const submittedAt = new Date().toISOString();
  const inquiryMessage = `Application from ${application.city}, ${application.state}\n\nAvailability: ${application.availability.join(', ')}\n\nSkills: ${application.skills.join(', ')}\n\nInterests: ${application.interests.join(', ')}\n\nReason: ${application.reason}`;

  const inquiry: ContactInquiry = {
    id: referenceId,
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    phone: application.phone,
    inquiryType: 'volunteer',
    subject: 'Volunteer Application',
    message: inquiryMessage,
    status: 'new',
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };

  const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
  inquiries.push(inquiry);
  localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));

  // Send emails
  const emailResults = await sendContactEmails(
    {
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      referenceId,
      inquiryType: 'volunteer',
      subject: 'Volunteer Application',
      message: inquiryMessage,
      submittedAt,
      expectedResponseTime: getResponseTime('volunteer'),
    },
    {
      referenceId,
      inquiryType: 'volunteer',
      submittedAt,
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      phone: application.phone,
      subject: 'Volunteer Application',
      message: inquiryMessage,
      additionalData: {
        location: `${application.city}, ${application.state}`,
        availability: application.availability.join(', '),
        skills: application.skills.join(', '),
        interests: application.interests.join(', '),
      },
    }
  );

  console.log('📧 Volunteer Application:', referenceId);
  console.log(`Name: ${application.firstName} ${application.lastName}`);
  console.log('Emails:', emailResults.userEmail.success && emailResults.adminEmail.success ? '✅' : '❌');

  return {
    success: true,
    message: `Thank you for your interest in volunteering! We will review your application and contact you within ${getResponseTime('volunteer')}. Reference ID: ${referenceId}`,
    submissionId: referenceId,
    data: inquiry,
  };
}

async function mockSubmitPartnership(
  partnershipInquiry: PartnershipInquiry
): Promise<ContactSubmissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const referenceId = generateReferenceId('partnership');
  const submittedAt = new Date().toISOString();
  const firstName = partnershipInquiry.contactName.split(' ')[0] || 'Partner';
  const lastName = partnershipInquiry.contactName.split(' ').slice(1).join(' ') || 'Contact';

  const inquiry: ContactInquiry = {
    id: referenceId,
    firstName,
    lastName,
    email: partnershipInquiry.email,
    phone: partnershipInquiry.phone,
    inquiryType: 'partnership',
    subject: `Partnership Inquiry - ${partnershipInquiry.partnershipType}`,
    message: partnershipInquiry.description,
    organization: partnershipInquiry.organizationName,
    status: 'new',
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };

  const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
  inquiries.push(inquiry);
  localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));

  // Send emails
  const emailResults = await sendContactEmails(
    {
      firstName,
      lastName,
      email: partnershipInquiry.email,
      referenceId,
      inquiryType: 'partnership',
      subject: inquiry.subject,
      message: partnershipInquiry.description,
      submittedAt,
      expectedResponseTime: getResponseTime('partnership'),
    },
    {
      referenceId,
      inquiryType: 'partnership',
      submittedAt,
      firstName,
      lastName,
      email: partnershipInquiry.email,
      phone: partnershipInquiry.phone,
      organization: partnershipInquiry.organizationName,
      subject: inquiry.subject,
      message: partnershipInquiry.description,
      additionalData: {
        organizationName: partnershipInquiry.organizationName,
        partnershipType: partnershipInquiry.partnershipType,
        website: partnershipInquiry.website || 'N/A',
      },
    }
  );

  console.log('📧 Partnership Inquiry:', referenceId);
  console.log(`Organization: ${partnershipInquiry.organizationName}`);
  console.log('Emails:', emailResults.userEmail.success && emailResults.adminEmail.success ? '✅' : '❌');

  return {
    success: true,
    message: `Thank you for your partnership interest! Our team will review your proposal and respond within ${getResponseTime('partnership')}. Reference ID: ${referenceId}`,
    submissionId: referenceId,
    data: inquiry,
  };
}

async function mockSubmitMedia(
  mediaInquiry: MediaInquiry
): Promise<ContactSubmissionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const referenceId = generateReferenceId('media');
  const submittedAt = new Date().toISOString();
  const inquiryMessage = `Media Inquiry from ${mediaInquiry.outlet}\n\nRole: ${mediaInquiry.role}\n\n${mediaInquiry.message}\n\nDeadline: ${mediaInquiry.deadline || 'Not specified'}`;

  const inquiry: ContactInquiry = {
    id: referenceId,
    firstName: mediaInquiry.firstName,
    lastName: mediaInquiry.lastName,
    email: mediaInquiry.email,
    phone: mediaInquiry.phone,
    inquiryType: 'media',
    subject: mediaInquiry.subject,
    message: inquiryMessage,
    organization: mediaInquiry.outlet,
    status: 'new',
    createdAt: submittedAt,
    updatedAt: submittedAt,
  };

  const inquiries = JSON.parse(localStorage.getItem('contact_inquiries') || '[]');
  inquiries.push(inquiry);
  localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));

  // Send emails
  const emailResults = await sendContactEmails(
    {
      firstName: mediaInquiry.firstName,
      lastName: mediaInquiry.lastName,
      email: mediaInquiry.email,
      referenceId,
      inquiryType: 'media',
      subject: mediaInquiry.subject,
      message: inquiryMessage,
      submittedAt,
      expectedResponseTime: getResponseTime('media'),
    },
    {
      referenceId,
      inquiryType: 'media',
      submittedAt,
      firstName: mediaInquiry.firstName,
      lastName: mediaInquiry.lastName,
      email: mediaInquiry.email,
      phone: mediaInquiry.phone,
      organization: mediaInquiry.outlet,
      subject: mediaInquiry.subject,
      message: inquiryMessage,
      urgencyLevel: mediaInquiry.deadline ? 'high' : 'normal',
      additionalData: {
        outlet: mediaInquiry.outlet,
        role: mediaInquiry.role,
        deadline: mediaInquiry.deadline || 'Not specified',
      },
    }
  );

  console.log('📧 Media Inquiry:', referenceId);
  console.log(`Outlet: ${mediaInquiry.outlet}`);
  console.log('Emails:', emailResults.userEmail.success && emailResults.adminEmail.success ? '✅' : '❌');

  return {
    success: true,
    message: `Thank you for your media inquiry! Our communications team will respond within ${getResponseTime('media')}. Reference ID: ${referenceId}`,
    submissionId: referenceId,
    data: inquiry,
  };
}
