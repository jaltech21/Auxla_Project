# OCSLAA Website Hosting & Deployment Plan

**Document Created:** April 21, 2026  
**Status:** Ready to Execute (Pending Client Approval)  
**Approach:** Hybrid (GitHub Pages Frontend + Render Backend + Namecheap Domain & Email)

---

## **Executive Summary**

This plan outlines the complete process to host the OCSLAA website on a custom Namecheap domain with automatic deployments from GitHub. The hybrid approach provides:

- ✅ **Frontend:** GitHub Pages (free, fast, auto-deploying)
- ✅ **Backend:** Render (free tier, auto-deploying)
- ✅ **Domain:** Namecheap (`ocslaa.org`)
- ✅ **Email:** Namecheap mailboxes + Resend API
- ✅ **Payments:** Stripe live mode for real donations
- ✅ **Security:** SSL/HTTPS, fraud detection, 2FA

**Estimated Cost:** $82-85/year (Namecheap) + Stripe per-donation fees (2.2% + $0.30)  
**Timeline:** 1-2 weeks (pending client approval)

---

## **PHASE 0: PRE-LAUNCH VERIFICATION** ⚠️ MUST COMPLETE FIRST

### **Client Approval** (Blocking)
- [ ] Send website link to client: `https://jaltech21.github.io/Auxla_Project/`
- [ ] Request written feedback on:
  - [ ] Homepage design and layout
  - [ ] Content accuracy (strategic plan, mission, values)
  - [ ] Partner list accuracy
  - [ ] Team member information
  - [ ] All imagery and branding
  - [ ] Donation flow/payment page
  - [ ] About page and other key pages
- [ ] Collect and document change requests
- [ ] Get final written approval before proceeding

### **Complete Incomplete Items** (Blocking)
- [ ] List all incomplete features/pages
- [ ] Complete admin panel (if needed)
- [ ] Publish all blog posts to Sanity (if using blog)
- [ ] Verify all forms work (contact, newsletter, donations)
- [ ] Test all links and buttons
- [ ] Verify all PDFs load correctly

### **Mobile Testing** (High Priority)
- [ ] Test on iPhone (iOS)
- [ ] Test on Android phone
- [ ] Test on tablet
- [ ] Verify responsive layout (no horizontal scroll)
- [ ] Test donation form on mobile
- [ ] Test newsletter signup on mobile
- [ ] Test contact form on mobile
- [ ] Verify all buttons are clickable (not too small)
- [ ] Verify all images load
- [ ] Document any issues found

### **Cross-Browser Testing** (Medium Priority)
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Screenshot any issues

### **Functional Testing** (Medium Priority)
- [ ] Donation system: Test full payment flow
- [ ] Newsletter: Test signup and confirmation email
- [ ] Contact form: Test submission and reply email
- [ ] Links: Verify all internal/external links work
- [ ] SEO: Verify meta tags and og:image tags
- [ ] Lighthouse audit: Check performance score

### **Final Client Walkthrough** (Before Launch)
- [ ] Walk client through entire website
- [ ] Test payment system on their device/network
- [ ] Get final written approval
- [ ] Collect emergency contact info (for live issues)

---

## **PHASE 1: STRIPE LIVE MODE SETUP**

**Purpose:** Enable real payment processing for donations

### **Get Live Stripe Keys**
- [ ] Login to Stripe Dashboard (stripe.com)
- [ ] Toggle "View test data" OFF (top left)
- [ ] Go to Developers → API Keys
- [ ] Copy live Publishable Key: `pk_live_...`
- [ ] Copy live Secret Key: `sk_live_...`
- [ ] Copy live Webhook Signing Secret: `whsec_live_...`

### **Create Live Webhook in Stripe**
- [ ] Dashboard → Developers → Webhooks
- [ ] Add endpoint
- [ ] URL: `https://[your-render-backend-url].onrender.com/api/webhooks/stripe`
- [ ] Events to send: `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Copy signing secret: `whsec_live_...`

### **Setup Bank Account for Payouts**
- [ ] Settings → Bank accounts and transfers
- [ ] Add your organization's bank account
- [ ] Verify account (wait for micro-deposits from Stripe)
- [ ] Setup payout schedule (daily/weekly/monthly)

### **Enable Security Features**
- [ ] Settings → Payment settings
- [ ] Enable "3D Secure 2"
- [ ] Enable "Radar" (fraud detection)
- [ ] Configure decline rules for suspicious activity

### **Update Backend Environment Variables**
- [ ] Go to Render Dashboard
- [ ] Select backend service
- [ ] Settings → Environment
- [ ] Update:
  ```
  STRIPE_SECRET_KEY = sk_live_... (new)
  STRIPE_WEBHOOK_SECRET = whsec_live_... (new)
  ```
- [ ] Click Save (auto-redeploys in 1-3 minutes)
- [ ] Verify in Render Logs that deployment succeeded

### **Update Frontend Code for Live Keys**
- [ ] Find all test Stripe public key references
- [ ] Files to check:
  - `src/lib/stripe.ts` (if exists)
  - `src/pages/DonationPage.tsx`
  - `src/pages/DonationSuccessPage.tsx`
  - `src/components/DonationForm.tsx`
  - Any other files with Stripe import
- [ ] Replace `pk_test_` with `pk_live_`
- [ ] Commit with message: "Switch Stripe to live mode"
- [ ] Push to `main` branch
- [ ] Verify GitHub Actions builds and deploys (2-5 min)

### **Test Live Mode with Real Card**
- [ ] Make $1 test donation with your real card
- [ ] Verify:
  - [ ] Payment goes through on website
  - [ ] Donation recorded in Supabase
  - [ ] Receipt email sent to donor
  - [ ] Stripe webhook fires (check Stripe Logs)
  - [ ] Donation appears in Stripe Dashboard
  - [ ] Bank transfer scheduled
- [ ] If any step fails, troubleshoot before proceeding

---

## **PHASE 2: NAMECHEAP DOMAIN & EMAIL SETUP**

**Purpose:** Get custom domain and email accounts for organization

### **Purchase Namecheap Domain & Services**
- [ ] Login/Register at namecheap.com
- [ ] Add to cart:
  - [ ] Domain: `ocslaa.org` (~$7.48/year)
  - [ ] ICANN fee (~$0.20/year)
  - [ ] PositiveSSL certificate (~$5.99/year)
  - [ ] Pro Email plan (~$10-15/year)
  - [ ] Sitelock Protect ($4.88/month, optional but recommended)
- [ ] **REMOVE:** Stellar Plus (hosting - not needed for hybrid)
- [ ] Checkout and pay (~$82-85/year)
- [ ] Verify email confirmation from Namecheap

### **Wait for Domain Activation**
- [ ] Check email for domain registration confirmation
- [ ] Login to Namecheap account
- [ ] Verify domain shows as active
- [ ] Wait 24-48 hours for full propagation

### **Create Email Accounts in Namecheap cPanel**
- [ ] Access cPanel (link in Namecheap account)
- [ ] Go to Email Accounts section
- [ ] Create mailboxes:
  - [ ] `noreply@ocslaa.org` (for backend, forwards to support)
  - [ ] `info@ocslaa.org` (general inquiries)
  - [ ] `support@ocslaa.org` (primary support inbox)
  - [ ] `donations@ocslaa.org` (donation inquiries)
  - [ ] `john@ocslaa.org` (employee - replace with actual name)
  - [ ] `sarah@ocslaa.org` (employee - replace with actual name)
  - [ ] Additional employee accounts as needed
- [ ] For each, set strong password (20+ characters, mixed case, numbers, symbols)

### **Setup Email Forwarding**
- [ ] cPanel → Email Routing/Catch-All
- [ ] Set catch-all: `*@ocslaa.org` forwards to `support@ocslaa.org`
- [ ] OR set individual forwarders:
  - `noreply@ocslaa.org` → `support@ocslaa.org`
  - `info@ocslaa.org` → `support@ocslaa.org`
  - `donations@ocslaa.org` → `support@ocslaa.org`

### **Enable 2FA on Email Accounts**
- [ ] cPanel → Two-Factor Authentication
- [ ] Enable for all email accounts
- [ ] Scan QR codes with Authenticator app (Google Auth/Authy)
- [ ] Save backup codes securely
- [ ] Test login with 2FA enabled

### **Setup SPF/DKIM/DMARC Records** (Optional but recommended)
- [ ] cPanel → Email Authentication
- [ ] Copy SPF record and add to Namecheap DNS (usually auto-added)
- [ ] Copy DKIM records and add to DNS
- [ ] Consider adding DMARC policy for email spoofing prevention

### **Test Email Accounts**
- [ ] Send test email to each account
- [ ] Test webmail access: `https://mail.ocslaa.org`
- [ ] Test adding to email client (Outlook, Gmail)
- [ ] Test forwarding works

---

## **PHASE 3: GITHUB PAGES DOMAIN CONFIGURATION**

**Purpose:** Point custom domain to GitHub Pages

### **Update GitHub Pages Custom Domain**
- [ ] Go to GitHub repo settings
- [ ] Pages section
- [ ] Custom domain: Enter `ocslaa.org`
- [ ] Check "Enforce HTTPS"
- [ ] GitHub auto-creates CNAME file

### **Point Namecheap Domain to GitHub Pages**
- [ ] Namecheap Dashboard → Domain List
- [ ] Click "Manage" on `ocslaa.org`
- [ ] Advanced DNS section
- [ ] Add DNS records:

  **For root domain (@):**
  ```
  A Record:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

  **For www subdomain:**
  ```
  CNAME Record:
  www → jaltech21.github.io
  ```

  **Optional for mail (if not already there):**
  ```
  MX Records (auto-added by Namecheap):
  aspmx.l.google.com (for Gmail if needed)
  ```

- [ ] Save changes
- [ ] Wait 24-48 hours for DNS propagation

### **Verify Domain Points Correctly**
- [ ] Visit `https://ocslaa.org` (should show your website)
- [ ] Visit `https://www.ocslaa.org` (should show your website)
- [ ] Check HTTPS works (should have green lock)
- [ ] Run `nslookup ocslaa.org` in terminal to verify DNS

---

## **PHASE 4: RESEND CUSTOM DOMAIN CONFIGURATION**

**Purpose:** Enable sending emails from custom domain via Resend API

### **Verify Domain in Resend**
- [ ] Login to Resend Dashboard (resend.com)
- [ ] Go to Domains
- [ ] Add Domain: `ocslaa.org`
- [ ] Get CNAME record to add:
  ```
  Name: resend._domainkey
  Value: [Resend provides this]
  ```

### **Add CNAME to Namecheap DNS**
- [ ] Namecheap → Advanced DNS (same as Phase 3)
- [ ] Add CNAME record for Resend:
  ```
  Name: resend._domainkey
  Value: [from Resend dashboard]
  TTL: 3600
  ```
- [ ] Save

### **Wait for Domain Verification**
- [ ] Resend checks CNAME every few minutes
- [ ] Once verified, domain shows as active in Resend
- [ ] Takes 5-60 minutes typically

### **Update Backend Email Sending**
- [ ] No code changes needed - already using Resend
- [ ] Verify `from` field in backend uses custom domain:
  ```javascript
  from: 'OCSLAA <noreply@ocslaa.org>'
  ```

### **Test Sending Email from Custom Domain**
- [ ] Trigger a test donation to receive receipt email
- [ ] Verify email comes from `noreply@ocslaa.org` (not test domain)
- [ ] Test newsletter signup confirmation email
- [ ] Verify no bounce backs or delivery issues

---

## **PHASE 5: UPDATE FRONTEND CONFIGURATION**

**Purpose:** Update website to work with custom domain

### **Update Vite Base URL**
- [ ] File: `vite.config.ts`
- [ ] Change from:
  ```typescript
  base: '/Auxla_Project/'
  ```
- [ ] Change to:
  ```typescript
  base: '/'
  ```
- [ ] This removes the path prefix since you now have your own domain

### **Update Backend CORS Configuration**
- [ ] File: `backend/server.js`
- [ ] Update `allowedOrigins` array to include:
  ```javascript
  const allowedOrigins = [
    'https://ocslaa.org',
    'https://www.ocslaa.org',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL,
  ].filter(Boolean);
  ```

### **Update GitHub Secrets** (if using environment variables)
- [ ] Go to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Create/Update secrets:
  ```
  VITE_API_URL = https://[your-render-backend-url].onrender.com
  VITE_FRONTEND_URL = https://ocslaa.org
  VITE_STRIPE_PUBLIC_KEY = pk_live_... (if not in code)
  ```

### **Commit and Push Changes**
- [ ] Commit: `git add -A`
- [ ] Message: `"Update configuration for custom domain hosting"`
- [ ] Push: `git push origin main`
- [ ] Verify GitHub Actions builds and deploys (2-5 min)
- [ ] Visit `https://ocslaa.org` and verify site loads

---

## **PHASE 6: RENDER BACKEND CONFIGURATION** (If needed)

**Purpose:** Ensure backend is configured for custom domain

### **Verify Backend Environment Variables**
- [ ] Render Dashboard → Backend Service → Settings → Environment
- [ ] Verify these are set:
  ```
  RESEND_API_KEY = re_...
  SUPABASE_URL = https://...supabase.co
  SUPABASE_ANON_KEY = ...
  STRIPE_SECRET_KEY = sk_live_...
  STRIPE_WEBHOOK_SECRET = whsec_live_...
  FRONTEND_URL = https://ocslaa.org
  ```
- [ ] All should be already set, but verify values are correct

### **Verify Webhook Endpoint**
- [ ] Render → Backend Service → Settings
- [ ] Check that service URL is correct
- [ ] Verify it matches Stripe webhook: `https://[service].onrender.com/api/webhooks/stripe`
- [ ] Test webhook in Stripe: Developers → Webhooks → Send test event
- [ ] Verify in Render Logs that webhook is received

### **Test Backend with New Domain**
- [ ] Make a test donation from `https://ocslaa.org/donate`
- [ ] Verify payment processes
- [ ] Verify webhook fires in Render logs
- [ ] Verify email receipt sent
- [ ] Verify donation appears in Supabase

---

## **PHASE 7: FINAL TESTING & VERIFICATION**

### **Full Website Testing on Custom Domain**
- [ ] Visit `https://ocslaa.org` (root)
- [ ] Visit `https://www.ocslaa.org` (www subdomain)
- [ ] Verify HTTPS works (green lock)
- [ ] Test all main pages:
  - [ ] Home
  - [ ] About
  - [ ] Services
  - [ ] Strategic Plan
  - [ ] Donations
  - [ ] Blog (if applicable)
  - [ ] Contact
  - [ ] Resources
  - [ ] Partners
  - [ ] Team

### **Functional Testing on Custom Domain**
- [ ] Donation flow:
  - [ ] Navigate to donation page
  - [ ] Enter donation amount
  - [ ] Click donate
  - [ ] Payment form appears
  - [ ] Enter test card (or real card for live)
  - [ ] Confirm donation
  - [ ] Success page shows
  - [ ] Receipt email received
- [ ] Newsletter signup:
  - [ ] Enter email
  - [ ] Submit
  - [ ] Confirmation email received
- [ ] Contact form:
  - [ ] Fill form
  - [ ] Submit
  - [ ] Admin confirmation email sent
  - [ ] User receives response
- [ ] Email verification:
  - [ ] Check emails come from `noreply@ocslaa.org`
  - [ ] No bouncebacks
  - [ ] Proper branding/formatting

### **Mobile Testing on Custom Domain**
- [ ] Visit on iOS phone: `https://ocslaa.org`
- [ ] Visit on Android phone: `https://ocslaa.org`
- [ ] Test donation on mobile
- [ ] Test newsletter signup on mobile
- [ ] Test contact form on mobile
- [ ] Verify all functions work

### **Email Team Testing**
- [ ] Employee sends email from `john@ocslaa.org`
- [ ] Verify it shows as from `@ocslaa.org`
- [ ] Test receiving emails at each account
- [ ] Verify forwarding works
- [ ] Test webmail access

### **Stripe Dashboard Review**
- [ ] Verify test donation appears
- [ ] Check webhook logs for successful events
- [ ] Verify bank account is verified for payouts
- [ ] Check payout schedule is set
- [ ] Review fraud detection settings

### **Performance Check**
- [ ] Run Lighthouse audit on `https://ocslaa.org`
- [ ] Check performance score (target: >80)
- [ ] Check accessibility score
- [ ] Check SEO score
- [ ] Fix any critical issues

### **Security Check**
- [ ] Verify SSL certificate installed (HTTPS works)
- [ ] Check no mixed content errors (http in https page)
- [ ] Verify CORS allows correct domains
- [ ] Verify API keys are not exposed
- [ ] Check no sensitive data in console logs

---

## **PHASE 8: LAUNCH & ANNOUNCEMENT**

### **Pre-Launch Notification**
- [ ] Prepare launch announcement
- [ ] Notify donors/supporters
- [ ] Update social media
- [ ] Update any old links pointing to GitHub Pages

### **Monitor First 24 Hours**
- [ ] Check Stripe dashboard for donations
- [ ] Check Render logs for errors
- [ ] Check Resend dashboard for email issues
- [ ] Monitor website performance
- [ ] Respond to any donor inquiries
- [ ] Track any critical bugs

### **Documentation**
- [ ] Document any issues encountered
- [ ] Create runbook for common issues
- [ ] Prepare escalation contacts

---

## **PHASE 9: POST-LAUNCH MAINTENANCE**

### **Daily (First Week)**
- [ ] Check Stripe dashboard for new donations
- [ ] Monitor email delivery
- [ ] Check website for errors
- [ ] Respond to any issues

### **Weekly**
- [ ] Review donation statistics
- [ ] Check email bouncebacks
- [ ] Monitor website performance
- [ ] Check for any broken links
- [ ] Review user feedback

### **Monthly**
- [ ] Review analytics
- [ ] Check SSL certificate expiration (1 month before)
- [ ] Plan newsletter content
- [ ] Update website with new content
- [ ] Review security logs
- [ ] Backup important data

### **Quarterly**
- [ ] Review donation trends
- [ ] Update team info if changed
- [ ] Plan content improvements
- [ ] Security audit
- [ ] Review all external services status

### **Annually**
- [ ] Renew domain (if not auto-renewing)
- [ ] Renew SSL certificate
- [ ] Review all subscriptions
- [ ] Update dependencies
- [ ] Plan major updates

---

## **COSTS SUMMARY**

### **Initial Setup (One-time)**
```
Namecheap Domain           $7.48
ICANN Fee                  $0.20
PositiveSSL (1 year)       $5.99
Pro Email (1 year)         $10-15
────────────────────────
TOTAL INITIAL:             ~$24-27 (prorated)
```

### **Annual Recurring**
```
Namecheap Domain           $7.48
PositiveSSL                $5.99
Pro Email                  $10-15
Sitelock (optional)        $58.56
────────────────────────
TOTAL ANNUAL:              $82-85 (without Sitelock: $24-27)
```

### **Per-Transaction (Variable)**
```
Stripe donation fee        2.2% + $0.30
Resend emails              FREE (up to 100/day)
────────────────────────
Example: $100 donation     $2.30 fee
Example: 50 donations/mo   ~$115 total fees
```

### **Year 1 Estimate**
```
Fixed costs                $85 (with Sitelock)
Stripe fees (estimate)     $150-300
────────────────────────
TOTAL YEAR 1:              $235-385
```

---

## **DEPENDENCIES & CREDENTIALS NEEDED**

### **Before Starting**
- [ ] Namecheap account (email required)
- [ ] Stripe account with live keys ready
- [ ] GitHub account with repo access
- [ ] Render account with backend deployed
- [ ] Resend account ready
- [ ] Supabase database connected
- [ ] Bank account for Stripe payouts
- [ ] Organization email address

### **Credentials to Secure**
- [ ] Stripe Secret Key: `sk_live_...`
- [ ] Stripe Webhook Secret: `whsec_live_...`
- [ ] Resend API Key
- [ ] Namecheap account password
- [ ] cPanel password (Namecheap)
- [ ] Email account passwords
- [ ] 2FA backup codes

---

## **ROLLBACK/EMERGENCY PROCEDURES**

### **If Domain Points Wrong**
- [ ] Go to Namecheap DNS
- [ ] Verify A records point to GitHub Pages IPs
- [ ] Verify CNAME for www is correct
- [ ] Clear DNS cache (may take 24-48 hours)
- [ ] If critical, revert to GitHub Pages (jaltech21.github.io)

### **If Payment System Breaks**
- [ ] Check Stripe keys in Render environment
- [ ] Verify webhook endpoint in Stripe dashboard
- [ ] Check Render logs for errors
- [ ] Temporarily disable donation button
- [ ] Notify users of issue
- [ ] Switch back to test mode if needed (quick fix)

### **If Email Breaks**
- [ ] Check Resend API key in Render
- [ ] Verify custom domain is verified in Resend
- [ ] Check Namecheap email accounts
- [ ] Verify SPF/DKIM records
- [ ] Fallback: Temporarily send from Resend test domain

### **If Website Down**
- [ ] Check GitHub Actions logs (frontend)
- [ ] Check Render logs (backend)
- [ ] Check Namecheap DNS records
- [ ] Check GitHub Pages status
- [ ] Fallback: Revert to previous commit

---

## **CONTACT INFORMATION**

### **When Live, Save:**
- [ ] Namecheap Support: support@namecheap.com
- [ ] Stripe Support: https://support.stripe.com
- [ ] Resend Support: support@resend.com
- [ ] Render Support: https://support.render.com
- [ ] GitHub Support: https://support.github.com

### **Organization Contacts:**
- [ ] Emergency contact: [to be filled]
- [ ] Client/Decision maker: [to be filled]
- [ ] Technical contact: [to be filled]

---

## **COMPLETION CHECKLIST**

- [ ] All items in Phases 0-9 completed
- [ ] Client approval obtained
- [ ] Live payments tested and working
- [ ] Custom domain accessible
- [ ] Email system tested
- [ ] All links working
- [ ] Mobile tested
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Team trained on dashboard access
- [ ] Monitoring setup
- [ ] Documentation complete
- [ ] Launch announcement sent

---

## **NOTES & ADDITIONAL INFO**

**Auto-Deployment:**
- Frontend updates: Commit → GitHub Actions → GitHub Pages (2-5 min)
- Backend updates: Commit → Render webhook → Render deploy (1-3 min)
- No manual deployment needed

**Security Notes:**
- Keep live Stripe keys in Render only, never in code
- GitHub Secrets used for sensitive values
- HTTPS enforced on custom domain
- SSL certificate auto-renews with Namecheap

**Performance Notes:**
- GitHub Pages uses Cloudflare CDN (very fast)
- Render free tier has cold starts (acceptable for NGO)
- Consider upgrading Render if >1000 daily users

**Email Notes:**
- Namecheap email includes webmail access
- Employees can use Gmail/Outlook via IMAP
- Resend handles automated transactional emails
- Catch-all forwards to support inbox

---

**Document Status:** Ready to execute  
**Last Updated:** April 21, 2026  
**Next Step:** Await client approval from Phase 0

