export type PolicyType = "access" | "network";

export interface PolicyFormData {
  companyName: string;
  author: string;
  approvedBy: string;
  date: string;
  version: string;
  policyType: PolicyType;
}

export interface PolicySection {
  heading: string;
  content: string;
  subSections?: { heading: string; content: string }[];
}

export function getPolicyTitle(type: PolicyType): string {
  if (type === "network") return "Network access policy";
  return "Access policy";
}

export function generatePolicySections(data: PolicyFormData): PolicySection[] {
  if (data.policyType === "network") {
    return getNetworkPolicySections(data);
  }
  return getAccessPolicySections(data);
}

function getAccessPolicySections(data: PolicyFormData): PolicySection[] {
  return [
    {
      heading: "1. Inleiding",
      content: `${data.companyName} heeft dit toegangsbeleid opgesteld in het kader van de NIS2-richtlijn. In dit document staat hoe toegang tot systemen, netwerken en informatie wordt toegekend, beheerd en opgevolgd.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.date}.`,
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
      content: `${data.companyName} heeft dit netwerktoegangsbeleid opgesteld in het kader van de NIS2-richtlijn. Dit document beschrijft hoe netwerktoegang wordt beheerd, beveiligd en gecontroleerd.\n\nDit document werd opgesteld door ${data.author} en goedgekeurd door ${data.approvedBy} op ${data.date}.`,
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
