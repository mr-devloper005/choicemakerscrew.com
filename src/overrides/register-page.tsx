'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Feather, Loader2, AlertCircle, BookOpen, Sparkles, TrendingUp, UserPlus, CheckCircle2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const PERKS = [
  { icon: BookOpen, text: 'Unlimited access to all articles and long-form reads' },
  { icon: Sparkles, text: 'Curated newsletter with the week\'s best editorial picks' },
  { icon: TrendingUp, text: 'Save articles, track progress, and build your reading list' },
]

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError('Please enter your full name.'); return }
    if (!email.trim()) { setError('Please enter your email address.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    try {
      await signup(name.trim(), email.trim(), password)
      setSuccess(true)
      setTimeout(() => router.push('/'), 1200)
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-10">

          {/* Left panel — brand story */}
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(232,168,50,0.15)] bg-[rgba(232,168,50,0.04)] p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(232,168,50,0.08)] blur-[64px]" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[rgba(196,83,106,0.06)] blur-[48px]" />

            <div className="relative flex h-full flex-col">
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
                  Join the journal
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl">
                  Start your contributor workspace.
                </h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Create a free account, publish essays and guides, connect with a community of informed thinkers, and build your reading identity.
                </p>

                <div className="mt-8 space-y-4">
                  {PERKS.map(({ icon: Icon, text }) => (
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
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Already a member?</p>
                <p className="mt-1 text-sm text-foreground">
                  Sign in to your account and continue where you left off.
                </p>
                <Link
                  href="/login"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(232,168,50)] hover:underline"
                >
                  Sign in now
                </Link>
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="rounded-2xl border border-white/8 bg-card p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Create account
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
              Join {SITE_CONFIG.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Free forever. Your data stays in your browser.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/8 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                <p className="text-sm text-green-400">Account created! Redirecting you now…</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="reg-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Full Name
                </label>
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Email Address
                </label>
                <input
                  id="reg-email"
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
                <label htmlFor="reg-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || success}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                style={{
                  background: 'rgb(232,168,50)',
                  color: 'oklch(0.115 0.022 265)',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Free Account
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
            </p>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[rgb(232,168,50)] hover:underline">
                Sign in
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
