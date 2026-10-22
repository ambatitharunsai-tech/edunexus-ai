import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useState } from 'react';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

describe('UI Animation, Spinner Lifecycle, and Contrast Verification', () => {
  describe('1. Spinner Lifecycle & Rotation', () => {
    // Simulated async task component
    const SimulatedTaskComponent = ({ onComplete }: { onComplete?: () => void }) => {
      const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'cancelled'>('idle');

      return (
        <div>
          <button type="button" onClick={() => setStatus('loading')}>Start Operation</button>
          <button type="button" onClick={() => { setStatus('success'); onComplete?.(); }}>Complete</button>
          <button type="button" onClick={() => setStatus('error')}>Fail</button>
          <button type="button" onClick={() => setStatus('cancelled')}>Cancel</button>

          {status === 'loading' && (
            <div data-testid="active-loader">
              <Spinner size="lg" label="Processing telemetry batch…" showLabel />
            </div>
          )}
          {status === 'success' && <div data-testid="success-state">Operation succeeded</div>}
          {status === 'error' && <div data-testid="error-state">Operation failed</div>}
          {status === 'cancelled' && <div data-testid="cancelled-state">Operation cancelled</div>}
        </div>
      );
    };

    it('renders rotating circular loader while loading operation is in progress', () => {
      const { getByText, getByTestId, queryByTestId } = render(<SimulatedTaskComponent />);

      // Initially idle — no spinner
      expect(queryByTestId('active-loader')).not.toBeInTheDocument();

      // Trigger loading
      act(() => {
        getByText('Start Operation').click();
      });

      const loaderContainer = getByTestId('active-loader');
      expect(loaderContainer).toBeInTheDocument();

      const spinner = loaderContainer.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
      expect(spinner).toHaveClass('spinner-circle');
      expect(screen.getByText('Processing telemetry batch…')).toBeInTheDocument();
    });

    it('spinner disappears immediately when operation completes successfully', () => {
      const { getByText, queryByTestId } = render(<SimulatedTaskComponent />);

      act(() => {
        getByText('Start Operation').click();
      });
      expect(queryByTestId('active-loader')).toBeInTheDocument();

      act(() => {
        getByText('Complete').click();
      });

      expect(queryByTestId('active-loader')).not.toBeInTheDocument();
      expect(queryByTestId('success-state')).toBeInTheDocument();
    });

    it('spinner disappears immediately on error or failure', () => {
      const { getByText, queryByTestId } = render(<SimulatedTaskComponent />);

      act(() => {
        getByText('Start Operation').click();
      });
      expect(queryByTestId('active-loader')).toBeInTheDocument();

      act(() => {
        getByText('Fail').click();
      });

      expect(queryByTestId('active-loader')).not.toBeInTheDocument();
      expect(queryByTestId('error-state')).toBeInTheDocument();
    });

    it('spinner disappears immediately on cancellation', () => {
      const { getByText, queryByTestId } = render(<SimulatedTaskComponent />);

      act(() => {
        getByText('Start Operation').click();
      });
      expect(queryByTestId('active-loader')).toBeInTheDocument();

      act(() => {
        getByText('Cancel').click();
      });

      expect(queryByTestId('active-loader')).not.toBeInTheDocument();
      expect(queryByTestId('cancelled-state')).toBeInTheDocument();
    });
  });

  describe('2. Accessibility & Reduced Motion Feedback', () => {
    it('provides accessible role="status" and readable label even inside reduced-motion containers', () => {
      const { container } = render(
        <div className="reduce-motion">
          <Spinner size="md" label="Loading student records…" showLabel />
        </div>
      );

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
      expect(status).toHaveAttribute('aria-live', 'polite');

      const label = screen.getByText('Loading student records…');
      expect(label).toBeInTheDocument();

      // The SVG retains its identifying spinner-circle hook for the CSS gentle pulse rule
      const svg = container.querySelector('.spinner-circle');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('3. Button Loading & Contrast States', () => {
    it('displays circular spinner and disables interaction when isLoading is true', () => {
      const handleClick = vi.fn();
      const { container, rerender } = render(
        <Button isLoading={true} onClick={handleClick}>
          Submit Record
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');

      const spinner = container.querySelector('.spinner-circle');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');

      // Re-render when loading finishes
      rerender(
        <Button isLoading={false} onClick={handleClick}>
          Submit Record
        </Button>
      );

      expect(button).not.toBeDisabled();
      expect(button).not.toHaveAttribute('aria-busy');
      expect(container.querySelector('.spinner-circle')).not.toBeInTheDocument();
    });

    it('applies high-contrast variants for primary, secondary, outline, and danger', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-indigo-600', 'text-white');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-slate-100', 'text-slate-800');

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-slate-300', 'text-slate-700');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-rose-600', 'text-white');
    });
  });

  describe('4. Badge & Status Color Distinguishability', () => {
    it('renders distinct high-contrast colors and borders for all risk levels', () => {
      const { container, rerender } = render(
        <Badge variant="success" dot>
          Low Risk
        </Badge>
      );
      expect(screen.getByText('Low Risk')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('bg-emerald-50', 'text-emerald-800', 'border-emerald-200');

      rerender(
        <Badge variant="warning" dot>
          Moderate Risk
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-amber-50', 'text-amber-900', 'border-amber-300');

      rerender(
        <Badge variant="danger" dot>
          High / Critical Risk
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-rose-50', 'text-rose-800', 'border-rose-200');

      rerender(
        <Badge variant="info" dot>
          Info State
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-sky-50', 'text-sky-800', 'border-sky-200');
    });
  });

  describe('5. Form Inputs & Readability', () => {
    it('renders clear readable placeholders, labels, and borders', () => {
      render(
        <Input
          label="Student Registration Code"
          placeholder="e.g. STU-2026-001"
          helperText="Enter official institution ID."
        />
      );

      const label = screen.getByText('Student Registration Code');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('text-slate-700');

      const input = screen.getByPlaceholderText('e.g. STU-2026-001');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-slate-300', 'placeholder:text-slate-500');

      const helper = screen.getByText('Enter official institution ID.');
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveClass('text-slate-600');
    });

    it('maintains visible text in disabled state while signalling non-interactivity', () => {
      render(
        <Input
          label="Locked Record"
          value="STU-LOCKED-999"
          disabled
        />
      );

      const input = screen.getByDisplayValue('STU-LOCKED-999');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:bg-slate-100', 'disabled:text-slate-500');
    });
  });

  describe('6. Cards & Typography Hierarchy', () => {
    it('renders clear titles and descriptions without pale text washouts', () => {
      render(
        <Card>
          <CardTitle>Cohort Academic Trajectory</CardTitle>
          <CardDescription>
            Deterministic rolling average across 7 operational domains.
          </CardDescription>
        </Card>
      );

      const title = screen.getByText('Cohort Academic Trajectory');
      expect(title).toHaveClass('text-slate-900');

      const desc = screen.getByText('Deterministic rolling average across 7 operational domains.');
      expect(desc).toHaveClass('text-slate-600');
    });
  });

  describe('7. Sharp Edges Verification (Zero Border Radius)', () => {
    it('applies rounded-none to Button component for sharp edges', () => {
      render(<Button>Sharp Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('rounded-none');
    });

    it('applies rounded-none to Card component for sharp edges', () => {
      const { container } = render(<Card>Sharp Card Content</Card>);
      expect(container.firstChild).toHaveClass('rounded-none');
    });

    it('applies rounded-none to Input component for sharp edges', () => {
      render(<Input placeholder="Sharp input" />);
      expect(screen.getByPlaceholderText('Sharp input')).toHaveClass('rounded-none');
    });

    it('applies rounded-none to Badge component for sharp edges', () => {
      const { container } = render(<Badge variant="primary" dot>Sharp Badge</Badge>);
      expect(container.firstChild).toHaveClass('rounded-none');
    });
  });

  describe('8. Dark Theme Styling (No Pure White)', () => {
    it('uses non-white comfortable tints in dark mode for CardTitle', () => {
      render(<CardTitle>Non-white Title</CardTitle>);
      const title = screen.getByText('Non-white Title');
      expect(title).toHaveClass('dark:text-[#e2ece6]');
      expect(title).not.toHaveClass('dark:text-white');
    });

    it('uses non-white hover color in dark mode for outline Button', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('dark:hover:text-[#e2ece6]');
      expect(button).not.toHaveClass('dark:hover:text-white');
    });
  });
});
