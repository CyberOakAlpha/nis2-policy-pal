import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  component: RoadmapPage,
  head: () => ({
    meta: [
      { title: "NIS2 Roadmap - Stappenplan voor KMO's" },
      { name: "description", content: "Volg dit stappenplan om NIS2-compliant te worden als KMO. Van asset inventarisatie tot continue monitoring." },
    ],
  }),
});

function RoadmapPage() {
  const { t } = useI18n();

  return (
    <main className="flex min-h-screen justify-center bg-background p-4 py-8">
      <div className="w-full max-w-3xl space-y-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t.backToGenerator}
            </Button>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.roadmapTitle}
          </h1>
          <p className="text-muted-foreground">{t.roadmapSubtitle}</p>
        </div>

        <div className="relative space-y-0">
          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />

          {t.roadmapSteps.map((step, index) => (
            <div key={index} className="relative flex gap-4 py-3">
              {/* Step number circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-md">
                {index + 1}
              </div>

              <Card className="flex-1">
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link to="/">
            <Button size="lg">
              {t.backToGenerator}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
