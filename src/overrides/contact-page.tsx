import { BookOpen, Clock3, Feather, Mail, MessageSquare, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    icon: BookOpen,
    title: 'Editorial submissions',
    body: 'Pitch essays, long-form analysis, and feature ideas aligned with the journal style.',
  },
  {
    icon: Mail,
    title: 'Partnership requests',
    body: 'Collaborate on sponsored issues, newsletter placements, and publication campaigns.',
  },
  {
    icon: MessageSquare,
    title: 'Reader support',
    body: 'Get help with account access, saved reading lists, and on-site publishing questions.',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="editorial-badge">
              <Feather className="h-3.5 w-3.5" />
              Contact the editorial desk
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-[-0.05em] text-foreground sm:text-6xl">
              Let&apos;s talk about your next story.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground">
              Share what you are building, publishing, or trying to improve. We route each message
              through the right lane so replies are focused, relevant, and fast.
            </p>

            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.4rem] border border-white/10 bg-card p-5">
                  <lane.icon className="h-5 w-5 text-[rgb(232,168,50)]" />
                  <h2 className="mt-3 text-xl font-semibold text-foreground">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-card p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(232,168,50)]">
              Send a message
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em]">We usually reply within a day</h2>
            <form className="mt-6 grid gap-4">
              <input className="form-input" placeholder="Your name" />
              <input className="form-input" placeholder="Email address" />
              <input className="form-input" placeholder="Subject" />
              <textarea
                className="min-h-[180px] rounded-2xl border border-white/12 bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Share context, goals, and relevant links so we can help quickly."
              />
              <button type="submit" className="btn-primary h-12">
                Send message
              </button>
            </form>
            <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 text-xs text-muted-foreground sm:grid-cols-2">
              <div className="inline-flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-[rgb(232,168,50)]" />
                Avg response: under 24 hours
              </div>
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[rgb(232,168,50)]" />
                Editorial-first support routing
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
