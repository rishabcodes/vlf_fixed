# VLF Website Quick Fixes Guide

## Immediate Fixes for Design Consistency

### 1. Global CSS Variable Updates

Add to `src/styles/globals.css`:

```css
:root {
  /* Primary Colors */
  --color-primary: #c9974d;
  --color-primary-dark: #b08740;
  --color-primary-light: #d4a574;

  /* Secondary Colors */
  --color-secondary: #6b1f2e;
  --color-secondary-dark: #551825;
  --color-secondary-light: #8b2635;

  /* Neutrals */
  --color-background: #ffffff;
  --color-background-alt: #fafafa;
  --color-text-primary: #171717;
  --color-text-secondary: #525252;
  --color-text-muted: #737373;

  /* Borders */
  --color-border-light: #e5e5e5;
  --color-border-default: #d4d4d4;
  --color-border-dark: #a3a3a3;
}
```

### 2. Find & Replace Color Values

Run these replacements across all files:

| Find           | Replace With                   |
| -------------- | ------------------------------ |
| `#6B1F2E`      | `var(--color-secondary)`       |
| `#8B2635`      | `var(--color-secondary-light)` |
| `#C9974D`      | `var(--color-primary)`         |
| `#D4A574`      | `var(--color-primary-light)`   |
| `bg-[#6B1F2E]` | `bg-secondary`                 |
| `bg-[#C9974D]` | `bg-primary`                   |

### 3. Tailwind Config Updates

Update `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#C9974D',
        light: '#D4A574',
        dark: '#B08740',
      },
      secondary: {
        DEFAULT: '#6B1F2E',
        light: '#8B2635',
        dark: '#551825',
      },
    },
  },
}
```

### 4. Component Quick Fixes

#### Button Component Usage

Replace all button implementations with:

```tsx
import { Button } from '@/design-system/components/Button';

// Primary CTA
<Button variant="primary" size="large">
  Schedule Consultation
</Button>

// Secondary CTA
<Button variant="secondary" size="large">
  Call 1-844-YO-PELEO
</Button>
```

#### Section Wrapping

Wrap all main sections with:

```tsx
import { Section } from '@/design-system/components/Section';

<Section className="py-16">{/* content */}</Section>;
```

### 5. Attorney Page Quick Fix

For the attorneys page, remove client-side rendering:

```tsx
// Remove 'use client'
// Import MasterLayout
import { MasterLayout } from '@/design-system/templates/MasterLayout';

// Wrap content
export default function AttorneysPage() {
  return <MasterLayout>{/* existing content */}</MasterLayout>;
}
```

### 6. Header/Footer Consistency

Replace all instances of:

- `import { Header } from '@/components/Header'`
- `import { Footer } from '@/components/Footer'`

With MasterLayout usage instead.

### 7. Typography Consistency

Replace heading tags with Typography component:

```tsx
import { Typography } from '@/design-system/components/Typography';

// Instead of <h1>
<Typography variant="h1">Title</Typography>

// Instead of <h2>
<Typography variant="h2">Subtitle</Typography>

// Instead of <p>
<Typography variant="body">Content</Typography>
```

### 8. Practice Area Pages Batch Update

Create a script to update all practice area pages:

```typescript
// scripts/update-practice-areas.ts
const practiceAreas = [
  'immigration',
  'personal-injury',
  'criminal-defense',
  'workers-compensation',
  'family-law',
  'traffic-tickets-nc',
];

// Update each to use PracticeAreaTemplate
```

### 9. Location Pages Batch Update

For all location pages, use the LocationPageTemplate with city-specific data:

```typescript
// Create data files for each city
const cityData = {
  city: 'CityName',
  state: 'NC',
  population: 'XXX',
  // ... rest of template data
};
```

### 10. Testing Checklist

After implementing fixes:

- [ ] All pages use MasterLayout
- [ ] No hardcoded colors remain
- [ ] Consistent button styles
- [ ] Uniform spacing (py-16 for sections)
- [ ] Typography component usage
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Breadcrumbs showing correctly

## Priority Order

1. **Critical** (Do First):

   - Update global CSS variables
   - Fix Tailwind config
   - Update home page

2. **High** (Do Second):

   - Practice area pages
   - Main navigation pages

3. **Medium** (Do Third):

   - Location pages (use template)
   - Attorney pages

4. **Low** (Do Last):
   - Blog pages
   - Legal article pages

## Verification

Run these commands to verify consistency:

```bash
# Find remaining hardcoded colors
grep -r "#6B1F2E\|#8B2635\|#C9974D" src/

# Find pages without MasterLayout
grep -r "PageLayout\|<Header\|<Footer" src/

# Check for inline styles
grep -r "style={{" src/
```
