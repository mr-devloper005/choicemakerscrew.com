import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, TrendingUp, Feather } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPostImage(post: SitePost): string {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string')?.url
  const contentImage =
    typeof post.content === 'object' &&
    post.content &&
    Array.isArray((post.content as any).images)
      ? (post.content as any).images.find((u: unknown) => typeof u === 'string')
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

function getPostCategory(post: SitePost): string {
  if (typeof post.content === 'object' && post.content) {
    const cat = (post.content as any).category
    if (typeof cat === 'string' && cat) return cat
  }
  return Array.isArray(post.tags) && post.tags[0] ? String(post.tags[0]) : 'Editorial'
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

// ─── Category pill ───────────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[rgba(232,168,50,0.12)] border border-[rgba(232,168,50,0.2)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgb(232,168,50)]">
      {label}
    </span>
  )
}

// ─── Hero Card (lead story) ───────────────────────────────────────────────────

function HeroCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,168,50,0.18)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <ContentImage
          src={getPostImage(post)}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          intrinsicWidth={1400}
          intrinsicHeight={788}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <CategoryBadge label={getPostCategory(post)} />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(232,168,50,0.7)]">
          Cover Story
        </p>
        <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl group-hover:text-[rgb(232,168,50)] transition-colors duration-200">
          {post.title}
        </h2>
        {post.summary && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.summary}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {post.authorName && <span className="font-medium text-foreground/80">{post.authorName}</span>}
          {post.authorName && post.publishedAt && <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />}
          {post.publishedAt && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(post.publishedAt)}</span>}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[rgb(232,168,50)]">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

// ─── Side Stack Card ─────────────────────────────────────────────────────────

function SideCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex gap-4 rounded-xl border border-white/6 bg-card/60 p-4 transition-all duration-200 hover:border-[rgba(232,168,50,0.15)] hover:bg-card"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <ContentImage
          src={getPostImage(post)}
          alt={post.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          intrinsicWidth={160}
          intrinsicHeight={160}
        />
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-1.5">
        <CategoryBadge label={getPostCategory(post)} />
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-[rgb(232,168,50)] transition-colors duration-150">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.authorName && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
              <span>{post.authorName}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Grid Card ───────────────────────────────────────────────────────────────

function GridCard({ post }: { post: SitePost }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,168,50,0.18)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <ContentImage
          src={getPostImage(post)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          intrinsicWidth={800}
          intrinsicHeight={450}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <CategoryBadge label={getPostCategory(post)} />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 p-5">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug tracking-[-0.02em] text-foreground group-hover:text-[rgb(232,168,50)] transition-colors duration-150 sm:text-lg">
          {post.title}
        </h3>
        {post.summary && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {post.summary}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
          {post.authorName && (
            <span className="font-medium text-foreground/70">{post.authorName}</span>
          )}
          {post.publishedAt && post.authorName && (
            <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(post.publishedAt)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Compact List Card ────────────────────────────────────────────────────────

function ListCard({ post, index }: { post: SitePost; index: number }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex items-start gap-4 rounded-xl border border-white/6 p-4 transition-all duration-200 hover:border-[rgba(232,168,50,0.15)] hover:bg-card"
    >
      <span className="mt-0.5 shrink-0 font-display text-2xl font-bold text-[rgba(232,168,50,0.25)] tabular-nums leading-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5">
        <CategoryBadge label={getPostCategory(post)} />
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-[rgb(232,168,50)] transition-colors duration-150">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.authorName && <span>{post.authorName}</span>}
          {post.publishedAt && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/40" />
              <span>{formatDate(post.publishedAt)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Homepage Component ───────────────────────────────────────────────────────

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('article', 12, { allowMockFallback: false, fresh: true })

  const lead = posts[0] ?? null
  const sideStories = posts.slice(1, 5)
  const gridStories = posts.slice(5, 11)
  const trendingStories = posts.slice(0, 5)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />

      {/* ─── HERO / MASTHEAD ─── */}
      <section className="relative overflow-hidden border-b border-white/6">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-[rgba(232,168,50,0.06)] blur-[80px]" />

        <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
          {/* Masthead header */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="editorial-badge mb-4">
              <Feather className="h-3 w-3" />
              Fresh insights to power smarter decisions
            </div>
            <h1 className="font-display text-5xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
              The Choice Makers<br className="hidden sm:block" /> Journal
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From automation breakthroughs to decision-making mastery — discover how
              Choice Makers Crew is shaping the future of informed choices.
            </p>
          </div>

          {/* Hero grid */}
          {(lead || sideStories.length > 0) && (
            <div className="grid gap-5 lg:grid-cols-[1.55fr_0.45fr]">
              {/* Lead story */}
              {lead ? (
                <HeroCard post={lead} />
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-white/8 bg-card text-muted-foreground">
                  No featured article yet
                </div>
              )}

              {/* Side stack */}
              {sideStories.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="section-divider">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Inside this issue
                    </p>
                  </div>
                  {sideStories.map((post) => (
                    <SideCard key={post.id} post={post} />
                  ))}
                  <Link
                    href="/articles"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[rgb(232,168,50)] hover:gap-2.5 transition-all duration-150"
                  >
                    View all articles
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── ARTICLE GRID ─── */}
      {gridStories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="section-divider flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Latest stories
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
                From the Editorial Desk
              </h2>
            </div>
            <Link
              href="/articles"
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(232,168,50)] hover:gap-2.5 transition-all duration-150"
            >
              Browse all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridStories.map((post) => (
              <GridCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ─── TRENDING + CTA SPLIT ─── */}
      <section className="border-t border-white/6">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">

            {/* Trending list */}
            {trendingStories.length > 0 && (
              <div>
                <div className="section-divider flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-[rgb(232,168,50)]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Trending now
                  </p>
                </div>
                <div className="grid gap-2">
                  {trendingStories.map((post, i) => (
                    <ListCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA panel */}
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(232,168,50,0.18)] bg-[rgba(232,168,50,0.05)] p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(232,168,50,0.08)] blur-[48px]" />
              <div className="relative">
                <div className="editorial-badge mb-5">
                  <BookOpen className="h-3 w-3" />
                  Start your journey
                </div>
                <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl">
                  Automate Your Decision‑Making in Minutes
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Stop spending time on repetitive research — our editorial platform curates
                  the insights you need so you can focus on what matters most.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/register" className="btn-primary">
                    Start Reading Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/articles" className="btn-ghost">
                    Browse Articles
                  </Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(232,168,50)]" />
                    Launch your reading in minutes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(232,168,50)]" />
                    No paywall, fully accessible
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(232,168,50)]" />
                    Smart 24/7 community support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="border-t border-white/6 bg-[rgba(232,168,50,0.04)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              { value: '12,000+', label: 'AI‑powered articles' },
              { value: '24/7', label: 'Editorial support' },
              { value: '4.9/5', label: 'Reader rating' },
              { value: '4×', label: 'Faster decisions' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-display text-3xl font-bold tracking-[-0.04em] text-[rgb(232,168,50)] sm:text-4xl">
                  {value}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
