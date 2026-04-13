import type { jsPDF as JsPDFType } from "jspdf";

export interface PolicyFormData {
  companyName: string;
  author: string;
  approvedBy: string;
  date: string;
  version: string;
}

export async function generateAccessPolicyPDF(data: PolicyFormData) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const addLine = (text: string, fontSize = 11, bold = false, indent = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    if (y + lines.length * (fontSize * 0.5) > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, margin + indent, y);
    y += lines.length * (fontSize * 0.45) + 4;
  };

  const addSpacer = (h = 6) => { y += h; };

  // === COVER / TITLE ===
  doc.setFillColor(20, 30, 50);
  doc.rect(0, 0, pageWidth, 60, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Access Control Policy", margin, 35);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.companyName} — NIS2 Compliance`, margin, 48);
  doc.setTextColor(0, 0, 0);
  y = 75;

  // === DOCUMENT CONTROL ===
  addLine("Document Control", 16, true);
  addSpacer(4);

  // Table
  const tableData = [
    ["Document Title", "Access Control Policy"],
    ["Versie", data.version || "1.0"],
    ["Auteur", data.author],
    ["Goedgekeurd door", data.approvedBy],
    ["Datum", data.date],
    ["Classificatie", "Vertrouwelijk"],
    ["Status", "Goedgekeurd"],
  ];

  doc.setFontSize(10);
  const colW1 = 55;
  const colW2 = contentWidth - colW1;
  const rowH = 8;

  tableData.forEach(([label, value], i) => {
    if (y + rowH > 270) { doc.addPage(); y = 20; }
    const fillColor = i % 2 === 0 ? 240 : 250;
    doc.setFillColor(fillColor, fillColor, fillColor);
    doc.rect(margin, y - 5, contentWidth, rowH, "F");
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + 3, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + colW1 + 3, y);
    y += rowH;
  });

  addSpacer(10);

  // === INTRO ===
  addLine("1. Inleiding", 14, true);
  addSpacer(2);
  addLine(
    `${data.companyName} heeft dit Access Control Policy opgesteld in het kader van de NIS2-richtlijn (EU 2022/2555). Dit document beschrijft de maatregelen en procedures die ${data.companyName} hanteert om de toegang tot informatiesystemen, netwerken en gegevens te beheersen en te beveiligen.`
  );
  addSpacer(2);
  addLine(
    `Dit beleid is opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.date}.`
  );
  addSpacer(6);

  // === SCOPE ===
  addLine("2. Toepassingsgebied", 14, true);
  addSpacer(2);
  addLine(
    `Dit beleid is van toepassing op alle medewerkers, contractanten, leveranciers en derde partijen die toegang hebben tot de informatiesystemen en gegevens van ${data.companyName}. Het omvat zowel fysieke als logische toegangscontrole.`
  );
  addSpacer(6);

  // === PRINCIPLES ===
  addLine("3. Principes van Toegangscontrole", 14, true);
  addSpacer(2);
  const principles = [
    "Least Privilege: Gebruikers krijgen alleen de minimale rechten die nodig zijn voor hun functie.",
    "Need-to-Know: Toegang tot informatie wordt alleen verleend indien noodzakelijk voor de uitvoering van taken.",
    "Scheiding van Taken (Segregation of Duties): Kritieke functies worden verdeeld over meerdere personen.",
    "Identificatie en Authenticatie: Alle gebruikers moeten zich identificeren en authenticeren voordat toegang wordt verleend.",
    "Periodieke Herziening: Toegangsrechten worden minimaal elk kwartaal herzien.",
  ];
  principles.forEach((p, i) => {
    addLine(`${i + 1}. ${p}`, 11, false, 5);
  });
  addSpacer(6);

  // === USER MANAGEMENT ===
  addLine("4. Gebruikersbeheer", 14, true);
  addSpacer(2);
  addLine("4.1 Aanmaken van accounts", 12, true);
  addLine(
    `Nieuwe gebruikersaccounts worden aangemaakt na goedkeuring door de directe leidinggevende en de IT-verantwoordelijke van ${data.companyName}. Elk account is persoonlijk en mag niet gedeeld worden.`
  );
  addSpacer(4);
  addLine("4.2 Wijziging van rechten", 12, true);
  addLine(
    "Bij functiewijziging worden toegangsrechten herzien en aangepast. De vorige rechten worden ingetrokken voordat nieuwe rechten worden toegekend."
  );
  addSpacer(4);
  addLine("4.3 Uitdiensttreding", 12, true);
  addLine(
    "Bij uitdiensttreding worden alle accounts en toegangsrechten onmiddellijk ingetrokken. Dit geldt ook voor fysieke toegangsmiddelen zoals badges en sleutels."
  );
  addSpacer(6);

  // === PASSWORD POLICY ===
  addLine("5. Wachtwoordbeleid", 14, true);
  addSpacer(2);
  const pwRules = [
    "Minimaal 12 tekens lang",
    "Combinatie van hoofdletters, kleine letters, cijfers en speciale tekens",
    "Wachtwoorden worden elke 90 dagen gewijzigd",
    "Vorige 12 wachtwoorden mogen niet hergebruikt worden",
    "Multi-Factor Authenticatie (MFA) is verplicht voor alle kritieke systemen",
  ];
  pwRules.forEach((r) => {
    addLine(`• ${r}`, 11, false, 5);
  });
  addSpacer(6);

  // === PHYSICAL ACCESS ===
  addLine("6. Fysieke Toegangscontrole", 14, true);
  addSpacer(2);
  addLine(
    `De kantoren en serverruimtes van ${data.companyName} zijn beveiligd met elektronische toegangscontrole. Bezoekers worden geregistreerd en begeleid. Toegang tot serverruimtes is beperkt tot geautoriseerd IT-personeel.`
  );
  addSpacer(6);

  // === MONITORING ===
  addLine("7. Monitoring en Logging", 14, true);
  addSpacer(2);
  addLine(
    "Alle toegangspogingen worden gelogd en bewaard voor minimaal 12 maanden. Verdachte activiteiten worden automatisch gemeld aan het security team. Logs worden maandelijks beoordeeld."
  );
  addSpacer(6);

  // === INCIDENT ===
  addLine("8. Incidentbeheer", 14, true);
  addSpacer(2);
  addLine(
    `Bij een vermoedelijke inbreuk op de toegangscontrole wordt het incident onmiddellijk gemeld aan de Security Officer van ${data.companyName}. Het incidentresponsproces wordt gevolgd conform het Incident Response Plan.`
  );
  addSpacer(6);

  // === REVIEW ===
  addLine("9. Herziening", 14, true);
  addSpacer(2);
  addLine(
    "Dit beleid wordt minimaal jaarlijks herzien of bij significante wijzigingen in de organisatie, wetgeving of dreigingslandschap. De herziening wordt uitgevoerd door de auteur en goedgekeurd door het management."
  );

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `${data.companyName} — Access Control Policy v${data.version || "1.0"} — Pagina ${i} van ${totalPages}`,
      margin,
      290
    );
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`Access_Control_Policy_${data.companyName.replace(/\s+/g, "_")}.pdf`);
}
