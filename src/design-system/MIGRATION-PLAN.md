# VLF Website Design System Migration Plan

## Overview

This plan outlines the step-by-step process to migrate all pages to use the consistent design system.

## Phase 1: Update Core Pages (Week 1)

### 1.1 Update Home Page

**File**: `src/app/page.tsx`

**Changes Required**:

```tsx
// Before
import { PageLayout } from '@/components/Layout/PageLayout';

// After
import { MasterLayout } from '@/design-system/templates/MasterLayout';
```

- Replace PageLayout with MasterLayout
- Update HomePage component to use design system components
- Remove custom Header/Footer imports

### 1.2 Update Practice Area Template

**Create**: `src/components/templates/PracticeAreaTemplate.tsx`

```tsx
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Hero, Section, Card, Button } from '@/design-system/components';
import { COLORS, SPACING } from '@/design-system/constants';

export const PracticeAreaTemplate = ({ title, description, content, faqs, metadata }) => {
  return (
    <MasterLayout>
      <Hero variant="gradient" title={title} description={description} />
      <Section>{content}</Section>
      <Section variant="cta">
        <Button variant="primary" size="large">
          Schedule Free Consultation
        </Button>
      </Section>
    </MasterLayout>
  );
};
```

### 1.3 Update Immigration Page

**File**: `src/app/immigration/page.tsx`

**Before**:

```tsx
<section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
```

**After**:

```tsx
<Hero
  variant="gradient"
  title="Raleigh, NC Family-Based Immigration Lawyers"
  description="Need a trusted family-based immigration lawyer..."
/>
```

## Phase 2: Location Pages (Week 2)

### 2.1 Create Location Template

**File**: `src/components/templates/LocationTemplate.tsx`

```tsx
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { LocationHero, PracticeAreaGrid, TestimonialSection } from '@/design-system/components';

export const LocationTemplate = ({ city, state, data }) => {
  return (
    <MasterLayout>
      <LocationHero city={city} state={state} />
      <StatsBar stats={data.stats} />
      <PracticeAreaGrid />
      <LocalContent city={city} />
      <TestimonialSection testimonials={data.testimonials} />
      <CTASection city={city} />
    </MasterLayout>
  );
};
```

### 2.2 Update All Location Pages

- Create data files for each location
- Replace inline implementation with LocationTemplate
- Remove hardcoded colors

## Phase 3: Attorney & About Pages (Week 3)

### 3.1 Attorney Page Updates

- Remove 'use client' directive where possible
- Use server components with MasterLayout
- Replace custom animations with design system components

### 3.2 Create Consistent Components

- AttorneyCard component
- ContactForm component
- AboutSection component

## Implementation Checklist

### Color Token Replacement

- [ ] Replace `#6B1F2E` with `COLORS.burgundy[700]`
- [ ] Replace `#8B2635` with `COLORS.burgundy[600]`
- [ ] Replace `#C9974D` with `COLORS.gold[500]`
- [ ] Replace `#D4A574` with `COLORS.gold[400]`

### Component Standardization

- [ ] Replace all custom buttons with `<Button>` component
- [ ] Replace all cards with `<Card>` component
- [ ] Replace all sections with `<Section>` component
- [ ] Use `<Typography>` for all headings

### Layout Updates

- [ ] Add MasterLayout to all pages
- [ ] Remove PageLayout component usage
- [ ] Implement breadcrumbs on all pages
- [ ] Ensure consistent header/footer

## Testing Plan

1. Visual regression testing
2. Mobile responsiveness check
3. SEO audit post-migration
4. Performance testing
5. Accessibility audit

## Rollback Strategy

- Git branch for each phase
- Feature flags for gradual rollout
- A/B testing on key pages
- Monitor analytics for issues

## Success Metrics

- [ ] 100% design token usage
- [ ] Zero hardcoded colors
- [ ] Consistent component usage
- [ ] Improved Lighthouse scores
- [ ] Reduced CSS bundle size
