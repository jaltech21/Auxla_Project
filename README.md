# OCSLAA - Our Concern Sierra Leone Alliance for Mental Health

A comprehensive mental health awareness and support platform serving Sierra Leone.

## 🚀 Quick Start

### Start Both Servers (Easiest)

```bash
./start-dev.sh
```

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend && npm install && npm start
```

**Terminal 2 - Frontend:**
```bash
cd auxla && npm install && npm run dev
```

**Terminal 3 - Stripe Webhooks (for donations):**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Admin Panel:** http://localhost:5173/admin
- **Email API:** http://localhost:3000/api/send-email

## 📚 Features Implemented

### ✅ Phase 11: Content Management System (CMS)
- Blog posts with rich text editor
- Media library
- Categories & tags
- Multiple authors
- Auto-save drafts
- SEO optimization
- Post scheduling
- Reading time calculation
- Bulk actions

### ✅ Phase 4: Newsletter System
- Email subscription forms
- Newsletter campaigns
- Campaign composer with rich text
- Subscriber management
- Email tracking
- Integration with Resend API

### ✅ Phase 5: Donation & Payment Integration
- Stripe payment processing
- One-time donations
- Donor management
- Donation tracking
- Email receipts
- Admin dashboard for donations

## 🛠️ Technologies

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Resend API
- **Payments:** Stripe

## 📖 Documentation

- **Frontend:** See [auxla/README.md](auxla/README.md)
- **Backend:** See [backend/README.md](backend/README.md)
- **Email System:** See [auxla/docs/EMAIL_SYSTEM.md](auxla/docs/EMAIL_SYSTEM.md)
- **Project Plan:** See [auxla/PROJECT_PLAN.md](auxla/PROJECT_PLAN.md)
- **Phase 11 Enhancements:** See [PHASE_11_ENHANCEMENTS.md](PHASE_11_ENHANCEMENTS.md)
- **Newsletter System:** See [PHASE_4_NEWSLETTER_SYSTEM.md](PHASE_4_NEWSLETTER_SYSTEM.md)
- **Stripe Setup:** See [database/STRIPE_SETUP_GUIDE.md](database/STRIPE_SETUP_GUIDE.md)

## 🧪 Testing

### Test Contact Form:
1. Go to http://localhost:5173/contact
2. Fill out form with your email
3. Submit
4. Check your inbox!

### Test Newsletter:
1. Subscribe at the footer
2. Go to Admin → Newsletters
3. Create and send a campaign

### Test Donations:
1. Go to http://localhost:5173/donate
2. Use test card: `4242 4242 4242 4242`
3. Complete the donation
4. Check Admin → Donations

## 🔑 Environment Setup

Create `.env` files in both `backend/` and `auxla/` directories with the required API keys:

- Supabase URL and Key
- Resend API Key
- Stripe API Keys
- Stripe Webhook Secret

See the respective `.env.example` files for details.

## 🚢 Deployment

Ready to deploy? See deployment guides in the documentation.

## 📝 Project Info

**Repository:** https://github.com/jaltech21/Auxla_Project
