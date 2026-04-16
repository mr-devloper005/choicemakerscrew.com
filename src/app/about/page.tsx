import Link from "next/link";
import { BookOpen, Compass, Sparkles } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Creators onboarded", value: "12k+" },
  { label: "Bookmarks shared", value: "180k" },
  { label: "Listings published", value: "8.6k" },
];

const values = [
  { title: "Editorial clarity first", description: "We design every surface for readability, context, and clear decision-making." },
  { title: "Meaning over noise", description: "We prioritize high-signal publishing instead of infinite low-value scrolling." },
  { title: "Practical depth", description: "Every section is built to connect insights with real-world action." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern platform for creators, communities, and curated business discovery.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Meet the Team</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              An article-led platform built for thoughtful reading and sharper decisions.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} is focused on premium editorial publishing, discovery, and practical learning.
              We combine structured long-form writing with clear browsing paths so readers can move from insight
              to action without friction.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
              {[
                { icon: BookOpen, title: "Deep reading", text: "Long-form stories with better structure and pacing." },
                { icon: Compass, title: "Guided discovery", text: "Explore content by clear themes and editorial lanes." },
                { icon: Sparkles, title: "Modern publishing", text: "Fresh content formats with a premium reading experience." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <item.icon className="h-4 w-4 text-[rgb(232,168,50)]" />
                  <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-border bg-card transition-transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
              <p className="mt-3 text-xs text-muted-foreground">{member.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
