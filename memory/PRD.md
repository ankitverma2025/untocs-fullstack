# untocs - Product Requirements Document

## Original Problem Statement
Build a landing page for untocs - a brand selling clothing free of toxic chemicals, made for babies (0-2 years). The brand positioning emphasizes purity, safety, and transparency with a warm, parent-to-parent tone.

## User Personas
- **Expecting Parents**: Researching safe clothing options before baby arrives
- **New Parents (0-6 months)**: Highly concerned about baby's sensitive skin, seeking chemical-free options
- **Experienced Parents (6-24 months)**: Looking for safe, high-quality clothing as baby grows

## Architecture & Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI components
- **Backend**: FastAPI, Python (not yet implemented)
- **Database**: MongoDB (not yet implemented)
- **Styling**: Custom CSS with modern serif fonts (Cormorant Garamond, Inter)

## Core Requirements

### Brand & Design
- Clean minimal aesthetic (soft whites, light grays, muted pastels)
- Modern serif typography for headlines, sans-serif for body
- High-quality contextual images (organic baby clothing, botanical dyes, natural fabrics)
- Warm, honest, parent-to-parent tone

### Landing Page Sections
1. **Navigation**: Logo with leaf icon, "Join the Waitlist" CTA
2. **Hero**: Powerful headline about toxic chemicals, subtext with facts, CTA
3. **Ticker Strip**: Animated strip showing all "No toxic X" statements
4. **Solution Section**: 3 cards explaining the untocs difference
   - Zero toxic chemicals
   - Built for sensitive skin
   - Plant-based botanical dyes (Turmeric, Neem, Indigo, Tulsi, Pomegranate)
5. **Waitlist Form**: First name, email, baby's age dropdown, optional comments
6. **Footer**: Brand logo, "No spam. Just updates when we launch."

## What's Been Implemented (April 1, 2026)

### ✅ Frontend (Complete)
- All sections built with React components
- Responsive design for mobile, tablet, desktop
- Smooth animations and hover effects
- Form validation with toast notifications (using Sonner)
- Mock data service for form submissions (localStorage)

### 📝 Mock Data Structure
```javascript
{
  id: timestamp,
  firstName: string,
  email: string,
  babyAge: "0-6" | "6-12" | "1-2" | "expecting",
  comments: string (optional),
  timestamp: ISO string
}
```

### ⏳ Not Yet Implemented

#### Backend Development
- FastAPI endpoints for waitlist submissions
- MongoDB models for storing form data
- Email confirmation system
- Admin dashboard to view submissions

#### Google Forms Integration (Alternative)
Integration playbook obtained for:
- Formfacade embed for native-looking forms
- Google Sheets API for data persistence
- Custom form submission to Google Sheets

## API Contracts (Planned)

### POST /api/waitlist
Request:
```json
{
  "firstName": "string",
  "email": "string (email format)",
  "babyAge": "string (enum)",
  "comments": "string (optional)"
}
```

Response:
```json
{
  "success": true,
  "message": "You're on the list!",
  "id": "string"
}
```

### GET /api/waitlist (Admin only)
Response:
```json
{
  "total": number,
  "submissions": [
    {
      "id": "string",
      "firstName": "string",
      "email": "string",
      "babyAge": "string",
      "comments": "string",
      "timestamp": "ISO string"
    }
  ]
}
```

## Prioritized Backlog

### P0 (Critical - Next Phase)
- [ ] Decide on Google Forms vs MongoDB backend approach
- [ ] Implement backend API for waitlist submissions
- [ ] Connect frontend form to real backend
- [ ] Deploy to production

### P1 (Important)
- [ ] Email confirmation for waitlist signups
- [ ] Admin dashboard to view/export submissions
- [ ] SEO optimization (meta tags, OpenGraph)
- [ ] Analytics integration (Google Analytics / Mixpanel)

### P2 (Nice to Have)
- [ ] Instagram gallery section for social proof
- [ ] Blog section about safe fabrics and parenting tips
- [ ] FAQ section
- [ ] Share waitlist link functionality
- [ ] Referral program ("Get early access when you refer 3 friends")

## Design Assets Used
**Images from Unsplash & Pexels:**
- Hero: Organic baby clothing on clothesline
- Solution Card 1: Baby clothing with natural colors
- Solution Card 2: Pure soft cotton fabric texture
- Solution Card 3: Botanical dyes being prepared

## Technical Decisions

### Why Modern Serif Fonts?
- Conveys trust, heritage, and timelessness
- Cormorant Garamond provides elegant readability
- Creates premium, thoughtful brand perception

### Why Shadcn UI?
- Pre-built accessible components
- Customizable with Tailwind
- Clean, modern aesthetic aligned with brand
- Form components (Input, Select, Textarea) work seamlessly

### Why Mock Data First?
- Rapid frontend development and user feedback
- Test UX without backend complexity
- Easy to swap mock service with real API later

## Next Steps
1. User reviews frontend design
2. Discuss Google Forms vs MongoDB backend preference
3. Implement chosen backend solution
4. Test end-to-end form submission
5. Deploy to production
6. Plan post-launch marketing strategy
