import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  { title: 'Getting Started', description: 'Create your account, personalize your feed, and publish your first article.' },
  { title: 'Publishing Workflow', description: 'Draft, edit, and ship long-form posts with a cleaner editorial flow.' },
  { title: 'Reader Experience', description: 'Optimize tags, metadata, and structure for stronger article discovery.' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Find answers, guides, and best practices."
      actions={
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-white/10 bg-card transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="border-white/10 bg-card md:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground">Support hours</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We typically respond within 24 hours on weekdays. For urgent publishing issues, include page URL, task type, and screenshots.
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="border-white/10 bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
