import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePolicyPDF } from "@/lib/generate-policy-pdf";
import {
  generatePolicySections,
  getPolicyTitle,
  type PolicyFormData,
  type PolicyType,
  type PolicySection,
} from "@/lib/policy-templates";
import { Download, FileText, Eye } from "lucide-react";

export function PolicyForm() {
  const [form, setForm] = useState<PolicyFormData>({
    companyName: "",
    author: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
    policyType: "access",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [editedSections, setEditedSections] = useState<PolicySection[] | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof PolicyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setEditedSections(null);
    setShowPreview(false);
  };

  const isValid = form.companyName.trim() && form.author.trim() && form.approvedBy.trim();

  const sections = useMemo(() => {
    if (!isValid) return [];
    return generatePolicySections(form);
  }, [form.companyName, form.author, form.approvedBy, form.date, form.version, form.policyType]);

  const activeSections = editedSections ?? sections;

  const handlePreview = () => {
    if (!isValid) return;
    setEditedSections(structuredClone(sections));
    setShowPreview(true);
  };

  const updateSection = (index: number, field: "heading" | "content", value: string) => {
    setEditedSections((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateSubSection = (
    sectionIndex: number,
    subIndex: number,
    field: "heading" | "content",
    value: string
  ) => {
    setEditedSections((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      if (next[sectionIndex].subSections) {
        next[sectionIndex].subSections![subIndex] = {
          ...next[sectionIndex].subSections![subIndex],
          [field]: value,
        };
      }
      return next;
    });
  };

  const handleSavePDF = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    await generatePolicyPDF(form, activeSections);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen justify-center bg-background p-4 py-8">
      <div className="w-full max-w-2xl space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            NIS2 policy generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Kies een policy, vul de gegevens in, bekijk de preview en sla op als pdf.
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
              <Label>Policy type</Label>
              <Select
                value={form.policyType}
                onValueChange={(value) => update("policyType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="access">Toegangsbeleid</SelectItem>
                  <SelectItem value="network">Netwerktoegangsbeleid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Bedrijfsnaam</Label>
              <Input
                id="companyName"
                placeholder="Bijvoorbeeld Acme bv"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <Label htmlFor="approvedBy">Goedkeurder</Label>
                <Input
                  id="approvedBy"
                  placeholder="Naam goedkeurder"
                  value={form.approvedBy}
                  onChange={(e) => update("approvedBy", e.target.value)}
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
              variant="secondary"
              className="mt-2 w-full"
              size="lg"
              disabled={!isValid}
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Bekijk preview
            </Button>
          </CardContent>
        </Card>

        {showPreview && editedSections && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Preview: {getPolicyTitle(form.policyType)}
              </CardTitle>
              <CardDescription>
                Pas de tekst aan waar nodig. Klik daarna op opslaan als pdf.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {editedSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <Input
                    value={section.heading}
                    onChange={(e) =>
                      updateSection(sectionIndex, "heading", e.target.value)
                    }
                    className="font-bold"
                  />
                  {section.content && (
                    <Textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(sectionIndex, "content", e.target.value)
                      }
                      rows={Math.max(3, section.content.split("\n").length + 1)}
                    />
                  )}
                  {section.subSections?.map((sub, subIndex) => (
                    <div key={subIndex} className="ml-4 space-y-1.5 border-l-2 border-border pl-4">
                      <Input
                        value={sub.heading}
                        onChange={(e) =>
                          updateSubSection(sectionIndex, subIndex, "heading", e.target.value)
                        }
                        className="text-sm font-semibold"
                      />
                      <Textarea
                        value={sub.content}
                        onChange={(e) =>
                          updateSubSection(sectionIndex, subIndex, "content", e.target.value)
                        }
                        rows={Math.max(2, sub.content.split("\n").length + 1)}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <Button
                className="w-full"
                size="lg"
                disabled={loading}
                onClick={handleSavePDF}
              >
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Pdf wordt gemaakt..." : "Opslaan als pdf"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
