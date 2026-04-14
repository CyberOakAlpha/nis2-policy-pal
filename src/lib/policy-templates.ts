export type PolicyType =
  | "access"
  | "network"
  | "incident"
  | "bcp"
  | "risk"
  | "supply-chain"
  | "crypto"
  | "awareness"
  | "vulnerability"
  | "backup"
  | "asset-management"
  | "password"
  | "cybersecurity"
  | "patch-management";

export interface PolicyFormData {
  companyName: string;
  author: string;
  owner: string;
  approvedBy: string;
  date: string;
  approvalDate: string;
  version: string;
  policyType: PolicyType;
}

export interface PolicySection {
  heading: string;
  content: string;
  subSections?: { heading: string; content: string }[];
}

export function getPolicyTitle(type: PolicyType): string {
  const titles: Record<PolicyType, string> = {
    access: "Toegangsbeleid",
    network: "Netwerktoegangsbeleid",
    incident: "Incidentresponsbeleid",
    bcp: "Bedrijfscontinuïteitsplan",
    risk: "Risicobeheerbeleid",
    "supply-chain": "Beleid voor leveranciersbeheer",
    crypto: "Beleid voor cryptografie en encryptie",
    awareness: "Beleid voor bewustmaking en opleiding",
    vulnerability: "Beleid voor kwetsbaarheidsbeheer",
    backup: "Beleid voor back-up en herstel",
    "asset-management": "Beleid voor asset management",
    password: "Wachtwoordbeleid",
    cybersecurity: "Cybersecuritybeleid",
    "patch-management": "Beleid voor patchbeheer",
  };
  return titles[type];
}

export function getPolicySlug(type: PolicyType): string {
  const slugs: Record<PolicyType, string> = {
    access: "toegangsbeleid",
    network: "netwerktoegang",
    incident: "incidentrespons",
    bcp: "bedrijfscontinuiteit",
    risk: "risicobeheer",
    "supply-chain": "leveranciersbeheer",
    crypto: "cryptografie",
    awareness: "bewustmaking",
    vulnerability: "kwetsbaarheidsbeheer",
    backup: "backup_herstel",
    "asset-management": "asset_management",
    password: "wachtwoordbeleid",
    cybersecurity: "cybersecurity",
    "patch-management": "patchbeheer",
  };
  return slugs[type];
}

export function generatePolicySections(data: PolicyFormData): PolicySection[] {
  const generators: Record<PolicyType, (d: PolicyFormData) => PolicySection[]> = {
    access: getAccessPolicySections,
    network: getNetworkPolicySections,
    incident: getIncidentPolicySections,
    bcp: getBcpPolicySections,
    risk: getRiskPolicySections,
    "supply-chain": getSupplyChainPolicySections,
    crypto: getCryptoPolicySections,
    awareness: getAwarenessPolicySections,
    vulnerability: getVulnerabilityPolicySections,
    backup: getBackupPolicySections,
    "asset-management": getAssetManagementPolicySections,
    password: getPasswordPolicySections,
    cybersecurity: getCybersecurityPolicySections,
    "patch-management": getPatchManagementPolicySections,
  };
  return generators[data.policyType](data);
}

function getAccessPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit toegangsbeleid opgesteld in het kader van de NIS2-richtlijn. In dit document staat hoe toegang tot systemen, netwerken en informatie wordt toegekend, beheerd en opgevolgd.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor medewerkers, externe partijen en leveranciers die toegang hebben tot systemen of gegevens van ${data.companyName}. Het omvat fysieke en digitale toegang.`,
    },
    {
      heading: "3. Basisprincipes",
      content:
        "1. Gebruikers krijgen alleen de rechten die nodig zijn voor hun functie.\n2. Toegang tot informatie wordt alleen verleend wanneer dat nodig is voor het werk.\n3. Kritieke taken worden waar mogelijk verdeeld over meerdere personen.\n4. Elke gebruiker moet zich identificeren en authenticeren voor toegang.\n5. Toegangsrechten worden periodiek nagekeken en aangepast.",
    },
    {
      heading: "4. Gebruikersbeheer",
      content: "",
      subSections: [
        {
          heading: "4.1 Nieuwe accounts",
          content: `Nieuwe accounts worden pas aangemaakt na goedkeuring door de verantwoordelijke binnen ${data.companyName}. Accounts zijn persoonlijk en mogen niet gedeeld worden.`,
        },
        {
          heading: "4.2 Wijziging van rechten",
          content:
            "Bij een functiewijziging worden bestaande rechten herzien en aangepast aan de nieuwe rol.",
        },
        {
          heading: "4.3 Einde van samenwerking",
          content:
            "Wanneer iemand uit dienst gaat of een samenwerking stopt, worden toegangen onmiddellijk ingetrokken.",
        },
      ],
    },
    {
      heading: "5. Wachtwoorden en aanmelding",
      content:
        "1. Wachtwoorden zijn minstens 12 tekens lang.\n2. Ze bevatten een mix van letters, cijfers en speciale tekens.\n3. Waar nodig wordt multifactorauthenticatie gebruikt.\n4. Toegang tot kritieke systemen wordt extra afgeschermd.",
    },
    {
      heading: "6. Fysieke toegang",
      content: `Gebouwen, werkruimtes en technische ruimtes van ${data.companyName} worden beschermd tegen ongeoorloofde toegang. Bezoekers worden geregistreerd en begeleid waar nodig.`,
    },
    {
      heading: "7. Logging en controle",
      content:
        "Toegangspogingen en relevante wijzigingen worden gelogd. Verdachte activiteiten worden onderzocht en indien nodig geëscaleerd.",
    },
    {
      heading: "8. Incidenten",
      content: `Een vermoeden van misbruik of ongeoorloofde toegang wordt meteen gemeld volgens de interne procedure van ${data.companyName}.`,
    },
    {
      heading: "9. Herziening",
      content:
        "Dit beleid wordt minstens jaarlijks herzien en aangepast wanneer de organisatie, risico's of wettelijke vereisten veranderen.",
    },
  ];
}

function getNetworkPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit netwerktoegangsbeleid opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe netwerktoegang wordt beheerd, beveiligd en gecontroleerd.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle netwerken, systemen en apparaten die verbonden zijn met de infrastructuur van ${data.companyName}. Het is van toepassing op medewerkers, gasten en externe partijen.`,
    },
    {
      heading: "3. Netwerksegmentatie",
      content: `Het netwerk van ${data.companyName} is opgedeeld in zones op basis van gevoeligheid en functie. Verkeer tussen zones wordt gecontroleerd via firewalls en toegangslijsten. Kritieke systemen worden geplaatst in afgeschermde segmenten.`,
    },
    {
      heading: "4. Draadloze netwerken",
      content: "",
      subSections: [
        {
          heading: "4.1 Bedrijfsnetwerk",
          content:
            "Het bedrijfsnetwerk is beveiligd met WPA3 of gelijkwaardig. Alleen geautoriseerde apparaten krijgen toegang na authenticatie.",
        },
        {
          heading: "4.2 Gastnetwerk",
          content:
            "Gasten krijgen uitsluitend toegang tot een apart netwerksegment zonder verbinding naar interne systemen.",
        },
        {
          heading: "4.3 Apparaatregistratie",
          content:
            "Alle apparaten die verbinding maken met het netwerk worden geregistreerd. Onbekende apparaten worden automatisch geblokkeerd of in quarantaine geplaatst.",
        },
      ],
    },
    {
      heading: "5. Externe verbindingen",
      content:
        "1. VPN wordt gebruikt voor toegang op afstand.\n2. Externe verbindingen worden versleuteld met actuele protocollen.\n3. Toegang op afstand vereist multifactorauthenticatie.\n4. Sessies worden automatisch beëindigd na inactiviteit.",
    },
    {
      heading: "6. Firewall en filtering",
      content: `Alle inkomend en uitgaand verkeer wordt gefilterd. Standaard wordt verkeer geweigerd tenzij expliciet toegestaan. Firewallregels worden periodiek herzien door het IT-team van ${data.companyName}.`,
    },
    {
      heading: "7. Monitoring",
      content:
        "Netwerkverkeer wordt continu gemonitord op afwijkingen. Verdachte patronen worden automatisch gedetecteerd en gemeld. Logs worden bewaard voor analyse en auditing.",
    },
    {
      heading: "8. Incidenten",
      content: `Bij een vermoedelijke inbreuk op het netwerk wordt het incident gemeld aan de verantwoordelijke binnen ${data.companyName}. Het betrokken segment kan tijdelijk worden geïsoleerd.`,
    },
    {
      heading: "9. Herziening",
      content:
        "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de netwerkinfrastructuur, dreigingen of wetgeving.",
    },
  ];
}

function getIncidentPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit incidentresponsbeleid opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe cybersecurity-incidenten worden gedetecteerd, gemeld, beheerd en geëvalueerd.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle medewerkers, systemen en processen van ${data.companyName}. Het is van toepassing op elk beveiligingsincident dat de vertrouwelijkheid, integriteit of beschikbaarheid van informatie kan aantasten.`,
    },
    {
      heading: "3. Definitie van een incident",
      content: "Een beveiligingsincident is elke gebeurtenis die de vertrouwelijkheid, integriteit of beschikbaarheid van informatie of systemen in gevaar brengt. Voorbeelden zijn:\n1. Ongeoorloofde toegang tot systemen of gegevens.\n2. Malware-infecties of ransomware-aanvallen.\n3. Datalekken of verlies van gevoelige informatie.\n4. Denial-of-service aanvallen.\n5. Phishing-aanvallen met impact.",
    },
    {
      heading: "4. Incidentclassificatie",
      content: "",
      subSections: [
        {
          heading: "4.1 Ernstniveaus",
          content: "Incidenten worden geclassificeerd op basis van impact:\n- Kritiek: directe bedreiging voor bedrijfscontinuïteit of grootschalig datalek.\n- Hoog: significante impact op systemen of gegevens, beperkte scope.\n- Middel: beperkte impact, geen directe bedreiging voor kernprocessen.\n- Laag: minimale impact, eenvoudig op te lossen.",
        },
        {
          heading: "4.2 Escalatiecriteria",
          content: "Kritieke en hoge incidenten worden onmiddellijk geëscaleerd naar het management. Bij een significant incident wordt binnen 24 uur een eerste melding gedaan aan de bevoegde autoriteit, gevolgd door een volledige melding binnen 72 uur, conform NIS2-vereisten.",
        },
      ],
    },
    {
      heading: "5. Incidentresponsproces",
      content: "",
      subSections: [
        {
          heading: "5.1 Detectie en melding",
          content: `Alle medewerkers van ${data.companyName} zijn verplicht verdachte activiteiten onmiddellijk te melden bij de aangewezen contactpersoon. Geautomatiseerde detectiesystemen ondersteunen het vroegtijdig signaleren van incidenten.`,
        },
        {
          heading: "5.2 Beoordeling en triage",
          content: "Na melding wordt het incident beoordeeld op ernst, omvang en potentiële impact. Op basis hiervan wordt het juiste responsniveau geactiveerd.",
        },
        {
          heading: "5.3 Inperking en herstel",
          content: "Het incident wordt ingeperkt om verdere schade te voorkomen. Daarna worden getroffen systemen hersteld naar een veilige staat. Alle acties worden gedocumenteerd.",
        },
        {
          heading: "5.4 Evaluatie en verbetering",
          content: "Na afloop wordt een evaluatie uitgevoerd om lessen te trekken. Bevindingen worden gebruikt om processen, systemen en dit beleid te verbeteren.",
        },
      ],
    },
    {
      heading: "6. Meldplicht",
      content: `${data.companyName} voldoet aan de NIS2-meldplicht:\n1. Eerste melding binnen 24 uur na detectie van een significant incident.\n2. Volledige incidentmelding binnen 72 uur.\n3. Eindverslag binnen één maand na afhandeling.\n\nMeldingen worden gedaan aan de bevoegde nationale autoriteit.`,
    },
    {
      heading: "7. Rollen en verantwoordelijkheden",
      content: `1. Alle medewerkers: melden verdachte activiteiten.\n2. IT-verantwoordelijke: coördineert de technische respons.\n3. Management: beslist over escalatie en communicatie.\n4. ${data.approvedBy}: eindverantwoordelijke voor incidentbeheer.`,
    },
    {
      heading: "8. Communicatie",
      content: "Bij een incident wordt intern gecommuniceerd via vooraf bepaalde kanalen. Externe communicatie (naar klanten, partners, autoriteiten) verloopt uitsluitend via het management.",
    },
    {
      heading: "9. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en na elk significant incident geëvalueerd en indien nodig bijgewerkt.",
    },
  ];
}

function getBcpPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit bedrijfscontinuïteitsplan opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe de organisatie blijft functioneren tijdens en na een verstoring.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit plan geldt voor alle kritieke processen, systemen en diensten van ${data.companyName}. Het omvat zowel IT-systemen als bedrijfsprocessen die essentieel zijn voor de werking van de organisatie.`,
    },
    {
      heading: "3. Kritieke processen en systemen",
      content: `${data.companyName} identificeert en documenteert de volgende kritieke elementen:\n1. Bedrijfsprocessen die essentieel zijn voor de dienstverlening.\n2. IT-systemen en applicaties die deze processen ondersteunen.\n3. Afhankelijkheden van externe leveranciers en partners.\n4. Gegevens die onmisbaar zijn voor de bedrijfsvoering.`,
    },
    {
      heading: "4. Risicoanalyse",
      content: "",
      subSections: [
        {
          heading: "4.1 Bedreigingen",
          content: "De volgende bedreigingen worden in beschouwing genomen:\n- Cyberaanvallen (ransomware, DDoS, datalekken).\n- Technische storingen (hardware, software, netwerk).\n- Natuurrampen en fysieke schade.\n- Uitval van leveranciers of nutsvoorzieningen.\n- Menselijke fouten.",
        },
        {
          heading: "4.2 Impact en hersteltijden",
          content: "Voor elk kritiek proces worden vastgesteld:\n- Recovery Time Objective (RTO): maximaal aanvaardbare uitvaltijd.\n- Recovery Point Objective (RPO): maximaal aanvaardbaar gegevensverlies.\n- Minimale dienstverlening tijdens een verstoring.",
        },
      ],
    },
    {
      heading: "5. Continuïteitsstrategieën",
      content: "1. Redundantie van kritieke systemen en infrastructuur.\n2. Regelmatige back-ups volgens het back-upbeleid.\n3. Alternatieve werklocaties of thuiswerkfaciliteiten.\n4. Uitwijkprocedures voor essentiële diensten.\n5. Noodcommunicatiekanalen voor interne en externe communicatie.",
    },
    {
      heading: "6. Noodprocedures",
      content: "",
      subSections: [
        {
          heading: "6.1 Activering",
          content: `Het continuïteitsplan wordt geactiveerd wanneer een verstoring de normale bedrijfsvoering van ${data.companyName} significant beïnvloedt. De beslissing tot activering wordt genomen door het management.`,
        },
        {
          heading: "6.2 Crisisteam",
          content: "Bij activering wordt een crisisteam samengesteld dat verantwoordelijk is voor:\n- Coördinatie van de respons.\n- Communicatie met stakeholders.\n- Monitoring van het herstelproces.\n- Besluitvorming over prioriteiten.",
        },
        {
          heading: "6.3 Herstel",
          content: "Het herstelproces volgt een vooraf bepaalde volgorde op basis van de prioriteit van processen en systemen. Voortgang wordt continu gemonitord en gerapporteerd.",
        },
      ],
    },
    {
      heading: "7. Testen en oefenen",
      content: `${data.companyName} test dit plan minstens jaarlijks door middel van:\n1. Tabletop-oefeningen met het crisisteam.\n2. Technische hersteltests van back-ups en systemen.\n3. Evaluatie van de resultaten en bijsturing waar nodig.`,
    },
    {
      heading: "8. Rollen en verantwoordelijkheden",
      content: `1. Management: eindverantwoordelijk voor bedrijfscontinuïteit.\n2. IT-verantwoordelijke: technisch herstel van systemen.\n3. Afdelingshoofden: continuïteit van hun bedrijfsprocessen.\n4. ${data.approvedBy}: goedkeuring en bewaking van het plan.`,
    },
    {
      heading: "9. Herziening",
      content: "Dit plan wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de organisatie, infrastructuur, risico's of wetgeving.",
    },
  ];
}

function getRiskPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit risicobeheerbeleid opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe cyberrisico's worden geïdentificeerd, beoordeeld, behandeld en gemonitord.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle informatiesystemen, netwerken, processen en gegevens van ${data.companyName}. Het is van toepassing op alle medewerkers en externe partijen.`,
    },
    {
      heading: "3. Risicobeheerproces",
      content: "",
      subSections: [
        {
          heading: "3.1 Risico-identificatie",
          content: `${data.companyName} identificeert systematisch risico's door:\n- Inventarisatie van kritieke assets en systemen.\n- Analyse van dreigingen en kwetsbaarheden.\n- Beoordeling van interne en externe factoren.\n- Raadpleging van relevante bronnen en dreigingsinformatie.`,
        },
        {
          heading: "3.2 Risicobeoordeling",
          content: "Elk risico wordt beoordeeld op:\n- Waarschijnlijkheid van optreden (laag, middel, hoog).\n- Impact op de organisatie (laag, middel, hoog, kritiek).\n- De combinatie bepaalt de risicoscore en prioriteit.",
        },
        {
          heading: "3.3 Risicobehandeling",
          content: "Voor elk risico wordt een behandelstrategie gekozen:\n- Vermijden: de activiteit die het risico veroorzaakt stopzetten.\n- Verminderen: maatregelen treffen om waarschijnlijkheid of impact te verlagen.\n- Overdragen: het risico overdragen aan een derde partij (bijv. verzekering).\n- Accepteren: het risico bewust aanvaarden met goedkeuring van het management.",
        },
      ],
    },
    {
      heading: "4. Risicoregister",
      content: `${data.companyName} houdt een risicoregister bij waarin alle geïdentificeerde risico's, hun beoordeling, behandelstrategie en status worden vastgelegd. Dit register wordt regelmatig bijgewerkt.`,
    },
    {
      heading: "5. Maatregelen",
      content: "Op basis van de risicobeoordeling worden passende maatregelen getroffen:\n1. Technische maatregelen (firewalls, encryptie, toegangscontrole).\n2. Organisatorische maatregelen (procedures, opleidingen, bewustmaking).\n3. Fysieke maatregelen (toegangsbeveiliging, brandpreventie).\n4. Contractuele maatregelen (SLA's, verwerkersovereenkomsten).",
    },
    {
      heading: "6. Monitoring en rapportage",
      content: `1. Risico's worden continu gemonitord op veranderingen.\n2. Kwartaalrapportage over de risicostatus aan het management.\n3. Directe melding bij nieuwe significante risico's.\n4. Jaarlijkse volledige risicobeoordeling.`,
    },
    {
      heading: "7. Rollen en verantwoordelijkheden",
      content: `1. ${data.approvedBy}: eindverantwoordelijke voor risicobeheer.\n2. IT-verantwoordelijke: identificatie en behandeling van technische risico's.\n3. Alle medewerkers: melden van potentiële risico's en kwetsbaarheden.\n4. Management: goedkeuring van risicobehandelstrategieën.`,
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de organisatie, het dreigingslandschap of de wetgeving.",
    },
  ];
}

function getSupplyChainPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor leveranciersbeheer opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe de organisatie de cybersecurityrisico's in de toeleveringsketen beheert.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle leveranciers, dienstverleners en partners die toegang hebben tot systemen, netwerken of gegevens van ${data.companyName}, of die producten of diensten leveren die de cybersecurity van de organisatie kunnen beïnvloeden.`,
    },
    {
      heading: "3. Selectie van leveranciers",
      content: "Bij de selectie van leveranciers wordt rekening gehouden met:\n1. Het cybersecurityniveau van de leverancier.\n2. Certificeringen en beveiligingsstandaarden (bijv. ISO 27001).\n3. Referenties en track record op het gebied van beveiliging.\n4. Bereidheid om te voldoen aan de beveiligingseisen van de organisatie.",
    },
    {
      heading: "4. Contractuele vereisten",
      content: "",
      subSections: [
        {
          heading: "4.1 Beveiligingseisen",
          content: `Contracten met leveranciers van ${data.companyName} bevatten minimaal:\n- Beveiligingseisen en -normen waaraan voldaan moet worden.\n- Meldplicht bij beveiligingsincidenten.\n- Recht op audit en controle.\n- Geheimhoudingsverplichtingen.`,
        },
        {
          heading: "4.2 Verwerkersovereenkomsten",
          content: "Wanneer leveranciers persoonsgegevens verwerken, wordt een verwerkersovereenkomst afgesloten conform de AVG. Deze bevat afspraken over beveiligingsmaatregelen, subverwerkers en datalekmelding.",
        },
      ],
    },
    {
      heading: "5. Monitoring van leveranciers",
      content: `${data.companyName} monitort leveranciers op:\n1. Naleving van contractuele beveiligingseisen.\n2. Beveiligingsincidenten bij de leverancier.\n3. Wijzigingen in het risicoprofiel.\n4. Continuïteit van de dienstverlening.`,
    },
    {
      heading: "6. Risicobeoordeling",
      content: "Leveranciers worden geclassificeerd op basis van risico:\n- Hoog risico: directe toegang tot kritieke systemen of gevoelige gegevens.\n- Middel risico: indirecte toegang of levering van belangrijke diensten.\n- Laag risico: beperkte interactie zonder toegang tot systemen.\n\nDe frequentie en diepte van monitoring worden afgestemd op het risiconiveau.",
    },
    {
      heading: "7. Incidenten bij leveranciers",
      content: `Leveranciers zijn verplicht beveiligingsincidenten die ${data.companyName} kunnen raken onmiddellijk te melden. ${data.companyName} neemt dergelijke meldingen op in het eigen incidentresponsproces.`,
    },
    {
      heading: "8. Beëindiging van samenwerking",
      content: "Bij beëindiging van een samenwerking worden:\n1. Alle toegangen ingetrokken.\n2. Gegevens teruggehaald of vernietigd.\n3. Geheimhoudingsverplichtingen bevestigd.\n4. Overdrachtsafspraken nagekomen.",
    },
    {
      heading: "9. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de leveranciersrelaties, risico's of wetgeving.",
    },
  ];
}

function getCryptoPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor cryptografie en encryptie opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe cryptografische maatregelen worden ingezet om gegevens te beschermen.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle systemen, applicaties en communicatiekanalen van ${data.companyName} waarin vertrouwelijke of gevoelige gegevens worden verwerkt, opgeslagen of verzonden.`,
    },
    {
      heading: "3. Basisprincipes",
      content: "1. Vertrouwelijke gegevens worden versleuteld bij opslag en transport.\n2. Er worden uitsluitend erkende en actuele cryptografische algoritmen gebruikt.\n3. Sleutelbeheer is gescheiden van gegevensopslag.\n4. Cryptografische maatregelen worden afgestemd op het classificatieniveau van de gegevens.",
    },
    {
      heading: "4. Encryptie bij transport",
      content: "",
      subSections: [
        {
          heading: "4.1 Netwerkverkeer",
          content: "Al het verkeer over publieke netwerken wordt versleuteld met TLS 1.2 of hoger. Verouderde protocollen (SSL, TLS 1.0/1.1) worden niet ondersteund.",
        },
        {
          heading: "4.2 E-mail",
          content: "Gevoelige e-mailcommunicatie wordt versleuteld. Medewerkers worden geïnstrueerd over het gebruik van versleutelde e-mail wanneer vereist.",
        },
        {
          heading: "4.3 Bestandsoverdracht",
          content: "Bestanden met vertrouwelijke inhoud worden uitsluitend via versleutelde kanalen (SFTP, HTTPS) verstuurd.",
        },
      ],
    },
    {
      heading: "5. Encryptie bij opslag",
      content: "1. Harde schijven van laptops en mobiele apparaten worden volledig versleuteld.\n2. Databases met gevoelige gegevens gebruiken encryptie op veld- of tabelniveau.\n3. Back-ups worden versleuteld opgeslagen.\n4. USB-sticks en externe opslagmedia worden versleuteld.",
    },
    {
      heading: "6. Sleutelbeheer",
      content: `${data.companyName} hanteert de volgende regels voor sleutelbeheer:\n1. Cryptografische sleutels worden veilig gegenereerd met voldoende lengte.\n2. Sleutels worden opgeslagen in beveiligde sleutelkluizen.\n3. Toegang tot sleutels is beperkt tot geautoriseerde personen.\n4. Sleutels worden periodiek geroteerd.\n5. Verlopen of gecompromitteerde sleutels worden onmiddellijk ingetrokken.`,
    },
    {
      heading: "7. Algoritmen en standaarden",
      content: "De volgende minimale standaarden worden gehanteerd:\n- Symmetrische encryptie: AES-256.\n- Asymmetrische encryptie: RSA-2048 of hoger, of elliptische curve-cryptografie.\n- Hashing: SHA-256 of hoger.\n- Protocollen worden jaarlijks geëvalueerd tegen actuele richtlijnen.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in technologie, dreigingen of wettelijke vereisten.",
    },
  ];
}

function getAwarenessPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor bewustmaking en opleiding opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe medewerkers worden opgeleid en bewust gemaakt van cybersecurityrisico's.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle medewerkers van ${data.companyName}, inclusief tijdelijke krachten, stagiairs en externe medewerkers die toegang hebben tot systemen of gegevens.`,
    },
    {
      heading: "3. Doelstellingen",
      content: "1. Medewerkers bewust maken van cyberdreigingen en hun rol in de beveiliging.\n2. Kennis en vaardigheden bijbrengen om veilig te werken.\n3. Een beveiligingscultuur creëren waarin iedereen verantwoordelijkheid neemt.\n4. Voldoen aan de NIS2-vereiste voor bewustmakingsprogramma's.",
    },
    {
      heading: "4. Bewustmakingsprogramma",
      content: "",
      subSections: [
        {
          heading: "4.1 Onboarding",
          content: `Nieuwe medewerkers van ${data.companyName} ontvangen bij indiensttreding een introductie over:\n- Het informatiebeveiligingsbeleid.\n- Veilig gebruik van wachtwoorden en systemen.\n- Herkenning van phishing en social engineering.\n- Meldprocedures bij verdachte situaties.`,
        },
        {
          heading: "4.2 Periodieke training",
          content: "Alle medewerkers volgen minstens jaarlijks een cybersecuritytraining. Onderwerpen worden afgestemd op actuele dreigingen en de rol van de medewerker.",
        },
        {
          heading: "4.3 Phishing-simulaties",
          content: "Periodiek worden phishing-simulaties uitgevoerd om het bewustzijn te testen. Resultaten worden gebruikt om gerichte training aan te bieden.",
        },
      ],
    },
    {
      heading: "5. Specifieke opleidingen",
      content: "Naast algemene bewustmaking worden specifieke opleidingen aangeboden voor:\n1. IT-beheerders: technische beveiligingsmaatregelen en incidentrespons.\n2. Management: risicobeheer en verantwoordelijkheden onder NIS2.\n3. Medewerkers met toegang tot gevoelige gegevens: dataclassificatie en -bescherming.",
    },
    {
      heading: "6. Communicatie",
      content: `${data.companyName} communiceert regelmatig over cybersecurity via:\n1. Interne nieuwsbrieven of berichten over actuele dreigingen.\n2. Tips en richtlijnen voor veilig werken.\n3. Feedback over resultaten van phishing-simulaties.\n4. Updates bij wijzigingen in beleid of procedures.`,
    },
    {
      heading: "7. Registratie en evaluatie",
      content: "1. Deelname aan trainingen wordt geregistreerd.\n2. Effectiviteit wordt gemeten via toetsen en simulaties.\n3. Resultaten worden gerapporteerd aan het management.\n4. Het programma wordt bijgestuurd op basis van evaluaties.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast aan nieuwe dreigingen, organisatorische wijzigingen of wettelijke vereisten.",
    },
  ];
}

function getVulnerabilityPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor kwetsbaarheidsbeheer opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe kwetsbaarheden in systemen en software worden geïdentificeerd, beoordeeld en verholpen.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle IT-systemen, applicaties, netwerkapparatuur en software van ${data.companyName}, zowel intern beheerd als uitbesteed.`,
    },
    {
      heading: "3. Kwetsbaarheidsidentificatie",
      content: `${data.companyName} identificeert kwetsbaarheden door middel van:\n1. Regelmatige kwetsbaarheidsscans van systemen en netwerken.\n2. Monitoring van beveiligingsadviezen van leveranciers en CERT's.\n3. Penetratietests (minstens jaarlijks voor kritieke systemen).\n4. Beoordeling van nieuwe dreigingsinformatie.`,
    },
    {
      heading: "4. Beoordeling en prioritering",
      content: "",
      subSections: [
        {
          heading: "4.1 Ernstscore",
          content: "Kwetsbaarheden worden beoordeeld op basis van:\n- CVSS-score (Common Vulnerability Scoring System).\n- Impact op de organisatie.\n- Exploiteerbaarheid en beschikbaarheid van exploits.\n- Blootstelling van het getroffen systeem.",
        },
        {
          heading: "4.2 Behandeltermijnen",
          content: "Op basis van de beoordeling gelden de volgende termijnen:\n- Kritiek: binnen 24-48 uur.\n- Hoog: binnen 1 week.\n- Middel: binnen 1 maand.\n- Laag: bij de eerstvolgende onderhoudscyclus.",
        },
      ],
    },
    {
      heading: "5. Patchbeheer",
      content: "1. Beveiligingspatches worden zo snel mogelijk getest en uitgerold.\n2. Patches voor kritieke systemen krijgen voorrang.\n3. Patches worden getest in een testomgeving voor uitrol in productie.\n4. Wanneer een patch niet mogelijk is, worden compenserende maatregelen getroffen.\n5. Het patchproces wordt gedocumenteerd.",
    },
    {
      heading: "6. Uitzonderingen",
      content: `Wanneer een kwetsbaarheid niet binnen de gestelde termijn kan worden verholpen, wordt een onderbouwde uitzondering vastgelegd. Deze moet worden goedgekeurd door ${data.approvedBy} en bevat:\n- Reden voor de uitzondering.\n- Compenserende maatregelen.\n- Geplande hersteldatum.\n- Risicoacceptatie.`,
    },
    {
      heading: "7. Rapportage",
      content: "1. Maandelijks overzicht van openstaande kwetsbaarheden.\n2. Status van patchimplementatie.\n3. Resultaten van kwetsbaarheidsscans en penetratietests.\n4. Rapportage aan het management bij kritieke kwetsbaarheden.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de infrastructuur, nieuwe dreigingen of wettelijke vereisten.",
    },
  ];
}

function getBackupPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor back-up en herstel opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe gegevens worden geback-upt, opgeslagen en hersteld.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle gegevens, systemen en applicaties van ${data.companyName} die essentieel zijn voor de bedrijfsvoering.`,
    },
    {
      heading: "3. Back-upstrategie",
      content: "",
      subSections: [
        {
          heading: "3.1 Soorten back-ups",
          content: "De volgende back-uptypes worden gehanteerd:\n- Volledige back-up: periodieke kopie van alle gegevens.\n- Incrementele back-up: dagelijkse kopie van gewijzigde gegevens.\n- Differentiële back-up: kopie van alle wijzigingen sinds de laatste volledige back-up.",
        },
        {
          heading: "3.2 Frequentie",
          content: "1. Kritieke systemen: dagelijkse back-up (minimaal).\n2. Belangrijk systemen: wekelijkse volledige back-up met dagelijkse incrementele back-ups.\n3. Overige systemen: wekelijkse back-up.",
        },
        {
          heading: "3.3 Bewaarperiode",
          content: "1. Dagelijkse back-ups: minimaal 30 dagen bewaard.\n2. Wekelijkse back-ups: minimaal 3 maanden bewaard.\n3. Maandelijkse back-ups: minimaal 1 jaar bewaard.\n4. Wettelijk vereiste gegevens: conform de toepasselijke bewaartermijnen.",
        },
      ],
    },
    {
      heading: "4. Opslag en beveiliging",
      content: `1. Back-ups worden opgeslagen op een fysiek gescheiden locatie.\n2. Alle back-ups worden versleuteld conform het cryptografiebeleid.\n3. Toegang tot back-ups is beperkt tot geautoriseerde medewerkers van ${data.companyName}.\n4. Back-upmedia worden beschermd tegen fysieke schade en ongeoorloofde toegang.`,
    },
    {
      heading: "5. 3-2-1 Regel",
      content: `${data.companyName} hanteert de 3-2-1 regel:\n- 3 kopieën van elke dataset (1 origineel + 2 back-ups).\n- 2 verschillende opslagmedia.\n- 1 kopie op een externe locatie (offsite of cloud).`,
    },
    {
      heading: "6. Herstelprocedures",
      content: "",
      subSections: [
        {
          heading: "6.1 Herstelproces",
          content: "Bij gegevensverlies wordt het volgende proces gevolgd:\n1. Vaststelling van de omvang van het verlies.\n2. Selectie van de juiste back-up op basis van het gewenste herstelpunt.\n3. Herstel in een gecontroleerde omgeving.\n4. Verificatie van de integriteit van herstelde gegevens.\n5. Terugplaatsing in de productieomgeving.",
        },
        {
          heading: "6.2 Hersteltests",
          content: "Back-ups worden minimaal elk kwartaal getest door:\n- Een volledige hersteltest van geselecteerde systemen.\n- Verificatie van de integriteit en bruikbaarheid van herstelde gegevens.\n- Meting van de hersteltijd tegen de gestelde RTO.\n- Documentatie van testresultaten.",
        },
      ],
    },
    {
      heading: "7. Monitoring en rapportage",
      content: "1. Back-upprocessen worden dagelijks gemonitord op succesvolle uitvoering.\n2. Fouten worden onmiddellijk onderzocht en verholpen.\n3. Maandelijkse rapportage over back-upstatus aan het management.\n4. Jaarlijkse evaluatie van de back-upstrategie.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de infrastructuur, gegevensbehoeften of wettelijke vereisten.",
    },
  ];
}

// ===== NEW POLICY TYPES =====

function getAssetManagementPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor asset management opgesteld in het kader van de NIS2-richtlijn (ISO 27001 A.8). Dit document beschrijft hoe alle ICT-assets worden geïdentificeerd, geclassificeerd, beheerd en beschermd.\n\nDit document werd opgesteld door ${data.author}, eigenaar is ${data.owner || data.author}. Goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle hardware, software, gegevens en netwerkapparatuur van ${data.companyName}, inclusief cloudresources, mobiele apparaten en BYOD-apparaten.`,
    },
    {
      heading: "3. Asset inventarisatie",
      content: "",
      subSections: [
        {
          heading: "3.1 Registratie",
          content: `Alle ICT-assets van ${data.companyName} worden geregistreerd in een centraal assetregister met minimaal:\n- Uniek asset-ID en naam.\n- Type (hardware, software, data, netwerk).\n- Eigenaar en verantwoordelijke.\n- Locatie en afdeling.\n- Kriticiteit en classificatie.\n- Aanschaf- en garantiedatum.`,
        },
        {
          heading: "3.2 Classificatie",
          content: "Assets worden geclassificeerd op basis van kriticiteit:\n- Kritiek: uitval heeft directe impact op bedrijfscontinuïteit.\n- Hoog: uitval verstoort belangrijke processen.\n- Middel: uitval heeft beperkte impact.\n- Laag: geen directe bedrijfsimpact.",
        },
        {
          heading: "3.3 Eigenaarschap",
          content: "Elke asset heeft een aangewezen eigenaar die verantwoordelijk is voor:\n- Juiste classificatie en labeling.\n- Toepassing van beveiligingsmaatregelen.\n- Periodieke review van de asset.\n- Melding bij wijzigingen of uitfasering.",
        },
      ],
    },
    {
      heading: "4. Levenscyclusbeheer",
      content: "1. Aanschaf: goedkeuring conform het inkoopproces.\n2. Installatie: configuratie volgens beveiligingsstandaarden.\n3. Gebruik: monitoring en onderhoud.\n4. Wijziging: documentatie van aanpassingen.\n5. Uitfasering: veilige verwijdering van gegevens en fysieke vernietiging indien nodig.",
    },
    {
      heading: "5. Hardware-assets",
      content: `${data.companyName} registreert alle fysieke apparaten:\n1. Servers, workstations, laptops en tablets.\n2. Netwerkapparatuur (switches, routers, firewalls, access points).\n3. Opslagapparatuur en back-upmedia.\n4. Printers, scanners en multifunctionele apparaten.\n5. Mobiele apparaten en IoT-devices.`,
    },
    {
      heading: "6. Software-assets",
      content: "1. Alle software wordt geregistreerd met versie, licentie en leverancier.\n2. Alleen goedgekeurde software mag worden geïnstalleerd.\n3. Licentienaleving wordt periodiek gecontroleerd.\n4. End-of-life software wordt tijdig vervangen.\n5. SaaS- en cloudapplicaties worden opgenomen in het register.",
    },
    {
      heading: "7. Monitoring en rapportage",
      content: "1. Het assetregister wordt minimaal maandelijks bijgewerkt.\n2. Kwartaalrapportage over de assetstatus aan het management.\n3. Jaarlijkse volledige asset-audit.\n4. Automatische detectie van onbekende apparaten op het netwerk.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de organisatie, infrastructuur of wettelijke vereisten.",
    },
  ];
}

function getPasswordPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit wachtwoordbeleid opgesteld in het kader van de NIS2-richtlijn (ISO 27001 A.9.4). Dit document beschrijft de eisen voor het aanmaken, beheren en beschermen van wachtwoorden.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle medewerkers, externe medewerkers en leveranciers die toegang hebben tot systemen of gegevens van ${data.companyName}.`,
    },
    {
      heading: "3. Wachtwoordeisen",
      content: "",
      subSections: [
        {
          heading: "3.1 Complexiteit",
          content: "Wachtwoorden moeten voldoen aan de volgende eisen:\n- Minimaal 14 tekens lang.\n- Bevatten minstens één hoofdletter, één kleine letter, één cijfer en één speciaal teken.\n- Mogen geen persoonlijke informatie bevatten (naam, geboortedatum).\n- Mogen niet voorkomen in bekende gelekte wachtwoordlijsten.",
        },
        {
          heading: "3.2 Geldigheid",
          content: "1. Wachtwoorden verlopen na maximaal 90 dagen.\n2. De laatste 12 wachtwoorden mogen niet worden hergebruikt.\n3. Accounts worden geblokkeerd na 5 mislukte inlogpogingen.\n4. Tijdelijke wachtwoorden moeten bij eerste aanmelding worden gewijzigd.",
        },
        {
          heading: "3.3 Opslag",
          content: "1. Wachtwoorden worden nooit in platte tekst opgeslagen.\n2. Er wordt gebruik gemaakt van sterke hashing-algoritmen (bcrypt, Argon2).\n3. Wachtwoorden worden niet gedeeld via e-mail of chat.\n4. Het gebruik van een goedgekeurde wachtwoordmanager wordt aanbevolen.",
        },
      ],
    },
    {
      heading: "4. Multifactorauthenticatie (MFA)",
      content: `${data.companyName} vereist MFA voor:\n1. Alle accounts met toegang tot kritieke systemen.\n2. VPN- en externe toegang.\n3. Beheerdersaccounts en privileged accounts.\n4. Clouddiensten en e-mail.\n5. Waar mogelijk wordt MFA voor alle gebruikers ingeschakeld.`,
    },
    {
      heading: "5. Beheerdersaccounts",
      content: "1. Beheerdersaccounts gebruiken afzonderlijke, sterke wachtwoorden.\n2. Standaardwachtwoorden van systemen worden onmiddellijk gewijzigd.\n3. Gedeelde accounts zijn verboden; elke beheerder heeft een persoonlijk account.\n4. Privileged Access Management (PAM) wordt waar mogelijk ingezet.",
    },
    {
      heading: "6. Verantwoordelijkheden",
      content: `1. Medewerkers: houden wachtwoorden vertrouwelijk en melden verdacht gebruik.\n2. IT-afdeling: beheert het wachtwoordbeleid en ondersteunt bij naleving.\n3. ${data.approvedBy}: eindverantwoordelijke voor het wachtwoordbeleid.`,
    },
    {
      heading: "7. Bewustmaking",
      content: "1. Medewerkers worden getraind in veilig wachtwoordgebruik.\n2. Periodieke communicatie over wachtwoordhygiëne.\n3. Phishing-simulaties om bewustzijn te testen.",
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in dreigingen, technologie of wettelijke vereisten.",
    },
  ];
}

function getCybersecurityPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit overkoepelend cybersecuritybeleid opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft het kader voor de bescherming van informatie, systemen en netwerken tegen cyberdreigingen.\n\nDit document werd opgesteld door ${data.author}, eigenaar is ${data.owner || data.author}. Goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle informatiesystemen, netwerken, gegevens en medewerkers van ${data.companyName}. Het vormt het overkoepelend kader waarbinnen alle specifieke beveiligingsbeleidsdocumenten functioneren.`,
    },
    {
      heading: "3. Beveiligingsprincipes",
      content: "1. Vertrouwelijkheid: informatie is alleen toegankelijk voor geautoriseerde personen.\n2. Integriteit: informatie en systemen zijn accuraat en ongewijzigd.\n3. Beschikbaarheid: systemen en gegevens zijn beschikbaar wanneer nodig.\n4. Defense in depth: meerdere beveiligingslagen beschermen tegen dreigingen.\n5. Least privilege: minimale toegangsrechten voor elke gebruiker en systeem.",
    },
    {
      heading: "4. Governance",
      content: "",
      subSections: [
        {
          heading: "4.1 Organisatie",
          content: `${data.companyName} wijst de volgende rollen aan:\n- CISO / Security Officer: verantwoordelijk voor het cybersecurityprogramma.\n- IT-verantwoordelijke: dagelijks beheer van beveiligingsmaatregelen.\n- Management: eindverantwoordelijk voor cybersecurityrisico's.\n- Alle medewerkers: naleving van het beleid.`,
        },
        {
          heading: "4.2 Beleidskader",
          content: "Dit cybersecuritybeleid wordt ondersteund door specifieke beleidsdocumenten:\n- Toegangsbeleid\n- Netwerkbeveiligingsbeleid\n- Incidentresponsbeleid\n- Wachtwoordbeleid\n- Asset management beleid\n- Back-up en herstelbeleid\n- Kwetsbaarheids- en patchbeheer\n- Cryptografiebeleid\n- Leveranciersbeheerbeleid\n- Bewustmakingsbeleid",
        },
      ],
    },
    {
      heading: "5. Risicobeheer",
      content: `${data.companyName} voert periodiek risicobeoordelingen uit om dreigingen te identificeren en passende maatregelen te nemen. Het risicobeheerproces omvat:\n1. Identificatie van kritieke assets en processen.\n2. Beoordeling van dreigingen en kwetsbaarheden.\n3. Implementatie van beveiligingsmaatregelen.\n4. Continue monitoring en evaluatie.`,
    },
    {
      heading: "6. Technische maatregelen",
      content: "1. Firewall- en netwerkbeveiliging op alle perimeters.\n2. Antimalware en endpoint detection & response (EDR).\n3. Encryptie van gegevens in rust en transport.\n4. Patchbeheer en kwetsbaarheidsscans.\n5. Logboeken en SIEM voor monitoring.\n6. Back-up en disaster recovery.",
    },
    {
      heading: "7. Compliance en rapportage",
      content: `1. ${data.companyName} voldoet aan de NIS2-richtlijn en relevante wetgeving.\n2. Jaarlijkse cybersecurity-audit.\n3. Kwartaalrapportage aan het management.\n4. Meldplicht bij significante incidenten (24u/72u NIS2).`,
    },
    {
      heading: "8. Continue verbetering",
      content: "1. Jaarlijkse review van alle beveiligingsbeleidsdocumenten.\n2. Lessons learned uit incidenten en oefeningen.\n3. Benchmarking tegen actuele standaarden (ISO 27001, NIS2).\n4. Aanpassing aan nieuwe dreigingen en technologieën.",
    },
    {
      heading: "9. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de organisatie, het dreigingslandschap, technologie of wetgeving.",
    },
  ];
}

function getPatchManagementPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit beleid voor patchbeheer opgesteld in het kader van de NIS2-richtlijn (ISO 27001 A.12.6). Dit document beschrijft hoe beveiligingspatches en software-updates worden beheerd en uitgerold.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.approvalDate || data.date}.`,
    },
    {
      heading: "2. Toepassingsgebied",
      content: `Dit beleid geldt voor alle besturingssystemen, applicaties, firmware en netwerkapparatuur van ${data.companyName}, zowel on-premise als in de cloud.`,
    },
    {
      heading: "3. Patchproces",
      content: "",
      subSections: [
        {
          heading: "3.1 Identificatie",
          content: `${data.companyName} monitort continu op beschikbare patches via:\n- Leveranciersmeldingen en beveiligingsadviezen.\n- CERT-waarschuwingen en CVE-databases.\n- Geautomatiseerde patch-scantools.\n- Kwetsbaarheidsscans en penetratietests.`,
        },
        {
          heading: "3.2 Prioritering",
          content: "Patches worden geprioriteerd op basis van:\n- CVSS-score en ernstniveau.\n- Kriticiteit van het getroffen systeem.\n- Beschikbaarheid van actieve exploits.\n- Impact op bedrijfsprocessen.\n\nTermijnen:\n- Kritiek: binnen 24-48 uur.\n- Hoog: binnen 7 dagen.\n- Middel: binnen 30 dagen.\n- Laag: bij volgende onderhoudscyclus.",
        },
        {
          heading: "3.3 Testen",
          content: "1. Patches worden eerst getest in een testomgeving.\n2. Compatibiliteit met bestaande systemen wordt geverifieerd.\n3. Rollback-procedures worden voorbereid.\n4. Bij kritieke patches kan een versneld testproces worden gevolgd.",
        },
        {
          heading: "3.4 Uitrol",
          content: "1. Patches worden gefaseerd uitgerold (eerst niet-kritiek, dan productie).\n2. Uitrol vindt bij voorkeur buiten kantooruren plaats.\n3. Succesvolle installatie wordt geverifieerd.\n4. Documentatie wordt bijgewerkt.",
        },
      ],
    },
    {
      heading: "4. Automatische updates",
      content: "1. Werkstations: automatische updates worden waar mogelijk ingeschakeld.\n2. Servers: gecontroleerde update-cycli via changemanagement.\n3. Netwerkapparatuur: geplande firmware-updates.\n4. Mobiele apparaten: MDM-gestuurd patchbeheer.",
    },
    {
      heading: "5. Uitzonderingen",
      content: `Wanneer een patch niet tijdig kan worden geïnstalleerd, wordt een uitzondering geregistreerd met:\n- Reden voor uitstel.\n- Compenserende maatregelen.\n- Geplande installatiedatum.\n- Goedkeuring door ${data.approvedBy}.`,
    },
    {
      heading: "6. Monitoring en rapportage",
      content: "1. Wekelijks overzicht van patchstatus per systeem.\n2. Maandelijkse rapportage van patchcompliance.\n3. Dashboard met openstaande kritieke patches.\n4. Kwartaalrapportage aan het management.",
    },
    {
      heading: "7. Rollen en verantwoordelijkheden",
      content: `1. IT-beheerders: uitvoering van het patchproces.\n2. IT-verantwoordelijke: coördinatie en monitoring.\n3. Systeemeigenaren: goedkeuring van patches op hun systemen.\n4. ${data.approvedBy}: eindverantwoordelijke voor patchbeleid.`,
    },
    {
      heading: "8. Herziening",
      content: "Dit beleid wordt minstens jaarlijks herzien en aangepast bij wijzigingen in de infrastructuur, leveranciersrelaties of wettelijke vereisten.",
    },
  ];
}
