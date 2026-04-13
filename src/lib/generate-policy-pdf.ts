import type { PolicyFormData, PolicySection } from "./policy-templates";
import { getPolicyTitle, getPolicySlug } from "./policy-templates";

export async function generatePolicyPDF(
  data: PolicyFormData,
  sections: PolicySection[]
) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;
  const title = getPolicyTitle(data.policyType);

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

  // Header bar - blue background, white text
  doc.setFillColor(44, 82, 130);
  doc.rect(0, 0, pageWidth, 54, "F");

  // Dark blue fill below the curve
  const steps = 30;
  const bx = (t: number) => {
    const mt = 1 - t;
    return mt * mt * mt * 0 + 3 * mt * mt * t * (pageWidth * 0.35) + 3 * mt * t * t * (pageWidth * 0.7) + t * t * t * pageWidth;
  };
  const by = (t: number) => {
    const mt = 1 - t;
    return mt * mt * mt * 52 + 3 * mt * mt * t * 51 + 3 * mt * t * t * 42 + t * t * t * 38;
  };

  // Fill area below curve with dark blue using thin vertical strips
  doc.setFillColor(20, 50, 90);
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps;
    const t1 = (i + 1) / steps;
    const x0 = bx(t0);
    const x1 = bx(t1);
    const y0 = by(t0);
    const y1 = by(t1);
    const bottom = 54;
    // Draw a filled triangle-strip quad
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
  doc.text("Documentbeheer", margin + 3, y);
  y += 10;

  const tableRows = [
    ["Titel", title],
    ["Versie", data.version || "1.0"],
    ["Auteur", data.author],
    ["Goedgekeurd door", data.approvedBy],
    ["Datum", data.date],
    ["Classificatie", "Vertrouwelijk"],
    ["Status", "Goedgekeurd"],
  ];

  doc.setFontSize(10);
  const rowH = 8;
  tableRows.forEach(([label, value], i) => {
    checkPage(rowH);
    // Alternating warm rows
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
    // Section heading with blue background
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

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(140, 120, 95);
    doc.text(
      `${data.companyName}  |  ${title}  |  v${data.version || "1.0"}  |  pagina ${page} van ${totalPages}`,
      margin,
      290
    );
  }

  const safeName = data.companyName.trim().replace(/\s+/g, "_") || "bedrijf";
  const typeSlug = getPolicySlug(data.policyType);
  doc.save(`${typeSlug}_${safeName}.pdf`);
}
