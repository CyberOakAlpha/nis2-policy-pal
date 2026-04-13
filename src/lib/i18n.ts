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
  approvedBy: string;
  approvedByPlaceholder: string;
  date: string;
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
  pdfApprovedBy: string;
  pdfDate: string;
  pdfClassification: string;
  pdfClassificationValue: string;
  pdfStatus: string;
  pdfStatusValue: string;
  pdfPage: string;
  pdfOf: string;

  // Roadmap
  roadmapTitle: string;
  roadmapSubtitle: string;
  roadmapSteps: { title: string; description: string }[];
  backToGenerator: string;
  goToRoadmap: string;

  // Nav
  generator: string;
  roadmap: string;
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
  approvedBy: "Goedgekeurd door",
  approvedByPlaceholder: "Naam goedkeurder",
  date: "Datum",
  version: "Versie",
  policyType: "Type beleid",

  previewTitle: "Voorbeeld",
  previewDescription: "Pas de tekst aan waar nodig en sla op als PDF.",
  savePdf: "Opslaan als PDF",
  generatingPdf: "PDF genereren...",
  downloadAll: "Download alle 10 policies",
  downloadingAll: "Bundel genereren...",

  policyNames: {
    access: "Toegangsbeleid",
    network: "Netwerktoegangsbeleid",
    incident: "Incidentresponsbeleid",
    bcp: "Bedrijfscontinuïteitsplan",
    risk: "Risicobeheerbeleid",
    "supply-chain": "Leveranciersbeheer",
    crypto: "Cryptografie en encryptie",
    awareness: "Bewustmaking en opleiding",
    vulnerability: "Kwetsbaarheidsbeheer",
    backup: "Back-up en herstel",
  },

  pdfDocControl: "Documentbeheer",
  pdfTitle: "Titel",
  pdfVersion: "Versie",
  pdfAuthor: "Auteur",
  pdfApprovedBy: "Goedgekeurd door",
  pdfDate: "Datum",
  pdfClassification: "Classificatie",
  pdfClassificationValue: "Vertrouwelijk",
  pdfStatus: "Status",
  pdfStatusValue: "Goedgekeurd",
  pdfPage: "pagina",
  pdfOf: "van",

  roadmapTitle: "NIS2 Stappenplan",
  roadmapSubtitle: "Volg deze stappen om NIS2-compliant te worden als KMO.",
  roadmapSteps: [
    { title: "Asset inventarisatie", description: "Maak een volledige lijst van alle hardware (servers, laptops, netwerkapparatuur) en software (applicaties, licenties, clouddiensten) binnen uw organisatie. Dit is het fundament van uw beveiligingsstrategie." },
    { title: "Risicobeoordeling uitvoeren", description: "Identificeer en beoordeel de cybersecurityrisico's voor uw organisatie. Bepaal de waarschijnlijkheid en impact van elke dreiging en prioriteer de aan te pakken risico's." },
    { title: "Beleidsdocumenten opstellen", description: "Stel de 10 vereiste NIS2-beleidsdocumenten op: toegang, netwerk, incidentrespons, BCP, risicobeheer, leveranciers, cryptografie, bewustmaking, kwetsbaarheden en back-up." },
    { title: "Incident response inrichten", description: "Stel een incidentresponsteam samen, definieer rollen en verantwoordelijkheden, en zorg voor een meldprocedure die voldoet aan de NIS2-meldplicht (24u/72u)." },
    { title: "Awareness training", description: "Train alle medewerkers in cybersecurity-bewustzijn. Voer regelmatig phishing-simulaties uit en zorg voor onboarding-training voor nieuwe medewerkers." },
    { title: "Leveranciersbeheer opzetten", description: "Breng uw leveranciers in kaart, beoordeel hun beveiligingsniveau en neem beveiligingseisen op in contracten. Monitor leveranciers periodiek." },
    { title: "Continue monitoring en verbetering", description: "Implementeer continu monitoring van systemen, voer regelmatig kwetsbaarheidsscans uit, test back-ups en herstel, en herzie alle beleidsdocumenten jaarlijks." },
  ],
  backToGenerator: "Terug naar generator",
  goToRoadmap: "NIS2 Stappenplan bekijken",
  generator: "Generator",
  roadmap: "Stappenplan",
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
  approvedBy: "Approved by",
  approvedByPlaceholder: "Approver name",
  date: "Date",
  version: "Version",
  policyType: "Policy type",

  previewTitle: "Preview",
  previewDescription: "Edit the text where needed, then save as PDF.",
  savePdf: "Save as PDF",
  generatingPdf: "Generating PDF...",
  downloadAll: "Download all 10 policies",
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
  },

  pdfDocControl: "Document Control",
  pdfTitle: "Title",
  pdfVersion: "Version",
  pdfAuthor: "Author",
  pdfApprovedBy: "Approved by",
  pdfDate: "Date",
  pdfClassification: "Classification",
  pdfClassificationValue: "Confidential",
  pdfStatus: "Status",
  pdfStatusValue: "Approved",
  pdfPage: "page",
  pdfOf: "of",

  roadmapTitle: "NIS2 Roadmap",
  roadmapSubtitle: "Follow these steps to become NIS2-compliant as an SME.",
  roadmapSteps: [
    { title: "Asset inventory", description: "Create a complete list of all hardware (servers, laptops, network equipment) and software (applications, licenses, cloud services) within your organization. This is the foundation of your security strategy." },
    { title: "Conduct risk assessment", description: "Identify and assess cybersecurity risks for your organization. Determine the likelihood and impact of each threat and prioritize the risks to address." },
    { title: "Draft policy documents", description: "Create the 10 required NIS2 policy documents: access, network, incident response, BCP, risk management, suppliers, cryptography, awareness, vulnerabilities, and backup." },
    { title: "Set up incident response", description: "Assemble an incident response team, define roles and responsibilities, and ensure a reporting procedure that complies with NIS2 requirements (24h/72h)." },
    { title: "Awareness training", description: "Train all employees in cybersecurity awareness. Conduct regular phishing simulations and provide onboarding training for new employees." },
    { title: "Set up supplier management", description: "Map your suppliers, assess their security level, and include security requirements in contracts. Monitor suppliers periodically." },
    { title: "Continuous monitoring & improvement", description: "Implement continuous system monitoring, perform regular vulnerability scans, test backups and recovery, and review all policy documents annually." },
  ],
  backToGenerator: "Back to generator",
  goToRoadmap: "View NIS2 Roadmap",
  generator: "Generator",
  roadmap: "Roadmap",
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
  approvedBy: "Approuvé par",
  approvedByPlaceholder: "Nom de l'approbateur",
  date: "Date",
  version: "Version",
  policyType: "Type de politique",

  previewTitle: "Aperçu",
  previewDescription: "Modifiez le texte si nécessaire, puis enregistrez en PDF.",
  savePdf: "Enregistrer en PDF",
  generatingPdf: "Génération du PDF...",
  downloadAll: "Télécharger les 10 politiques",
  downloadingAll: "Génération du lot...",

  policyNames: {
    access: "Politique d'accès",
    network: "Politique d'accès réseau",
    incident: "Politique de réponse aux incidents",
    bcp: "Plan de continuité d'activité",
    risk: "Politique de gestion des risques",
    "supply-chain": "Gestion des fournisseurs",
    crypto: "Cryptographie et chiffrement",
    awareness: "Sensibilisation et formation",
    vulnerability: "Gestion des vulnérabilités",
    backup: "Sauvegarde et récupération",
  },

  pdfDocControl: "Contrôle du document",
  pdfTitle: "Titre",
  pdfVersion: "Version",
  pdfAuthor: "Auteur",
  pdfApprovedBy: "Approuvé par",
  pdfDate: "Date",
  pdfClassification: "Classification",
  pdfClassificationValue: "Confidentiel",
  pdfStatus: "Statut",
  pdfStatusValue: "Approuvé",
  pdfPage: "page",
  pdfOf: "de",

  roadmapTitle: "Plan d'action NIS2",
  roadmapSubtitle: "Suivez ces étapes pour devenir conforme à NIS2 en tant que PME.",
  roadmapSteps: [
    { title: "Inventaire des actifs", description: "Créez une liste complète de tout le matériel (serveurs, ordinateurs portables, équipement réseau) et des logiciels (applications, licences, services cloud) de votre organisation. C'est le fondement de votre stratégie de sécurité." },
    { title: "Évaluation des risques", description: "Identifiez et évaluez les risques de cybersécurité pour votre organisation. Déterminez la probabilité et l'impact de chaque menace et priorisez les risques à traiter." },
    { title: "Rédiger les documents de politique", description: "Créez les 10 documents de politique NIS2 requis : accès, réseau, réponse aux incidents, PCA, gestion des risques, fournisseurs, cryptographie, sensibilisation, vulnérabilités et sauvegarde." },
    { title: "Mettre en place la réponse aux incidents", description: "Constituez une équipe de réponse aux incidents, définissez les rôles et responsabilités, et assurez une procédure de signalement conforme aux exigences NIS2 (24h/72h)." },
    { title: "Formation de sensibilisation", description: "Formez tous les employés à la sensibilisation à la cybersécurité. Effectuez régulièrement des simulations de phishing et assurez la formation d'intégration pour les nouveaux employés." },
    { title: "Gestion des fournisseurs", description: "Cartographiez vos fournisseurs, évaluez leur niveau de sécurité et incluez des exigences de sécurité dans les contrats. Surveillez les fournisseurs périodiquement." },
    { title: "Surveillance continue et amélioration", description: "Mettez en œuvre une surveillance continue des systèmes, effectuez des analyses de vulnérabilités régulières, testez les sauvegardes et la récupération, et révisez tous les documents de politique annuellement." },
  ],
  backToGenerator: "Retour au générateur",
  goToRoadmap: "Voir le plan d'action NIS2",
  generator: "Générateur",
  roadmap: "Plan d'action",
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
