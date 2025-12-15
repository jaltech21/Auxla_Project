/**
 * Vercel Serverless Function for Sending Emails via Resend
 * 
 * Deploy Instructions:
 * 1. Install Vercel CLI: npm install -g vercel
 * 2. Run: vercel
 * 3. Add RESEND_API_KEY to Vercel environment variables
 * 4. Update frontend VITE_API_URL to your Vercel URL
 */

import { Resend } from 'resend';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // In production, set to your domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  // Check API key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ 
      success: false, 
      error: 'RESEND_API_KEY not configured on server' 
    });
  }

  const resend = new Resend(resendApiKey);
  
  try {
    const { to, from, subject, html, replyTo, tags } = req.body;

    // Validate required fields
    if (!to || !from || !subject || !html) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to, from, subject, html' 
      });
    }

    // Send email via Resend
    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
      tags,
    });

    // Check for errors
    if (result.error) {
      console.error('Resend API error:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: result.error.message || 'Failed to send email' 
      });
    }

    // Success
    return res.status(200).json({ 
      success: true, 
      messageId: result.data?.id 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    });
  }
}
