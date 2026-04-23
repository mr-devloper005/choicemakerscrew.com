import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  { title: 'Data We Collect', body: 'Account profile details, usage analytics, and content you publish or save.' },
  { title: 'How We Use Data', body: 'To personalize recommendations, improve discovery quality, and keep the platform secure.' },
  { title: 'Data Sharing', body: 'We do not sell personal data. Trusted subprocessors may process data for hosting, analytics, and delivery.' },
  { title: 'Retention', body: 'We retain account and publishing data as needed for service continuity and legal requirements.' },
  { title: 'Your Choices', body: 'You can request exports, manage preferences, and delete your account at any time.' },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, and protect your information."
    >
      <Card className="border-white/10 bg-card">
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground">Last updated: March 16, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
