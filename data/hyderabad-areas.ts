export type HyderabadAreaSlug =
  | "hitec-city"
  | "gachibowli"
  | "secunderabad"
  | "uppal"

export interface HyderabadAreaFaq {
  question: string
  answer: string
}

export interface HyderabadAreaData {
  slug: HyderabadAreaSlug
  /** Short label for cards / nav */
  cardTitle: string
  /** Short subtitle on the locations grid */
  cardSubtitle: string
  /** Areas listed on the card */
  cardAreas: string[]
  image: string
  imageAlt: string
  accent: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  h1: string
  intro: string
  collectHeading: string
  collectItems: string[]
  processHeading: string
  processBody: string
  processPoints?: string[]
  highlightHeading: string
  highlightBody: string
  paperworkHeading?: string
  paperworkBody?: string
  areasCovered: string[]
  faqs: HyderabadAreaFaq[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const hyderabadAreas: HyderabadAreaData[] = [
  {
    slug: "hitec-city",
    cardTitle: "HITEC City & Madhapur",
    cardSubtitle: "IT campuses, SEZ towers & Knowledge City",
    cardAreas: ["HITEC City", "Madhapur", "Kondapur", "Raidurg", "Knowledge City"],
    image: "/city/hyd/HITEC City.png",
    imageAlt: "IT campus and office towers in HITEC City Hyderabad",
    accent: "from-emerald-600 to-teal-700",
    metaTitle: "E-Waste Recycling in HITEC City & Madhapur | SP Recycling",
    metaDescription:
      "Authorized IT scrap pickup in HITEC City, Madhapur, Kondapur and Raidurg. Laptop refresh batches, server racks, on-site drive shredding, Form 6.",
    keywords: [
      "e-waste recycling HITEC City",
      "IT scrap pickup Madhapur",
      "computer scrap buyers Kondapur",
      "e-waste Raidurg",
      "Knowledge City IT scrap",
    ],
    h1: "E-Waste Recycling and IT Scrap Pickup in HITEC City, Madhapur, Kondapur and Raidurg",
    intro:
      "Offices in HITEC City, Madhapur, Kondapur, Raidurg and Knowledge City retire equipment in big batches: a laptop refresh, a closed floor, a move from one tower to another. SP Recycling collects that equipment, destroys the data, and gives your IT and compliance teams the paperwork they need.",
    collectHeading: "What we collect from IT offices here",
    collectItems: [
      "Laptops and desktops, reconciled against your asset tags",
      "Servers, storage arrays and network racks",
      "Switches, firewalls, printers, UPS units and batteries",
      "Hard drives, SSDs and backup tapes",
    ],
    processHeading: "How pickups work in towers and campuses",
    processBody:
      "Managed buildings and SEZ campuses have their own entry rules. We ask for them early, and we send gate-pass lists and vehicle details ahead of the visit. Weekend and after-hours slots are available for managed buildings and SEZ campuses.",
    processPoints: [
      "Gate-pass lists and vehicle details shared in advance",
      "Weekend and after-hours slots for SEZ and managed buildings",
      "Asset-tag reconciliation during collection",
    ],
    highlightHeading: "Your data stays on your floor",
    highlightBody:
      "We bring shredding and degaussing equipment to your premises, and your team can watch. The certificate of destruction lists each serial number, the method, the date and who witnessed it.",
    paperworkHeading: "Paperwork you receive",
    paperworkBody:
      "A Form 6 manifest, a weighed receipt, and a certificate of destruction or recycling, with every pickup.",
    areasCovered: [
      "HITEC City",
      "Cyber Towers & Cyber Gateway",
      "Madhapur",
      "Kondapur",
      "Raidurg",
      "Knowledge City",
    ],
    faqs: [
      {
        question: "Can you collect e-waste outside office hours in HITEC City?",
        answer:
          "Yes. For managed buildings and SEZ campuses we can plan weekend and after-hours pickups. Send us the building's rules and we will confirm the slot.",
      },
      {
        question: "What counts as a bulk pickup?",
        answer:
          "Any size can be quoted. Batches of 100 or more assets, and server rooms, get a site visit and a written quote before a date is fixed.",
      },
    ],
    primaryCta: { label: "Send your asset list for a quote", href: "/contact?city=hyderabad" },
    secondaryCta: { label: "Call +91 99499 01238", href: "tel:+919949901238" },
  },
  {
    slug: "gachibowli",
    cardTitle: "Gachibowli & Financial District",
    cardSubtitle: "Server rooms, office moves & bulk clearances",
    cardAreas: [
      "Gachibowli",
      "Financial District",
      "Nanakramguda",
      "Manikonda",
      "Kokapet",
      "Narsingi",
    ],
    image: "/city/hyd/Gachibowli.png",
    imageAlt: "Corporate campuses in Gachibowli and Financial District Hyderabad",
    accent: "from-teal-600 to-cyan-700",
    metaTitle: "E-Waste Recycling in Gachibowli & Financial District",
    metaDescription:
      "E-waste pickup in Gachibowli, Financial District, Nanakramguda, Manikonda, Kokapet and Narsingi. Server rooms, office moves, certified data destruction.",
    keywords: [
      "e-waste recycling Gachibowli",
      "server room decommissioning Hyderabad",
      "office e-waste pickup Financial District",
      "IT scrap Nanakramguda",
      "e-waste Kokapet",
    ],
    h1: "E-Waste Recycling in Gachibowli, Financial District, Nanakramguda, Manikonda, Kokapet and Narsingi",
    intro:
      "Gachibowli and the Financial District are known for large corporate offices and technology campuses. Kokapet and Narsingi are newer office areas, and Manikonda has a mix of IT offices and smaller technology firms. The jobs here tend to be bigger: whole server rooms, full-floor clearances and office moves.",
    collectHeading: "Jobs we handle in this area",
    collectItems: [
      "Server room and data centre decommissioning, rack by rack with asset reconciliation",
      "Full-floor clearances when a company shrinks or moves out",
      "Office relocation and fit-out clearing, covering IT equipment and electricals",
      "Recurring laptop and desktop refresh batches",
    ],
    processHeading: "Planning a large clearance",
    processBody:
      "For 100 or more assets, or any server room, we do a site visit first. You get a written quote, then a fixed date. Items are counted against your list and weighed in front of your team.",
    processPoints: [
      "Site visit before large or server-room jobs",
      "Written quote and fixed pickup date",
      "Count and weigh with your team present",
    ],
    highlightHeading: "Data destruction options",
    highlightBody:
      "Hard drives and tapes can be shredded or degaussed at your premises. Laptops with resale value can be wiped with certified software, and you get a wipe report listing every serial number. For large volumes with limited space, drives can travel sealed and tracked, under escort, for destruction at our facility.",
    areasCovered: [
      "Gachibowli",
      "Financial District",
      "Nanakramguda",
      "Manikonda",
      "Kokapet",
      "Narsingi",
    ],
    faqs: [
      {
        question: "Do you decommission server rooms in Gachibowli?",
        answer:
          "Yes. We plan it with a site visit, remove racks and equipment against your asset list, and destroy storage media on-site or at our facility, as you choose.",
      },
      {
        question: "Do you pay for old servers and networking gear?",
        answer:
          "Working servers and networking equipment usually have value. Damaged or very old items may have none. The quote tells you which is which before pickup.",
      },
    ],
    primaryCta: { label: "Get a bulk quote", href: "/contact?city=hyderabad" },
    secondaryCta: { label: "Call +91 99499 01238", href: "tel:+919949901238" },
  },
  {
    slug: "secunderabad",
    cardTitle: "Secunderabad & Kukatpally",
    cardSubtitle: "Offices, hospitals, schools & homes",
    cardAreas: ["Secunderabad", "Begumpet", "Kukatpally", "KPHB"],
    image: "/city/hyd/Secunderabad.png",
    imageAlt: "Secunderabad and Greater Hyderabad neighbourhoods for doorstep e-waste pickup",
    accent: "from-emerald-700 to-green-800",
    metaTitle: "E-Waste Pickup in Secunderabad, Begumpet & Kukatpally",
    metaDescription:
      "Doorstep e-waste and scrap pickup in Secunderabad, Begumpet, Kukatpally and KPHB for offices, hospitals, schools and homes. Authorized recycler.",
    keywords: [
      "e-waste pickup Secunderabad",
      "scrap buyers Kukatpally",
      "sell old laptop KPHB",
      "e-waste Begumpet",
      "doorstep scrap pickup Hyderabad",
    ],
    h1: "E-Waste and Scrap Pickup in Secunderabad, Begumpet, Kukatpally and KPHB",
    intro:
      "This side of the city is less about big campuses and more about a wide mix: small and mid-size offices, hospitals, schools, retail shops, housing societies and households. SP Recycling collects from all of them at your door, and every pickup is weighed and documented.",
    collectHeading: "Who we collect from here",
    collectItems: [
      "Offices and commercial complexes of any size",
      "Hospitals and clinics",
      "Schools and colleges",
      "Housing societies and individual homes",
    ],
    processHeading: "Selling or disposing: what to expect",
    processBody:
      "Working laptops, CPUs, ACs and fridges usually carry scrap or resale value, and our main Hyderabad page lists indicative top rates. Old CRT monitors, damaged items and some peripherals may have none. We tell you which is which in the quote.",
    processPoints: [
      "Urgent small lots within GHMC can often be collected the same day, subject to slot availability",
      "Standard pickups are scheduled within 24 to 48 hours of confirmation",
      "Offices receive a weighed receipt and a certificate with the pickup",
    ],
    highlightHeading: "Hospitals and schools: protecting records",
    highlightBody:
      "Old PCs in hospitals and schools can still hold patient or student records. We shred drives or wipe them with certified software, and you get a certificate of destruction.",
    areasCovered: [
      "Secunderabad",
      "Begumpet",
      "Marredpally",
      "Kukatpally",
      "KPHB",
      "Ameerpet",
      "Nizampet",
      "Miyapur",
    ],
    faqs: [
      {
        question: "Can I sell one old laptop from home in Kukatpally?",
        answer:
          "Yes. Book a doorstep pickup. We inspect and weigh the item and quote against current scrap rates.",
      },
      {
        question: "Will a hospital in Secunderabad get a data destruction certificate?",
        answer:
          "Yes. For storage media, the certificate lists each serial number, the method used, the date and who witnessed it.",
      },
    ],
    primaryCta: { label: "Request a pickup", href: "/contact?city=hyderabad" },
    secondaryCta: {
      label: "WhatsApp us",
      href: "https://wa.me/919949901238?text=Hi%20SP%20Recycling%2C%20I%20need%20e-waste%20pickup%20in%20Secunderabad%20%2F%20Kukatpally.",
    },
  },
  {
    slug: "uppal",
    cardTitle: "Uppal, Pocharam & Cherlapally",
    cardSubtitle: "IT campuses, factories & warehouses",
    cardAreas: ["Uppal", "Pocharam", "Cherlapally", "ECIL"],
    image: "/city/hyd/Uppal.png",
    imageAlt: "Industrial and IT belt around Uppal, Pocharam and Cherlapally",
    accent: "from-slate-700 to-emerald-800",
    metaTitle: "E-Waste Recycling in Uppal, Pocharam & Cherlapally",
    metaDescription:
      "Authorized e-waste pickup in Uppal, Pocharam, Cherlapally and ECIL. Pickup for IT campuses, factories and warehouses. Form 6 paperwork included.",
    keywords: [
      "e-waste recycling Uppal",
      "industrial electronic scrap Cherlapally",
      "IT scrap pickup Pocharam",
      "e-waste ECIL",
      "factory e-waste Hyderabad",
    ],
    h1: "E-Waste Recycling in Uppal, Pocharam, Cherlapally and ECIL",
    intro:
      "East Hyderabad has large IT campuses at Pocharam and a busy industrial and warehouse belt around Cherlapally, Mallapur, Nacharam and ECIL. The waste here is steady and often predictable, so a pickup plan works better than calling each time.",
    collectHeading: "What comes from this belt",
    collectItems: [
      "Obsolete circuit boards and industrial electronics",
      "PLC panels, control cabinets, UPS units and battery banks",
      "Bulk office IT from factories, warehouses and institutions",
      "Industrial and electrical scrap",
    ],
    processHeading: "Recurring pickups instead of one-off calls",
    processBody:
      "We set up monthly or quarterly collection for sites that produce regular volumes. Each pickup is weighed and documented, so your records for an audit build up on their own.",
    processPoints: [
      "Monthly or quarterly collection plans",
      "Weighed and documented every visit",
      "IT campus clearances at Pocharam follow the same process as HITEC City work",
    ],
    highlightHeading: "Batteries are handled separately",
    highlightBody:
      "Battery waste is collected and documented separately from other equipment. If you have damaged lithium batteries, call before booking and we will confirm whether we can take them. Campus clearances include laptop and desktop refresh batches, server and network racks, and on-site drive shredding witnessed by your team.",
    areasCovered: [
      "Uppal",
      "Pocharam",
      "Cherlapally",
      "Mallapur",
      "Nacharam",
      "Moula Ali",
      "ECIL",
      "Habsiguda",
      "Tarnaka",
    ],
    faqs: [
      {
        question: "Can you set up a monthly pickup in Cherlapally?",
        answer:
          "Yes. We run monthly or quarterly collection plans for recurring volumes. Tell us the usual material and quantity, and we will quote a schedule.",
      },
      {
        question: "Do you collect industrial electronics like PLC panels?",
        answer:
          "Yes. Plant electronics, control panels and circuit boards are part of what we collect. Send a list or photos for a quote.",
      },
    ],
    primaryCta: { label: "Get a bulk quote", href: "/contact?city=hyderabad" },
    secondaryCta: { label: "Call +91 99499 01238", href: "tel:+919949901238" },
  },
]

export function getHyderabadArea(slug: string): HyderabadAreaData | null {
  return hyderabadAreas.find((area) => area.slug === slug) ?? null
}

export function getAllHyderabadAreaSlugs(): HyderabadAreaSlug[] {
  return hyderabadAreas.map((area) => area.slug)
}
