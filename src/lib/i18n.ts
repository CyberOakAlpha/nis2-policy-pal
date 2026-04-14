import { createContext, useContext } from "react";

export type Language = "nl" | "en" | "fr";

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "nl", label: "NL" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

export interface Translations {
  // App
  appTitle: string;
  appSubtitle: string;
  appDescription: string;

  // Form
  documentDetails: string;
  documentDetailsDesc: string;
  companyName: string;
  companyNamePlaceholder: string;
  author: string;
  authorPlaceholder: string;
  owner: string;
  ownerPlaceholder: string;
  approvedBy: string;
  approvedByPlaceholder: string;
  date: string;
  approvalDate: string;
  version: string;
  policyType: string;

  // Preview
  previewTitle: string;
  previewDescription: string;
  savePdf: string;
  generatingPdf: string;
  downloadAll: string;
  downloadingAll: string;

  // Policy names
  policyNames: Record<string, string>;

  // PDF labels
  pdfDocControl: string;
  pdfTitle: string;
  pdfVersion: string;
  pdfAuthor: string;
  pdfOwner: string;
  pdfApprovedBy: string;
  pdfDate: string;
  pdfApprovalDate: string;
  pdfClassification: string;
  pdfClassificationValue: string;
  pdfStatus: string;
  pdfStatusValue: string;
  pdfPage: string;
  pdfOf: string;

  // Roadmap
  roadmapTitle: string;
  roadmapSubtitle: string;
  roadmapSteps: { title: string; description: string; examples: string[] }[];
  backToGenerator: string;
  goToRoadmap: string;
  viewExamples: string;
  exampleAssets: string;

  // Asset template
  assetTemplateTitle: string;
  assetTemplateSubtitle: string;
  assetHardware: string;
  assetSoftware: string;
  assetColumnName: string;
  assetColumnType: string;
  assetColumnOwner: string;
  assetColumnCriticality: string;
  assetColumnLocation: string;
  assetColumnLicense: string;
  assetColumnVersion: string;
  assetColumnVendor: string;
  hardwareAssets: { name: string; type: string; owner: string; criticality: string; location: string }[];
  softwareAssets: { name: string; type: string; vendor: string; version: string; license: string; criticality: string }[];
  downloadTemplate: string;

  // Disclaimer
  disclaimer: string;

  // Nav
  generator: string;
  roadmap: string;

  // CyFun
  cyfunTitle: string;
  cyfunSubtitle: string;
  cyfunControls: string;
  cyfunControlsForStep: string;
  cyfunViewAll: string;
  cyfunCategory: string;
  cyfunTotal: string;
  cyfunAllCategories: string;
}

const nl: Translations = {
  appTitle: "NIS2 policy generator",
  appSubtitle: "Quick NIS2 policy generator",
  appDescription: "Deze tool helpt u professionele NIS2-conforme beleidsdocumenten te maken. Vul het formulier in, pas de tekst aan waar nodig en download uw beleid als PDF.",

  documentDetails: "Documentgegevens",
  documentDetailsDesc: "Deze gegevens worden automatisch ingevuld in het document.",
  companyName: "Bedrijfsnaam",
  companyNamePlaceholder: "bijv. Acme bv",
  author: "Auteur",
  authorPlaceholder: "Naam auteur",
  owner: "Eigenaar",
  ownerPlaceholder: "Naam eigenaar document",
  approvedBy: "Goedgekeurd door",
  approvedByPlaceholder: "Naam goedkeurder",
  date: "Aanmaakdatum",
  approvalDate: "Goedkeuringsdatum",
  version: "Versie",
  policyType: "Type beleid",

  previewTitle: "Voorbeeld",
  previewDescription: "Pas de tekst aan waar nodig en sla op als PDF.",
  savePdf: "Opslaan als PDF",
  generatingPdf: "PDF genereren...",
  downloadAll: "Download alle 14 policies",
  downloadingAll: "Bundel genereren...",

  policyNames: {
    access: "Access Policy",
    network: "Network Access Policy",
    incident: "Incident Response Policy",
    bcp: "Business Continuity Plan",
    risk: "Risk Management Policy",
    "supply-chain": "Supply Chain Management",
    crypto: "Cryptography & Encryption",
    awareness: "Awareness & Training",
    vulnerability: "Vulnerability Management",
    backup: "Backup & Recovery",
    "asset-management": "Asset Management",
    password: "Password Policy",
    cybersecurity: "Cybersecurity Policy",
    "patch-management": "Patch Management",
  },

  pdfDocControl: "Documentbeheer",
  pdfTitle: "Titel",
  pdfVersion: "Versie",
  pdfAuthor: "Auteur",
  pdfOwner: "Eigenaar",
  pdfApprovedBy: "Goedgekeurd door",
  pdfDate: "Aanmaakdatum",
  pdfApprovalDate: "Goedkeuringsdatum",
  pdfClassification: "Classificatie",
  pdfClassificationValue: "Vertrouwelijk",
  pdfStatus: "Status",
  pdfStatusValue: "Goedgekeurd",
  pdfPage: "pagina",
  pdfOf: "van",

  roadmapTitle: "NIS2 Stappenplan",
  roadmapSubtitle: "Volg deze stappen om NIS2-compliant te worden als KMO.",
  roadmapSteps: [
    { title: "Asset inventarisatie", description: "Maak een volledige lijst van alle hardware en software binnen uw organisatie. Dit is het fundament van uw beveiligingsstrategie.", examples: ["Laptop Dell XPS 15 — Financiën — Kritiek", "Server HPE ProLiant — Serverruimte — Kritiek", "Microsoft 365 Business — SaaS — Hoog", "SAP Business One — ERP — Kritiek"] },
    { title: "Risicobeoordeling uitvoeren", description: "Identificeer en beoordeel de cybersecurityrisico's. Bepaal waarschijnlijkheid en impact van elke dreiging.", examples: ["Ransomware-aanval — Hoog risico — Impact: bedrijfsstilstand", "Phishing e-mail — Zeer waarschijnlijk — Impact: datalekken", "Ongepatched systeem — Gemiddeld — Impact: ongeautoriseerde toegang", "Insider threat — Laag — Impact: dataverlies"] },
    { title: "Beleidsdocumenten opstellen", description: "Stel de 10 vereiste NIS2-beleidsdocumenten op met onze generator.", examples: ["ISO 27001 A.9 — Toegangsbeleid", "ISO 27001 A.13 — Netwerktoegangsbeleid", "ISO 27001 A.16 — Incidentresponsbeleid", "ISO 27001 A.17 — Bedrijfscontinuïteitsplan"] },
    { title: "Incident response inrichten", description: "Stel een incidentresponsteam samen en zorg voor NIS2-meldplicht (24u/72u).", examples: ["CSIRT-team samenstellen met rollen", "Meldprocedure binnen 24u aan autoriteiten", "Escalatiematrix per incidenttype", "Jaarlijkse incident response oefening"] },
    { title: "Awareness training", description: "Train alle medewerkers in cybersecurity-bewustzijn.", examples: ["Kwartaal phishing-simulatie campagne", "Onboarding security training voor nieuwe medewerkers", "Jaarlijkse e-learning cybersecurity module", "Social engineering awareness workshop"] },
    { title: "Leveranciersbeheer opzetten", description: "Breng leveranciers in kaart en neem beveiligingseisen op in contracten.", examples: ["Leverancier risicobeoordeling checklist", "SLA met beveiligingseisen opnemen", "Jaarlijkse leverancier security audit", "Vendor risk register bijhouden"] },
    { title: "Continue monitoring en verbetering", description: "Implementeer continu monitoring en herzie beleidsdocumenten jaarlijks.", examples: ["Maandelijkse kwetsbaarheidsscans uitvoeren", "SIEM-systeem voor logmonitoring", "Kwartaal back-up restore test", "Jaarlijkse beleidsdocument review"] },
  ],
  backToGenerator: "Terug naar generator",
  goToRoadmap: "NIS2 Stappenplan bekijken",
  viewExamples: "Bekijk voorbeelden",
  exampleAssets: "Voorbeeld assets",

  assetTemplateTitle: "Asset Inventaris Template",
  assetTemplateSubtitle: "Gebruik deze template om uw hardware en software in kaart te brengen.",
  assetHardware: "Hardware",
  assetSoftware: "Software",
  assetColumnName: "Naam",
  assetColumnType: "Type",
  assetColumnOwner: "Eigenaar",
  assetColumnCriticality: "Kritiekheid",
  assetColumnLocation: "Locatie",
  assetColumnLicense: "Licentie",
  assetColumnVersion: "Versie",
  assetColumnVendor: "Leverancier",
  hardwareAssets: [
    { name: "Dell XPS 15 Laptop", type: "Laptop", owner: "Jan Peeters", criticality: "Hoog", location: "Kantoor Brussel" },
    { name: "HPE ProLiant DL380", type: "Server", owner: "IT Afdeling", criticality: "Kritiek", location: "Serverruimte" },
    { name: "Cisco Catalyst 9200", type: "Switch", owner: "IT Afdeling", criticality: "Kritiek", location: "Serverruimte" },
    { name: "HP LaserJet Pro", type: "Printer", owner: "Administratie", criticality: "Laag", location: "Kantoor" },
  ],
  softwareAssets: [
    { name: "Microsoft 365 Business", type: "SaaS", vendor: "Microsoft", version: "E3", license: "Jaarabonnement", criticality: "Kritiek" },
    { name: "SAP Business One", type: "ERP", vendor: "SAP", version: "10.0", license: "Named User", criticality: "Kritiek" },
    { name: "Bitdefender GravityZone", type: "Security", vendor: "Bitdefender", version: "6.x", license: "Jaarlicentie", criticality: "Hoog" },
    { name: "Veeam Backup", type: "Backup", vendor: "Veeam", version: "12", license: "Per socket", criticality: "Hoog" },
  ],
  downloadTemplate: "Download CSV template",

  generator: "Generator",
  roadmap: "Stappenplan",
  disclaimer: "These policy templates are provided as-is. They are general and intended to be adjusted to each company's specific needs to become NIS2 compliant. They might not contain all information needed.",

  cyfunTitle: "CCB Controls",
  cyfunSubtitle: "Alle 93 CCB controls voor het niveau 'Belangrijk', gebaseerd op het NIST Cybersecurity Framework.",
  cyfunControls: "CCB controls",
  cyfunControlsForStep: "Relevante CCB controls",
  cyfunViewAll: "Bekijk alle CCB controls",
  cyfunCategory: "Categorie",
  cyfunTotal: "controls",
  cyfunAllCategories: "Alle categorieën",
};

const en: Translations = {
  appTitle: "NIS2 Policy Generator",
  appSubtitle: "Quick NIS2 Policy Generator",
  appDescription: "This tool helps you create professional NIS2-compliant policy documents. Fill in the form, adjust the text where needed, and download your policy as a PDF.",

  documentDetails: "Document details",
  documentDetailsDesc: "These details are automatically filled into the document.",
  companyName: "Company name",
  companyNamePlaceholder: "e.g. Acme Ltd",
  author: "Author",
  authorPlaceholder: "Author name",
  owner: "Owner",
  ownerPlaceholder: "Document owner name",
  approvedBy: "Approved by",
  approvedByPlaceholder: "Approver name",
  date: "Date created",
  approvalDate: "Approval date",
  version: "Version",
  policyType: "Policy type",

  previewTitle: "Preview",
  previewDescription: "Edit the text where needed, then save as PDF.",
  savePdf: "Save as PDF",
  generatingPdf: "Generating PDF...",
  downloadAll: "Download all 14 policies",
  downloadingAll: "Generating bundle...",

  policyNames: {
    access: "Access Policy",
    network: "Network Access Policy",
    incident: "Incident Response Policy",
    bcp: "Business Continuity Plan",
    risk: "Risk Management Policy",
    "supply-chain": "Supply Chain Management",
    crypto: "Cryptography & Encryption",
    awareness: "Awareness & Training",
    vulnerability: "Vulnerability Management",
    backup: "Backup & Recovery",
    "asset-management": "Asset Management",
    password: "Password Policy",
    cybersecurity: "Cybersecurity Policy",
    "patch-management": "Patch Management",
  },

  pdfDocControl: "Document Control",
  pdfTitle: "Title",
  pdfVersion: "Version",
  pdfAuthor: "Author",
  pdfOwner: "Owner",
  pdfApprovedBy: "Approved by",
  pdfDate: "Date created",
  pdfApprovalDate: "Approval date",
  pdfClassification: "Classification",
  pdfClassificationValue: "Confidential",
  pdfStatus: "Status",
  pdfStatusValue: "Approved",
  pdfPage: "page",
  pdfOf: "of",

  roadmapTitle: "NIS2 Roadmap",
  roadmapSubtitle: "Follow these steps to become NIS2-compliant as an SME.",
  roadmapSteps: [
    { title: "Asset inventory", description: "Create a complete list of all hardware and software within your organization. This is the foundation of your security strategy.", examples: ["Laptop Dell XPS 15 — Finance — Critical", "Server HPE ProLiant — Server room — Critical", "Microsoft 365 Business — SaaS — High", "SAP Business One — ERP — Critical"] },
    { title: "Conduct risk assessment", description: "Identify and assess cybersecurity risks. Determine likelihood and impact of each threat.", examples: ["Ransomware attack — High risk — Impact: business standstill", "Phishing email — Very likely — Impact: data breaches", "Unpatched system — Medium — Impact: unauthorized access", "Insider threat — Low — Impact: data loss"] },
    { title: "Draft policy documents", description: "Create the 10 required NIS2 policy documents using our generator.", examples: ["ISO 27001 A.9 — Access Policy", "ISO 27001 A.13 — Network Access Policy", "ISO 27001 A.16 — Incident Response Policy", "ISO 27001 A.17 — Business Continuity Plan"] },
    { title: "Set up incident response", description: "Assemble an incident response team and ensure NIS2 reporting (24h/72h).", examples: ["Assemble CSIRT team with defined roles", "Reporting procedure within 24h to authorities", "Escalation matrix per incident type", "Annual incident response exercise"] },
    { title: "Awareness training", description: "Train all employees in cybersecurity awareness.", examples: ["Quarterly phishing simulation campaign", "Onboarding security training for new hires", "Annual cybersecurity e-learning module", "Social engineering awareness workshop"] },
    { title: "Set up supplier management", description: "Map suppliers and include security requirements in contracts.", examples: ["Supplier risk assessment checklist", "Include SLA with security requirements", "Annual supplier security audit", "Maintain vendor risk register"] },
    { title: "Continuous monitoring & improvement", description: "Implement continuous monitoring and review policy documents annually.", examples: ["Monthly vulnerability scans", "SIEM system for log monitoring", "Quarterly backup restore test", "Annual policy document review"] },
  ],
  backToGenerator: "Back to generator",
  goToRoadmap: "View NIS2 Roadmap",
  viewExamples: "View examples",
  exampleAssets: "Example assets",

  assetTemplateTitle: "Asset Inventory Template",
  assetTemplateSubtitle: "Use this template to map your hardware and software assets.",
  assetHardware: "Hardware",
  assetSoftware: "Software",
  assetColumnName: "Name",
  assetColumnType: "Type",
  assetColumnOwner: "Owner",
  assetColumnCriticality: "Criticality",
  assetColumnLocation: "Location",
  assetColumnLicense: "License",
  assetColumnVersion: "Version",
  assetColumnVendor: "Vendor",
  hardwareAssets: [
    { name: "Dell XPS 15 Laptop", type: "Laptop", owner: "John Smith", criticality: "High", location: "Brussels Office" },
    { name: "HPE ProLiant DL380", type: "Server", owner: "IT Department", criticality: "Critical", location: "Server Room" },
    { name: "Cisco Catalyst 9200", type: "Switch", owner: "IT Department", criticality: "Critical", location: "Server Room" },
    { name: "HP LaserJet Pro", type: "Printer", owner: "Administration", criticality: "Low", location: "Office" },
  ],
  softwareAssets: [
    { name: "Microsoft 365 Business", type: "SaaS", vendor: "Microsoft", version: "E3", license: "Annual subscription", criticality: "Critical" },
    { name: "SAP Business One", type: "ERP", vendor: "SAP", version: "10.0", license: "Named User", criticality: "Critical" },
    { name: "Bitdefender GravityZone", type: "Security", vendor: "Bitdefender", version: "6.x", license: "Annual license", criticality: "High" },
    { name: "Veeam Backup", type: "Backup", vendor: "Veeam", version: "12", license: "Per socket", criticality: "High" },
  ],
  downloadTemplate: "Download CSV template",

  generator: "Generator",
  roadmap: "Roadmap",
  disclaimer: "These policy templates are provided as-is. They are general and intended to be adjusted to each company's specific needs to become NIS2 compliant. They might not contain all information needed.",

  cyfunTitle: "CCB Controls",
  cyfunSubtitle: "All 93 CCB controls for the 'Important' level, based on the NIST Cybersecurity Framework.",
  cyfunControls: "CCB controls",
  cyfunControlsForStep: "Related CCB controls",
  cyfunViewAll: "View all CCB controls",
  cyfunCategory: "Category",
  cyfunTotal: "controls",
  cyfunAllCategories: "All categories",
};

const fr: Translations = {
  appTitle: "Générateur de politiques NIS2",
  appSubtitle: "Générateur rapide de politiques NIS2",
  appDescription: "Cet outil vous aide à créer des documents de politique conformes à NIS2. Remplissez le formulaire, ajustez le texte si nécessaire et téléchargez votre politique en PDF.",

  documentDetails: "Détails du document",
  documentDetailsDesc: "Ces détails sont automatiquement intégrés dans le document.",
  companyName: "Nom de l'entreprise",
  companyNamePlaceholder: "ex. Acme SA",
  author: "Auteur",
  authorPlaceholder: "Nom de l'auteur",
  owner: "Propriétaire",
  ownerPlaceholder: "Nom du propriétaire",
  approvedBy: "Approuvé par",
  approvedByPlaceholder: "Nom de l'approbateur",
  date: "Date de création",
  approvalDate: "Date d'approbation",
  version: "Version",
  policyType: "Type de politique",

  previewTitle: "Aperçu",
  previewDescription: "Modifiez le texte si nécessaire, puis enregistrez en PDF.",
  savePdf: "Enregistrer en PDF",
  generatingPdf: "Génération du PDF...",
  downloadAll: "Télécharger les 14 politiques",
  downloadingAll: "Génération du lot...",

  policyNames: {
    access: "Access Policy",
    network: "Network Access Policy",
    incident: "Incident Response Policy",
    bcp: "Business Continuity Plan",
    risk: "Risk Management Policy",
    "supply-chain": "Supply Chain Management",
    crypto: "Cryptography & Encryption",
    awareness: "Awareness & Training",
    vulnerability: "Vulnerability Management",
    backup: "Backup & Recovery",
    "asset-management": "Asset Management",
    password: "Password Policy",
    cybersecurity: "Cybersecurity Policy",
    "patch-management": "Patch Management",
  },

  pdfDocControl: "Contrôle du document",
  pdfTitle: "Titre",
  pdfVersion: "Version",
  pdfAuthor: "Auteur",
  pdfOwner: "Propriétaire",
  pdfApprovedBy: "Approuvé par",
  pdfDate: "Date de création",
  pdfApprovalDate: "Date d'approbation",
  pdfClassification: "Classification",
  pdfClassificationValue: "Confidentiel",
  pdfStatus: "Statut",
  pdfStatusValue: "Approuvé",
  pdfPage: "page",
  pdfOf: "de",

  roadmapTitle: "Plan d'action NIS2",
  roadmapSubtitle: "Suivez ces étapes pour devenir conforme à NIS2 en tant que PME.",
  roadmapSteps: [
    { title: "Inventaire des actifs", description: "Créez une liste complète de tout le matériel et logiciel de votre organisation. C'est le fondement de votre stratégie de sécurité.", examples: ["Laptop Dell XPS 15 — Finance — Critique", "Serveur HPE ProLiant — Salle serveur — Critique", "Microsoft 365 Business — SaaS — Élevé", "SAP Business One — ERP — Critique"] },
    { title: "Évaluation des risques", description: "Identifiez et évaluez les risques de cybersécurité. Déterminez la probabilité et l'impact de chaque menace.", examples: ["Attaque ransomware — Risque élevé — Impact: arrêt activité", "E-mail de phishing — Très probable — Impact: fuites de données", "Système non patché — Moyen — Impact: accès non autorisé", "Menace interne — Faible — Impact: perte de données"] },
    { title: "Rédiger les documents de politique", description: "Créez les 10 documents de politique NIS2 requis avec notre générateur.", examples: ["ISO 27001 A.9 — Politique d'accès", "ISO 27001 A.13 — Politique d'accès réseau", "ISO 27001 A.16 — Politique de réponse aux incidents", "ISO 27001 A.17 — Plan de continuité d'activité"] },
    { title: "Mettre en place la réponse aux incidents", description: "Constituez une équipe et assurez le signalement NIS2 (24h/72h).", examples: ["Constituer l'équipe CSIRT avec rôles définis", "Procédure de signalement sous 24h aux autorités", "Matrice d'escalade par type d'incident", "Exercice annuel de réponse aux incidents"] },
    { title: "Formation de sensibilisation", description: "Formez tous les employés à la sensibilisation cybersécurité.", examples: ["Campagne trimestrielle de simulation phishing", "Formation sécurité d'intégration nouveaux employés", "Module e-learning cybersécurité annuel", "Atelier sensibilisation ingénierie sociale"] },
    { title: "Gestion des fournisseurs", description: "Cartographiez vos fournisseurs et incluez des exigences de sécurité dans les contrats.", examples: ["Checklist évaluation risques fournisseurs", "Inclure SLA avec exigences sécurité", "Audit sécurité annuel fournisseurs", "Tenir un registre des risques fournisseurs"] },
    { title: "Surveillance continue et amélioration", description: "Mettez en œuvre une surveillance continue et révisez les documents annuellement.", examples: ["Scans de vulnérabilités mensuels", "Système SIEM pour surveillance des logs", "Test trimestriel de restauration des sauvegardes", "Revue annuelle des documents de politique"] },
  ],
  backToGenerator: "Retour au générateur",
  goToRoadmap: "Voir le plan d'action NIS2",
  viewExamples: "Voir les exemples",
  exampleAssets: "Exemples d'actifs",

  assetTemplateTitle: "Template inventaire des actifs",
  assetTemplateSubtitle: "Utilisez ce template pour cartographier votre matériel et vos logiciels.",
  assetHardware: "Matériel",
  assetSoftware: "Logiciels",
  assetColumnName: "Nom",
  assetColumnType: "Type",
  assetColumnOwner: "Propriétaire",
  assetColumnCriticality: "Criticité",
  assetColumnLocation: "Emplacement",
  assetColumnLicense: "Licence",
  assetColumnVersion: "Version",
  assetColumnVendor: "Fournisseur",
  hardwareAssets: [
    { name: "Dell XPS 15 Laptop", type: "Ordinateur portable", owner: "Jean Dupont", criticality: "Élevé", location: "Bureau Bruxelles" },
    { name: "HPE ProLiant DL380", type: "Serveur", owner: "Département IT", criticality: "Critique", location: "Salle serveur" },
    { name: "Cisco Catalyst 9200", type: "Switch", owner: "Département IT", criticality: "Critique", location: "Salle serveur" },
    { name: "HP LaserJet Pro", type: "Imprimante", owner: "Administration", criticality: "Faible", location: "Bureau" },
  ],
  softwareAssets: [
    { name: "Microsoft 365 Business", type: "SaaS", vendor: "Microsoft", version: "E3", license: "Abonnement annuel", criticality: "Critique" },
    { name: "SAP Business One", type: "ERP", vendor: "SAP", version: "10.0", license: "Utilisateur nommé", criticality: "Critique" },
    { name: "Bitdefender GravityZone", type: "Sécurité", vendor: "Bitdefender", version: "6.x", license: "Licence annuelle", criticality: "Élevé" },
    { name: "Veeam Backup", type: "Sauvegarde", vendor: "Veeam", version: "12", license: "Par socket", criticality: "Élevé" },
  ],
  downloadTemplate: "Télécharger template CSV",

  generator: "Générateur",
  roadmap: "Plan d'action",
  disclaimer: "These policy templates are provided as-is. They are general and intended to be adjusted to each company's specific needs to become NIS2 compliant. They might not contain all information needed.",

  cyfunTitle: "Contrôles CCB",
  cyfunSubtitle: "Les 93 contrôles CCB pour le niveau 'Important', basés sur le NIST Cybersecurity Framework.",
  cyfunControls: "Contrôles CCB",
  cyfunControlsForStep: "Contrôles CCB associés",
  cyfunViewAll: "Voir tous les contrôles CCB",
  cyfunCategory: "Catégorie",
  cyfunTotal: "contrôles",
  cyfunAllCategories: "Toutes les catégories",
};

const translations: Record<Language, Translations> = { nl, en, fr };

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

export const I18nContext = createContext<I18nContextType>({
  lang: "nl",
  setLang: () => {},
  t: nl,
});

export function useI18n() {
  return useContext(I18nContext);
}
