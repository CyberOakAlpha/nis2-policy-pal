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
import { Download, FileText } from "lucide-react";

export function PolicyForm() {
  const [form, setForm] = useState<PolicyFormData>({
    companyName: "",
    author: "",
    approvedBy: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
    policyType: "access",
  });
  const [editedSections, setEditedSections] = useState<PolicySection[] | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof PolicyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setEditedSections(null);
  };

  // Always generate sections - use placeholders for empty fields
  const formWithDefaults = useMemo(() => ({
    ...form,
    companyName: form.companyName.trim() || "[company name]",
    author: form.author.trim() || "[author]",
    approvedBy: form.approvedBy.trim() || "[approver]",
  }), [form]);

  const sections = useMemo(() => {
    return generatePolicySections(formWithDefaults);
  }, [formWithDefaults]);

  // Auto-load preview
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
    await generatePolicyPDF(form, activeSections);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen justify-center bg-background p-4 py-8">
      <div className="w-full max-w-3xl space-y-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Quick NIS2 policy generator
            </CardTitle>
            <CardDescription>
              This tool helps you create professional NIS2-compliant policies. Fill in the form, adjust the template text to your specific needs, press save and you have your own pro NIS2 policy — fully compliant with NIS2 requirements.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="border-b border-border pb-3 mb-1">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Document details
              </h3>
              <p className="text-sm text-muted-foreground mt-1">These details are automatically filled into the document.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                placeholder="e.g. Acme bv"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => update("author", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedBy">Approved by</Label>
                <Input
                  id="approvedBy"
                  placeholder="Approver name"
                  value={form.approvedBy}
                  onChange={(e) => update("approvedBy", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  placeholder="1.0"
                  value={form.version}
                  onChange={(e) => update("version", e.target.value)}
                />
              </div>
            </div>

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
                  <SelectItem value="access">Access policy</SelectItem>
                  <SelectItem value="network">Network access policy</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>

        {editedSections && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Preview: {getPolicyTitle(form.policyType)}
              </CardTitle>
              <CardDescription>
                Edit the text where needed, then save as pdf.
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
                {loading ? "Generating pdf..." : "Save as pdf"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
