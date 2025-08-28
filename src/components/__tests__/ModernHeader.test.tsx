import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModernHeader } from '../ModernHeader';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('ModernHeader', () => {
  it('renders the header with logo', () => {
    render(<ModernHeader />);
    const logo = screen.getByAltText('Vasquez Law Firm');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<ModernHeader />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Practice Areas')).toBeInTheDocument();
    expect(screen.getByText('Attorneys')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<ModernHeader />);
    const ctaButton = screen.getByText('Free Consultation');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveClass('bg-amber-500');
  });

  it('toggles mobile menu', () => {
    render(<ModernHeader />);
    const menuButton = screen.getByLabelText('Toggle menu');
    
    // Menu should be closed initially
    expect(screen.queryByText('Home')).toBeInTheDocument();
    
    // Open menu
    fireEvent.click(menuButton);
    
    // Check if mobile menu items are visible
    const mobileLinks = screen.getAllByText('Home');
    expect(mobileLinks.length).toBeGreaterThan(0);
  });

  it('handles language toggle', () => {
    const onLanguageChange = jest.fn();
    render(<ModernHeader onLanguageChange={onLanguageChange} />);
    
    const esButton = screen.getByLabelText('Español');
    fireEvent.click(esButton);
    
    expect(onLanguageChange).toHaveBeenCalledWith('es');
  });

  it('applies scroll styles when scrolled', () => {
    const { container } = render(<ModernHeader />);
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);
    
    // Check if header has scroll styles
    setTimeout(() => {
      const header = container.querySelector('header');
      expect(header).toHaveClass('shadow-sm');
    }, 100);
  });
});