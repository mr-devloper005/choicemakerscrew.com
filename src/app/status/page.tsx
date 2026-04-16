import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Web Experience', status: 'Operational' },
  { name: 'Content API', status: 'Operational' },
  { name: 'Media Delivery', status: 'Operational' },
]

const incidents = [
  { date: 'Apr 02, 2026', title: 'Minor feed refresh delay', status: 'Resolved' },
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="Real-time uptime and service health."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="border-white/10 bg-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{service.name}</h2>
                <Badge className="mt-3 border border-emerald-400/30 bg-emerald-400/10 text-emerald-300" variant="secondary">{service.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-white/10 bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Incident History</h3>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-xs text-muted-foreground">{incident.date}</div>
                  <div className="text-sm font-medium text-foreground">{incident.title}</div>
                  <div className="text-xs text-muted-foreground">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
