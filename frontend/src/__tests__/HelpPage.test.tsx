import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelpPage } from '../pages/HelpPage';
import { AuthContext, type AuthContextValue } from '../context/AuthContext';

const renderHelpPage = (role: 'advisor' | 'student' = 'advisor') => {
  const isStaff = role !== 'student';
  const mockAuth: AuthContextValue = {
    session: {
      token: 'mock-token',
      userId: 'test-user-id',
      email: `${role}@edunexus.ai`,
      role,
      isDemoSession: true,
    },
    isAuthenticated: true,
    isStaff,
    signIn: vi.fn(),
    signOut: vi.fn(),
    refreshSession: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter>
        <HelpPage />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('HelpPage Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Element.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn();
  });

  it('renders page header and privacy notice', () => {
    renderHelpPage('advisor');
    expect(screen.getByText('Help & Support Center')).toBeInTheDocument();
    expect(screen.getByText(/Local & In-Memory Only/i)).toBeInTheDocument();
  });

  it('renders staff badge for staff role', () => {
    renderHelpPage('advisor');
    expect(screen.getByText('Staff Knowledge Base')).toBeInTheDocument();
  });

  it('renders student badge for student role', () => {
    renderHelpPage('student');
    expect(screen.getByText('Student Guide')).toBeInTheDocument();
  });

  it('renders initial welcome message in the chat panel', () => {
    renderHelpPage('advisor');
    expect(screen.getByText(/EduNexus AI Staff Help Assistant/i)).toBeInTheDocument();
  });

  it('allows user to send a chat message and receive an assistant response', async () => {
    renderHelpPage('advisor');
    const input = screen.getByLabelText(/Ask a question about EduNexus AI/i);

    fireEvent.change(input, { target: { value: 'How does authentication work?' } });
    fireEvent.submit(input.closest('form')!);

    // User message should appear in chat
    expect(screen.getByText('How does authentication work?')).toBeInTheDocument();

    // Assistant response should appear after brief delay
    await waitFor(
      () => {
        expect(
          screen.getByText(/You sign in with a bearer token on the login page/i)
        ).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('clears chat when Reset button is clicked', async () => {
    renderHelpPage('advisor');
    const input = screen.getByLabelText(/Ask a question about EduNexus AI/i);

    fireEvent.change(input, { target: { value: 'Can I change theme colors?' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByText('Can I change theme colors?')).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // After reset, question should be cleared
    expect(screen.queryByText('Can I change theme colors?')).not.toBeInTheDocument();
    expect(screen.getByText(/EduNexus AI Staff Help Assistant/i)).toBeInTheDocument();
  });

  it('does NOT render the Bandwidth Guide widget or speed test controls', () => {
    renderHelpPage('advisor');
    // Ensure all Bandwidth Guide elements are completely removed
    expect(screen.queryByText('Bandwidth Guide')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /run speed test/i })).not.toBeInTheDocument();
    expect(screen.queryByText('Same-Origin')).not.toBeInTheDocument();
    expect(screen.queryByText(/Tips for Low-Bandwidth Environments/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Client-side download speed probe & diagnosis/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Estimated Download Speed/i)).not.toBeInTheDocument();
  });

  it('renders Quick Topics and clicking a topic triggers a question without auto-scrolling', async () => {
    renderHelpPage('advisor');
    const topicButton = screen.getByText('Getting started');
    expect(topicButton).toBeInTheDocument();

    fireEvent.click(topicButton);

    // Question should be in chat messages
    const chatLog = screen.getByRole('log', { name: /help chat messages/i });
    expect(chatLog).toHaveTextContent('What is EduNexus AI?');

    await waitFor(
      () => {
        expect(
          screen.getByText(/EduNexus AI is a student journey intelligence platform/i)
        ).toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Verify window.scrollTo and scrollIntoView were not called
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it('does not trigger automatic window.scrollTo or element.scrollIntoView on mount or when sending messages', async () => {
    renderHelpPage('advisor');
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();

    const input = screen.getByLabelText(/Ask a question about EduNexus AI/i);
    fireEvent.change(input, { target: { value: 'What do the risk tiers mean?' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Risk tiers \(Low, Moderate, High, Critical\) are advisory indicators/i)
        ).toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
