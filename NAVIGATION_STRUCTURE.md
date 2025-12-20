# OCSLAA - Navigation Structure

**Last Updated**: December 3, 2025

---

## 🧭 Primary Navigation

### 1. Home (`/`)
**Purpose**: Landing page and main entry point  
**Status**: ⚠️ Needs Enhancement  
**Key Sections**:
- Hero section with main CTA
- Featured services/resources
- Crisis support banner
- Impact statistics
- Testimonials
- Recent blog posts
- Newsletter signup
- Quick links to key pages

**Priority**: High - Update after Phase 3

---

### 2. About Us (`/about`)
**Purpose**: Organization information, mission, and team  
**Status**: ⚠️ Needs Enhancement  
**Key Sections**:
- Mission and vision
- Organization story/timeline
- Impact statistics
- Core values
- Leadership team profiles
- Board of advisors
- Partner logos
- Awards and recognition
- Annual reports
- Transparency/financials

**Priority**: High - Implement in Phase 6

---

### 3. Our Services (`/resources`)
**Purpose**: Mental health resources and support finder  
**Status**: ✅ **COMPLETED** (Phase 2)  
**Key Features**:
- Searchable resource library (20+ resources)
- Category filtering (9 categories)
- Type filtering (7 types)
- Featured resources
- Resource detail pages (`/resources/:id`)
- Related resources
- Mark as helpful functionality
- Crisis support banner
- Pagination

**Sections**:
- Mental Health Resources
  - Anxiety resources
  - Depression resources
  - Stress management
  - Support groups
  - Crisis resources
  - Therapy information
  - Self-help tools
  - General wellness
- Support Finder (to be enhanced in Phase 8)
  - Find therapists
  - Support groups
  - Services directory

**Routes**:
- `/resources` - Main listing
- `/resources/:id` - Resource detail

---

### 4. Blog (`/blog`)
**Purpose**: Educational content and community stories  
**Status**: ⏳ **NEXT PHASE** (Phase 3)  
**Key Features** (Planned):
- Blog post listing with pagination
- Category filtering
- Tag system
- Featured posts
- Search functionality
- Author profiles
- Blog post detail pages
- Related posts
- Social sharing
- Reading time estimate

**Sections**:
- Recent posts
- Featured articles
- Categories:
  - Wellness tips
  - Mental health awareness
  - Personal stories
  - Research and insights
  - Treatment options
  - Prevention strategies

**Routes** (Planned):
- `/blog` - Main listing
- `/blog/:slug` - Post detail
- `/blog/category/:category` - Category filter
- `/blog/author/:authorId` - Author posts

---

### 5. Contact Us (`/contact`)
**Purpose**: Communication and inquiries  
**Status**: ⚠️ Needs Enhancement  
**Key Sections**:
- Contact form (general inquiries)
- Volunteer application form
- Partnership inquiries
- Media requests
- FAQ section (searchable)
- Office locations/hours
- Social media links
- Crisis hotline information

**Priority**: Medium - Implement in Phase 7

---

### 6. Donation (`/donate`)
**Purpose**: Financial support and contributions  
**Status**: ⏳ Pending (Phase 5)  
**Key Features** (Planned):
- Donation amount selection (presets + custom)
- One-time vs recurring toggle
- Donor information form
- Stripe payment integration
- Payment success/failure pages
- Donation receipts via email
- Impact metrics ("Your donation helps...")
- Tax deduction information
- Donor recognition (optional)

**Priority**: High - Implement in Phase 5

---

## 🔗 Secondary/Utility Pages

### 404 Not Found (`*`)
**Status**: ✅ Implemented  
**Features**:
- Friendly error message
- Search suggestions
- Quick links to main pages
- Contact support option

### Support Finder (`/support-finder`)
**Status**: ⚠️ Needs Enhancement  
**Features** (To Be Added):
- Therapist directory
- Support group finder
- Location-based search
- Specialty filtering
- Insurance search
- Provider profiles

---

## 📱 Header Navigation

### Desktop Navigation
```
Logo | Home | About Us | Our Services | Blog | Contact Us | [Our Services Button] [Donate Now Button]
```

### Mobile Navigation (Hamburger Menu)
```
☰ Menu
├── Home
├── About Us
├── Our Services
├── Blog
├── Contact Us
├── [Separator]
├── Our Services (Button)
└── Donate Now (Button)
```

### Navigation Highlights
- **Active State**: Blue underline and text color
- **Hover State**: Blue text color transition
- **Sticky Header**: Always visible on scroll
- **Crisis CTA**: Prominent in mobile menu

---

## 🦶 Footer Navigation

### Footer Sections
1. **About**
   - Our Mission
   - Our Team
   - Annual Reports
   - Contact Us

2. **Resources**
   - Mental Health Resources
   - Crisis Support
   - Support Finder
   - FAQ

3. **Get Involved**
   - Donate
   - Volunteer
   - Partner With Us
   - Newsletter

4. **Legal**
   - Privacy Policy
   - Terms of Service
   - Cookie Policy
   - Accessibility

5. **Crisis Support**
   - National Suicide Prevention Lifeline: 988
   - Crisis Text Line: Text HELLO to 741741
   - SAMHSA Helpline: 1-800-662-4357

6. **Social Media**
   - Facebook
   - Twitter
   - Instagram
   - LinkedIn

---

## 🎯 Call-to-Action Hierarchy

### Primary CTAs
1. **"Donate Now"** - Red button (hero variant)
2. **"Our Services"** - Blue outline button
3. **"Get Help Now"** - Crisis support (red background)

### Secondary CTAs
1. "Subscribe to Newsletter"
2. "Find a Therapist"
3. "Read Our Blog"
4. "Contact Us"
5. "Learn More"

---

## 🔄 Navigation Flow

### User Journeys

**1. Crisis Support**
```
Any Page → Crisis Banner → Crisis Resources → Immediate Help
```

**2. Find Resources**
```
Home → Our Services → Filter/Search → Resource Detail → Related Resources
```

**3. Learn More**
```
Home → Blog → Article → Related Articles → Newsletter Signup
```

**4. Get Involved**
```
About Us → Our Mission → Donate/Volunteer → Thank You
```

**5. Find Support**
```
Our Services → Support Finder → Provider List → Provider Profile → Contact
```

---

## ✅ Implementation Status

| Page | Route | Status | Phase | Priority |
|------|-------|--------|-------|----------|
| Home | `/` | ⚠️ Needs Enhancement | Phase 6 | High |
| About Us | `/about` | ⚠️ Needs Enhancement | Phase 6 | High |
| Our Services | `/resources` | ✅ Completed | Phase 2 | ✅ Done |
| Resource Detail | `/resources/:id` | ✅ Completed | Phase 2 | ✅ Done |
| Blog | `/blog` | ⏳ Pending | Phase 3 | High |
| Blog Detail | `/blog/:slug` | ⏳ Pending | Phase 3 | High |
| Contact Us | `/contact` | ⚠️ Needs Enhancement | Phase 7 | Medium |
| Donation | `/donate` | ⏳ Pending | Phase 5 | High |
| Support Finder | `/support-finder` | ⚠️ Needs Enhancement | Phase 8 | Medium |
| 404 | `*` | ✅ Completed | Phase 1 | ✅ Done |

**Legend**:
- ✅ Completed - Fully functional
- ⚠️ Needs Enhancement - Basic structure exists, needs improvement
- ⏳ Pending - Not yet implemented

---

## 📋 Next Steps

### Immediate (Phase 3)
1. Build Blog system with listing and detail pages
2. Implement category filtering and search
3. Add author profiles

### Short-term (Phase 4-5)
1. Newsletter subscription system
2. Donation page with Stripe integration

### Medium-term (Phase 6-7)
1. Enhance Home page with all sections
2. Complete About Us page with team profiles
3. Build comprehensive Contact Us page with forms

### Long-term (Phase 8)
1. Enhance Support Finder with provider directory
2. Add location-based search
3. Implement provider profiles

---

## 🎨 Design Consistency

### Navigation Design Principles
1. **Accessibility First**: Keyboard navigation, ARIA labels, screen reader friendly
2. **Mobile Responsive**: Touch-friendly, simplified mobile menu
3. **Clear Hierarchy**: Primary vs secondary navigation
4. **Consistent Styling**: Same hover/active states across all pages
5. **Crisis Visibility**: Always accessible crisis support
6. **Intuitive Labels**: Clear, action-oriented navigation text

---

**This document should be updated as navigation evolves.**
