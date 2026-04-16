import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { title: "Account Usage", body: "Keep your account secure, use accurate profile details, and follow community publishing standards." },
  {
    title: "Content Ownership",
    body: "You retain ownership of your content while granting the platform rights to host, display, and distribute it.",
  },
  { title: "Acceptable Use", body: "No spam, harassment, impersonation, malicious automation, or illegal content." },
  { title: "Service Availability", body: "We maintain high uptime but do not guarantee uninterrupted service in all regions or scenarios." },
  { title: "Termination", body: "Accounts violating policy may be suspended or removed to protect readers and contributors." },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}
    >
      <Card className="border-white/10 bg-card">
        <CardContent className="space-y-4 p-6">
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
  );
}
