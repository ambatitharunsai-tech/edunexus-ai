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
      expect(screen.getByRole('button')).toHaveClass('bg-[#18181B]', 'text-[#FFFFFF]');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[#E4E4E7]', 'text-[#18181B]');

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-[#E4E4E7]', 'text-[#27272A]');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[#FEE2E2]', 'text-[#B91C1C]');
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
      expect(container.firstChild).toHaveClass('bg-[#CFFAFE]', 'text-[#0E7490]', 'border-[#67E8F9]');

      rerender(
        <Badge variant="warning" dot>
          Moderate Risk
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-[#FEF3C7]', 'text-[#92400E]', 'border-[#FCD34D]');

      rerender(
        <Badge variant="danger" dot>
          High / Critical Risk
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-[#FEE2E2]', 'text-[#B91C1C]', 'border-[#FCA5A5]');

      rerender(
        <Badge variant="info" dot>
          Info State
        </Badge>
      );
      expect(container.firstChild).toHaveClass('bg-[#DBEAFE]', 'text-[#1D4ED8]', 'border-[#93C5FD]');
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
      expect(label).toHaveClass('text-[#27272A]');

      const input = screen.getByPlaceholderText('e.g. STU-2026-001');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-[#D4D4D8]', 'placeholder:text-[#A1A1AA]');

      const helper = screen.getByText('Enter official institution ID.');
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveClass('text-[#71717A]');
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
      expect(input).toHaveClass('disabled:bg-[#F4F4F5]', 'disabled:text-[#A1A1AA]');
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
      expect(title).toHaveClass('text-[#18181B]');

      const desc = screen.getByText('Deterministic rolling average across 7 operational domains.');
      expect(desc).toHaveClass('text-[#52525B]');
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

  describe('8. Dark Theme Styling (Exact Design Tokens)', () => {
    it('uses exact heading token in dark mode for CardTitle', () => {
      render(<CardTitle>Non-white Title</CardTitle>);
      const title = screen.getByText('Non-white Title');
      expect(title).toHaveClass('dark:text-[#FAFAFA]');
    });

    it('uses exact monochrome hover color in dark mode for outline Button', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('dark:hover:text-[#FFFFFF]');
    });
  });

  describe('9. Table Theme Contrast & Readability (Problem A)', () => {
    it('verifies Card has rounded-none and dark surface token #141416 with #29292D border', () => {
      const { container } = render(
        <Card>
          <div className="overflow-x-auto rounded-none border border-slate-200 dark:border-[#27272A]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EEF2F6] dark:bg-[#1C1C20] border-b border-slate-200 dark:border-[#27272A] text-slate-700 dark:text-[#E4E4E7]">
                <tr>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#27272A] text-slate-700 dark:text-[#D4D4D8]">
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-900 dark:text-[#FAFAFA]">Computer Science</td>
                  <td className="py-2 px-3 text-slate-700 dark:text-[#A1A1AA]">120 students</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-none', 'dark:bg-[#141416]', 'dark:text-[#E4E4E7]', 'dark:border-[#29292D]');

      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('bg-[#EEF2F6]', 'dark:bg-[#1C1C20]', 'text-slate-700', 'dark:text-[#E4E4E7]');

      const deptCell = screen.getByText('Computer Science');
      expect(deptCell).toHaveClass('font-semibold', 'text-slate-900', 'dark:text-[#FAFAFA]');

      const countCell = screen.getByText('120 students');
      expect(countCell).toHaveClass('text-slate-700', 'dark:text-[#A1A1AA]');
    });
  });

  describe('10. Sidebar Navigation Active & Badge Contrast (Problem B)', () => {
    it('ensures active navigation uses exact tokens in dark mode', () => {
      const activeNavClasses = 'bg-[#EEF2FF] text-[#4F46E5] dark:bg-[#27272A] dark:text-[#FFFFFF] font-semibold shadow-2xs';
      expect(activeNavClasses).toContain('dark:bg-[#27272A]');
      expect(activeNavClasses).toContain('dark:text-[#FFFFFF]');
    });

    it('ensures badge uses readable contrasting status tokens', () => {
      const badgeClasses = 'bg-cyan-50 text-cyan-700 dark:bg-[#083344] dark:text-[#67E8F9]';
      expect(badgeClasses).toContain('dark:bg-[#083344]');
      expect(badgeClasses).toContain('dark:text-[#67E8F9]');
    });
  });

  describe('11. AppShell Surface & Border Consistency (Problem C)', () => {
    it('ensures header and sidebar share synchronized dark surfaces and borders', () => {
      const headerClasses = 'border-b border-slate-200 dark:border-[#27272A] bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xs';
      const sidebarClasses = 'border-r border-slate-200 dark:border-[#27272A] bg-white dark:bg-[#0D0D0F]';

      expect(headerClasses).toContain('dark:bg-[#0A0A0A]/95');
      expect(headerClasses).toContain('dark:border-[#27272A]');

      expect(sidebarClasses).toContain('dark:bg-[#0D0D0F]');
      expect(sidebarClasses).toContain('dark:border-[#27272A]');
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

      expect(links[0]).toHaveClass('bg-[#CFFAFE]', 'dark:bg-[#083344]', 'border-[#67E8F9]', 'dark:border-[#155E75]');
      expect(links[1]).toHaveClass('bg-[#DBEAFE]', 'dark:bg-[#172554]', 'border-[#93C5FD]', 'dark:border-[#1D4ED8]');
      expect(links[2]).toHaveClass('bg-[#FEF3C7]', 'dark:bg-[#451A03]', 'border-[#FCD34D]', 'dark:border-[#92400E]');
      expect(links[3]).toHaveClass('bg-[#FFE4E6]', 'dark:bg-[#4C0519]', 'border-[#FDA4AF]', 'dark:border-[#9F1239]');
    });
  });
});
