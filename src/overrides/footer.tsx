import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const FOOTER_SECTIONS = {
  Solutions: [
    { label: 'Articles', href: '/articles' },
    { label: 'Search', href: '/search' },
    { label: 'About', href: '/about' },
  ],
  Learn: [
    { label: 'Help Center', href: '/help' },
  ],
  Support: [
    { label: 'FAQs', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export function FooterOverride() {
  return (
    <footer className="border-t border-white/6 bg-[oklch(0.09_0.02_265)]">
      {/* Main footer columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[rgba(232,168,50,0.25)] bg-[rgba(232,168,50,0.08)]">
                <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-125 object-contain" />
              </div>
              <span className="text-base font-bold tracking-[-0.02em] text-foreground">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm leading-7 text-muted-foreground max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Nav columns */}
          {(Object.entries(FOOTER_SECTIONS) as [string, { label: string; href: string }[]][]).map(
            ([section, links]) => (
              <div key={section}>
                <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {section}
                </h4>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/6 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-150">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-150">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors duration-150">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
