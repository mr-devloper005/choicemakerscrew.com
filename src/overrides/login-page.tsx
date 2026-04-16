'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Feather, Loader2, LogIn, PenLine, AlertCircle, BookOpen, Sparkles, TrendingUp } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

const FEATURES = [
  { icon: BookOpen, text: 'Access exclusive long-form editorials and deep-dives' },
  { icon: Sparkles, text: 'Personalised article recommendations based on your interests' },
  { icon: TrendingUp, text: 'Track trending stories and bookmark your reading list' },
]

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (!password.trim()) { setError('Please enter your password.'); return }

    try {
      await login(email.trim(), password)
      router.push('/')
    } catch {
      setError('Sign in failed. Please check your credentials and try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-10">

          {/* Left panel — brand story */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(232,168,50,0.15)] bg-[rgba(232,168,50,0.04)] p-8 lg:p-10">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(232,168,50,0.08)] blur-[64px]" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[rgba(196,83,106,0.06)] blur-[48px]" />

            <div className="relative flex h-full flex-col">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(232,168,50,0.3)] bg-[rgba(232,168,50,0.1)]">
                  <Feather className="h-5 w-5 text-[rgb(232,168,50)]" />
                </div>
                <span className="text-lg font-bold tracking-[-0.02em] text-foreground">
                  {SITE_CONFIG.name}
                </span>
              </div>

              <div className="mt-8 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(232,168,50)]">
                  Sign in to your account
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
                  Your reading journey continues here.
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Draft, review, and publish long-form work — or simply pick up where you left off with your saved articles and personalised feed.
                </p>

                <div className="mt-8 space-y-4">
                  {FEATURES.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(232,168,50,0.12)]">
                        <Icon className="h-3.5 w-3.5 text-[rgb(232,168,50)]" />
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-white/8 bg-white/4 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">New reader?</p>
                <p className="mt-1 text-sm text-foreground">
                  Create a free account and start exploring thousands of articles today.
                </p>
                <Link
                  href="/register"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(232,168,50)] hover:underline"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Get started for free
                </Link>
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="rounded-2xl border border-white/8 bg-card p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Welcome back
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
              Sign in to {SITE_CONFIG.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your session is saved locally — no server required.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input pr-11"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                style={{
                  background: 'rgb(232,168,50)',
                  color: 'oklch(0.115 0.022 265)',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-[rgb(232,168,50)] hover:underline">
                Create one free
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
