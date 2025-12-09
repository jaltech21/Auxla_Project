# OCSLAA MVP - Project Plan
**Version**: 1.0  
**Created**: December 1, 2025  
**Target Launch**: Q1 2026

---

## 🎯 Project Vision
Create a fully functional mental health support platform that breaks stigma, provides accessible resources, and connects people with help they need—available 24/7.

---

## 📋 MVP Scope

### Primary Navigation Pages
1. **Home** - Landing page with hero, featured services, crisis resources, and CTAs
2. **About Us** - Mission, vision, team, impact statistics, and story
3. **Our Services** - Searchable, filterable mental health resources and support finder
4. **Blog** - Educational content, mental health insights, and community stories
5. **Contact Us** - Inquiry forms, support requests, and FAQ
6. **Donation** - Secure payment processing for contributions

### Core Features (Must Have)
1. **Resource Library** - Comprehensive mental health resources (articles, videos, tools)
2. **Crisis Support** - Prominent quick access to helplines and emergency resources
3. **Blog System** - Educational content with categories, tags, and search
4. **Newsletter** - Email subscription with notifications
5. **Donation System** - One-time and recurring donation processing via Stripe
6. **Support Finder** - Find therapists, support groups, and services
7. **Contact System** - Multi-purpose forms and FAQ system

### Phase 2 Features (Nice to Have - Post-MVP)
- User accounts and authentication
- Community forum
- Virtual support groups
- Appointment scheduling
- Mental health self-assessment tools
- Mood tracking
- Peer support chat

---

## 🏗️ Architecture Overview

### Frontend Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State**: React Query + Context API
- **Forms**: React Hook Form + Zod
- **Payments**: Stripe

### Backend Requirements
- **API**: RESTful or GraphQL
- **Database**: PostgreSQL or MongoDB
- **Storage**: AWS S3 or Cloudinary (images)
- **Email**: SendGrid or Mailgun
- **Payments**: Stripe API
- **Hosting**: Vercel/Netlify (frontend), Railway/Render (backend)

### External Services
- Stripe (payments)
- SendGrid (emails)
- Google Maps API (location services)
- Analytics (Google Analytics or Plausible)

---

## 📝 Implementation Plan

### Phase 1: Foundation & Setup (Week 1)
**Goal**: Set up project structure, routing, and core infrastructure

#### Tasks:
1. **Project Structure Refactoring**
   - [ ] Create proper folder structure (features, services, types)
   - [ ] Set up environment variables
   - [ ] Configure absolute imports
   - [ ] Add error boundary components
   - [ ] Set up React Query configuration

2. **Routing System**
   - [ ] Convert to multi-page application
   - [ ] Create dedicated pages for each section
   - [ ] Implement proper navigation
   - [ ] Add 404 page
   - [ ] Set up page transitions

3. **Type Definitions**
   - [ ] Create TypeScript interfaces for all data models
   - [ ] Define API response types
   - [ ] Create form validation schemas

4. **Design System Refinement**
   - [ ] Audit and document all Tailwind tokens
   - [ ] Create component library documentation
   - [ ] Ensure consistent spacing and typography

**Deliverables**: 
- Restructured project with proper architecture
- Working routing system
- Complete type definitions
- Updated documentation

---

### Phase 2: Our Services Section (Week 2)
**Goal**: Build fully functional resource library with search and filtering

**Note**: This phase is **COMPLETED** ✅

#### Tasks:
1. **Data Layer**
   - [ ] Create resource data model/types
   - [ ] Set up mock API or connect to backend
   - [ ] Implement React Query hooks for fetching

2. **Resource Listing**
   - [ ] Build resource grid/list view
   - [ ] Add pagination or infinite scroll
   - [ ] Implement loading and error states
   - [ ] Add empty state designs

3. **Search & Filtering**
   - [ ] Create search component with debouncing
   - [ ] Implement multi-select category filters
   - [ ] Add sort options (relevance, date, popularity)
   - [ ] Show active filters with clear options

4. **Resource Detail Page**
   - [ ] Create detailed resource view
   - [ ] Add related resources section
   - [ ] Implement share functionality
   - [ ] Add "helpful" rating system

5. **Crisis Resources**
   - [ ] Create prominent crisis banner
   - [ ] Add quick-access crisis page
   - [ ] Implement click-to-call functionality
**Deliverables**: ✅ **COMPLETED**
- ✅ Searchable resource library (20 mock resources)
- ✅ Working filters and categories (9 categories, 7 types)
- ✅ Detailed resource pages with related resources
- ✅ Crisis support banner integration
- ✅ Pagination and debounced search
- ✅ Mark as helpful functionality
- ✅ Loading states and error handlingries
- Detailed resource pages
- Crisis support integration

---

### Phase 3: Blog System (Week 3)
**Goal**: Create content management system for articles and insights

#### Tasks:
1. **Blog Data Layer**
   - [ ] Define blog post data model
   - [ ] Create API integration for posts
   - [ ] Implement categories and tags
   - [ ] Add author profiles

2. **Blog Listing**
   - [ ] Build blog index page with cards
   - [ ] Add category filtering
   - [ ] Implement pagination
   - [ ] Create featured posts section

3. **Blog Post Page**
   - [ ] Create article detail layout
   - [ ] Add table of contents for long articles
   - [ ] Implement reading time estimate
   - [ ] Add social sharing buttons
   - [ ] Create related posts section

4. **Content Features**
   - [ ] Add comments system (optional for MVP)
   - [ ] Implement search within blog
   - [ ] Create author pages
   - [ ] Add RSS feed

**Deliverables**:
- Functional blog with categories
- Article detail pages
- Search functionality
- Author profiles

---

### Phase 4: Newsletter System (Week 4)
**Goal**: Build email subscription and management system

**Note**: This phase is **COMPLETED** ✅

#### Tasks:
1. **Newsletter Integration**
   - [x] Set up email service provider (SendGrid/Mailgun)
   - [x] Create API endpoint for subscriptions
   - [x] Implement email validation

2. **Subscription Form**
   - [x] Build newsletter signup component
   - [x] Add form validation with Zod
   - [x] Implement success/error states
   - [x] Create confirmation flow

3. **Preferences Page**
   - [x] Create subscription management page
   - [x] Add email preferences selection
   - [x] Implement unsubscribe functionality
   - [x] Show subscription status

4. **Admin Features (Optional)**
   - [ ] Create simple email template builder
   - [ ] Add subscriber list view
   - [ ] Implement send campaign functionality

**Deliverables**: ✅ **COMPLETED**
- ✅ Newsletter subscription with consent checkbox
- ✅ Email confirmation system (mock implementation with localStorage)
- ✅ Confirmation page (/newsletter/confirm)
- ✅ Unsubscribe page (/newsletter/unsubscribe)
- ✅ Preference management page (/newsletter/preferences)
- ✅ React Query hooks (useSubscribeNewsletter, useVerifyEmail, useUnsubscribe, useUpdatePreferences)
- ✅ TypeScript types and interfaces
- ✅ Loading states and error handling
- ✅ GDPR-compliant with consent tracking

---

### Phase 5: Donation System (Week 5)
**Goal**: Implement secure payment processing for donations

**Note**: This phase is **COMPLETED** ✅

#### Tasks:
1. **Stripe Integration**
   - [x] Set up Stripe account and keys
   - [x] Install and configure Stripe SDK
   - [x] Create payment intent API endpoints
   - [x] Implement webhook handlers (mock implementation)

2. **Donation Form**
   - [x] Build donation amount selection
   - [x] Add custom amount input
   - [x] Implement one-time vs recurring toggle
   - [x] Create donor information form

3. **Payment Flow**
   - [x] Integrate Stripe Elements
   - [x] Handle payment submission
   - [x] Show processing states
   - [x] Create success/failure pages

4. **Donation Features**
   - [x] Create donation history (localStorage for demo)
   - [x] Send donation receipt emails (mock)
   - [x] Show impact metrics
   - [x] Display donation stats and progress bar
   - [ ] Add donor wall (optional - post-MVP)

5. **Security & Compliance**
   - [x] Ensure PCI compliance (via Stripe)
   - [x] Implement proper error handling
   - [x] Add fraud prevention measures (Stripe built-in)
   - [ ] Create refund process (post-MVP)

**Deliverables**: ✅ **COMPLETED**
- ✅ Full donation page with Stripe integration (`/donate`)
- ✅ Secure payment processing with Stripe Elements
- ✅ One-time and monthly recurring donations
- ✅ Donation success page (`/donation/success`)
- ✅ Donor information collection (with anonymous option)
- ✅ Custom amount input + preset amounts ($25, $50, $100, $250)
- ✅ "Cover processing fees" option
- ✅ Dedication/memorial donation option
- ✅ Impact metrics display
- ✅ Real-time donation stats (total raised, donors, progress to goal)
- ✅ React Query hooks (useCreatePaymentIntent, useConfirmDonation, useDonationStats)
- ✅ TypeScript types and interfaces
- ✅ Loading states and error handling
- ✅ Mock API with localStorage persistence
- ✅ Email receipt system (mock implementation)
### Phase 6: Home & About Pages (Week 6)
**Goal**: Create compelling home page and comprehensive about section

#### Tasks:
1. **Home Page Enhancement**
   - [ ] Design hero section with CTA
   - [ ] Add featured services/resources section
   - [ ] Create statistics/impact section
   - [ ] Add testimonials/success stories
   - [ ] Implement newsletter signup
   - [ ] Add recent blog posts preview
   - [ ] Create prominent crisis support section

2. **About Us Page**
   - [ ] Write mission and vision statements
   - [ ] Create organization story/timeline
   - [ ] Add impact statistics dashboard
   - [ ] Build core values section
   - [ ] Create "Why Choose Us" section

3. **Team Section**
   - [ ] Design team member card component
   - [ ] Add leadership team profiles
   - [ ] Create board of advisors section
   - [ ] Implement team member detail pages
   - [ ] Add social media links

4. **Additional About Sections**
   - [ ] Create "Our Approach" section
   - [ ] Add partner/sponsor logos
   - [ ] Build awards and recognition section
   - [ ] Create annual report downloads
   - [ ] Add transparency/financials page

**Deliverables**:
- Engaging home page with clear CTAs
### Phase 7: Contact Us Page (Week 7)
**Goal**: Enable users to reach out for support and inquiries
- Partner showcaserectory
- Location-based filtering
- Provider detail pages
- Support group listings

---

### Phase 7: Contact & Communication (Week 7)
**Goal**: Enable users to reach out for support and inquiries

#### Tasks:
1. **Contact Form**
   - [ ] Create general contact form
   - [ ] Add form validation
   - [ ] Implement spam protection (reCAPTCHA)
   - [ ] Send confirmation emails

2. **Inquiry Types**
   - [ ] Create specific forms (volunteer, partnerships, media)
   - [ ] Implement routing to appropriate teams
   - [ ] Add file upload for applications
   - [ ] Create status tracking

3. **FAQ System**
   - [ ] Make FAQ searchable
   - [ ] Add helpful/not helpful voting
   - [ ] Implement FAQ categories
   - [ ] Create "Ask a Question" flow

4. **Live Chat (Optional)**
   - [ ] Integrate chat widget
   - [ ] Set up automated responses
   - [ ] Create chat-to-email fallback
   - [ ] Add business hours indicator
### Phase 8: Support Finder Enhancement (Week 8)
**Goal**: Enhance support finder with provider directory and location services

#### Tasks:
1. **Provider Directory**
   - [ ] Create provider data model
   - [ ] Build provider listing page
   - [ ] Add specialty filtering
   - [ ] Implement insurance search

2. **Location Services**
   - [ ] Add location-based search
   - [ ] Implement map view (optional)
   - [ ] Add distance sorting
   - [ ] Create "Near Me" functionality

3. **Provider Profiles**
   - [ ] Design provider detail pages
   - [ ] Show credentials and specialties
   - [ ] Add contact information
   - [ ] Implement "Request Appointment" flow

4. **Support Groups**
   - [ ] List local support groups
   - [ ] Add virtual meeting options
   - [ ] Create support group detail pages
   - [ ] Add schedule information

**Deliverables**:
- Provider directory with search
- Location-based filtering
- Provider detail pages
- Support group listingsports section
   - [ ] Create financial transparency page
   - [ ] Show impact metrics dashboard
   - [ ] Add downloadable resources

**Deliverables**:
- Complete about section
- Team profiles
- Partnership pages
- Transparency reports

---

### Phase 9: Testing & Optimization (Week 9)
**Goal**: Ensure quality, performance, and accessibility

#### Tasks:
1. **Testing**
   - [ ] Write unit tests for utilities
   - [ ] Create component tests
   - [ ] Implement integration tests
   - [ ] Perform E2E testing (Playwright/Cypress)

2. **Accessibility Audit**
   - [ ] Run automated accessibility checks (axe)
   - [ ] Manual keyboard navigation testing
   - [ ] Screen reader testing
   - [ ] Color contrast verification

3. **Performance Optimization**
   - [ ] Run Lighthouse audits
   - [ ] Optimize images (WebP, lazy loading)
   - [ ] Implement code splitting
   - [ ] Minimize bundle size
   - [ ] Add caching strategies

4. **SEO Optimization**
   - [ ] Add meta tags to all pages
   - [ ] Create sitemap.xml
   - [ ] Implement structured data
   - [ ] Optimize Open Graph tags
   - [ ] Add robots.txt

5. **Cross-Browser Testing**
   - [ ] Test on Chrome, Firefox, Safari, Edge
   - [ ] Mobile browser testing
   - [ ] Fix browser-specific issues

**Deliverables**:
- Test coverage reports
- Accessibility compliance
- Performance score 90+
- Cross-browser compatibility

---

### Phase 10: Launch Preparation (Week 10)
**Goal**: Deploy to production and prepare for launch

#### Tasks:
1. **Production Setup**
   - [ ] Configure production environment
   - [ ] Set up CI/CD pipeline
   - [ ] Configure domain and SSL
   - [ ] Set up monitoring (Sentry, LogRocket)

2. **Content Population**
   - [ ] Add real resources (minimum 50)
   - [ ] Publish initial blog posts (minimum 10)
   - [ ] Complete all about pages
   - [ ] Add team member profiles

3. **Analytics & Tracking**
   - [ ] Set up Google Analytics / Plausible
   - [ ] Implement event tracking
   - [ ] Create conversion funnels
   - [ ] Set up error tracking

4. **Launch Checklist**
   - [ ] Final security audit
   - [ ] Backup strategy in place
   - [ ] Support team trained
   - [ ] Marketing materials ready
   - [ ] Press kit prepared

5. **Soft Launch**
   - [ ] Beta testing with select users
   - [ ] Gather feedback
   - [ ] Fix critical issues
   - [ ] Prepare for public launch

**Deliverables**:
- Production deployment
- Monitoring and analytics
- Content library populated
- Launch-ready website

---

## 📊 Success Metrics

### Technical Metrics
- **Performance**: Lighthouse score 90+ (all categories)
- **Accessibility**: WCAG 2.1 AA compliance
- **Uptime**: 99.9% availability
- **Load Time**: < 3 seconds on 3G
- **Bundle Size**: < 500kb initial load

### User Metrics
- **Traffic**: 10K monthly visitors by month 3
- **Engagement**: 3+ pages per session
- **Newsletter**: 1K subscribers by month 3
- **Donations**: $10K raised in first quarter
- **Resources**: 100+ resources accessed daily

### Business Metrics
- **Conversion**: 2% newsletter signup rate
- **Donations**: 1% visitor-to-donor conversion
- **Retention**: 40% return visitor rate
- **Satisfaction**: 4.5+ user rating

---

## 🎨 Design Considerations

### Accessibility First
- High contrast text
- Large, clear CTAs
- Simple navigation
- Screen reader friendly
- Keyboard navigation
- No flashing elements

### Mental Health UX
- Calming color palette
- Clear, supportive language
- Easy access to crisis help
- Minimal cognitive load
- Progress indicators
- Reassuring micro-interactions

### Mobile Optimization
- Touch-friendly buttons (min 44px)
- Readable text (16px minimum)
- Simplified navigation
- Fast loading
- Offline capabilities (service worker)

---

## 🚨 Risk Management

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Third-party API downtime | High | Implement fallbacks and caching |
| Payment processing issues | High | Thorough Stripe testing, error handling |
| Performance degradation | Medium | Regular performance monitoring |
| Security vulnerabilities | High | Security audits, dependency updates |

### Content Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Inaccurate mental health info | High | Professional review process |
| Triggering content | High | Content warnings, professional oversight |
| Outdated crisis resources | High | Quarterly review and updates |

---

## 📦 Deliverables Summary

### Week 1-2: Foundation ✅ **COMPLETED**
- ✅ Project restructure
- ✅ Routing system
- ✅ Our Services page (Resource library)

### Week 3-4: Content
- Blog system
- Newsletter integration

### Week 5: Transactions
- Donation system

### Week 6: Core Pages
- Home page
- About Us page

### Week 7: Communication
- Contact Us page
- FAQ system

### Week 8: Enhanced Services
- Support finder enhancements
- Provider directory

### Week 9-10: Launch
- Testing and optimization
- Production deployment

---

## 🔄 Post-MVP Roadmap

### Quarter 2
- User authentication
- Personal profiles
- Saved resources
- Community forum

### Quarter 3
- Mental health assessments
- Mood tracking
- Appointment scheduling
- Virtual support groups

### Quarter 4
- Mobile app (React Native)
- AI chatbot support
- Telehealth integration
- Advanced analytics

---

## 👥 Team & Roles

### Required Roles
- **Frontend Developer** (Primary)
- **Backend Developer**
- **UX/UI Designer**
- **Mental Health Consultant**
- **Content Writer**
- **QA Tester**
- **DevOps Engineer**

---

## 📚 Documentation

### Required Documentation
1. Technical specification document
2. API documentation
3. Component library documentation
4. User guide
5. Admin guide
6. Deployment guide
7. Maintenance guide

---

## ✅ Definition of Done

A feature is complete when:
- [ ] Code is written and reviewed
- [ ] Unit tests pass (80%+ coverage)
- [ ] Integration tests pass
- [ ] Accessibility requirements met
- [ ] Responsive on all devices
- [ ] Documentation updated
- [ ] QA testing passed
- [ ] Product owner approved

---

## 📞 Support & Maintenance

### Ongoing Tasks
- Weekly dependency updates
- Monthly security audits
- Quarterly content review
- Continuous performance monitoring
- Regular backup verification
- User feedback collection

---

## 🎯 Phase 11: Admin Panel & Content Management System (Weeks 11-14)
**Goal**: Build comprehensive admin panel for authors to create and manage blog posts without code

**Status**: Planned (Post-MVP Enhancement)

### Overview
Create a full-featured admin dashboard with rich text editing, media management, and role-based access control to enable non-technical authors to publish content independently.

### Architecture Decisions

#### Backend Solution: **Supabase** (Recommended)
**Why Supabase:**
- PostgreSQL database with real-time capabilities
- Built-in authentication and authorization
- Row Level Security (RLS) for data protection
- File storage with CDN
- Generous free tier (500MB database, 1GB file storage, 50K monthly active users)
- No separate backend deployment needed
- RESTful and GraphQL APIs auto-generated

#### Rich Text Editor: **TipTap**
**Why TipTap:**
- Modern, extensible, framework-agnostic
- Built on ProseMirror (used by Notion, Confluence)
- Excellent TypeScript support
- Drag-and-drop functionality
- Collaborative editing support
- Active development and community

#### Image Management: **Supabase Storage + Cloudinary**
- **Supabase Storage**: Primary storage for uploaded images
- **Cloudinary** (optional): Image optimization, transformations, CDN

---

### Week 11: Foundation & Authentication

#### Tasks:

**1. Supabase Setup**
- [ ] Create Supabase project
- [ ] Set up database schema:
  - `blog_posts` table (id, title, slug, content, excerpt, cover_image, author_id, category_id, status, featured, published_at, created_at, updated_at, view_count, like_count)
  - `authors` table (id, user_id, name, title, bio, avatar_url, credentials, social_links, created_at)
  - `categories` table (id, name, slug, description, color, created_at)
  - `tags` table (id, name, slug, created_at)
  - `post_tags` junction table (post_id, tag_id)
  - `media` table (id, filename, url, alt_text, size, type, uploaded_by, created_at)
- [ ] Configure Row Level Security (RLS) policies
- [ ] Set up storage buckets for images
- [ ] Generate TypeScript types from database

**2. Authentication System**
- [ ] Install Supabase Auth (@supabase/auth-helpers-react)
- [ ] Create auth context and hooks
- [ ] Build login page (`/admin/login`)
  - Email/password authentication
  - "Remember me" functionality
  - Password reset flow
  - Social login (Google, optional)
- [ ] Implement protected route wrapper
- [ ] Add session management
- [ ] Create user roles (Admin, Editor, Author)

**3. Admin Layout**
- [ ] Create admin shell layout:
  - Sidebar navigation
  - Top bar with user menu
  - Breadcrumbs
  - Page transitions
- [ ] Build admin routes structure:
  - `/admin` - Dashboard
  - `/admin/posts` - Post list
  - `/admin/posts/new` - Create post
  - `/admin/posts/edit/:id` - Edit post
  - `/admin/media` - Media library
  - `/admin/categories` - Categories
  - `/admin/tags` - Tags
  - `/admin/authors` - Authors
  - `/admin/settings` - Settings
- [ ] Implement role-based navigation visibility
- [ ] Add logout functionality

**4. Dashboard Overview**
- [ ] Create dashboard page with:
  - Welcome message with current user
  - Statistics cards (total posts, published, drafts, views)
  - Recent posts table
  - Quick actions (New Post, View Site)
  - Activity feed (recent edits, published posts)
  - Analytics charts (views over time, top posts)

**Deliverables**:
- Supabase project configured with complete schema
- Authentication system with login/logout
- Admin layout with navigation
- Dashboard with statistics

---

### Week 12: Post Management & Rich Text Editor

#### Tasks:

**1. TipTap Editor Integration**
- [ ] Install TipTap packages:
  - `@tiptap/react`
  - `@tiptap/starter-kit`
  - `@tiptap/extension-image`
  - `@tiptap/extension-link`
  - `@tiptap/extension-table`
  - `@tiptap/extension-task-list`
  - `@tiptap/extension-code-block-lowlight`
  - `@tiptap/extension-placeholder`
- [ ] Create rich text editor component with toolbar:
  - Formatting (bold, italic, underline, strikethrough)
  - Headings (H1-H6)
  - Lists (bullet, numbered, task list)
  - Blockquotes and code blocks
  - Tables
  - Links with preview
  - Images with upload
  - Horizontal rules
  - Text alignment
  - Undo/redo
- [ ] Add character/word count
- [ ] Implement autosave (every 30 seconds)
- [ ] Add keyboard shortcuts guide

**2. Post Editor Page**
- [ ] Create post editor layout:
  - Title input (auto-generates slug)
  - Slug field (editable)
  - TipTap content editor
  - Sidebar with:
    - Publish controls (save draft, publish, unpublish)
    - Status indicator
    - Publish date picker
    - Featured toggle
    - Visibility settings
- [ ] Add excerpt textarea (auto-generated from content, editable)
- [ ] Create cover image uploader:
  - Drag-and-drop area
  - Image preview
  - Crop/resize tool
  - Alt text input
- [ ] Build category selector (single select dropdown)
- [ ] Build tag selector (multi-select with create-new)
- [ ] Add author selector (for admins)
- [ ] Implement SEO fields:
  - Meta title (auto-filled from title)
  - Meta description (auto-filled from excerpt)
  - Focus keyword
  - Social media preview
- [ ] Create preview mode (toggle between edit/preview)
- [ ] Add revision history (using Supabase)

**3. Post List Page**
- [ ] Build posts table with columns:
  - Cover image thumbnail
  - Title
  - Author
  - Category
  - Status (draft/published)
  - Views
  - Likes
  - Last modified
  - Actions (edit, duplicate, delete)
- [ ] Add filters:
  - Status (all, published, draft)
  - Category
  - Author
  - Date range
- [ ] Implement search (title, content)
- [ ] Add sorting (date, title, views, likes)
- [ ] Create bulk actions:
  - Publish/unpublish
  - Change category
  - Delete
- [ ] Add pagination
- [ ] Show empty state for no posts

**4. Post API Integration**
- [ ] Create Supabase service functions:
  - `createPost()`
  - `updatePost(id)`
  - `deletePost(id)`
  - `getPost(id)`
  - `getPosts(filters, pagination)`
  - `duplicatePost(id)`
  - `publishPost(id)`
  - `unpublishPost(id)`
- [ ] Create React Query hooks:
  - `usePost(id)`
  - `usePosts(filters)`
  - `useCreatePost()`
  - `useUpdatePost()`
  - `useDeletePost()`
- [ ] Implement optimistic updates
- [ ] Add error handling and toast notifications

**Deliverables**:
- Fully functional rich text editor with TipTap
- Complete post creation/editing interface
- Post listing with search, filters, and bulk actions
- Supabase integration for CRUD operations

---

### Week 13: Media Library & Additional Features

#### Tasks:

**1. Media Library**
- [ ] Create media library page (`/admin/media`)
- [ ] Build image grid view:
  - Thumbnail grid
  - Image details on hover
  - Select mode for choosing images
  - Preview modal
- [ ] Implement upload functionality:
  - Drag-and-drop multi-file upload
  - Progress indicators
  - Upload to Supabase Storage
  - Automatic thumbnail generation
- [ ] Add image metadata editing:
  - Filename
  - Alt text
  - Caption
  - Dimensions
  - File size
- [ ] Create search and filters:
  - Search by filename/alt text
  - Filter by type (image, document)
  - Filter by date
  - Filter by uploader
- [ ] Add bulk actions:
  - Delete selected
  - Download selected
  - Set alt text
- [ ] Implement image optimization:
  - Resize on upload
  - WebP conversion
  - Quality adjustment
- [ ] Create image picker component (used in post editor)

**2. Category Management**
- [ ] Build categories list page:
  - Table with name, slug, description, post count
  - Color picker for each category
  - Edit/delete actions
- [ ] Create category form:
  - Name input (auto-generates slug)
  - Slug field
  - Description textarea
  - Color picker
  - Icon selector (optional)
- [ ] Add validation (no duplicate slugs)
- [ ] Implement drag-and-drop reordering
- [ ] Show "in use" warning before delete

**3. Tag Management**
- [ ] Build tags list page:
  - Table with name, slug, usage count
  - Quick edit inline
  - Merge tags functionality
- [ ] Create tag form (name, slug)
- [ ] Add bulk delete (unused tags)
- [ ] Implement tag suggestions (when creating posts)

**4. Author Management**
- [ ] Build authors list page:
  - Cards with avatar, name, title
  - Post count per author
  - Active/inactive status
- [ ] Create author profile form:
  - Personal info (name, title, bio)
  - Avatar upload
  - Credentials (multi-input)
  - Social links (Twitter, LinkedIn, email)
  - Role assignment (admin only)
- [ ] Add author detail page showing their posts
- [ ] Implement author permissions:
  - Authors can only edit their own posts
  - Editors can edit any post
  - Admins have full access

**5. Analytics & Insights**
- [ ] Create analytics dashboard:
  - Total views/likes over time (chart)
  - Top performing posts
  - Most popular categories
  - Traffic sources (if GA integrated)
  - Engagement metrics
- [ ] Add per-post analytics:
  - View count graph
  - Like count graph
  - Average reading time
  - Bounce rate
- [ ] Implement export functionality (CSV)

**Deliverables**:
- Complete media library with upload and management
- Category and tag management interfaces
- Author management system
- Analytics dashboard
- Role-based permissions enforced

---

### Week 14: Polish, Testing & Documentation

#### Tasks:

**1. UI/UX Polish**
- [ ] Implement loading states for all operations
- [ ] Add skeleton loaders
- [ ] Create error boundaries
- [ ] Add confirmation dialogs (delete, discard changes)
- [ ] Implement toast notifications (success, error, info)
- [ ] Add keyboard shortcuts:
  - `Ctrl+S` - Save draft
  - `Ctrl+P` - Publish
  - `Ctrl+E` - Toggle edit/preview
  - `Ctrl+K` - Insert link
- [ ] Create onboarding tour (first-time users)
- [ ] Add contextual help tooltips

**2. Advanced Features**
- [ ] Implement post scheduling:
  - Calendar picker for publish date/time
  - Draft scheduled posts
  - Auto-publish on schedule
  - Timezone support
- [ ] Add post templates:
  - Save post as template
  - Create from template
  - Template library
- [ ] Create post duplication
- [ ] Implement bulk import (CSV/JSON)
- [ ] Add markdown import support
- [ ] Create post version history:
  - Save versions on each edit
  - Compare versions
  - Restore previous version

**3. Settings Page**
- [ ] Build settings interface:
  - General settings (site name, tagline)
  - Blog settings (posts per page, excerpt length)
  - User profile settings
  - Notification preferences
  - API keys management
- [ ] Add appearance settings:
  - Admin theme (light/dark)
  - Editor font/size preferences
- [ ] Create backup/restore functionality

**4. Testing**
- [ ] Write unit tests for:
  - Editor components
  - Service functions
  - Utility functions
- [ ] Create integration tests:
  - Post creation flow
  - Image upload flow
  - Authentication flow
- [ ] Perform E2E testing:
  - Complete post publishing workflow
  - Multi-user scenarios
  - Role-based access control
- [ ] Test across browsers (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit (WCAG 2.1 AA)

**5. Security Hardening**
- [ ] Implement rate limiting (Supabase)
- [ ] Add CSRF protection
- [ ] Sanitize user input (prevent XSS)
- [ ] Validate file uploads (type, size)
- [ ] Add content security policy
- [ ] Implement audit logging (who changed what, when)
- [ ] Set up automated backups

**6. Documentation**
- [ ] Create admin user guide:
  - Getting started
  - Creating your first post
  - Using the editor
  - Managing media
  - SEO best practices
  - Publishing workflow
- [ ] Write technical documentation:
  - Architecture overview
  - Database schema
  - API reference
  - Deployment guide
- [ ] Create video tutorials:
  - Admin dashboard walkthrough
  - Creating a blog post
  - Using the media library
- [ ] Add inline help and tooltips

**7. Migration & Deployment**
- [ ] Create data migration script:
  - Import existing mock posts to Supabase
  - Preserve post metadata
  - Handle author assignments
  - Migrate categories and tags
- [ ] Set up staging environment
- [ ] Configure production environment variables
- [ ] Deploy admin panel to production
- [ ] Set up monitoring (Sentry for errors)
- [ ] Create deployment checklist

**Deliverables**:
- Polished, production-ready admin panel
- Comprehensive test coverage
- Complete documentation (user + technical)
- Data migration from mock posts
- Deployed and accessible admin interface

---

### Technical Stack Summary

#### Frontend
- **Framework**: React 18 + TypeScript
- **Editor**: TipTap (ProseMirror-based)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **State**: React Query + Zustand (for editor state)
- **Routing**: React Router v6

#### Backend
- **BaaS**: Supabase
- **Database**: PostgreSQL
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Real-time**: Supabase Realtime

#### Additional Services
- **Images**: Cloudinary (optional, for optimization)
- **Monitoring**: Sentry
- **Analytics**: Built-in + Google Analytics

---

### Database Schema

```sql
-- Authors table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar_url TEXT,
  credentials TEXT[],
  social_links JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL, -- TipTap JSON format
  cover_image TEXT,
  author_id UUID REFERENCES authors(id),
  category_id UUID REFERENCES categories(id),
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT
);

-- Post tags junction table
CREATE TABLE post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Media library table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  size INTEGER,
  type TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Authors can only edit their own posts
CREATE POLICY "Authors can edit own posts"
  ON blog_posts FOR ALL
  USING (author_id IN (
    SELECT id FROM authors WHERE user_id = auth.uid()
  ));

-- Editors and admins can edit all posts
CREATE POLICY "Editors can edit all posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM authors 
      WHERE user_id = auth.uid() 
      AND role IN ('editor', 'admin')
    )
  );
```

---

### User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: manage all posts, authors, categories, tags, settings, users |
| **Editor** | Edit any post, publish/unpublish, manage categories/tags, view analytics |
| **Author** | Create/edit own posts, save drafts, submit for review, upload media |

---

### Success Metrics

#### Technical
- [ ] Editor loads in < 2 seconds
- [ ] Auto-save works reliably
- [ ] Image uploads < 5 seconds
- [ ] Zero data loss incidents
- [ ] 99.9% uptime

#### User Experience
- [ ] Authors can publish a post in < 10 minutes
- [ ] 80% of authors don't need support
- [ ] Zero critical bugs in first month
- [ ] 4.5+ satisfaction rating

#### Business
- [ ] 3+ authors actively publishing
- [ ] 10+ posts published in first month
- [ ] Reduced content bottleneck by 80%
- [ ] Authors publish independently

---

### Budget Estimate

#### Development Costs
- **Solo Developer**: 4 weeks × 40 hours = 160 hours
- **Small Team** (2 developers): 3 weeks × 80 hours = 240 hours

#### Ongoing Costs (Monthly)
- **Supabase**: $0 (Free tier) or $25/month (Pro)
- **Cloudinary**: $0 (Free tier) or $99/month (Plus)
- **Domain + Hosting**: Included in main site
- **Monitoring (Sentry)**: $0 (Free tier) or $26/month

**Total Monthly**: $0-$150 depending on usage

---

### Migration Plan

#### From Mock Data to Supabase

**Step 1: Export Mock Data**
```typescript
// scripts/export-mock-data.ts
import { mockBlogPosts, mockAuthors } from '@/data/mockBlogPosts';
import fs from 'fs';

const exportData = {
  posts: mockBlogPosts,
  authors: mockAuthors,
  categories: [...unique categories],
  tags: [...unique tags]
};

fs.writeFileSync('migration-data.json', JSON.stringify(exportData, null, 2));
```

**Step 2: Import to Supabase**
```typescript
// scripts/import-to-supabase.ts
import { createClient } from '@supabase/supabase-js';
import migrationData from './migration-data.json';

async function migrate() {
  // 1. Insert authors
  const { data: authors } = await supabase
    .from('authors')
    .insert(migrationData.authors);
  
  // 2. Insert categories
  const { data: categories } = await supabase
    .from('categories')
    .insert(migrationData.categories);
  
  // 3. Insert tags
  const { data: tags } = await supabase
    .from('tags')
    .insert(migrationData.tags);
  
  // 4. Insert posts (convert content to TipTap JSON)
  for (const post of migrationData.posts) {
    const tiptapContent = convertToTipTap(post.content);
    await supabase.from('blog_posts').insert({
      ...post,
      content: tiptapContent
    });
  }
}
```

**Step 3: Update Frontend**
- [ ] Replace mock data imports with Supabase queries
- [ ] Update service layer to use Supabase client
- [ ] Test all blog functionality
- [ ] Deploy to production

---

### Risk Management

| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase downtime | High | Implement caching, fallback to read-only mode |
| Data loss | Critical | Automated daily backups, version history |
| Unauthorized access | High | RLS policies, audit logging, 2FA |
| Editor bugs | Medium | Comprehensive testing, autosave, undo/redo |
| Poor adoption | Medium | User training, clear documentation, support |
| Performance issues | Medium | Lazy loading, pagination, CDN for images |

---

### Future Enhancements (Post-Phase 11)

#### Quarter 1 Post-Launch
- [ ] Collaborative editing (multiple authors)
- [ ] Content approval workflow
- [ ] Email notifications (new comments, post published)
- [ ] Advanced SEO tools (readability score, keyword density)
- [ ] A/B testing for headlines

#### Quarter 2
- [ ] Mobile admin app (React Native)
- [ ] AI writing assistant (GPT integration)
- [ ] Auto-generate meta descriptions
- [ ] Content suggestions based on trends
- [ ] Grammar and style checker

#### Quarter 3
- [ ] Multi-language support
- [ ] Advanced analytics (heat maps, scroll depth)
- [ ] Newsletter integration (send posts via email)
- [ ] Social media auto-posting
- [ ] Content calendar view

---

### Training Materials

#### Quick Start Guide
1. **Log in** to the admin panel at `/admin/login`
2. **Navigate** to "Posts" > "New Post"
3. **Write** your title (slug auto-generates)
4. **Create** content using the rich text editor
5. **Add** a cover image from media library
6. **Select** category and tags
7. **Preview** your post
8. **Publish** or save as draft

#### Video Tutorials (To Create)
- [ ] Admin panel overview (5 minutes)
- [ ] Writing your first post (10 minutes)
- [ ] Using the rich text editor (8 minutes)
- [ ] Media library management (6 minutes)
- [ ] SEO best practices (12 minutes)
- [ ] Publishing workflow (7 minutes)

---

## 🎓 Admin Panel Learning Resources

### Recommended Tools
- **TipTap Documentation**: https://tiptap.dev
- **Supabase Docs**: https://supabase.com/docs
- **React Query**: https://tanstack.com/query
- **Zod Validation**: https://zod.dev

### Example Implementations
- **Hashnode Editor**: Open-source rich text editor
- **Ghost CMS**: Modern blogging platform
- **WordPress Gutenberg**: Block-based editor

---

**This admin panel will empower authors to create compelling mental health content independently, accelerating OCSLAA's mission to break stigma and provide accessible support.**

---

## Phase 12: Backend API Setup & Integration
**Priority**: Critical for Production  
**Timeline**: 2-3 weeks  
**Status**: Planned

### Overview
Build a production-ready backend API to support payment processing, email automation, data persistence, and secure authentication. This phase transforms the frontend from mock data to a fully functional application.

### Technology Stack

#### Core Framework
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js 4.x for REST API
- **Database**: PostgreSQL 15+ (Supabase or Railway)
- **ORM**: Prisma 5.x for type-safe database access
- **Validation**: Zod for request validation
- **Testing**: Jest + Supertest for API testing

#### Third-Party Services
- **Payments**: Stripe API (payment intents, webhooks, refunds)
- **Email**: SendGrid API (transactional emails, templates)
- **File Storage**: Cloudinary or AWS S3 (for user uploads)
- **Authentication**: JWT tokens with bcryptjs for password hashing

---

### 1. Project Setup & Configuration

#### Deliverables
- [ ] Initialize Node.js project with TypeScript
- [ ] Configure Express server with middleware
- [ ] Set up Prisma with PostgreSQL connection
- [ ] Create environment variable management (.env, validation)
- [ ] Set up ESLint and Prettier for backend code
- [ ] Configure CORS for frontend integration
- [ ] Set up logging (Winston or Pino)
- [ ] Create API error handling middleware

#### File Structure
```
auxla-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── stripe.ts
│   │   ├── sendgrid.ts
│   │   └── env.ts
│   ├── routes/
│   │   ├── donations.ts
│   │   ├── newsletter.ts
│   │   ├── auth.ts
│   │   └── health.ts
│   ├── controllers/
│   │   ├── donationController.ts
│   │   ├── newsletterController.ts
│   │   └── authController.ts
│   ├── services/
│   │   ├── stripeService.ts
│   │   ├── emailService.ts
│   │   └── tokenService.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   └── rateLimit.ts
│   ├── models/
│   │   └── (Prisma generated)
│   ├── utils/
│   │   ├── logger.ts
│   │   └── helpers.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── integration/
│   └── unit/
├── .env.example
├── package.json
└── tsconfig.json
```

#### Environment Variables
```env
# Server
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.auxla.org
FRONTEND_URL=https://auxla.org

# Database
DATABASE_URL=postgresql://user:password@host:5432/auxla

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@auxla.org
SENDGRID_FROM_NAME=AUXLA Team

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Admin
ADMIN_EMAIL=admin@auxla.org
```

---

### 2. Database Schema Design

#### Prisma Schema
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Donation {
  id                String   @id @default(uuid())
  amount            Float
  donationType      String   // 'one-time' | 'monthly'
  firstName         String
  lastName          String
  email             String
  phone             String?
  isAnonymous       Boolean  @default(false)
  coverFees         Boolean  @default(false)
  dedication        String?
  message           String?
  
  // Payment details
  stripePaymentIntentId String  @unique
  stripeCustomerId      String?
  paymentStatus         String  @default("pending") // 'pending' | 'succeeded' | 'failed' | 'refunded'
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([email])
  @@index([createdAt])
}

model Subscriber {
  id                String   @id @default(uuid())
  email             String   @unique
  status            String   @default("pending") // 'pending' | 'active' | 'unsubscribed' | 'bounced'
  
  // Preferences
  frequency         String   @default("weekly") // 'daily' | 'weekly' | 'monthly'
  topics            String[] @default([]) // JSON array of interested topics
  
  // Verification
  verificationToken String?  @unique
  verifiedAt        DateTime?
  
  // Unsubscribe
  unsubscribedAt    DateTime?
  unsubscribeReason String?
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([email])
  @@index([status])
}

model Admin {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  name          String
  role          String   @default("editor") // 'admin' | 'editor' | 'viewer'
  
  // Metadata
  lastLoginAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@index([email])
}

// Optional: Analytics tracking
model PageView {
  id        String   @id @default(uuid())
  page      String
  userAgent String?
  ipAddress String?
  createdAt DateTime @default(now())
  
  @@index([page])
  @@index([createdAt])
}
```

#### Deliverables
- [ ] Define Prisma schema with all models
- [ ] Create initial migration
- [ ] Set up database seeding scripts
- [ ] Document database relationships
- [ ] Create database backup strategy

---

### 3. Stripe Payment Integration

#### API Endpoints
```typescript
// POST /api/donations/payment-intent
// Create payment intent with Stripe
interface CreatePaymentIntentRequest {
  amount: number;
  donationType: 'one-time' | 'monthly';
  coverFees: boolean;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

// POST /api/donations/confirm
// Confirm donation after successful payment
interface ConfirmDonationRequest {
  paymentIntentId: string;
  donation: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    isAnonymous: boolean;
    dedication?: string;
    message?: string;
  };
}

// POST /api/webhooks/stripe
// Handle Stripe webhook events
// Events: payment_intent.succeeded, payment_intent.failed, charge.refunded
```

#### Implementation Tasks
- [ ] Create Stripe service module
- [ ] Implement createPaymentIntent controller
  - Calculate fees if coverFees is true
  - Create Stripe customer for recurring donations
  - Set metadata for tracking
- [ ] Implement confirmDonation controller
  - Verify payment status with Stripe
  - Save donation to database
  - Send receipt email via SendGrid
- [ ] Set up Stripe webhook endpoint
  - Verify webhook signatures
  - Handle payment_intent.succeeded
  - Handle payment_intent.failed
  - Handle charge.refunded
  - Update database accordingly
- [ ] Implement refund functionality (admin only)
- [ ] Add recurring donation setup with Stripe Subscriptions
- [ ] Create donation receipt PDF generation
- [ ] Implement donation analytics queries

#### Security Considerations
- Never expose Stripe secret key to frontend
- Verify webhook signatures to prevent spoofing
- Validate amounts server-side to prevent manipulation
- Rate limit payment endpoints (max 5 attempts per minute)
- Log all payment transactions for audit trail

---

### 4. SendGrid Email Integration

#### Email Templates
1. **Newsletter Confirmation** (Double Opt-in)
   - Subject: "Confirm your AUXLA newsletter subscription"
   - Content: Welcome message, confirmation link, unsubscribe link
   
2. **Newsletter Welcome** (After verification)
   - Subject: "Welcome to the AUXLA community!"
   - Content: What to expect, preferences link, support resources
   
3. **Donation Receipt**
   - Subject: "Thank you for your donation to AUXLA"
   - Content: Donation details, tax receipt, impact statement
   
4. **Monthly Newsletter**
   - Subject: Varies based on content
   - Content: Latest blog posts, resources, events
   
5. **Subscription Preferences Updated**
   - Subject: "Your AUXLA subscription preferences updated"
   - Content: Confirmation of changes
   
6. **Unsubscribe Confirmation**
   - Subject: "You've been unsubscribed from AUXLA"
   - Content: Confirmation, re-subscribe option, feedback request

#### API Endpoints
```typescript
// POST /api/newsletter/subscribe
interface SubscribeRequest {
  email: string;
  consent: boolean;
}

// GET /api/newsletter/verify/:token
// Verify email subscription

// POST /api/newsletter/unsubscribe
interface UnsubscribeRequest {
  email: string;
  reason?: string;
}

// PUT /api/newsletter/preferences
interface UpdatePreferencesRequest {
  email: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  topics: string[];
}

// GET /api/newsletter/subscriber/:email
// Get subscriber details (for preferences page)
```

#### Implementation Tasks
- [ ] Create SendGrid service module
- [ ] Design email templates in SendGrid dashboard
- [ ] Implement subscribe endpoint
  - Generate verification token (UUID)
  - Save subscriber with 'pending' status
  - Send confirmation email
- [ ] Implement verify endpoint
  - Validate token
  - Update subscriber status to 'active'
  - Send welcome email
- [ ] Implement unsubscribe endpoint
  - Update subscriber status
  - Send confirmation email
  - Store unsubscribe reason for analytics
- [ ] Implement preferences update endpoint
  - Update subscriber preferences
  - Send confirmation email
- [ ] Create batch newsletter sending script
  - Query active subscribers with preferred frequency
  - Personalize content based on topics
  - Track email opens and clicks (SendGrid analytics)
- [ ] Implement bounce handling
  - Listen to SendGrid webhooks
  - Mark subscribers as 'bounced'
  - Retry logic for soft bounces

---

### 5. Authentication & Authorization

#### Implementation Tasks
- [ ] Create JWT token service
  - Generate tokens with expiration
  - Verify and decode tokens
  - Refresh token mechanism
- [ ] Implement admin registration (seed initial admin)
- [ ] Implement admin login endpoint
  - Validate credentials
  - Return JWT token
  - Set secure HTTP-only cookies
- [ ] Create authentication middleware
  - Verify JWT token
  - Attach user to request object
  - Handle expired tokens
- [ ] Implement role-based access control (RBAC)
  - admin: Full access
  - editor: Create/edit content, view donations
  - viewer: Read-only access
- [ ] Create password reset flow
  - Generate reset token
  - Send reset email
  - Validate token and update password
- [ ] Implement session management
  - Track active sessions
  - Logout functionality
  - Revoke compromised tokens

#### Security Best Practices
- Hash passwords with bcryptjs (salt rounds: 10)
- Store JWT secret in environment variables
- Use HTTP-only, secure cookies for tokens
- Implement CSRF protection
- Rate limit authentication endpoints (max 5 login attempts per 15 minutes)
- Log all authentication events
- Implement account lockout after failed attempts

---

### 6. API Security & Best Practices

#### Implementation Tasks
- [ ] Configure CORS
  - Whitelist frontend domain
  - Allow credentials
  - Restrict allowed methods and headers
- [ ] Implement rate limiting
  - Global: 100 requests per minute per IP
  - Authentication: 5 requests per 15 minutes
  - Payment: 5 requests per minute
- [ ] Add request validation middleware
  - Validate request body with Zod
  - Sanitize inputs to prevent injection attacks
  - Enforce content-type headers
- [ ] Set up security headers
  - Helmet.js for common security headers
  - Content Security Policy (CSP)
  - X-Frame-Options, X-Content-Type-Options
- [ ] Implement error handling
  - Custom error classes
  - Error logging with stack traces
  - User-friendly error messages
  - Hide sensitive information in production
- [ ] Add API versioning
  - Prefix routes with /api/v1
  - Prepare for future versions
- [ ] Create health check endpoint
  - GET /api/health
  - Return database status, external service status
  - Use for monitoring and load balancers
- [ ] Implement request logging
  - Log all incoming requests
  - Include request ID for tracing
  - Log response times
  - Use structured logging (JSON)

---

### 7. Testing Strategy

#### Unit Tests (Jest)
- [ ] Test utility functions
- [ ] Test validation schemas
- [ ] Test service layer logic (mock external APIs)
- [ ] Test authentication helpers
- [ ] Target: 80% code coverage

#### Integration Tests (Supertest)
- [ ] Test donation endpoints
  - Create payment intent
  - Confirm donation
  - Webhook handling
- [ ] Test newsletter endpoints
  - Subscribe flow
  - Verify email
  - Update preferences
  - Unsubscribe
- [ ] Test authentication endpoints
  - Login
  - Token refresh
  - Protected routes
- [ ] Test error handling
  - Invalid inputs
  - Unauthorized access
  - Rate limiting

#### Load Testing (Optional)
- [ ] Use Artillery or k6
- [ ] Test concurrent payment processing
- [ ] Test newsletter batch sending
- [ ] Identify performance bottlenecks

---

### 8. Deployment & DevOps

#### Deployment Options
1. **Railway** (Recommended for MVP)
   - Easy deployment from GitHub
   - Built-in PostgreSQL
   - Automatic HTTPS
   - Environment variable management
   - Cost: ~$5-20/month

2. **Render**
   - Free tier available (with limitations)
   - PostgreSQL included
   - Auto-deploy from GitHub
   - Cost: Free tier or $7+/month

3. **AWS (Advanced)**
   - Elastic Beanstalk for API
   - RDS for PostgreSQL
   - CloudWatch for logging
   - More control, higher complexity
   - Cost: Variable, ~$20-50/month minimum

#### Implementation Tasks
- [ ] Choose deployment platform
- [ ] Set up production database
- [ ] Configure environment variables in platform
- [ ] Set up domain and SSL certificate
- [ ] Configure database backups (daily automated)
- [ ] Set up monitoring and alerts
  - Uptime monitoring (UptimeRobot or Sentry)
  - Error tracking (Sentry)
  - Performance monitoring (New Relic or Datadog)
- [ ] Create deployment documentation
- [ ] Set up staging environment (optional but recommended)

#### CI/CD Pipeline
- [ ] Create GitHub Actions workflow
  - Run tests on pull requests
  - Run linting and type checking
  - Build TypeScript
  - Deploy to staging on merge to `develop`
  - Deploy to production on merge to `main`
- [ ] Add database migration automation
- [ ] Create rollback procedure documentation

---

### 9. Documentation & Developer Experience

#### API Documentation
- [ ] Create OpenAPI/Swagger spec
- [ ] Document all endpoints
  - Request/response schemas
  - Authentication requirements
  - Error codes and meanings
  - Example requests with curl
- [ ] Set up Swagger UI (optional)
- [ ] Create Postman collection for testing

#### Developer Documentation
- [ ] Write README.md
  - Project overview
  - Setup instructions
  - Environment variables
  - Running locally
  - Running tests
  - Deployment guide
- [ ] Document database schema
- [ ] Document Stripe webhook setup
- [ ] Document SendGrid template setup
- [ ] Create troubleshooting guide

---

### 10. Frontend Integration Updates

#### Update Frontend Services
- [ ] Replace mock `donationService.ts` with real API calls
  ```typescript
  // Before: Mock localStorage
  // After: Axios/fetch to https://api.auxla.org/api/v1/donations
  ```
- [ ] Replace mock `newsletterService.ts` with real API calls
- [ ] Add API error handling and retry logic
- [ ] Update environment variables in frontend
  ```env
  VITE_API_BASE_URL=https://api.auxla.org/api/v1
  VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
  ```
- [ ] Test end-to-end flows
  - Newsletter subscription with real emails
  - Donation with real Stripe test cards
  - Error handling for network failures
- [ ] Update loading states and error messages
- [ ] Implement offline support (optional)

---

### Success Criteria

#### Functional Requirements
- ✅ Real Stripe payments processing successfully
- ✅ Email confirmations sent via SendGrid
- ✅ Data persisting in PostgreSQL database
- ✅ Admin authentication working
- ✅ All endpoints returning correct responses
- ✅ Webhooks processing Stripe events

#### Non-Functional Requirements
- ✅ API response time < 500ms for most endpoints
- ✅ 99.9% uptime (measured over 30 days)
- ✅ Pass security audit (OWASP Top 10)
- ✅ Test coverage > 80%
- ✅ API documentation complete and accurate
- ✅ Zero data loss during deployments

#### Business Requirements
- ✅ Donation receipts sent within 5 minutes
- ✅ Newsletter confirmations sent within 2 minutes
- ✅ Support for $5 to $10,000 donations
- ✅ Handle 1000+ concurrent users
- ✅ GDPR and data privacy compliance

---

### Estimated Timeline

**Week 1: Foundation**
- Project setup and configuration
- Database schema and migrations
- Basic Express server with health check

**Week 2: Core Features**
- Stripe payment integration
- SendGrid email integration
- Donation endpoints
- Newsletter endpoints

**Week 3: Security & Testing**
- Authentication system
- API security hardening
- Unit and integration tests
- Error handling and logging

**Week 4: Deployment & Integration**
- Deploy to production
- Frontend integration updates
- End-to-end testing
- Documentation and handoff

**Total: 3-4 weeks for MVP backend**

---

### Dependencies & Prerequisites

- Stripe account (test and live mode)
- SendGrid account with verified sender domain
- PostgreSQL database (Supabase, Railway, or AWS RDS)
- Domain name for API (api.auxla.org)
- GitHub account for CI/CD
- Deployment platform account (Railway, Render, or AWS)

---

### Learning Resources

- **Stripe API**: https://stripe.com/docs/api
- **SendGrid API**: https://docs.sendgrid.com
- **Prisma**: https://www.prisma.io/docs
- **Express.js**: https://expressjs.com
- **JWT Authentication**: https://jwt.io/introduction
- **API Security**: https://owasp.org/www-project-api-security

---

**This backend API will enable AUXLA to process real donations, send automated emails, and securely manage data, completing the transition from prototype to production-ready application.**

---

**This is a living document. Update as project evolves.**
