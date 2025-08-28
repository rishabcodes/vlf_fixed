# Vasquez Law Firm Design System

This design system ensures consistency across all pages and components of the Vasquez Law Firm website.

## Core Principles

1. **Consistent Brand Colors**: Gold (#C9974D) as primary, Burgundy (#6B1F2E) as secondary
2. **Trademark Usage**: Always use "YO PELEO POR TI™" consistently
3. **Mobile-First**: All components are responsive by default
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Performance**: Lazy loading and optimized assets

## Quick Start

```tsx
import { MasterLayout, Button, Heading, Section } from '@/design-system';

export default function MyPage() {
  return (
    <MasterLayout>
      <Section>
        <Heading as="h1" size="5xl">
          Page Title
        </Heading>
        <Button href="/contact">Get Started</Button>
      </Section>
    </MasterLayout>
  );
}
```

## Components

### Layout Components

#### MasterLayout

The main wrapper for all pages. Includes header, footer, and breadcrumbs.

```tsx
<MasterLayout
  variant="default" // or "hero", "minimal"
  showBreadcrumbs={true}
>
  {children}
</MasterLayout>
```

#### PageTemplate

Standard page layout with optional hero section.

```tsx
<PageTemplate
  title="Page Title"
  subtitle="Optional subtitle"
  variant="default" // or "wide", "narrow"
  showHero={true}
>
  {content}
</PageTemplate>
```

### UI Components

#### Button

Consistent button styles across the site.

```tsx
<Button
  variant="primary" // or "secondary", "outline", "ghost"
  size="md" // or "sm", "lg", "xl"
  href="/link" // optional, makes it a link
  onClick={() => {}} // for button behavior
  icon={<Icon />} // optional icon
  fullWidth // optional full width
>
  Button Text
</Button>
```

#### Typography

Consistent text styling.

```tsx
<Heading as="h2" size="3xl" color="primary">
  Section Title
</Heading>

<Text size="lg" color="muted">
  Body text content
</Text>

<Tagline size="md">
  YO PELEO POR TI™
</Tagline>
```

#### Cards

Consistent card layouts.

```tsx
<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Color System

### Brand Colors

- **Primary (Gold)**: `#C9974D` - Used for CTAs, highlights
- **Secondary (Burgundy)**: `#6B1F2E` - Used for headers, important text
- **Neutral**: Grays for text and backgrounds

### Usage Examples

```tsx
// In Tailwind classes
<div className="bg-primary text-secondary">

// From constants
import { SEMANTIC_COLORS } from '@/design-system';
const primaryColor = SEMANTIC_COLORS.primary;
```

## Typography Scale

- **7xl**: 72px - Hero headlines
- **6xl**: 60px - Page titles
- **5xl**: 48px - Section titles
- **4xl**: 36px - Subsection titles
- **3xl**: 30px - Card titles
- **2xl**: 24px - Large body text
- **xl**: 20px - Emphasized text
- **lg**: 18px - Body text
- **base**: 16px - Default text
- **sm**: 14px - Small text
- **xs**: 12px - Fine print

## Spacing System

Uses a consistent 4px base unit:

- `spacing-1`: 4px
- `spacing-2`: 8px
- `spacing-3`: 12px
- `spacing-4`: 16px
- `spacing-6`: 24px
- `spacing-8`: 32px
- `spacing-12`: 48px
- `spacing-16`: 64px

## Best Practices

1. **Always use MasterLayout** for consistent header/footer
2. **Use semantic color names** instead of hardcoded hex values
3. **Leverage pre-built components** instead of creating new ones
4. **Follow the spacing scale** for consistent layouts
5. **Test on mobile first** - all components should be responsive

## Migration Guide

To migrate existing pages to the design system:

1. Replace custom headers/footers with `MasterLayout`
2. Replace hardcoded colors with design tokens
3. Use `Button` component instead of custom buttons
4. Use `Section` and `Container` for layout structure
5. Replace custom typography with `Heading` and `Text` components

## Example Page Structure

```tsx
import {
  MasterLayout,
  HeroTemplate,
  Section,
  Container,
  SectionHeader,
  Card,
  Button,
} from '@/design-system';

export default function ExamplePage() {
  return (
    <MasterLayout>
      <HeroTemplate variant="default" />

      <Section variant="default" size="lg">
        <Container>
          <SectionHeader title="Section Title" subtitle="Optional description" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map(item => (
              <Card key={item.id} variant="elevated" hover>
                {/* Card content */}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="gradient" size="md">
        <Container size="sm">
          <div className="text-center">
            <Button href="/contact" size="lg">
              Get Started
            </Button>
          </div>
        </Container>
      </Section>
    </MasterLayout>
  );
}
```
