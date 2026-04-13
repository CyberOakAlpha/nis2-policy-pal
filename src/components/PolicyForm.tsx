import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateAccessPolicyPDF, type PolicyFormData } from "@/lib/generate-policy-pdf";
import { FileText, Download, Shield } from "lucide-react";

export function PolicyForm() {
  const [form, setForm] = useState<PolicyFormData>({
    companyName: "",
    author: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
  });

  const [generated, setGenerated] = useState(false);

  const update = (field: keyof PolicyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setGenerated(false);
  };

  const isValid = form.companyName.trim() && form.author.trim() && form.approvedBy.trim();

  const handleGenerate = () => {
    if (!isValid) return;
    generateAccessPolicyPDF(form);
    setGenerated(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
            <Shield className="h-4 w-4" />
            NIS2 Compliance
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Access Policy Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Genereer een professioneel Access Control Policy document voor uw KMO.
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Document Gegevens
            </CardTitle>
            <CardDescription>
              Vul de basisgegevens in voor uw policy document.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Bedrijfsnaam</Label>
              <Input
                id="companyName"
                placeholder="Bijv. Acme BV"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Auteur</Label>
                <Input
                  id="author"
                  placeholder="Naam auteur"
                  value={form.author}
                  onChange={(e) => update("author", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedBy">Goedgekeurd door</Label>
                <Input
                  id="approvedBy"
                  placeholder="Naam goedkeurder"
                  value={form.approvedBy}
                  onChange={(e) => update("approvedBy", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Versie</Label>
                <Input
                  id="version"
                  placeholder="1.0"
                  value={form.version}
                  onChange={(e) => update("version", e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full mt-2"
              size="lg"
              disabled={!isValid}
              onClick={handleGenerate}
            >
              <Download className="h-4 w-4 mr-2" />
              {generated ? "PDF Opnieuw Downloaden" : "Genereer Access Policy PDF"}
            </Button>

            {generated && (
              <p className="text-center text-sm text-primary">
                ✓ PDF is gedownload!
              </p>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Gegenereerd conform NIS2 (EU 2022/2555) richtlijnen.
        </p>
      </div>
    </div>
  );
}
