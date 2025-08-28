# Design System Migration Guide

This guide helps you migrate existing pages to use the new consistent design system.

## Color Mapping

### Old Colors → New Design Tokens

```
#6B1F2E → secondary (burgundy-700)
#C9974D → primary (gold-500)
#188bf6 → Remove (use primary/secondary only)
#950e02 → secondary-dark (burgundy-800)
```

## Component Migration

### 1. Page Structure

**Before:**

```tsx
<div className="min-h-screen bg-white">
  {/* Custom header */}
  <div className="bg-[#6B1F2E] text-white py-2">...</div>
  <nav className="sticky top-0 z-40 bg-white shadow-md">...</nav>

  {/* Page content */}

  {/* Custom footer */}
</div>
```

**After:**

```tsx
import { MasterLayout, PageTemplate } from '@/design-system';

<MasterLayout>
  <PageTemplate title="Page Title" subtitle="Optional subtitle">
    {/* Page content */}
  </PageTemplate>
</MasterLayout>;
```

### 2. Buttons

**Before:**

```tsx
<button className="px-6 py-2 bg-[#C9974D] text-white rounded-md hover:bg-[#D4A574] transition-colors font-medium">
  Free Consultation
</button>
```

**After:**

```tsx
import { Button } from '@/design-system';

<Button href="/contact" variant="primary">
  Free Consultation
</Button>;
```

### 3. Cards

**Before:**

```tsx
<div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all">
  <div className="p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
</div>
```

**After:**

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/design-system';

<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>{description}</CardContent>
</Card>;
```

### 4. Typography

**Before:**

```tsx
<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
<p className="text-xl text-[#C9974D] font-semibold mb-6">{subtitle}</p>
```

**After:**

```tsx
import { Heading, Tagline } from '@/design-system';

<Heading as="h1" size="5xl">{title}</Heading>
<Tagline size="lg">{subtitle}</Tagline>
```

### 5. Sections

**Before:**

```tsx
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{content}</div>
</section>
```

**After:**

```tsx
import { Section, Container } from '@/design-system';

<Section variant="alt" size="lg">
  <Container>{content}</Container>
</Section>;
```

## Step-by-Step Migration Process

### Step 1: Update Imports

```tsx
// Add at the top of your file
import {
  MasterLayout,
  PageTemplate,
  Button,
  Card,
  Section,
  Container,
  Heading,
  Text,
} from '@/design-system';
```

### Step 2: Wrap with MasterLayout

Remove custom headers and footers, wrap your page content with `MasterLayout`.

### Step 3: Replace Colors

Search and replace hardcoded colors:

- `#6B1F2E` → `text-secondary` or `bg-secondary`
- `#C9974D` → `text-primary` or `bg-primary`
- `#188bf6` → Use `primary` or `secondary` instead
- Custom grays → Use `neutral-X00` scale

### Step 4: Update Components

Replace custom implementations with design system components.

### Step 5: Test Responsive Behavior

Ensure all components work on mobile, tablet, and desktop.

## Common Patterns

### Hero Section

```tsx
<HeroTemplate
  language={language}
  variant="split" // or "default", "video", "centered"
/>
```

### Practice Area Cards

```tsx
<PracticeAreaCard
  icon="🏥"
  title="Personal Injury"
  description="Fighting for maximum compensation"
  services={['Car Accidents', 'Slip & Fall']}
  aiFeature="AI predicts case value"
  href="/practice-areas/personal-injury"
  language={language}
/>
```

### Call-to-Action Section

```tsx
<Section variant="gradient" size="lg">
  <Container size="md">
    <div className="text-center">
      <Tagline size="lg">YO PELEO POR TI™</Tagline>
      <Heading as="h2" size="4xl">
        Ready to Get Started?
      </Heading>
      <Button href="/contact" size="xl">
        Schedule Consultation
      </Button>
    </div>
  </Container>
</Section>
```

## Checklist

- [ ] Import design system components
- [ ] Replace custom header/footer with MasterLayout
- [ ] Update all hardcoded colors to design tokens
- [ ] Replace custom buttons with Button component
- [ ] Replace custom cards with Card component
- [ ] Update typography to use Heading/Text components
- [ ] Use Section/Container for layout structure
- [ ] Ensure "YO PELEO POR TI™" is used consistently
- [ ] Test on mobile devices
- [ ] Verify dark mode support (if applicable)

## Need Help?

Refer to the [Design System README](./README.md) for detailed component documentation.
