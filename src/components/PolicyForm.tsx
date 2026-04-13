import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateAccessPolicyPDF, type PolicyFormData } from "@/lib/generate-policy-pdf";
import { Download, FileText } from "lucide-react";

export function PolicyForm() {
  const [form, setForm] = useState<PolicyFormData>({
    companyName: "",
    author: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
  });
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof PolicyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setGenerated(false);
  };

  const isValid = form.companyName.trim() && form.author.trim() && form.approvedBy.trim();

  const handleGenerate = async () => {
    if (!isValid || loading) {
      return;
    }

    setLoading(true);
    await generateAccessPolicyPDF(form);
    setGenerated(true);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            NIS2 Policy Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Vul 4 velden in en download meteen een NIS2-toegangsbeleid als pdf.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Documentgegevens
            </CardTitle>
            <CardDescription>
              Deze gegevens worden automatisch ingevuld in het document.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Bedrijfsnaam</Label>
              <Input
                id="companyName"
                placeholder="Bijvoorbeeld Acme bv"
                value={form.companyName}
                onChange={(event) => update("companyName", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Auteur</Label>
                <Input
                  id="author"
                  placeholder="Naam auteur"
                  value={form.author}
                  onChange={(event) => update("author", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedBy">Goedkeurder</Label>
                <Input
                  id="approvedBy"
                  placeholder="Naam goedkeurder"
                  value={form.approvedBy}
                  onChange={(event) => update("approvedBy", event.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(event) => update("date", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Versie</Label>
                <Input
                  id="version"
                  placeholder="1.0"
                  value={form.version}
                  onChange={(event) => update("version", event.target.value)}
                />
              </div>
            </div>

            <Button className="mt-2 w-full" size="lg" disabled={!isValid || loading} onClick={handleGenerate}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Pdf wordt gemaakt..." : generated ? "Genereer opnieuw" : "Genereer pdf"}
            </Button>

            {generated ? (
              <p className="text-center text-sm text-primary">Pdf gedownload.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
