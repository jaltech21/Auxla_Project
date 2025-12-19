import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(express.json());

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080',
  'http://172.20.235.47:8080',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'OCSLAA Email API'
  });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from, subject, html, replyTo, tags } = req.body;

    // Validate required fields
    if (!to || !from || !subject || !html) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to, from, subject, html' 
      });
    }

    console.log(`📧 Sending email to: ${to}`);
    console.log(`   Subject: ${subject}`);

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
      console.error('❌ Resend API error:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: result.error.message || 'Failed to send email' 
      });
    }

    console.log(`✅ Email sent successfully. ID: ${result.data?.id}`);

    // Success
    return res.status(200).json({ 
      success: true, 
      messageId: result.data?.id 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Unknown error occurred' 
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, source } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Note: Actual database insertion should be handled by Supabase client-side
    // This endpoint can be used for additional processing like sending confirmation email

    console.log(`📰 New newsletter subscription: ${email}`);

    // Send confirmation email
    const confirmationResult = await resend.emails.send({
      from: 'OCSLAA <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to OCSLAA Newsletter!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to OCSLAA!</h1>
              </div>
              <div class="content">
                <p>Hi${name ? ` ${name}` : ''},</p>
                <p>Thank you for subscribing to the OCSLAA newsletter! We're excited to have you join our community dedicated to mental health and wellness.</p>
                <p>You'll receive regular updates about:</p>
                <ul>
                  <li>Mental health resources and tips</li>
                  <li>Upcoming events and workshops</li>
                  <li>Community stories and support</li>
                  <li>Latest blog posts and articles</li>
                </ul>
                <p>If you ever wish to update your preferences or unsubscribe, you can do so at any time using the links at the bottom of our emails.</p>
                <p>Welcome aboard!</p>
                <p><strong>The OCSLAA Team</strong></p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} OCSLAA. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (confirmationResult.error) {
      console.error('❌ Failed to send confirmation email:', confirmationResult.error);
    }

    res.json({ success: true, message: 'Subscription confirmed' });
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send newsletter campaign endpoint
app.post('/api/newsletter/send', async (req, res) => {
  try {
    const { campaignId, subject, content } = req.body;

    if (!campaignId || !subject || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    console.log(`📧 Processing newsletter campaign: ${campaignId}`);

    // Update campaign status to 'sending'
    await supabase
      .from('newsletter_campaigns')
      .update({ status: 'sending' })
      .eq('id', campaignId);

    // Fetch all active subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('subscribers')
      .select('id, email, name')
      .eq('status', 'active');

    if (fetchError) {
      console.error('❌ Error fetching subscribers:', fetchError);
      throw new Error('Failed to fetch subscribers');
    }

    console.log(`📬 Found ${subscribers.length} active subscribers`);

    let sentCount = 0;
    let failedCount = 0;
    const errors = [];

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      try {
        const result = await resend.emails.send({
          from: 'OCSLAA <onboarding@resend.dev>',
          to: subscriber.email,
          subject: subject,
          html: content,
          tags: [
            { name: 'campaign_id', value: campaignId },
            { name: 'type', value: 'newsletter' }
          ]
        });

        if (result.error) {
          console.error(`❌ Failed to send to ${subscriber.email}:`, result.error);
          failedCount++;
          errors.push({ email: subscriber.email, error: result.error.message });

          // Track failed send
          await supabase.from('campaign_tracking').insert({
            campaign_id: campaignId,
            subscriber_id: subscriber.id,
            status: 'failed',
            error_message: result.error.message
          });
        } else {
          console.log(`✅ Sent to ${subscriber.email}`);
          sentCount++;

          // Track successful send
          await supabase.from('campaign_tracking').insert({
            campaign_id: campaignId,
            subscriber_id: subscriber.id,
            status: 'sent'
          });
        }

        // Small delay to avoid rate limits (10 emails per second max)
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (sendError) {
        console.error(`❌ Error sending to ${subscriber.email}:`, sendError);
        failedCount++;
        errors.push({ email: subscriber.email, error: sendError.message });
      }
    }

    // Update campaign with final stats
    await supabase
      .from('newsletter_campaigns')
      .update({ 
        status: failedCount === subscribers.length ? 'failed' : 'sent',
        sent_at: new Date().toISOString(),
        total_sent: sentCount,
        total_failed: failedCount,
        total_recipients: subscribers.length
      })
      .eq('id', campaignId);

    // Update subscriber email counts
    if (sentCount > 0) {
      const now = new Date().toISOString();
      for (const subscriber of subscribers) {
        // Get current email count
        const { data: subData } = await supabase
          .from('subscribers')
          .select('email_count')
          .eq('id', subscriber.id)
          .single();
        
        if (subData) {
          // Increment email count
          await supabase
            .from('subscribers')
            .update({ 
              email_count: (subData.email_count || 0) + 1,
              last_email_sent_at: now
            })
            .eq('id', subscriber.id);
        }
      }
    }

    console.log(`✅ Campaign complete: ${sentCount} sent, ${failedCount} failed`);
    
    res.json({ 
      success: true, 
      message: 'Newsletter sent successfully',
      campaignId,
      stats: {
        sent: sentCount,
        failed: failedCount,
        total: subscribers.length
      },
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('❌ Newsletter send error:', error);
    
    // Update campaign status to failed
    if (req.body.campaignId) {
      await supabase
        .from('newsletter_campaigns')
        .update({ status: 'failed' })
        .eq('id', req.body.campaignId);
    }
    
    res.status(500).json({ success: false, error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    availableEndpoints: {
      health: 'GET /health',
      sendEmail: 'POST /api/send-email',
      newsletterSubscribe: 'POST /api/newsletter/subscribe',
      newsletterSend: 'POST /api/newsletter/send'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 OCSLAA Email Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📧 Send email: http://localhost:${PORT}/api/send-email`);
});
