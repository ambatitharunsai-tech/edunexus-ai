// EduNexus AI — Help & Support Center Page
// Features a client-side curated Q&A chatbot for institutional guidance.
// Strictly local: no chat messages are stored or transmitted.

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useAuth } from '../context';
import {
  HELP_ENTRIES,
  QUICK_TOPICS,
  CATEGORY_LABELS,
  type HelpCategory,
} from '../lib/helpContent';
import {
  type ChatMessage,
  createAssistantMessage,
  createUserMessage,
  getInitialMessages,
  isRoleAllowed,
} from '../lib/helpChatEngine';

export const HelpPage: React.FC = () => {
  const { session } = useAuth();
  const isStudent = session?.role?.toLowerCase() === 'student';
  const userRole: 'staff' | 'student' = isStudent ? 'student' : 'staff';

  // ───────────────────────────────────────────────────────────────────────────
  // Chat State
  // ───────────────────────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getInitialMessages(userRole)
  );
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // When role changes (e.g. login/switch), update welcome message
  const [prevUserRole, setPrevUserRole] = useState(userRole);
  if (prevUserRole !== userRole) {
    setPrevUserRole(userRole);
    setMessages(getInitialMessages(userRole));
  }

  const handleSendMessage = useCallback(
    (queryText?: string) => {
      const text = (queryText ?? inputQuery).trim();
      if (!text || isThinking) return;

      const userMsg = createUserMessage(text);
      setInputQuery('');
      setIsThinking(true);

      setMessages((prev) => {
        const updatedWithUser = [...prev, userMsg];
        // Brief realistic delay for UX responsiveness
        window.setTimeout(() => {
          const assistantMsg = createAssistantMessage(text, userRole, HELP_ENTRIES, updatedWithUser);
          setMessages((cur) => [...cur, assistantMsg]);
          setIsThinking(false);
        }, 240);
        return updatedWithUser;
      });
    },
    [inputQuery, isThinking, userRole]
  );

  const handleClearChat = useCallback(() => {
    setMessages(getInitialMessages(userRole));
    setInputQuery('');
    chatInputRef.current?.focus({ preventScroll: true });
  }, [userRole]);

  // ───────────────────────────────────────────────────────────────────────────
  // Quick Topics Filtered for Role
  // ───────────────────────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory | 'all'>('all');

  const availableTopics = useMemo(() => {
    return QUICK_TOPICS.filter((t) => isRoleAllowed(t.roles, userRole));
  }, [userRole]);

  const filteredTopics = useMemo(() => {
    if (selectedCategory === 'all') return availableTopics;
    return availableTopics.filter((t) => t.category === selectedCategory);
  }, [availableTopics, selectedCategory]);

  const availableCategories = useMemo(() => {
    const cats = new Set<HelpCategory>();
    availableTopics.forEach((t) => cats.add(t.category));
    return Array.from(cats);
  }, [availableTopics]);

  return (
    <div className="space-y-6 animate-float-up pb-10">
      {/* ── Page Header & Privacy Notice ─────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Help & Support Center
            </h2>
            <Badge variant="primary" size="sm" dot>
              {isStudent ? 'Student Guide' : 'Staff Knowledge Base'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Instant answers to common questions about EduNexus AI and institutional workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#151c19] border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-none shadow-2xs self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Local & In-Memory Only · Zero Data Persisted</span>
        </div>
      </div>

      {/* ── Curated Q&A Chatbot ─────────────────────────────────────────── */}
      <Card className="flex flex-col border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[580px] h-[640px]">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-[#18201d]/60 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-none bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  EduNexus Help Assistant
                </CardTitle>
                <CardDescription className="text-[11px] text-slate-500 dark:text-slate-400">
                  Curated institutional guidance · Instant keyword matching
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                title="Clear conversation history"
                className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs px-2.5"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Scrollable Message History */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/30 dark:bg-[#121715]/40"
          role="log"
          aria-live="polite"
          aria-label="Help chat messages"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-none bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-none px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-[#18201d] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {/* Category Pill for Assistant */}
                {msg.role === 'assistant' && msg.category && (
                  <div className="mb-1.5">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {CATEGORY_LABELS[msg.category]}
                    </span>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.content}</p>

                {/* Internal Link CTA if present */}
                {msg.internalLink && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to={msg.internalLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
                    >
                      <span>{msg.linkLabel || 'Navigate there now'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Contextual Suggestions below response */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => handleSendMessage(q)}
                          className="text-left text-[11px] px-2.5 py-1 rounded-none bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/70 text-slate-800 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-300 dark:border-slate-700 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[9px] text-right font-medium ${
                    msg.role === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Thinking / Typing Indicator */}
          {isThinking && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-none bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                <Spinner size="sm" className="text-indigo-600 dark:text-indigo-400" label="Searching knowledge base" />
              </div>
              <div className="bg-white dark:bg-[#18201d] border border-slate-200 dark:border-slate-700 rounded-none px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-none bg-indigo-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-none bg-indigo-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-none bg-indigo-500 animate-bounce [animation-delay:300ms]" />
                <span className="ml-1 text-[11px] font-medium">Searching knowledge base…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-[#151c19] border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={chatInputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about dashboards, risk scores, attendance, or interventions..."
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-none px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
              aria-label="Ask a question about EduNexus AI"
              disabled={isThinking}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputQuery.trim() || isThinking}
              className="shrink-0 px-3.5"
              title="Send query"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </Card>

      {/* ── Quick Help Topics Section ────────────────────────────────────── */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Frequently Asked Topics
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Click any topic card to immediately get answers in the chatbot above.
              </CardDescription>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-none text-xs font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All Topics
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-none text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredTopics.map((topic) => (
              <button
                key={topic.label}
                type="button"
                onClick={() => {
                  handleSendMessage(topic.query);
                }}
                className="p-3 text-left rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#18201d] hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/40 transition-all duration-150 group shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {CATEGORY_LABELS[topic.category]}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-900 dark:group-hover:text-indigo-300 transition-colors">
                    {topic.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.query}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-indigo-600 dark:text-indigo-400 opacity-90 group-hover:opacity-100">
                  <span>Ask chatbot</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
