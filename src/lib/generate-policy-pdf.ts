import type { PolicyFormData, PolicySection } from "./policy-templates";
import type { Translations } from "./i18n";
import { getPolicySlug } from "./policy-templates";

export async function generatePolicyPDF(
  data: PolicyFormData,
  sections: PolicySection[],
  t: Translations
) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;
  const title = t.policyNames[data.policyType];

  const checkPage = (needed: number) => {
    if (y + needed > 272) {
      doc.addPage();
      y = 20;
    }
  };

  const addText = (text: string, fontSize = 11, bold = false, indent = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(55, 40, 25);

    const paragraphs = text.split("\n");
    for (const paragraph of paragraphs) {
      const lines = doc.splitTextToSize(paragraph, contentWidth - indent);
      checkPage(lines.length * (fontSize * 0.45) + 2);
      doc.text(lines, margin + indent, y);
      y += lines.length * (fontSize * 0.45) + 3;
    }
  };

  // Header bar
  doc.setFillColor(44, 82, 130);
  doc.rect(0, 0, pageWidth, 54, "F");

  // Dark blue curve fill
  const steps = 30;
  const bx = (tp: number) => {
    const mt = 1 - tp;
    return mt * mt * mt * 0 + 3 * mt * mt * tp * (pageWidth * 0.35) + 3 * mt * tp * tp * (pageWidth * 0.7) + tp * tp * tp * pageWidth;
  };
  const by = (tp: number) => {
    const mt = 1 - tp;
    return mt * mt * mt * 52 + 3 * mt * mt * tp * 51 + 3 * mt * tp * tp * 42 + tp * tp * tp * 38;
  };

  doc.setFillColor(20, 50, 90);
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps;
    const t1 = (i + 1) / steps;
    const x0 = bx(t0);
    const x1 = bx(t1);
    const y0 = by(t0);
    const y1 = by(t1);
    const bottom = 54;
    doc.triangle(x0, y0, x1, y1, x1, bottom, "F");
    doc.triangle(x0, y0, x1, bottom, x0, bottom, "F");
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(title, margin, 28);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, margin, 40);
  y = 68;

  // Document control table
  doc.setTextColor(55, 40, 25);
  doc.setFillColor(44, 82, 130);
  doc.rect(margin, y - 6, contentWidth, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(t.pdfDocControl, margin + 3, y);
  y += 10;

  const tableRows = [
    [t.pdfTitle, title],
    [t.pdfVersion, data.version || "1.0"],
    [t.pdfAuthor, data.author],
    [t.pdfApprovedBy, data.approvedBy],
    [t.pdfDate, data.date],
    [t.pdfClassification, t.pdfClassificationValue],
    [t.pdfStatus, t.pdfStatusValue],
  ];

  doc.setFontSize(10);
  const rowH = 8;
  tableRows.forEach(([label, value], i) => {
    checkPage(rowH);
    const r = i % 2 === 0 ? 250 : 255;
    doc.setFillColor(r, 245, 235);
    doc.rect(margin, y - 5, contentWidth, rowH, "F");
    doc.setTextColor(55, 40, 25);
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + 3, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 58, y);
    y += rowH;
  });

  y += 10;

  // Sections
  for (const section of sections) {
    checkPage(18);
    doc.setFillColor(44, 82, 130);
    doc.rect(margin, y - 6, contentWidth, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(section.heading, margin + 3, y);
    y += 10;

    if (section.content) {
      addText(section.content);
    }

    if (section.subSections) {
      for (const sub of section.subSections) {
        checkPage(14);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(44, 82, 130);
        doc.text(sub.heading, margin, y);
        y += 6;
        addText(sub.content);
        y += 2;
      }
    }

    y += 4;
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(140, 120, 95);
    doc.text(
      `${data.companyName}  |  ${title}  |  v${data.version || "1.0"}  |  ${t.pdfPage} ${page} ${t.pdfOf} ${totalPages}`,
      margin,
      290
    );
  }

  const safeName = data.companyName.trim().replace(/\s+/g, "_") || "bedrijf";
  const typeSlug = getPolicySlug(data.policyType);
  doc.save(`${typeSlug}_${safeName}.pdf`);
}
