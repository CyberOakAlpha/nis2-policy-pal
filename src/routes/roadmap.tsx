import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Home, ChevronRight, Monitor, Server, Download } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  component: RoadmapPage,
  head: () => ({
    meta: [
      { title: "NIS2 Roadmap - Stappenplan voor KMO's" },
      { name: "description", content: "Volg dit stappenplan om NIS2-compliant te worden als KMO. Van asset inventarisatie tot continue monitoring." },
    ],
  }),
});

function criticalityColor(c: string) {
  const lower = c.toLowerCase();
  if (lower === "kritiek" || lower === "critical" || lower === "critique") return "destructive" as const;
  if (lower === "hoog" || lower === "high" || lower === "élevé") return "default" as const;
  return "secondary" as const;
}

function RoadmapPage() {
  const { t } = useI18n();
  const [showAssetTemplate, setShowAssetTemplate] = useState(false);

  const downloadCsv = (type: "hardware" | "software") => {
    let csv = "";
    if (type === "hardware") {
      csv = `${t.assetColumnName},${t.assetColumnType},${t.assetColumnOwner},${t.assetColumnCriticality},${t.assetColumnLocation}\n`;
      t.hardwareAssets.forEach(a => {
        csv += `"${a.name}","${a.type}","${a.owner}","${a.criticality}","${a.location}"\n`;
      });
    } else {
      csv = `${t.assetColumnName},${t.assetColumnType},${t.assetColumnVendor},${t.assetColumnVersion},${t.assetColumnLicense},${t.assetColumnCriticality}\n`;
      t.softwareAssets.forEach(a => {
        csv += `"${a.name}","${a.type}","${a.vendor}","${a.version}","${a.license}","${a.criticality}"\n`;
      });
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `asset-inventory-${type}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />

          <Accordion type="multiple">
            {t.roadmapSteps.map((step, index) => (
              <div key={index} className="relative flex gap-4 py-3">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                <Card className="flex-1">
                  <AccordionItem value={`step-${index}`} className="border-0">
                    <CardContent className="p-4 pb-0">
                      <AccordionTrigger className="py-0 hover:no-underline">
                        <div className="text-left">
                          <h3 className="font-bold text-foreground text-lg mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </AccordionTrigger>
                    </CardContent>
                    <AccordionContent>
                      <div className="px-4 pb-4 pt-2 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.viewExamples}</p>
                        {step.examples.map((ex, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                            <span className="text-foreground">{ex}</span>
                          </div>
                        ))}
                        {index === 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setShowAssetTemplate(!showAssetTemplate)}
                          >
                            <Monitor className="mr-1 h-4 w-4" />
                            {t.exampleAssets}
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              </div>
            ))}
          </Accordion>
        </div>

        {showAssetTemplate && (
          <Card className="animate-in fade-in slide-in-from-top-2">
            <CardContent className="p-5 space-y-4">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-foreground">{t.assetTemplateTitle}</h2>
                <p className="text-sm text-muted-foreground">{t.assetTemplateSubtitle}</p>
              </div>

              <Tabs defaultValue="hardware">
                <TabsList className="w-full">
                  <TabsTrigger value="hardware" className="flex-1">
                    <Monitor className="mr-1 h-4 w-4" />
                    {t.assetHardware}
                  </TabsTrigger>
                  <TabsTrigger value="software" className="flex-1">
                    <Server className="mr-1 h-4 w-4" />
                    {t.assetSoftware}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hardware">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.assetColumnName}</TableHead>
                        <TableHead>{t.assetColumnType}</TableHead>
                        <TableHead>{t.assetColumnOwner}</TableHead>
                        <TableHead>{t.assetColumnCriticality}</TableHead>
                        <TableHead>{t.assetColumnLocation}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t.hardwareAssets.map((asset, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>{asset.owner}</TableCell>
                          <TableCell>
                            <Badge variant={criticalityColor(asset.criticality)}>
                              {asset.criticality}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="pt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => downloadCsv("hardware")}>
                      <Download className="mr-1 h-4 w-4" />
                      {t.downloadTemplate}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="software">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.assetColumnName}</TableHead>
                        <TableHead>{t.assetColumnType}</TableHead>
                        <TableHead>{t.assetColumnVendor}</TableHead>
                        <TableHead>{t.assetColumnVersion}</TableHead>
                        <TableHead>{t.assetColumnLicense}</TableHead>
                        <TableHead>{t.assetColumnCriticality}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {t.softwareAssets.map((asset, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.type}</TableCell>
                          <TableCell>{asset.vendor}</TableCell>
                          <TableCell>{asset.version}</TableCell>
                          <TableCell>{asset.license}</TableCell>
                          <TableCell>
                            <Badge variant={criticalityColor(asset.criticality)}>
                              {asset.criticality}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="pt-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => downloadCsv("software")}>
                      <Download className="mr-1 h-4 w-4" />
                      {t.downloadTemplate}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

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
