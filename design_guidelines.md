# Design Guidelines: LiveTracking.com

## Design Approach
**System-Based with Modern SaaS Aesthetic**: Drawing from Linear's precision, Vercel's clarity, and Stripe's restraint. Focus on functional elegance that makes complex tracking data feel effortless.

## Core Principles
1. **Information Clarity**: Package tracking status should be instantly scannable
2. **AI Integration**: Gemini-powered features are premium differentiators, not afterthoughts
3. **Speed-First**: Quick tracking input with minimal friction
4. **Trust & Reliability**: Professional aesthetic that conveys accuracy

## Typography
- **Primary Font**: Inter (via Google Fonts)
- **Headings**: 600-700 weight, tight letter-spacing (-0.02em)
- **Body**: 400 weight, relaxed line-height (1.6)
- **Data/Tracking Numbers**: 500 weight, monospace fallback for tracking IDs

## Layout System
**Spacing Units**: Tailwind 4, 6, 8, 12, 16 for consistency
- Hero/sections: py-16 to py-24
- Card padding: p-6 to p-8
- Component gaps: gap-6 to gap-8

## Component Library

### Navigation
Clean header with logo left, primary CTA right. Sticky on scroll. Include "Track Package" quick-input in nav on interior pages.

### Hero Section
**Full-width hero with gradient background** (no image - keeps focus on functionality)
- Large tracking input field as centerpiece
- AI badge/indicator: "Powered by Gemini AI" subtle badge
- Quick stats below input: "1M+ packages tracked" or courier support count
- Secondary CTA: "See AI Features" linking to capabilities

### Tracking Dashboard/Results
**Card-based layout** with clear visual hierarchy:
- Large status indicator (In Transit/Delivered/etc.) with icon
- Timeline visualization showing package journey
- Courier logo and tracking number prominent
- AI insights panel: Gemini-powered delivery predictions, customs insights, delay alerts
- Expandable details section

### AI Features Showcase
**3-column grid** on desktop (2-col tablet, 1-col mobile):
- Smart Predictions card with icon
- Multi-Language Support card
- Customs & Delay Insights card
Each card: icon + title + 2-line description + "Learn more" link

### Courier Support Grid
Display supported couriers in **4-5 column responsive grid**
- Courier logos (grayscale, color on hover)
- Clean cards with minimal borders

### Footer
**3-column layout**: 
- Column 1: Brand + tagline
- Column 2: Quick links (Features, API, Support)
- Column 3: Newsletter signup with AI update notifications opt-in

## Key Interactions
- **Tracking Input**: Auto-detect courier from tracking number (show shimmer while detecting)
- **Status Updates**: Smooth transitions between tracking states
- **AI Panel**: Collapsible "Ask AI about this package" with Gemini integration
- Minimal animations: subtle fades and slides only

## Data Visualization
- **Timeline**: Vertical line with checkpoint nodes
- **Progress Bar**: Percentage-based with gradient fill
- **Status Badges**: Rounded pills with distinct colors per state (use semantic colors later)

## Images Section
**No large hero image** - tracking input is the visual focus. Use:
- Courier logos throughout (actual courier brand assets)
- Small illustrative icons for AI features (use Heroicons)
- Optional: Small illustration/graphic beside AI features section for visual interest

## Accessibility
- High contrast for tracking numbers and status
- Clear focus states on tracking input
- Screen reader labels for all status indicators
- Keyboard navigation for timeline exploration