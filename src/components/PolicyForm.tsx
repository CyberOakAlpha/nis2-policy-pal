import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
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
import { generateBundlePDF } from "@/lib/generate-bundle-pdf";
import {
  generatePolicySections,
  type PolicyFormData,
  type PolicyType,
  type PolicySection,
} from "@/lib/policy-templates";
import { generateEnglishSections } from "@/lib/policy-templates-en";
import { generateFrenchSections } from "@/lib/policy-templates-fr";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Download, FileText, Package, Map } from "lucide-react";

const POLICY_TYPES: PolicyType[] = [
  "access", "network", "incident", "bcp", "risk",
  "supply-chain", "crypto", "awareness", "vulnerability", "backup",
  "asset-management", "password", "cybersecurity", "patch-management",
];

export function PolicyForm() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState<PolicyFormData>({
    companyName: "",
    author: "",
    owner: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    approvalDate: new Date().toISOString().split("T")[0],
    version: "1.0",
    policyType: "access",
  });
  const [editedSections, setEditedSections] = useState<PolicySection[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [bundleLoading, setBundleLoading] = useState(false);

  const update = (field: keyof PolicyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setEditedSections(null);
  };

  const formWithDefaults = useMemo(() => ({
    ...form,
    companyName: form.companyName.trim() || "[company name]",
    author: form.author.trim() || "[author]",
    approvedBy: form.approvedBy.trim() || "[approver]",
  }), [form]);

  const sections = useMemo(() => {
    if (lang === "en") return generateEnglishSections(formWithDefaults);
    if (lang === "fr") return generateFrenchSections(formWithDefaults);
    return generatePolicySections(formWithDefaults);
  }, [formWithDefaults, lang]);

  useMemo(() => {
    if (sections.length > 0) {
      setEditedSections(structuredClone(sections));
    }
  }, [sections]);

  const activeSections = editedSections ?? sections;

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

  const isValid = form.companyName.trim() && form.author.trim() && form.approvedBy.trim();

  const handleSavePDF = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    await generatePolicyPDF(form, activeSections, t);
    setLoading(false);
  };

  const handleBundlePDF = async () => {
    if (!isValid || bundleLoading) return;
    setBundleLoading(true);
    await generateBundlePDF(form, lang, t);
    setBundleLoading(false);
  };

  return (
    <main className="flex min-h-screen justify-center bg-background p-4 py-8">
      <div className="w-full max-w-3xl space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t.appTitle}
          </h1>
          <LanguageSwitcher />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              {t.appSubtitle}
            </CardTitle>
            <CardDescription>{t.appDescription}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="border-b border-border pb-3 mb-1">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t.documentDetails}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{t.documentDetailsDesc}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">{t.companyName}</Label>
              <Input
                id="companyName"
                placeholder={t.companyNamePlaceholder}
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">{t.author}</Label>
                <Input
                  id="author"
                  placeholder={t.authorPlaceholder}
                  value={form.author}
                  onChange={(e) => update("author", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">{t.owner}</Label>
                <Input
                  id="owner"
                  placeholder={t.ownerPlaceholder}
                  value={form.owner}
                  onChange={(e) => update("owner", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="approvedBy">{t.approvedBy}</Label>
                <Input
                  id="approvedBy"
                  placeholder={t.approvedByPlaceholder}
                  value={form.approvedBy}
                  onChange={(e) => update("approvedBy", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvalDate">{t.approvalDate}</Label>
                <Input
                  id="approvalDate"
                  type="date"
                  value={form.approvalDate}
                  onChange={(e) => update("approvalDate", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">{t.date}</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">{t.version}</Label>
                <Input
                  id="version"
                  placeholder="1.0"
                  value={form.version}
                  onChange={(e) => update("version", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.policyType}</Label>
              <Select
                value={form.policyType}
                onValueChange={(value) => update("policyType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POLICY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t.policyNames[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Roadmap link & Bundle download */}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/roadmap">
                <Button variant="outline" className="w-full" size="sm">
                  <Map className="mr-2 h-4 w-4" />
                  {t.goToRoadmap}
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="w-full"
                size="sm"
                disabled={!isValid || bundleLoading}
                onClick={handleBundlePDF}
              >
                <Package className="mr-2 h-4 w-4" />
                {bundleLoading ? t.downloadingAll : t.downloadAll}
              </Button>
            </div>
          </CardContent>
        </Card>

        {editedSections && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                {t.previewTitle}: {t.policyNames[form.policyType]}
              </CardTitle>
              <CardDescription>{t.previewDescription}</CardDescription>
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
                {loading ? t.generatingPdf : t.savePdf}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
