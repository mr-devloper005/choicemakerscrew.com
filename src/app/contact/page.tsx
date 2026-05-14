import { ArrowUpRight, Clock3, MailCheck, Radar, Sparkles, Workflow } from 'lucide-react';

import { ContactLeadForm } from '@/components/shared/contact-lead-form';
import { Footer } from '@/components/shared/footer';
import { NavbarShell } from '@/components/shared/navbar-shell';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Choice Makers Crew';

const contactSignals = [
  {
    icon: Radar,
    title: 'Signal Received',
    copy: 'Every request is recorded as a clear signal so nothing gets lost between teams.',
  },
  {
    icon: Workflow,
    title: 'Routed to Action',
    copy: 'Your note is routed by topic and urgency, then assigned for follow-up.',
  },
  {
    icon: MailCheck,
    title: 'Response Logged',
    copy: 'Replies are tracked so the full context stays visible through resolution.',
  },
];

const responseMoments = [
  { label: '0-10 min', detail: 'Initial triage and tagging', icon: Clock3 },
  { label: 'Within 24h', detail: 'First meaningful response', icon: Sparkles },
  { label: 'After submit', detail: 'Confirmation in your inbox', icon: ArrowUpRight },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060910] text-[#ecf4ff]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#2d67ff]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#22d3ee]/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.12),transparent_30%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-bold leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Start a conversation that actually moves.
              </h1>

              <p className="max-w-2xl text-base leading-8 text-[#b6c6e6] sm:text-lg">
                Reach {siteName} with one clear message. We route requests with intent,
                track each step, and keep your context intact from first touch to resolution.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {responseMoments.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-[#0b1328]/80 px-4 py-4 shadow-[0_18px_44px_rgba(2,9,25,0.4)]"
                  >
                    <item.icon className="h-4 w-4 text-[#7dd3fc]" />
                    <p className="mt-2 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#95a8ca]">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 pt-1">
                {contactSignals.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(17,28,55,0.86),rgba(9,15,30,0.88))] p-5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#7dd3fc]/25 bg-[#0b1732] text-[#7dd3fc]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white">{item.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-[#98aad0]">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-[1.8rem] bg-[linear-gradient(140deg,rgba(45,103,255,0.7),rgba(34,211,238,0.45),rgba(56,189,248,0.2))] blur-md" />
              <div className="relative rounded-[1.7rem] border border-white/10 bg-[linear-gradient(165deg,rgba(6,12,28,0.96),rgba(7,14,30,0.94))] p-1.5">
                <ContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
