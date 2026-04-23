import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const licenses = [
  { name: 'Next.js', description: 'MIT License - framework powering app routing and rendering.' },
  { name: 'React', description: 'MIT License - UI library used for component architecture.' },
  { name: 'Tailwind CSS', description: 'MIT License - utility-first styling framework.' },
  { name: 'Lucide Icons', description: 'ISC License - icon system used across interface components.' },
  { name: 'Radix UI', description: 'MIT License - accessible primitives for dialogs, menus, and controls.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Licenses"
      description="Open source licenses and acknowledgements."
    >
      <Card className="border-white/10 bg-card">
        <CardContent className="p-6 space-y-3">
          {licenses.map((license) => (
            <div key={license.name} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-foreground">{license.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{license.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
