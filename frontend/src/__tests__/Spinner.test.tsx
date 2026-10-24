import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../components/ui/Spinner';

describe('Spinner Component', () => {
  it('renders with role="status" and aria-live="polite"', () => {
    render(<Spinner />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('renders default screen-reader text "Loading..."', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });

  it('renders custom screen-reader label when provided', () => {
    render(<Spinner label="Fetching student records..." />);
    expect(screen.getByText('Fetching student records...')).toBeInTheDocument();
  });

  it('renders visible text when showLabel is true', () => {
    render(<Spinner label="Calculating risk score..." showLabel />);
    const visibleLabel = screen.getByText('Calculating risk score...');
    expect(visibleLabel).toBeInTheDocument();
    expect(visibleLabel).not.toHaveClass('sr-only');
  });

  it('renders circular SVG with .spinner-circle and .animate-spin classes', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('spinner-circle');
    expect(svg).toHaveClass('animate-spin');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('contains background track circle and foreground rotating arc', () => {
    const { container } = render(<Spinner />);
    const circle = container.querySelector('circle');
    const path = container.querySelector('path');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '12');
    expect(circle).toHaveAttribute('cy', '12');
    expect(circle).toHaveAttribute('r', '9.5');
    expect(path).toBeInTheDocument();
  });

  it('supports size variants sm, md, lg, xl', () => {
    const { rerender, container } = render(<Spinner size="sm" />);
    expect(container.querySelector('svg')).toHaveClass('w-4', 'h-4');

    rerender(<Spinner size="md" />);
    expect(container.querySelector('svg')).toHaveClass('w-6', 'h-6');

    rerender(<Spinner size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('w-8', 'h-8');

    rerender(<Spinner size="xl" />);
    expect(container.querySelector('svg')).toHaveClass('w-10', 'h-10');
  });

  it('merges custom className and color overrides', () => {
    const { container } = render(<Spinner className="text-emerald-500 custom-spinner" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-emerald-500', 'custom-spinner');
  });
});
