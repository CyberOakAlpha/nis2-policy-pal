// jsPDF is dynamically imported to avoid SSR issues

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

  const addSpacer = (height = 6) => {
    y += height;
  };

  doc.setFillColor(168, 123, 70);
  doc.rect(0, 0, pageWidth, 54, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Toegangsbeleid", margin, 30);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, margin, 42);
  doc.setTextColor(45, 33, 18);
  y = 72;

  addLine("Documentbeheer", 15, true);
  addSpacer(4);

  const tableData = [
    ["Titel", "Toegangsbeleid"],
    ["Versie", data.version || "1.0"],
    ["Auteur", data.author],
    ["Goedgekeurd door", data.approvedBy],
    ["Datum", data.date],
    ["Classificatie", "Vertrouwelijk"],
    ["Status", "Goedgekeurd"],
  ];

  doc.setFontSize(10);
  const rowHeight = 8;

  tableData.forEach(([label, value], index) => {
    if (y + rowHeight > 270) {
      doc.addPage();
      y = 20;
    }

    const shade = index % 2 === 0 ? 245 : 251;
    doc.setFillColor(shade, 239, 231);
    doc.rect(margin, y - 5, contentWidth, rowHeight, "F");
    doc.setFont("helvetica", "bold");
    doc.text(label, margin + 3, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 58, y);
    y += rowHeight;
  });

  addSpacer(10);

  addLine("1. Inleiding", 14, true);
  addSpacer(2);
  addLine(
    `${data.companyName} heeft dit toegangsbeleid opgesteld in het kader van de NIS2-richtlijn. In dit document staat hoe toegang tot systemen, netwerken en informatie wordt toegekend, beheerd en opgevolgd.`
  );
  addSpacer(2);
  addLine(
    `Dit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.date}.`
  );
  addSpacer(6);

  addLine("2. Toepassingsgebied", 14, true);
  addSpacer(2);
  addLine(
    `Dit beleid geldt voor medewerkers, externe partijen en leveranciers die toegang hebben tot systemen of gegevens van ${data.companyName}. Het omvat fysieke en digitale toegang.`
  );
  addSpacer(6);

  addLine("3. Basisprincipes", 14, true);
  addSpacer(2);
  const principles = [
    "Gebruikers krijgen alleen de rechten die nodig zijn voor hun functie.",
    "Toegang tot informatie wordt alleen verleend wanneer dat nodig is voor het werk.",
    "Kritieke taken worden waar mogelijk verdeeld over meerdere personen.",
    "Elke gebruiker moet zich identificeren en authenticeren voor toegang.",
    "Toegangsrechten worden periodiek nagekeken en aangepast.",
  ];
  principles.forEach((principle, index) => {
    addLine(`${index + 1}. ${principle}`, 11, false, 5);
  });
  addSpacer(6);

  addLine("4. Gebruikersbeheer", 14, true);
  addSpacer(2);
  addLine("4.1 Nieuwe accounts", 12, true);
  addLine(
    `Nieuwe accounts worden pas aangemaakt na goedkeuring door de verantwoordelijke binnen ${data.companyName}. Accounts zijn persoonlijk en mogen niet gedeeld worden.`
  );
  addSpacer(4);
  addLine("4.2 Wijziging van rechten", 12, true);
  addLine(
    "Bij een functiewijziging worden bestaande rechten herzien en aangepast aan de nieuwe rol."
  );
  addSpacer(4);
  addLine("4.3 Einde van samenwerking", 12, true);
  addLine(
    "Wanneer iemand uit dienst gaat of een samenwerking stopt, worden toegangen onmiddellijk ingetrokken."
  );
  addSpacer(6);

  addLine("5. Wachtwoorden en aanmelding", 14, true);
  addSpacer(2);
  const passwordRules = [
    "Wachtwoorden zijn minstens 12 tekens lang.",
    "Ze bevatten een mix van letters, cijfers en speciale tekens.",
    "Waar nodig wordt multifactorauthenticatie gebruikt.",
    "Toegang tot kritieke systemen wordt extra afgeschermd.",
  ];
  passwordRules.forEach((rule, index) => {
    addLine(`${index + 1}. ${rule}`, 11, false, 5);
  });
  addSpacer(6);

  addLine("6. Fysieke toegang", 14, true);
  addSpacer(2);
  addLine(
    `Gebouwen, werkruimtes en technische ruimtes van ${data.companyName} worden beschermd tegen ongeoorloofde toegang. Bezoekers worden geregistreerd en begeleid waar nodig.`
  );
  addSpacer(6);

  addLine("7. Logging en controle", 14, true);
  addSpacer(2);
  addLine(
    "Toegangspogingen en relevante wijzigingen worden gelogd. Verdachte activiteiten worden onderzocht en indien nodig geëscaleerd."
  );
  addSpacer(6);

  addLine("8. Incidenten", 14, true);
  addSpacer(2);
  addLine(
    `Een vermoeden van misbruik of ongeoorloofde toegang wordt meteen gemeld volgens de interne procedure van ${data.companyName}.`
  );
  addSpacer(6);

  addLine("9. Herziening", 14, true);
  addSpacer(2);
  addLine(
    "Dit beleid wordt minstens jaarlijks herzien en aangepast wanneer de organisatie, risico's of wettelijke vereisten veranderen."
  );

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(120, 95, 70);
    doc.text(`Pagina ${page} van ${totalPages}`, margin, 290);
  }

  const safeName = data.companyName.trim().replace(/\s+/g, "_") || "bedrijf";
  doc.save(`toegangsbeleid_${safeName}.pdf`);
}
