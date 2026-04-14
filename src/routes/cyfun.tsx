import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Home, Map, Shield } from "lucide-react";
import { CYFUN_CONTROLS, CYFUN_CATEGORIES, getControlText, getControlHint, getCategoryName } from "@/lib/cyfun-controls";

export const Route = createFileRoute("/cyfun")({
  component: CyFunPage,
  head: () => ({
    meta: [
      { title: "CCB Controls - NIS2" },
      { name: "description", content: "Overzicht van alle 93 CCB controls voor het niveau 'Belangrijk'." },
    ],
  }),
});

function CyFunPage() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = Object.keys(CYFUN_CATEGORIES);
  const filtered = activeCategory === "all"
    ? CYFUN_CONTROLS
    : CYFUN_CONTROLS.filter(c => c.category === activeCategory);

  // Group filtered controls by category for display
  const grouped = categories
    .map(cat => ({
      cat,
      controls: filtered.filter(c => c.category === cat),
    }))
    .filter(g => g.controls.length > 0);

  return (
    <main className="flex min-h-screen justify-center bg-background p-4 py-8">
      <div className="w-full max-w-3xl space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.cyfunTitle}
          </h1>
          <LanguageSwitcher />
        </div>

        <nav className="flex items-center justify-end gap-2 rounded-md bg-primary p-1.5 shadow-sm">
          <Link to="/roadmap">
            <Button variant="secondary" size="sm" className="gap-1.5 text-sm">
              <Map className="h-4 w-4" />
              {t.roadmap}
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="sm" className="gap-1.5 text-sm">
              <Home className="h-4 w-4" />
              {t.generator}
            </Button>
          </Link>
        </nav>

        <p className="text-center text-muted-foreground">{t.cyfunSubtitle}</p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("all")}
          >
            {t.cyfunAllCategories} ({CYFUN_CONTROLS.length})
          </Button>
          {categories.map(cat => {
            const count = CYFUN_CONTROLS.filter(c => c.category === cat).length;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="gap-1.5"
              >
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${CYFUN_CATEGORIES[cat].color}`} />
                {getCategoryName(cat, lang)} ({count})
              </Button>
            );
          })}
        </div>

        {/* Controls grouped by category */}
        <div className="space-y-4">
          {grouped.map(({ cat, controls }) => (
            <Card key={cat}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className={`inline-block h-3 w-3 rounded-full ${CYFUN_CATEGORIES[cat].color}`} />
                  {getCategoryName(cat, lang)}
                  <Badge variant="secondary" className="ml-auto">{controls.length} {t.cyfunTotal}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {controls.map(control => (
                    <div key={control.id} className="flex items-start gap-2 text-sm py-1.5 border-b border-border last:border-0">
                      <Badge variant="outline" className="shrink-0 text-xs font-mono mt-0.5">
                        {control.id}
                      </Badge>
                      <div className="space-y-0.5">
                        <span className="text-foreground">{getControlText(control, lang)}</span>
                        <p className="text-xs text-muted-foreground italic">{getControlHint(control, lang)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground pt-4 pb-2">
          Bron: CCB Framework 2023 — Niveau Belangrijk
        </p>
      </div>
    </main>
  );
}
