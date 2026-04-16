'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, LogIn, PenLine } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null }
)

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'About', href: '/about' },
]

export function NavbarOverride() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/6 bg-[oklch(0.115_0.022_265)]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" style={{ height: '4.5rem' }}>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[rgba(232,168,50,0.25)] bg-[rgba(232,168,50,0.08)] transition-colors duration-200 group-hover:bg-[rgba(232,168,50,0.14)]">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-125 object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-base font-bold tracking-[-0.02em] text-foreground leading-tight">
              {SITE_CONFIG.name}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground leading-tight">
              Editorial Journal
            </span>
          </div>
        </Link>

        {/* Desktop nav links — centered */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={`${label}-${href}`}
                href={href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-[rgba(232,168,50,0.12)] text-[rgb(232,168,50)]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <Link
            href="/search"
            className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:border-[rgba(232,168,50,0.2)] hover:text-foreground md:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search articles…</span>
          </Link>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="btn-primary !py-2 !px-4 !text-xs"
                style={{
                  background: 'rgb(232,168,50)',
                  color: 'oklch(0.115 0.022 265)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  transition: 'background 0.2s ease',
                }}
              >
                <PenLine className="h-3.5 w-3.5" />
                Get Started Free
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-muted-foreground transition-colors duration-150 hover:border-white/16 hover:text-foreground xl:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/6 bg-[oklch(0.115_0.022_265)] xl:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {/* Mobile search */}
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="mb-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              Search articles…
            </Link>

            {NAV_LINKS.map(({ label, href }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={`${label}-${href}`}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-150',
                    isActive
                      ? 'bg-[rgba(232,168,50,0.12)] text-[rgb(232,168,50)]'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                >
                  {label}
                </Link>
              )
            })}

            {!isAuthenticated && (
              <div className="mt-3 flex flex-col gap-2 border-t border-white/6 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
                  style={{ background: 'rgb(232,168,50)', color: 'oklch(0.115 0.022 265)' }}
                >
                  <PenLine className="h-4 w-4" />
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
