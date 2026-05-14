'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to send your message.');
      }

      setStatus('success');
      setMessage(data?.message || 'Thanks. Your message has been received.');
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,38,0.94),rgba(6,14,28,0.96))] p-6 shadow-[0_28px_60px_rgba(2,8,20,0.55)] backdrop-blur md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#97b3e6]">Message Console</p>
          <p className="mt-1 text-sm text-[#afc1e2]">Tell us what you need and we will route it fast.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#d8e5ff]">
          Full name
          <input name="name" required placeholder="Your name" className="h-12 rounded-xl border border-[#2a3a62] bg-[#0c1833] px-4 text-base font-medium text-[#f4f8ff] outline-none transition placeholder:text-[#6d7fa6] focus:border-[#67e8f9] focus:bg-[#102146]" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#d8e5ff]">
          Email address
          <input name="email" type="email" required placeholder="you@example.com" className="h-12 rounded-xl border border-[#2a3a62] bg-[#0c1833] px-4 text-base font-medium text-[#f4f8ff] outline-none transition placeholder:text-[#6d7fa6] focus:border-[#67e8f9] focus:bg-[#102146]" />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#d8e5ff]">
          Phone number
          <input name="phone" placeholder="Optional" className="h-12 rounded-xl border border-[#2a3a62] bg-[#0c1833] px-4 text-base font-medium text-[#f4f8ff] outline-none transition placeholder:text-[#6d7fa6] focus:border-[#67e8f9] focus:bg-[#102146]" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#d8e5ff]">
          Subject
          <input name="subject" placeholder="How can we help?" className="h-12 rounded-xl border border-[#2a3a62] bg-[#0c1833] px-4 text-base font-medium text-[#f4f8ff] outline-none transition placeholder:text-[#6d7fa6] focus:border-[#67e8f9] focus:bg-[#102146]" />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-semibold text-[#d8e5ff]">
        Message
        <textarea name="message" required rows={6} placeholder="Tell us what you need help with..." className="rounded-xl border border-[#2a3a62] bg-[#0c1833] px-4 py-3 text-base font-medium text-[#f4f8ff] outline-none transition placeholder:text-[#6d7fa6] focus:border-[#67e8f9] focus:bg-[#102146]" />
      </label>

      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${status === 'success' ? 'border-emerald-300/30 bg-emerald-500/15 text-emerald-200' : 'border-red-300/30 bg-red-500/15 text-red-200'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}

      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-[linear-gradient(90deg,#1d4ed8,#0891b2)] px-6 text-sm font-black uppercase tracking-[0.24em] text-white shadow-[0_14px_28px_rgba(14,116,144,0.45)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send message
      </button>
    </form>
  );
}
