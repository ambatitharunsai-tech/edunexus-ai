// EduNexus AI — Help & Support Center Page
// Features a client-side curated Q&A chatbot and an in-browser bandwidth speed estimator.
// Strictly local: no chat messages or speed measurements are stored or transmitted.

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Send,
  RefreshCw,
  Wifi,
  Activity,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Trash2,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Gauge,
  XCircle,
  Zap,
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
import {
  runSpeedTest,
  type SpeedTestResult,
} from '../lib/bandwidthEstimator';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

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
      setMessages((prev) => [...prev, userMsg]);
      setInputQuery('');
      setIsThinking(true);

      // Brief realistic delay for UX responsiveness
      window.setTimeout(() => {
        const assistantMsg = createAssistantMessage(text, userRole, HELP_ENTRIES);
        setMessages((prev) => [...prev, assistantMsg]);
        setIsThinking(false);
      }, 240);
    },
    [inputQuery, isThinking, userRole]
  );

  const handleClearChat = useCallback(() => {
    setMessages(getInitialMessages(userRole));
    setInputQuery('');
    chatInputRef.current?.focus();
  }, [userRole]);

  // ───────────────────────────────────────────────────────────────────────────
  // Bandwidth Speed Test State
  // ───────────────────────────────────────────────────────────────────────────
  const [speedResult, setSpeedResult] = useState<SpeedTestResult | null>(null);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(0);
  const [bytesLoaded, setBytesLoaded] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleStartSpeedTest = useCallback(async () => {
    if (isTestingSpeed) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsTestingSpeed(true);
    setSpeedProgress(0);
    setBytesLoaded(0);
    setSpeedResult({
      speedMbps: 0,
      latencyMs: 0,
      status: 'running',
      recommendation: 'Measuring download speed...',
    });

    try {
      const result = await runSpeedTest({
        probeUrl: '/probe.bin',
        signal: controller.signal,
        timeoutMs: 15000,
        onProgress: (pct, loaded) => {
          setSpeedProgress(pct);
          setBytesLoaded(loaded);
        },
      });
      setSpeedResult(result);
    } catch {
      setSpeedResult({
        speedMbps: 0,
        latencyMs: 0,
        status: 'error',
        recommendation: 'An unexpected error occurred during speed estimation.',
        errorMessage: 'Unable to complete test.',
      });
    } finally {
      setIsTestingSpeed(false);
      abortControllerRef.current = null;
    }
  }, [isTestingSpeed]);

  const handleCancelSpeedTest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTestingSpeed(false);
    setSpeedResult({
      speedMbps: 0,
      latencyMs: 0,
      status: 'cancelled',
      recommendation: 'Speed test was cancelled.',
    });
  }, []);

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
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Help & Support Center
            </h2>
            <Badge variant="primary" size="sm" dot>
              {isStudent ? 'Student Guide' : 'Staff Knowledge Base'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Instant answers to common questions about EduNexus AI and an in-browser connection speed diagnostics guide.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-none shadow-2xs self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Local & In-Memory Only · Zero Data Persisted</span>
        </div>
      </div>

      {/* ── Main Two-Column Grid: Chat Assistant & Bandwidth Estimator ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT: Curated Q&A Chatbot (7 cols) ─────────────────────────── */}
        <Card className="lg:col-span-7 flex flex-col border-slate-200 shadow-sm overflow-hidden min-h-[580px] h-[640px]">
          <CardHeader className="border-b border-slate-100 bg-slate-50/60 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-none bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-sm font-bold text-slate-900 truncate">
                    EduNexus Help Assistant
                  </CardTitle>
                  <CardDescription className="text-[11px] text-slate-500">
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
                  className="text-slate-500 hover:text-slate-800 text-xs px-2.5"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Scrollable Message History */}
          <div
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/30"
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
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-indigo-200 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-none px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-800 border border-slate-200'
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
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />
                  <span className="ml-1 text-[11px] font-medium">Searching knowledge base…</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
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

        {/* ── RIGHT: Bandwidth Guide & Speed Estimator (5 cols) ──────────── */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="border-slate-200 shadow-sm flex flex-col justify-between">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-none bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Bandwidth Guide
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-500">
                      Client-side download speed probe & diagnosis
                    </CardDescription>
                  </div>
                </div>

                <Badge variant="info" size="sm">
                  Same-Origin
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimate your network throughput by downloading a static 5 MiB probe asset directly from this application. This helps determine if sluggish chart loading or navigation is caused by local network constraints.
              </p>

              {/* Speed Meter / Display Box */}
              <div className="rounded-none border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 p-4 text-center space-y-3">
                {isTestingSpeed ? (
                  <div className="space-y-3 py-3">
                    <div className="flex items-center justify-center gap-2.5 text-indigo-600 dark:text-indigo-400">
                      <Spinner size="sm" className="text-indigo-600 dark:text-indigo-400" label="Measuring download speed" />
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Measuring download speed…
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-none h-2.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-none transition-all duration-150"
                        style={{ width: `${Math.max(5, speedProgress)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 font-mono font-medium">
                      <span>{speedProgress}% complete</span>
                      <span>{(bytesLoaded / 1024).toFixed(0)} KB loaded</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelSpeedTest}
                      className="text-xs mt-1 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Cancel Test
                    </Button>
                  </div>
                ) : speedResult?.status === 'complete' ? (
                  <div className="space-y-2.5 py-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Estimated Download Speed
                    </p>
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                        {speedResult.speedMbps}
                      </span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Mbps</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <Badge
                        variant={
                          speedResult.speedMbps >= 25
                            ? 'success'
                            : speedResult.speedMbps >= 5
                            ? 'primary'
                            : speedResult.speedMbps >= 1
                            ? 'warning'
                            : 'danger'
                        }
                        size="md"
                        dot
                      >
                        {speedResult.speedMbps >= 25
                          ? 'Optimal (25+ Mbps)'
                          : speedResult.speedMbps >= 5
                          ? 'Good (5–25 Mbps)'
                          : speedResult.speedMbps >= 1
                          ? 'Moderate (1–5 Mbps)'
                          : 'Low (< 1 Mbps)'}
                      </Badge>
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                        Latency: {speedResult.latencyMs} ms
                      </span>
                    </div>

                    {/* Recommendation Box */}
                    <div className="mt-3 p-3 rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#18201d] text-left text-xs leading-relaxed text-slate-800 dark:text-slate-200 shadow-2xs">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        Network Recommendation
                      </p>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300">{speedResult.recommendation}</p>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStartSpeedTest}
                        className="text-xs w-full"
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                        Test Again
                      </Button>
                    </div>
                  </div>
                ) : speedResult?.status === 'error' ? (
                  <div className="space-y-2 py-2 text-rose-700">
                    <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                    <p className="text-xs font-bold">Speed Test Error</p>
                    <p className="text-[11px] text-slate-600">{speedResult.recommendation}</p>
                    {speedResult.errorMessage && (
                      <p className="text-[10px] font-mono text-rose-600 bg-rose-50 p-1.5 rounded-none border border-rose-200">
                        {speedResult.errorMessage}
                      </p>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleStartSpeedTest}
                      className="text-xs mt-2"
                    >
                      Retry Test
                    </Button>
                  </div>
                ) : speedResult?.status === 'cancelled' ? (
                  <div className="space-y-2 py-2 text-slate-600">
                    <Activity className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold">Test Cancelled</p>
                    <p className="text-[11px] text-slate-500">No measurement was recorded.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleStartSpeedTest}
                      className="text-xs mt-1"
                    >
                      Start Test
                    </Button>
                  </div>
                ) : (
                  <div className="py-4 space-y-3">
                    <Gauge className="w-10 h-10 text-indigo-500/80 mx-auto" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Ready to Measure</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Downloads 5 MiB (5,242,880 bytes) directly from this server.
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleStartSpeedTest}
                      className="w-full text-xs font-semibold shadow-2xs"
                    >
                      <Zap className="w-4 h-4 mr-1.5" />
                      Run Speed Test
                    </Button>
                  </div>
                )}
              </div>

              {/* Troubleshooting Tips */}
              <div className="p-3 rounded-none border border-slate-200 bg-white space-y-2 text-xs">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5 text-[11px]">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  Tips for Low-Bandwidth Environments
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 leading-normal">
                  <li>Enable <strong>Compact navigation</strong> in your profile settings.</li>
                  <li>Enable <strong>Reduce motion</strong> to disable heavy animation loops.</li>
                  <li>Close unused tabs streaming video or performing file downloads.</li>
                  <li>If on Wi-Fi, move closer to your router or switch to Ethernet.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── BOTTOM: Quick Help Topics Section ────────────────────────────── */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">
                Frequently Asked Topics
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Click any topic card to immediately get answers in the chatbot above.
              </CardDescription>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Topics
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 text-left rounded-none border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-150 group shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {CATEGORY_LABELS[topic.category]}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900 transition-colors">
                    {topic.label}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {topic.query}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-indigo-600 opacity-90 group-hover:opacity-100">
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
