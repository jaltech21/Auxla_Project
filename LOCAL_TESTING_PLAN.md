# OCSLAA Website - Local Testing Plan

**Document Created:** April 21, 2026  
**Status:** Ready to Execute Locally  
**Purpose:** Comprehensive testing before hosting on custom domain

---

## **Executive Summary**

This plan outlines all testing phases that can be performed in the local development environment and on GitHub Pages before moving to custom domain hosting. The goal is to catch bugs, performance issues, and security vulnerabilities early.

**Total Testing Time Estimate:** 3-5 days  
**Tools Required:** Free (browsers, VS Code extensions, online tools)  
**Can be Done:** Offline (most tests) or online (some tests)

---

## **Testing Phase Overview**

```
├── Phase 1: Functionality Testing (Local)
├── Phase 2: Performance Testing (Local + GitHub Pages)
├── Phase 3: Browser & Mobile Testing (Local + GitHub Pages)
├── Phase 4: Accessibility Testing (Local + GitHub Pages)
├── Phase 5: Security Testing (Local + GitHub Pages)
├── Phase 6: Payment System Testing (Live on GitHub Pages)
├── Phase 7: Email System Testing (Live on GitHub Pages)
├── Phase 8: Database Testing (Local + Live)
├── Phase 9: SEO Testing (GitHub Pages)
└── Phase 10: User Experience Testing (GitHub Pages)
```

---

## **PHASE 1: FUNCTIONALITY TESTING** (Local Development)

### **1.1 Homepage Testing**
- [ ] Load homepage locally: `http://localhost:5173`
- [ ] Verify hero section displays
- [ ] Check all hero buttons work (scroll to sections)
- [ ] Verify all navigation links visible
- [ ] Test mobile menu toggle (if applicable)
- [ ] Check hero images load
- [ ] Verify gradient/styling applied
- [ ] Test responsive layout (resize window)

### **1.2 Navigation Testing**
- [ ] Home link works
- [ ] About link works and scrolls to section
- [ ] Services link works
- [ ] Strategic Plan link works
- [ ] Blog link works (if implemented)
- [ ] Contact link works
- [ ] Donations link works
- [ ] Resources link works
- [ ] Partners link works
- [ ] Mobile hamburger menu opens/closes
- [ ] Mobile menu links work

### **1.3 About Page Testing**
- [ ] Page loads completely
- [ ] All sections render:
  - [ ] Purpose statement
  - [ ] Vision & mission
  - [ ] Core values
  - [ ] Team section
  - [ ] Partners section
  - [ ] Why choose us section
- [ ] Images load
- [ ] Text formatting correct
- [ ] Team cards display
- [ ] Team member modals open/close
- [ ] Email buttons functional (if implemented)
- [ ] Links in modals work

### **1.4 Services Page Testing**
- [ ] Services list loads
- [ ] Each service card displays
- [ ] Service detail pages load when clicked
- [ ] Back button works
- [ ] PDF links work (if embedded)
- [ ] Images display
- [ ] Text is readable
- [ ] Mobile layout responsive

### **1.5 Strategic Plan Page Testing**
- [ ] Page loads
- [ ] Timeline displays
- [ ] Goals section displays
- [ ] Phase breakdown displays
- [ ] All text content visible
- [ ] Images/diagrams display
- [ ] Dates are correct (2026-2028)
- [ ] Mobile responsive

### **1.6 Donations Page Testing**
- [ ] Page loads
- [ ] Donation form displays
- [ ] All form fields present:
  - [ ] Amount input
  - [ ] Donor name
  - [ ] Email
  - [ ] Phone
  - [ ] Message
  - [ ] Designation dropdown
  - [ ] Anonymous checkbox
  - [ ] Cover fees checkbox
- [ ] Form validation:
  - [ ] Required fields enforce (try submitting empty)
  - [ ] Email validation (try invalid email)
  - [ ] Amount validation (try negative/zero)
- [ ] Stripe payment element loads
- [ ] Test card: 4242 4242 4242 4242 works
- [ ] Success page displays after payment
- [ ] Error page displays on failed payment

### **1.7 Newsletter Testing**
- [ ] Newsletter signup form visible
- [ ] Email input accepts email
- [ ] Submit button works
- [ ] Success message shows
- [ ] Database records subscription (check Supabase)
- [ ] Confirmation email sent
- [ ] Email contains correct content

### **1.8 Contact Form Testing**
- [ ] Form displays
- [ ] All fields work:
  - [ ] Name input
  - [ ] Email input
  - [ ] Subject input
  - [ ] Message textarea
- [ ] Form validation:
  - [ ] Required fields (try empty)
  - [ ] Email validation
  - [ ] Min/max length (if set)
- [ ] Submit button works
- [ ] Success message displays
- [ ] Email sent to admin
- [ ] Confirmation email sent to user

### **1.9 Blog Page Testing** (if implemented)
- [ ] Blog list loads
- [ ] Posts display
- [ ] Post cards show:
  - [ ] Title
  - [ ] Author
  - [ ] Date
  - [ ] Featured image
  - [ ] Excerpt
- [ ] Click to open full post
- [ ] Post displays correctly
- [ ] Back to list works
- [ ] Search/filter works (if implemented)

### **1.10 Resources Page Testing**
- [ ] Page loads
- [ ] Resource cards display
- [ ] PDF links work
- [ ] Images display
- [ ] Descriptions visible
- [ ] All buttons functional
- [ ] Links open in new tab (if external)

### **1.11 Footer Testing**
- [ ] Footer displays on every page
- [ ] All footer links work
- [ ] Social media links work
- [ ] Email address clickable
- [ ] Phone number clickable
- [ ] Address displays correctly
- [ ] Copyright year correct

### **1.12 Special Pages Testing**
- [ ] Accreditation page loads
- [ ] Certificates display with watermark
- [ ] Right-click disabled (no context menu)
- [ ] Screenshot protection works
- [ ] Annual reviews page loads
- [ ] Download buttons functional (if any)
- [ ] FAQ page loads and accordion works

---

## **PHASE 2: PERFORMANCE TESTING** (Local Development)

### **2.1 Load Time Testing**

**Tools Needed:** Google Chrome DevTools (built-in)

**Homepage Load Time:**
- [ ] Open Chrome DevTools (F12)
- [ ] Go to Network tab
- [ ] Refresh page
- [ ] Check Total size
- [ ] Check Load time (target: <3 seconds)
- [ ] Check Time to interactive (target: <5 seconds)
- [ ] Identify slow resources (>1 second each)

**Checklist for each slow resource:**
- [ ] Is it necessary?
- [ ] Can it be optimized?
- [ ] Can it be lazy-loaded?
- [ ] Is there a smaller alternative?

### **2.2 Lighthouse Audit**

**Chrome DevTools → Lighthouse tab**

**For Desktop:**
- [ ] Run audit
- [ ] Check Performance score (target: >80)
- [ ] Check Accessibility score (target: >90)
- [ ] Check Best Practices score (target: >90)
- [ ] Check SEO score (target: >90)
- [ ] Note failing metrics
- [ ] Document recommendations

**For Mobile:**
- [ ] Run mobile audit
- [ ] Performance score should be similar
- [ ] Check for mobile-specific issues
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

### **2.3 Bundle Size Analysis**

**Tools:** `npm run build` then check dist folder

```bash
# From project root
npm run build
ls -lh dist/
du -sh dist/
```

**Checklist:**
- [ ] Total bundle size
- [ ] JavaScript size (target: <500KB)
- [ ] CSS size (target: <100KB)
- [ ] Images total size (target: <1MB)
- [ ] Identify large chunks
- [ ] Can any dependencies be removed?
- [ ] Can code splitting improve?

### **2.4 Memory Usage Testing**

**Chrome DevTools → Memory tab**

- [ ] Take heap snapshot
- [ ] Check memory usage baseline
- [ ] Navigate through several pages
- [ ] Take another snapshot
- [ ] Compare memory increase
- [ ] Look for memory leaks (continuous increase)
- [ ] Check that memory decreases when navigating away

### **2.5 Rendering Performance**

**Chrome DevTools → Performance tab**

**Homepage:**
- [ ] Click record
- [ ] Scroll through page
- [ ] Click record to stop
- [ ] Analyze timeline
- [ ] Check Frame Rate (target: 60 FPS)
- [ ] Look for long tasks (>50ms)
- [ ] Check for jank/stuttering
- [ ] Note any bottlenecks

**Donation Page:**
- [ ] Record while filling form
- [ ] Record while submitting
- [ ] Check for layout thrashing
- [ ] Verify smooth interactions

### **2.6 Network Performance**

**Chrome DevTools → Network tab**

**Simulate slow connection:**
- [ ] Click throttling dropdown
- [ ] Select "Slow 4G"
- [ ] Reload page
- [ ] Check load time
- [ ] Does site still function?
- [ ] Do critical features work?
- [ ] Does Stripe element load?
- [ ] Does newsletter form work?

**Measure per resource:**
- [ ] Largest resources identified
- [ ] Can any be deferred?
- [ ] Can images be compressed?
- [ ] Are fonts optimized?

### **2.7 CSS & JavaScript Optimization**

**DevTools → Coverage tab**

- [ ] Click record
- [ ] Interact with all major features
- [ ] Stop recording
- [ ] Review coverage report
- [ ] Look for unused CSS (red bars)
- [ ] Look for unused JS (red bars)
- [ ] Identify code that can be removed
- [ ] Check if using tree-shaking (build optimization)

---

## **PHASE 3: BROWSER & DEVICE TESTING** (Local + GitHub Pages)

### **3.1 Desktop Browser Testing**

**Test on: Chrome, Firefox, Safari, Edge**

**For each browser:**

**General:**
- [ ] Website loads fully
- [ ] No console errors (DevTools → Console)
- [ ] Layout renders correctly
- [ ] Colors display properly
- [ ] Fonts render correctly
- [ ] Images display

**Functionality:**
- [ ] All buttons clickable
- [ ] Forms work
- [ ] Payment form loads
- [ ] Navigation works
- [ ] Modals open/close
- [ ] Dropdowns work
- [ ] Accordions expand/collapse

**Visual:**
- [ ] No text overflow
- [ ] Spacing correct
- [ ] Alignment correct
- [ ] Gradients render
- [ ] Shadows display
- [ ] Animations smooth

**Form Specific:**
- [ ] Inputs accept text
- [ ] Selections work
- [ ] Checkboxes toggle
- [ ] Radio buttons select
- [ ] Validation messages show
- [ ] Error states display

### **3.2 Mobile Device Testing**

**Need: iOS phone, Android phone, or emulator**

**iPhone Testing:**
- [ ] Open Safari
- [ ] Navigate to: `https://jaltech21.github.io/Auxla_Project/`
- [ ] Website loads
- [ ] Layout responsive
- [ ] No horizontal scroll
- [ ] Buttons are clickable (not too small)
- [ ] Forms work
- [ ] Payment works
- [ ] Newsletter works
- [ ] Images load
- [ ] Text readable (not too small)

**Android Testing:**
- [ ] Open Chrome
- [ ] Navigate to GitHub Pages link
- [ ] Website loads
- [ ] Layout responsive
- [ ] Touch interactions work
- [ ] Forms submit
- [ ] Payment works
- [ ] Verify same functionality as iPhone

**Tablet Testing:**
- [ ] Test on iPad or Android tablet
- [ ] Layout adapts properly
- [ ] Not showing mobile view when should be wider
- [ ] Touch interactions work
- [ ] Buttons properly spaced

### **3.3 Browser DevTools Mobile Emulation**

**For browsers without real devices:**

```
Chrome DevTools → Device Toolbar (Ctrl+Shift+M)
```

**Test viewport sizes:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Pixel 5 (393px)
- [ ] Galaxy S21 (360px)

**For each:**
- [ ] Layout responsive
- [ ] No horizontal scroll
- [ ] Text readable
- [ ] Buttons clickable
- [ ] Forms functional

### **3.4 Touch Interaction Testing**

**For mobile devices (real or emulator):**

- [ ] Tap buttons (not swipe)
- [ ] Double-tap form inputs
- [ ] Long-press elements
- [ ] Pinch to zoom
- [ ] Scroll through long pages
- [ ] Navigation drawer (if any)
- [ ] Modal interactions
- [ ] Form submissions

### **3.5 Orientation Testing**

**For mobile devices:**

- [ ] Test Portrait orientation
- [ ] Test Landscape orientation
- [ ] Layout adapts correctly
- [ ] No content hidden
- [ ] Forms still work
- [ ] Navigation still accessible
- [ ] Videos/images scale

---

## **PHASE 4: ACCESSIBILITY TESTING** (Local + GitHub Pages)

### **4.1 Keyboard Navigation**

**Test without mouse - Tab only:**

- [ ] Tab through page
- [ ] Focus visible on all elements
- [ ] Skip link appears (go to main content)
- [ ] Tab order logical (left to right, top to bottom)
- [ ] Can navigate forms with keyboard
- [ ] Can submit forms with Enter
- [ ] Can close modals with Escape
- [ ] No keyboard traps (focus stuck somewhere)

**Checklist for each interactive element:**
- [ ] Can be reached via Tab
- [ ] Focus indicator visible
- [ ] Can be activated (Enter/Space)

### **4.2 Screen Reader Testing**

**Tools:**
- Mac: VoiceOver (built-in, Cmd+F5)
- Windows: NVDA (free, https://www.nvaccess.org/)

**Test with screen reader:**
- [ ] Headings announced correctly
- [ ] Images have alt text
- [ ] Buttons are announced as buttons
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Links announced with descriptive text
- [ ] Page structure logical
- [ ] No unlabeled icons

### **4.3 Color Contrast Testing**

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools built-in

**Check:**
- [ ] Text vs background contrast ratio ≥ 4.5:1 (normal text)
- [ ] Large text (18pt+) contrast ≥ 3:1
- [ ] Button text readable
- [ ] Link text readable
- [ ] Form labels readable
- [ ] Success/error messages readable
- [ ] Placeholder text (if used) sufficient contrast

### **4.4 Font Size & Readability**

- [ ] Body text ≥ 16px
- [ ] Headings appropriately sized
- [ ] Line height ≥ 1.5x font size
- [ ] Line length ≤ 80 characters (optimal)
- [ ] No text all-caps (hard to read)
- [ ] Readable font families used
- [ ] Zoom page to 200% - still readable

### **4.5 Form Accessibility**

**Each form (donation, newsletter, contact):**

- [ ] Each input has label
- [ ] Label text associated with input (id/for)
- [ ] Error messages linked to inputs
- [ ] Required fields marked
- [ ] Instructions clear
- [ ] Submit button descriptive text
- [ ] Success/error messages clear

### **4.6 ARIA Testing** (if using custom components)

- [ ] ARIA labels present where needed
- [ ] ARIA roles correct
- [ ] ARIA properties updated on state change
- [ ] ARIA live regions used for dynamic content

### **4.7 Focus Management**

- [ ] Modal opens → focus moves to modal
- [ ] Modal closes → focus returns to trigger
- [ ] Alerts/notifications → focus moves (or announced)
- [ ] Page navigation → focus moves to main content

---

## **PHASE 5: SECURITY TESTING** (Local + GitHub Pages)

### **5.1 Input Validation Testing**

**For each form field:**

**Email fields:**
- [ ] Test valid: `test@example.com`
- [ ] Test invalid: `invalidemail`
- [ ] Test invalid: `test@`
- [ ] Test empty: leave blank
- [ ] Test SQL injection: `'; DROP TABLE users; --`
- [ ] Test XSS: `<script>alert('xss')</script>`

**Number fields:**
- [ ] Test valid numbers
- [ ] Test negative numbers (if applicable)
- [ ] Test zero
- [ ] Test very large numbers
- [ ] Test letters (should fail)
- [ ] Test special characters

**Text fields:**
- [ ] Test max length enforcement
- [ ] Test XSS payload: `<img src=x onerror="alert('xss')">`
- [ ] Test HTML: `<b>bold</b>`
- [ ] Test emoji: various emoji
- [ ] Test unicode characters

### **5.2 Authentication & Authorization Testing**

- [ ] Try accessing protected routes without login (if any)
- [ ] Try modifying JWT tokens (if used)
- [ ] Try accessing other users' data (if applicable)
- [ ] Try admin functions without admin role
- [ ] Session timeout works (if applicable)

### **5.3 API Security Testing**

**For each API endpoint:**

**Donation endpoint (POST /api/donations/create-payment-intent):**
- [ ] Try with no authentication
- [ ] Try with invalid amount
- [ ] Try with negative amount
- [ ] Check response doesn't leak sensitive data
- [ ] Try SQL injection in email
- [ ] Check rate limiting (if implemented)

**Newsletter endpoint (POST /api/newsletter/subscribe):**
- [ ] Try with invalid email
- [ ] Try with XSS payload
- [ ] Try duplicate subscription
- [ ] Check success response
- [ ] Check error response

**Contact endpoint (POST /api/send-email):**
- [ ] Try with long inputs
- [ ] Try with special characters
- [ ] Try with file uploads (if applicable)
- [ ] Check rate limiting

### **5.4 CORS Testing**

**Check CORS headers:**

```bash
# In terminal
curl -H "Origin: http://evil.com" \
  https://your-backend-url/api/donations/create-payment-intent \
  -v
```

- [ ] Only allow expected origins
- [ ] No `Access-Control-Allow-Origin: *`
- [ ] Credentials properly scoped
- [ ] Preflight requests work (OPTIONS)

### **5.5 HTTPS/SSL Testing**

- [ ] Website loads on HTTPS
- [ ] Green lock icon shows
- [ ] No mixed content warnings
- [ ] Check SSL certificate valid
- [ ] HSTS headers present (via DevTools)
- [ ] Try HTTP → should redirect to HTTPS

### **5.6 Environment Variable Exposure**

**Check that secrets not in frontend:**

```bash
# Terminal
grep -r "sk_test_" src/  # Should find nothing
grep -r "sk_live_" src/  # Should find nothing
grep -r "RESEND_API_KEY" src/  # Should find nothing
```

- [ ] No API keys in frontend code
- [ ] No secrets in console logs
- [ ] No secrets in localStorage visible
- [ ] Check built dist folder: `grep -r "sk_test" dist/`

### **5.7 Common Vulnerabilities**

**XSS (Cross-Site Scripting):**
- [ ] Payloads in comments/user input don't execute
- [ ] HTML sanitized/escaped

**CSRF (Cross-Site Request Forgery):**
- [ ] Form submissions check origin
- [ ] API endpoints require proper headers
- [ ] SameSite cookies set (if using cookies)

**Injection:**
- [ ] SQL injection attempts fail safely
- [ ] NoSQL injection handled
- [ ] Command injection not possible

---

## **PHASE 6: PAYMENT SYSTEM TESTING** (Live on GitHub Pages)

### **6.1 Stripe Test Mode Testing**

**Setup (already done):**
- [ ] Using test keys: `pk_test_...`, `sk_test_...`
- [ ] Test webhook secret: `whsec_test_...`

**Test Card:** `4242 4242 4242 4242`

### **6.2 Basic Payment Flow**

- [ ] Navigate to: `https://jaltech21.github.io/Auxla_Project/donate`
- [ ] Enter donation amount: `$10`
- [ ] Enter name: `Test Donor`
- [ ] Enter email: `test@example.com`
- [ ] Click Donate button
- [ ] Stripe payment element loads
- [ ] Enter test card: `4242 4242 4242 4242`
- [ ] Enter expiry: `12/25`
- [ ] Enter CVC: `123`
- [ ] Click Pay button
- [ ] Success page displays
- [ ] Check browser console for errors (should be clean)

### **6.3 Webhook Testing**

**In terminal, test webhook locally:**

```bash
# If backend running locally on :3000
curl -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "stripe-signature: test_signature" \
  -d '{"type":"payment_intent.succeeded","data":{"object":{"amount":1000,"metadata":{"donorEmail":"test@example.com"}}}}'
```

- [ ] Webhook received
- [ ] No errors in console
- [ ] Email should be sent (check logs)
- [ ] Donation recorded in Supabase (if connected)

### **6.4 Payment Error Scenarios**

**Test with various cards:**

| Card | Expected Result |
|------|---|
| `4000000000000002` | Declined (generic) |
| `4000002500003155` | Requires authentication (3D Secure) |
| `5555555555554444` | Mastercard (different card type) |
| `378282246310005` | AmEx (different card type) |

**For each:**
- [ ] Test in donation form
- [ ] Error message displays
- [ ] Page doesn't crash
- [ ] User can retry
- [ ] Error details clear but not scary

### **6.5 Form Validation Testing**

**Donation form:**

- [ ] Try submitting empty
- [ ] Try amount: `$0` (should fail)
- [ ] Try amount: `-$10` (should fail)
- [ ] Try invalid email: `notanemail`
- [ ] Try very long name (test max length)
- [ ] Try special characters in name
- [ ] Try with all optional fields empty
- [ ] Try with all fields filled

### **6.6 Cover Fees Testing** (if implemented)

- [ ] Uncheck "Cover fees" - amount unchanged
- [ ] Check "Cover fees" - amount increases
- [ ] Calculate: correct math for fee calculation
- [ ] Verify increase appropriate (usually ~$2-3 for $100)

### **6.7 Designation Testing** (if implemented)

- [ ] Dropdown opens and closes
- [ ] Can select different designations
- [ ] Selection saves in form
- [ ] Is passed to Stripe metadata
- [ ] Appears in donation receipt email

### **6.8 Anonymous Donation Testing**

- [ ] Check anonymous checkbox
- [ ] Uncheck fields if needed
- [ ] Submit
- [ ] Success page shows "Anonymous"
- [ ] Donation doesn't show name in admin panel

### **6.9 Email Receipt Testing**

**After successful payment:**

- [ ] Check email inbox (test@example.com)
- [ ] Receipt email received within 30 seconds
- [ ] Email from: `onboarding@resend.dev` (test mode)
- [ ] Email subject: "Thank You for Your Donation!"
- [ ] Email content includes:
  - [ ] Donor name
  - [ ] Amount
  - [ ] Transaction ID
  - [ ] Message of thanks
  - [ ] OCSLAA information

### **6.10 Database Recording Testing**

**In Supabase Dashboard:**

- [ ] Go to donations table
- [ ] Check last row is your test donation
- [ ] Verify fields:
  - [ ] Amount correct
  - [ ] Currency correct (USD)
  - [ ] Donor name correct
  - [ ] Donor email correct
  - [ ] Status: "completed"
  - [ ] Stripe ID present
  - [ ] Timestamp reasonable

---

## **PHASE 7: EMAIL SYSTEM TESTING** (Live on GitHub Pages)

### **7.1 Newsletter Signup Testing**

**Homepage newsletter form:**

- [ ] Click newsletter section
- [ ] Enter email: `newsletter-test@example.com`
- [ ] Click Subscribe
- [ ] Success message shows
- [ ] Check inbox for confirmation

**Confirmation Email:**
- [ ] Email received
- [ ] From: `onboarding@resend.dev` (test mode)
- [ ] Subject: "Welcome to OCSLAA Newsletter!"
- [ ] Contains welcome message
- [ ] Contains what they'll receive
- [ ] Proper formatting/branding

**Database Check:**
- [ ] Supabase → newsletter_subscribers table
- [ ] New row exists with email
- [ ] Subscribed: true
- [ ] Created date recent

### **7.2 Contact Form Email Testing**

**Contact page:**

- [ ] Fill contact form:
  - [ ] Name: `Test User`
  - [ ] Email: `contact-test@example.com`
  - [ ] Subject: `Test Message`
  - [ ] Message: `This is a test message`
- [ ] Click Submit
- [ ] Success message shows

**Admin Email:**
- [ ] Admin receives email with form content
- [ ] From: appropriate sender
- [ ] Contains all form data
- [ ] Proper formatting

**User Confirmation Email:**
- [ ] User receives confirmation
- [ ] From: OCSLAA
- [ ] Thanks them for message
- [ ] Sets expectations for response

### **7.3 Email Content Testing**

**For all emails:**

- [ ] No broken links
- [ ] Images load (if embedded)
- [ ] Formatting correct (bold, italic, links)
- [ ] Font readable
- [ ] Colors correct
- [ ] No HTML tags visible
- [ ] Mobile responsive (view in mobile email)
- [ ] Unsubscribe link present (if applicable)

### **7.4 Email Delivery Testing**

**Test email providers:**

- [ ] Gmail (Google)
- [ ] Outlook (Microsoft)
- [ ] Yahoo Mail
- [ ] Corporate email

**For each:**
- [ ] Email arrives (not spam)
- [ ] Displays correctly
- [ ] All links clickable
- [ ] Images load

### **7.5 Spam Testing**

- [ ] Check spam/junk folders
- [ ] OCSLAA emails should not be flagged as spam
- [ ] SPF/DKIM records help (verify in DNS)
- [ ] Unsubscribe links included

### **7.6 Duplicate Email Prevention**

- [ ] Subscribe same email twice
- [ ] Should either:
  - [ ] Reject duplicate, or
  - [ ] Update existing subscription
- [ ] Don't receive double emails

### **7.7 Rate Limiting Testing** (if implemented)

- [ ] Try subscribing 10 times quickly
- [ ] API should block after certain threshold
- [ ] Clear error message shown
- [ ] Try again after waiting - works

---

## **PHASE 8: DATABASE TESTING** (Local + Live)

### **8.1 Data Integrity Testing**

**Supabase Tables:**

- [ ] donations table exists
- [ ] newsletter_subscribers table exists
- [ ] All required columns present
- [ ] Data types correct
- [ ] Constraints enforced

### **8.2 Insert Testing**

**For each table:**

- [ ] Insert valid data - succeeds
- [ ] Insert with missing required field - fails
- [ ] Insert duplicate (if unique constraint) - fails
- [ ] Insert invalid data type - fails

### **8.3 Update Testing**

**Donations:**
- [ ] Can update status
- [ ] Can update receipt_sent
- [ ] Cannot update amount (should be immutable)
- [ ] Timestamp not changed on update (should be fixed)

**Newsletter:**
- [ ] Can update subscribed status
- [ ] Can update preferences
- [ ] Cannot change email without verification

### **8.4 Delete Testing**

- [ ] Can delete newsletter subscription
- [ ] Data removed from table
- [ ] No orphaned references
- [ ] Unsubscribe links work

### **8.5 Query Performance**

**In Supabase SQL Editor:**

```sql
-- Test slow queries
SELECT COUNT(*) FROM donations;
SELECT COUNT(*) FROM newsletter_subscribers;

-- Check indexes exist
-- Donations by email should be fast
```

- [ ] Tables load quickly (even with 1000+ rows)
- [ ] Indexes exist on frequently queried columns
- [ ] Query performance acceptable

### **8.6 Security (RLS) Testing**

**Row-Level Security:**

- [ ] Anonymous users cannot read sensitive data
- [ ] Cannot modify others' donations
- [ ] Can read public data (blog posts, etc.)
- [ ] Newsletter subscribers can only see their own data

### **8.7 Backup Testing**

- [ ] Check Supabase backups are enabled
- [ ] Verify backup frequency
- [ ] Document backup location
- [ ] Test restore process (on copy)

---

## **PHASE 9: SEO TESTING** (GitHub Pages)

### **9.1 Meta Tags Testing**

**On each major page:**

- [ ] `<title>` tag present and descriptive
- [ ] `<meta name="description">` present
- [ ] Description 150-160 characters
- [ ] Open Graph tags present:
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:image`
  - [ ] `og:url`
- [ ] Twitter Card tags (optional):
  - [ ] `twitter:card`
  - [ ] `twitter:title`

### **9.2 Structured Data Testing**

**Tool:** Google's Structured Data Tester

- [ ] Markup valid
- [ ] Organization schema present
- [ ] LocalBusiness schema (if applicable)
- [ ] No errors or warnings

### **9.3 Sitemap Testing**

- [ ] Check if sitemap exists: `/sitemap.xml`
- [ ] Sitemap includes all major pages
- [ ] URLs formatted correctly
- [ ] Dates updated

### **9.4 Robots.txt Testing**

- [ ] Check `/robots.txt` exists
- [ ] Allows search engines to crawl
- [ ] Disallows admin/private pages
- [ ] Sitemap referenced

### **9.5 Mobile SEO Testing**

**Tool:** Google Mobile-Friendly Test

- [ ] Site mobile friendly (passed)
- [ ] Viewport configured
- [ ] Text sized appropriately
- [ ] Touch targets spaced

### **9.6 Page Speed SEO**

**Tool:** PageSpeed Insights

- [ ] Run test on: `https://jaltech21.github.io/Auxla_Project/`
- [ ] Mobile score > 80
- [ ] Desktop score > 80
- [ ] Core Web Vitals green:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### **9.7 Link Testing**

**Tool:** Dead Link Checker

- [ ] No broken internal links
- [ ] External links valid
- [ ] Links use descriptive text (not "click here")
- [ ] Links have appropriate rel attributes

### **9.8 Content Testing**

- [ ] Keywords naturally used
- [ ] Headings (H1, H2, H3) hierarchical
- [ ] Only one H1 per page
- [ ] Content unique (not duplicate)
- [ ] Content substantial (not too thin)

---

## **PHASE 10: USER EXPERIENCE TESTING** (GitHub Pages)

### **10.1 Navigation Testing**

- [ ] Breadcrumbs (if applicable) show hierarchy
- [ ] Navigation menu clear and logical
- [ ] Current page highlighted
- [ ] Can easily return home
- [ ] Search function works (if implemented)
- [ ] Consistent navigation across pages

### **10.2 Call-to-Action (CTA) Testing**

**Main CTAs:**
- [ ] Donation button prominent
- [ ] Newsletter signup visible
- [ ] Contact form easy to find
- [ ] CTAs button text clear
- [ ] CTAs color contrasts well

### **10.3 Form User Experience**

**For each form:**

- [ ] Labels clear and associated
- [ ] Placeholder text helpful (not replacement)
- [ ] Error messages helpful (not "Invalid")
- [ ] Success messages clear
- [ ] Form doesn't lose data on error
- [ ] Can fill quickly (no unnecessary fields)

### **10.4 Content Readability**

- [ ] Font sizes appropriate
- [ ] Line heights comfortable
- [ ] Colors readable
- [ ] No walls of text (break into sections)
- [ ] Images support text
- [ ] Headings break up content

### **10.5 Loading States**

- [ ] Payment form shows loading while processing
- [ ] Newsletter signup shows loading
- [ ] No confusing delays
- [ ] User knows something is happening

### **10.6 Error Handling**

- [ ] Error messages user-friendly (not technical)
- [ ] Errors explain what's wrong
- [ ] Errors suggest how to fix
- [ ] Forms can be recovered from errors
- [ ] Success messages clear and encouraging

### **10.7 Responsive Design**

**At each breakpoint:**
- [ ] Content visible (no overflow)
- [ ] Navigation accessible
- [ ] Forms usable
- [ ] Images scale
- [ ] Text readable
- [ ] No jarring layout shifts

### **10.8 Donation Flow UX**

**From homepage to success:**
- [ ] Clear path to donation
- [ ] Expected amount options visible
- [ ] Form intuitive
- [ ] Payment smooth
- [ ] Success feels celebratory
- [ ] Next steps clear (newsletter signup)

### **10.9 Performance Perception**

- [ ] Page appears to load quickly
- [ ] Interactive elements respond immediately
- [ ] Animations smooth (not janky)
- [ ] No excessive loading spinners
- [ ] Perceived speed matches actual speed

### **10.10 Accessibility Integration**

- [ ] Visual users and screen reader users equally served
- [ ] Color not only indicator (text labels too)
- [ ] Forms accessible to keyboard users
- [ ] Nothing requires perfect vision/hearing
- [ ] Content understandable to diverse audiences

---

## **TESTING TOOLS REFERENCE**

### **Free Tools Needed**

| Tool | Purpose | Free Tier | Link |
|------|---------|-----------|------|
| Chrome DevTools | Performance, debugging | YES (built-in) | Built in Chrome |
| Lighthouse | Performance audit | YES (in DevTools) | Built in Chrome |
| NVDA | Screen reader testing | YES | https://www.nvaccess.org/ |
| WebAIM Contrast | Color contrast | YES | https://webaim.org/resources/contrastchecker/ |
| PageSpeed Insights | SEO/Performance | YES | https://pagespeed.web.dev/ |
| Mobile-Friendly Test | Mobile SEO | YES | https://search.google.com/test/mobile-friendly |
| Structured Data Test | Schema validation | YES | https://validator.schema.org/ |
| Dead Link Checker | Link validation | YES (limited) | https://www.deadlinkchecker.com/ |

### **Already Available in VS Code**

- [ ] ESLint (code quality)
- [ ] Prettier (code formatting)
- [ ] REST Client (API testing)
- [ ] Thunder Client (API testing)

---

## **TESTING CHECKLIST SUMMARY**

### **Quick Reference - Test in This Order**

1. **Day 1: Functionality** (local)
   - [ ] All pages load
   - [ ] All buttons work
   - [ ] All forms functional
   - [ ] Payment system works (test card)
   - [ ] Emails send (check inbox)

2. **Day 2: Performance** (local + GitHub Pages)
   - [ ] Lighthouse audit >80 all scores
   - [ ] Load time <3 seconds
   - [ ] No memory leaks
   - [ ] No slow JavaScript

3. **Day 2-3: Compatibility** (local + GitHub Pages)
   - [ ] Test 4 major browsers
   - [ ] Test on real mobile device
   - [ ] Test tablet
   - [ ] All screens responsive

4. **Day 3-4: Accessibility** (local + GitHub Pages)
   - [ ] Keyboard navigation works
   - [ ] Screen reader friendly
   - [ ] Color contrast passes
   - [ ] WCAG AA compliance

5. **Day 4: Security** (GitHub Pages)
   - [ ] Input validation works
   - [ ] No XSS vulnerabilities
   - [ ] HTTPS working
   - [ ] API keys not exposed

6. **Day 4-5: Payment** (GitHub Pages)
   - [ ] Test payment flow
   - [ ] Webhook fires
   - [ ] Email receipt sent
   - [ ] Database records donation

7. **Day 5: Email** (GitHub Pages)
   - [ ] Newsletter signup works
   - [ ] Confirmation email sent
   - [ ] Contact form works
   - [ ] Admin notification sent

8. **Day 5: Misc** (GitHub Pages)
   - [ ] SEO tags correct
   - [ ] Sitemap exists
   - [ ] Performance score >80
   - [ ] UX feels smooth

---

## **REPORTING ISSUES**

### **Issue Log Template**

Create a file: `TESTING_ISSUES.md`

```markdown
# Testing Issues Found

## Priority 1 (Critical - Fix Before Launch)
- [ ] Issue 1: [description]
  - Steps: [how to reproduce]
  - Expected: [what should happen]
  - Actual: [what happens]
  - Fix: [what needs to be fixed]

## Priority 2 (High - Fix Soon)
- [ ] Issue 2: [description]

## Priority 3 (Medium - Fix Later)
- [ ] Issue 3: [description]

## Fixed Issues
- [x] Issue resolved on [date]
```

---

## **PASSING CRITERIA**

**The website is ready for hosting when:**

✅ **Functionality:** All pages and forms work  
✅ **Performance:** Lighthouse scores >80 all metrics  
✅ **Compatibility:** Works on Chrome, Firefox, Safari, Edge, iOS, Android  
✅ **Accessibility:** Keyboard navigation and screen reader support  
✅ **Security:** No XSS, input validation, HTTPS ready  
✅ **Payments:** Full flow tested with real test card  
✅ **Email:** All email types tested and received  
✅ **Database:** Data correctly recorded  
✅ **SEO:** Meta tags and structure correct  
✅ **UX:** Smooth, intuitive, no loading delays  

**No critical (Priority 1) issues remain**

---

## **TIMELINE ESTIMATE**

```
Phase 1 (Functionality):    4-6 hours
Phase 2 (Performance):      3-4 hours
Phase 3 (Compatibility):    4-5 hours
Phase 4 (Accessibility):    3-4 hours
Phase 5 (Security):         2-3 hours
Phase 6 (Payment):          2-3 hours
Phase 7 (Email):            1-2 hours
Phase 8 (Database):         1-2 hours
Phase 9 (SEO):             1-2 hours
Phase 10 (UX):             2-3 hours
─────────────────────────
TOTAL:                     25-34 hours

Realistic timeline: 3-5 days of testing
(1-2 hours per day, part-time testing)
```

---

## **NOTES**

- **Can be done offline:** Most tests (Phases 1-5, 8)
- **Requires internet:** Payment testing, some email tests (Phase 6-7)
- **Tools cost:** $0 (all free)
- **Test environment:** Local dev + GitHub Pages
- **Can be parallelized:** Multiple testers can test different aspects
- **Regression testing:** Run full suite again after each major fix

---

**Document Status:** Ready to Execute  
**Last Updated:** April 21, 2026  
**Next Step:** Start Phase 1 (Functionality Testing)
