import { logger } from '@/lib/safe-logger';

interface A11yIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  element?: string;
  selector?: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
}

interface A11yReport {
  score: number;
  issues: A11yIssue[];
  passedRules: string[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
    total: number;
  };
}

class AccessibilityChecker {
  private issues: A11yIssue[] = [];
  private passedRules: string[] = [];

  public checkDocument(): A11yReport {
    this.issues = [];
    this.passedRules = [];

    if (typeof window === 'undefined') {
      return this.generateReport();
    }

    // Check various accessibility rules
    this.checkImages();
    this.checkButtons();
    this.checkForms();
    this.checkHeadings();
    this.checkLinks();
    this.checkColors();
    this.checkKeyboardNavigation();
    this.checkFocus();
    this.checkAria();
    this.checkLandmarks();
    this.checkTables();

    return this.generateReport();
  }

  private checkImages(): void {
    const images = document.querySelectorAll('img');

    images.forEach((img, index) => {
      const alt = img.getAttribute('alt');
      const src = img.getAttribute('src');

      if (!alt && alt !== '') {
        this.addIssue({
          type: 'error',
          rule: 'img-alt',
          message: 'Image missing alt attribute',
          element: `img[${index}]`,
          selector: `img:nth-child(${index + 1})`,
          impact: 'critical',
        });
      } else if (alt && alt.length > 125) {
        this.addIssue({
          type: 'warning',
          rule: 'img-alt-length',
          message: 'Alt text too long (>125 characters)',
          element: `img[${index}]`,
          selector: `img:nth-child(${index + 1})`,
          impact: 'moderate',
        });
      } else if (alt !== null) {
        this.passedRules.push('img-alt');
      }

      // Check for decorative images
      if (src && src.includes('decoration') && alt && alt.length > 0) {
        this.addIssue({
          type: 'info',
          rule: 'decorative-img',
          message: 'Decorative image should have empty alt attribute',
          element: `img[${index}]`,
          selector: `img:nth-child(${index + 1})`,
          impact: 'minor',
        });
      }
    });
  }

  private checkButtons(): void {
    const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');

    buttons.forEach((button, index) => {
      const textContent = button.textContent?.trim();
      const ariaLabel = button.getAttribute('aria-label');
      const title = button.getAttribute('title');

      if (!textContent && !ariaLabel && !title) {
        this.addIssue({
          type: 'error',
          rule: 'button-name',
          message: 'Button missing accessible name',
          element: `button[${index}]`,
          selector: `button:nth-child(${index + 1})`,
          impact: 'critical',
        });
      } else {
        this.passedRules.push('button-name');
      }
    });
  }

  private checkForms(): void {
    const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');

    inputs.forEach((input, index) => {
      const id = input.getAttribute('id');
      const label = id ? document.querySelector(`label[for="${id}"]`) : null;
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');

      if (!label && !ariaLabel && !ariaLabelledBy) {
        this.addIssue({
          type: 'error',
          rule: 'form-label',
          message: 'Form control missing label',
          element: `${input.tagName.toLowerCase()}[${index}]`,
          selector: `${input.tagName.toLowerCase()}:nth-child(${index + 1})`,
          impact: 'critical',
        });
      } else {
        this.passedRules.push('form-label');
      }

      // Check for required fields
      if (input.hasAttribute('required') && !input.getAttribute('aria-required')) {
        this.addIssue({
          type: 'info',
          rule: 'required-field',
          message: 'Required field should have aria-required="true"',
          element: `${input.tagName.toLowerCase()}[${index}]`,
          selector: `${input.tagName.toLowerCase()}:nth-child(${index + 1})`,
          impact: 'minor',
        });
      }
    });
  }

  private checkHeadings(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels: number[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      headingLevels.push(level);

      if (!heading.textContent?.trim()) {
        this.addIssue({
          type: 'error',
          rule: 'heading-content',
          message: 'Heading element is empty',
          element: `${heading.tagName.toLowerCase()}[${index}]`,
          selector: `${heading.tagName.toLowerCase()}:nth-child(${index + 1})`,
          impact: 'serious',
        });
      }
    });

    // Check heading hierarchy
    for (let i = 1; i < headingLevels.length; i++) {
      const current = headingLevels[i];
      const previous = headingLevels[i - 1];
      
      if (current === undefined || previous === undefined) continue;

      if (current > previous + 1) {
        this.addIssue({
          type: 'warning',
          rule: 'heading-hierarchy',
          message: `Heading level skipped (h${previous} to h${current})`,
          element: `h${current}`,
          impact: 'moderate',
        });
      }
    }

    // Check for h1
    const h1Count = document.querySelectorAll('h1').length;
    if (h1Count === 0) {
      this.addIssue({
        type: 'error',
        rule: 'h1-required',
        message: 'Page should have exactly one h1 element',
        impact: 'serious',
      });
    } else if (h1Count > 1) {
      this.addIssue({
        type: 'warning',
        rule: 'h1-multiple',
        message: 'Page should have only one h1 element',
        impact: 'moderate',
      });
    } else {
      this.passedRules.push('h1-required');
    }
  }

  private checkLinks(): void {
    const links = document.querySelectorAll('a[href]');

    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      const textContent = link.textContent?.trim();
      const ariaLabel = link.getAttribute('aria-label');

      if (!textContent && !ariaLabel) {
        this.addIssue({
          type: 'error',
          rule: 'link-name',
          message: 'Link missing accessible name',
          element: `a[${index}]`,
          selector: `a:nth-child(${index + 1})`,
          impact: 'critical',
        });
      }

      // Check for generic link text
      if (
        textContent &&
        ['click here', 'read more', 'more', 'link'].includes(textContent.toLowerCase())
      ) {
        this.addIssue({
          type: 'warning',
          rule: 'link-text',
          message: 'Link text should be descriptive',
          element: `a[${index}]`,
          selector: `a:nth-child(${index + 1})`,
          impact: 'moderate',
        });
      }

      // Check for external links
      if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
        const hasExternalIndicator =
          link.querySelector('[aria-label*="external"]') ||
          link.getAttribute('aria-label')?.includes('external');

        if (!hasExternalIndicator) {
          this.addIssue({
            type: 'info',
            rule: 'external-link',
            message: 'External link should indicate it opens in new window/tab',
            element: `a[${index}]`,
            selector: `a:nth-child(${index + 1})`,
            impact: 'minor',
          });
        }
      }
    });
  }

  private checkColors(): void {
    // This is a simplified check - in practice, you'd use more sophisticated color contrast algorithms
    const elements = document.querySelectorAll('*');

    elements.forEach((element, index) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      // Check for sufficient contrast (simplified)
      if (
        color &&
        backgroundColor &&
        color !== 'rgba(0, 0, 0, 0)' &&
        backgroundColor !== 'rgba(0, 0, 0, 0)'
      ) {
        // In a real implementation, you'd calculate the contrast ratio
        // For now, we'll just check for common low-contrast combinations
        if (color.includes('gray') && backgroundColor.includes('gray')) {
          this.addIssue({
            type: 'warning',
            rule: 'color-contrast',
            message: 'Potential color contrast issue',
            element: `${element.tagName.toLowerCase()}[${index}]`,
            impact: 'serious',
          });
        }
      }
    });
  }

  private checkKeyboardNavigation(): void {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');

      if (tabIndex && parseInt(tabIndex) > 0) {
        this.addIssue({
          type: 'warning',
          rule: 'tabindex-positive',
          message: 'Avoid positive tabindex values',
          element: `${element.tagName.toLowerCase()}[${index}]`,
          impact: 'moderate',
        });
      }
    });
  }

  private checkFocus(): void {
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element, ':focus');
      const outline = styles.outline;
      const outlineStyle = styles.outlineStyle;

      if (outline === 'none' || outlineStyle === 'none') {
        this.addIssue({
          type: 'warning',
          rule: 'focus-visible',
          message: 'Focusable element should have visible focus indicator',
          element: `${element.tagName.toLowerCase()}[${index}]`,
          impact: 'serious',
        });
      }
    });
  }

  private checkAria(): void {
    const elementsWithAria = document.querySelectorAll('[aria-labelledby], [aria-describedby]');

    elementsWithAria.forEach((element, index) => {
      const labelledBy = element.getAttribute('aria-labelledby');
      const describedBy = element.getAttribute('aria-describedby');

      if (labelledBy) {
        const labelElement = document.getElementById(labelledBy);
        if (!labelElement) {
          this.addIssue({
            type: 'error',
            rule: 'aria-labelledby',
            message: 'aria-labelledby references non-existent element',
            element: `${element.tagName.toLowerCase()}[${index}]`,
            impact: 'critical',
          });
        }
      }

      if (describedBy) {
        const descElement = document.getElementById(describedBy);
        if (!descElement) {
          this.addIssue({
            type: 'error',
            rule: 'aria-describedby',
            message: 'aria-describedby references non-existent element',
            element: `${element.tagName.toLowerCase()}[${index}]`,
            impact: 'critical',
          });
        }
      }
    });
  }

  private checkLandmarks(): void {
    const landmarks = document.querySelectorAll(
      'header, nav, main, aside, footer, [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]'
    );

    if (landmarks.length === 0) {
      this.addIssue({
        type: 'info',
        rule: 'landmarks',
        message: 'Page should have landmark elements for better navigation',
        impact: 'minor',
      });
    } else {
      this.passedRules.push('landmarks');
    }
  }

  private checkTables(): void {
    const tables = document.querySelectorAll('table');

    tables.forEach((table, index) => {
      const caption = table.querySelector('caption');
      const headers = table.querySelectorAll('th');

      if (!caption) {
        this.addIssue({
          type: 'warning',
          rule: 'table-caption',
          message: 'Table should have a caption',
          element: `table[${index}]`,
          impact: 'moderate',
        });
      }

      if (headers.length === 0) {
        this.addIssue({
          type: 'error',
          rule: 'table-headers',
          message: 'Table should have header cells',
          element: `table[${index}]`,
          impact: 'serious',
        });
      }
    });
  }

  private addIssue(issue: A11yIssue): void {
    this.issues.push(issue);
  }

  private generateReport(): A11yReport {
    const errors = this.issues.filter(issue => issue.type === 'error').length;
    const warnings = this.issues.filter(issue => issue.type === 'warning').length;
    const info = this.issues.filter(issue => issue.type === 'info').length;
    const total = errors + warnings + info;

    // Calculate score (simple scoring system)
    let score = 100;
    score -= errors * 10;
    score -= warnings * 5;
    score -= info * 1;
    score = Math.max(0, score);

    return {
      score,
      issues: this.issues,
      passedRules: this.passedRules,
      summary: {
        errors,
        warnings,
        info,
        total,
      },
    };
  }

  public generateRecommendations(): string[] {
    const recommendations: string[] = [];

    const errorsByRule = this.issues.reduce(
      (acc, issue) => {
        acc[issue.rule] = (acc[issue.rule] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

    // Generate recommendations based on common issues
    if (errorsByRule['img-alt']) {
      recommendations.push(
        'Add alt attributes to all images. Use empty alt="" for decorative images.'
      );
    }

    if (errorsByRule['button-name']) {
      recommendations.push(
        'Ensure all buttons have accessible names via text content or aria-label.'
      );
    }

    if (errorsByRule['form-label']) {
      recommendations.push(
        'Associate form controls with labels using for/id attributes or aria-labelledby.'
      );
    }

    if (errorsByRule['heading-hierarchy']) {
      recommendations.push('Use heading elements in proper hierarchical order (h1, h2, h3, etc.).');
    }

    if (errorsByRule['color-contrast']) {
      recommendations.push(
        'Ensure sufficient color contrast between text and background (4.5:1 for normal text, 3:1 for large text).'
      );
    }

    if (errorsByRule['focus-visible']) {
      recommendations.push('Provide visible focus indicators for all focusable elements.');
    }

    return recommendations;
  }

  public logReport(): void {
    const report = this.generateReport();
    const recommendations = this.generateRecommendations();

    logger.info('Accessibility Report', {
      score: report.score,
      summary: report.summary,
      recommendations,
    });
  }
}

export default AccessibilityChecker;

// Utility functions
export const a11yUtils = {
  // Check if element is focusable
  isFocusable: (element: Element): boolean => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    return focusableSelectors.some(selector => element.matches(selector));
  },

  // Get accessible name for element
  getAccessibleName: (element: Element): string => {
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy);
      if (labelElement) return labelElement.textContent || '';
    }

    if (element.tagName === 'IMG') {
      return element.getAttribute('alt') || '';
    }

    return element.textContent || '';
  },

  // Announce to screen readers
  announceToScreenReader: (message: string): void => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  },

  // Trap focus within element
  trapFocus: (element: Element): (() => void) => {
    const focusableElements = element.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
        }
};

    element.addEventListener('keydown', handleTabKey as EventListener);
    firstElement.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey as EventListener);
    };
  },
};
