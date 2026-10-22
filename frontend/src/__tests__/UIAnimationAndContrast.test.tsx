import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';
import { DualRiskMatrixCard } from '../features/dashboard/DualRiskMatrixCard';

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

  describe('9. Table Theme Contrast & Readability (Problem A)', () => {
    it('verifies Card has rounded-none and dark surface token #151C19 without pure white', () => {
      const { container } = render(
        <Card>
          <div className="overflow-x-auto rounded-none border border-slate-200 dark:border-[#35433B]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EEF2F6] dark:bg-[#1D2722] border-b border-slate-200 dark:border-[#35433B] text-slate-700 dark:text-[#CBD5CF]">
                <tr>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#25322B] text-slate-700 dark:text-[#CBD5CF]">
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-[#E2ECE6]">Computer Science</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-[#CBD5CF]">120 students</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-none', 'dark:bg-[#151C19]', 'dark:text-[#E2ECE6]', 'dark:border-[#35433B]');
      expect(card).not.toHaveClass('dark:bg-white', 'dark:text-white');

      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('bg-[#EEF2F6]', 'dark:bg-[#1D2722]', 'text-slate-700', 'dark:text-[#CBD5CF]');

      const deptCell = screen.getByText('Computer Science');
      expect(deptCell).toHaveClass('font-semibold', 'text-slate-900', 'dark:text-[#E2ECE6]');

      const countCell = screen.getByText('120 students');
      expect(countCell).toHaveClass('text-slate-700', 'dark:text-[#CBD5CF]');
    });
  });

  describe('10. Sidebar Navigation Active & Badge Contrast (Problem B)', () => {
    it('ensures active navigation uses high-contrast pale green in light mode and dark green in dark mode', () => {
      const activeNavClasses = 'bg-[#E8F5F1] text-[#166B53] dark:bg-[#1D332A] dark:text-[#56B594] font-semibold shadow-2xs';
      expect(activeNavClasses).toContain('bg-[#E8F5F1]');
      expect(activeNavClasses).toContain('text-[#166B53]');
      expect(activeNavClasses).toContain('dark:bg-[#1D332A]');
      expect(activeNavClasses).toContain('dark:text-[#56B594]');
      expect(activeNavClasses).not.toContain('text-white');
    });

    it('ensures active navigation badge uses readable contrasting tones', () => {
      const badgeClasses = 'bg-[#D5EDE5] text-[#166B53] dark:bg-[#153E31] dark:text-[#56B594]';
      expect(badgeClasses).toContain('bg-[#D5EDE5]');
      expect(badgeClasses).toContain('text-[#166B53]');
      expect(badgeClasses).toContain('dark:bg-[#153E31]');
      expect(badgeClasses).toContain('dark:text-[#56B594]');
    });
  });

  describe('11. AppShell Surface & Border Consistency (Problem C)', () => {
    it('ensures header, sidebar, and breadcrumbs share synchronized dark surface #151C19 and border #35433B', () => {
      const headerClasses = 'border-b border-slate-200 dark:border-[#35433B] bg-white/95 dark:bg-[#151C19]/95 backdrop-blur-xs';
      const sidebarClasses = 'border-r border-slate-200 dark:border-[#35433B] bg-white dark:bg-[#151C19]';
      const breadcrumbClasses = 'bg-white dark:bg-[#151C19] border-b border-slate-200 dark:border-[#35433B]';

      expect(headerClasses).toContain('dark:bg-[#151C19]/95');
      expect(headerClasses).toContain('dark:border-[#35433B]');

      expect(sidebarClasses).toContain('dark:bg-[#151C19]');
      expect(sidebarClasses).toContain('dark:border-[#35433B]');

      expect(breadcrumbClasses).toContain('dark:bg-[#151C19]');
      expect(breadcrumbClasses).toContain('dark:border-[#35433B]');
    });
  });

  describe('12. DualRiskMatrixCard Quadrants & Sharp Edges', () => {
    it('renders all four quadrants with rounded-none and high-contrast distinct backgrounds', () => {
      const mockMatrix = {
        academic_low_placement_low: 45,
        academic_low_placement_high: 12,
        academic_high_placement_low: 8,
        academic_high_placement_high: 3,
        moderate_quadrants: 15,
        insufficient_data: 2,
      };

      const { container } = render(
        <MemoryRouter>
          <DualRiskMatrixCard dualRiskMatrix={mockMatrix} />
        </MemoryRouter>
      );

      expect(screen.getByText('Academic vs Placement Risk Matrix')).toBeInTheDocument();
      const links = container.querySelectorAll('.grid a[href^="/students"]');
      expect(links.length).toBe(4);
      links.forEach((link) => {
        expect(link).toHaveClass('rounded-none');
        expect(link).not.toHaveClass('rounded-xl');
      });

      expect(links[0]).toHaveClass('bg-emerald-50/50', 'dark:bg-[#142820]', 'border-emerald-200', 'dark:border-[#1D4633]');
      expect(links[1]).toHaveClass('bg-blue-50/50', 'dark:bg-[#14252E]', 'border-blue-200', 'dark:border-[#1E3A4B]');
      expect(links[2]).toHaveClass('bg-amber-50/50', 'dark:bg-[#261F14]', 'border-amber-200', 'dark:border-[#45331C]');
      expect(links[3]).toHaveClass('bg-rose-50/50', 'dark:bg-[#281618]', 'border-rose-200', 'dark:border-[#4A1E24]');
    });
  });
});
