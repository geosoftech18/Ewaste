export interface CityData {
  slug: string;
  name: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  /** Full dual-purpose H1 when set; otherwise Hero uses the default city template */
  heroTitle?: string;
  /** Secondary hero paragraph below the main description */
  heroSubdescription?: string;
  /** Bridge copy shown below the hero */
  bridgeParagraph?: string;
  bridgeParagraphHtml?: string;
  /** Prominent blurb above/below the services category tabs */
  servicesBlurb?: string;
  servicesBlurbHtml?: string;
  /** Optional SEO title override */
  metaTitle?: string;
  /** Optional meta description override */
  metaDescription?: string;
  /** Target keywords from keyword research (used in metadata) */
  keywords?: string[];
  /** ISO date (YYYY-MM-DD) when editorial content was last reviewed */
  lastReviewed?: string;
  heroImage: string;
  population: string;
  wasteCollection: number;
  coverage: string;
  establishedYear: string;
  facilities: string[];
  highlights: string[];
  stats: {
    totalPickups: string;
    totalWeight: string;
    satisfactionRate: string;
  };
  services: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      descriptionHtml?: string;
      icon: string;
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
    answerHtml?: string;
  }>;
}

export const cityData: Record<string, CityData> = {
  'hyderabad': {
    slug: 'hyderabad',
    name: 'Hyderabad',
    title: 'E-Waste Recycling Services in Hyderabad — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Hyderabad — Sell E-Waste Online with Authorized Recycler',
    description:
    "Clearing out office tech clutter or home gadgets shouldn't be a headache. Whether you need corporate-grade e-waste recycling in Hyderabad with certified data destruction, or you are simply looking for trusted scrap buyers in Hyderabad to offload bulk hardware, SP Recycling has you covered.",
  descriptionHtml:
      "Clearing out office tech clutter or home gadgets shouldn't be a headache. Whether you need corporate-grade <a href='/blog/the-ultimate-guide-to-recycling-old-electronics-in-hyderabad'>e-waste recycling in Hyderabad</a> with certified data destruction, or you are simply looking for trusted <a href='/blog/selling-broken-electronics-in-hyderabad-is-it-possible-and-where-to-go'>scrap buyers in Hyderabad</a> to offload bulk hardware, SP Recycling has you covered.",
    heroSubdescription:
      'We make it incredibly easy to sell old electronics in Hyderabad for the best value. From legacy servers and outdated office laptops to old home appliances, our team handles the heavy lifting with free doorstep pickup across major tech hubs like HITEC City, Madhapur, and Gachibowli. Turn your old, retired electronic scrap into clean space today—responsibly, safely, and transparently.',
    bridgeParagraph:
      'SP Recycling clears the clutter. If you want the highest payout for old tech in Hyderabad or need a verified office cleanup, we manage the entire process starting at your front door.',
    metaTitle: 'E-Waste Recycling Services in Hyderabad — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling & premium scrap buyers in Hyderabad. Sell old electronics, laptops, and corporate IT assets with free doorstep pickup and secure data wiping',
    keywords: [
      'e-waste recycling in Hyderabad',
      'scrap buyers in Hyderabad',
      'sell old electronics in Hyderabad',
      'sell e-waste online Hyderabad',
      'authorized e-waste recycler Hyderabad',
    ],
    lastReviewed: '2026-09-24',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '10.4M',
    wasteCollection: 450,
    coverage: 'Greater Hyderabad Municipal Corporation',
    establishedYear: '2018',
    facilities: [
      'Certified Data Destruction Center',
      'Metal Recovery Facility',
      'Plastic Processing Unit',
      'Battery Recycling Plant'
    ],
    highlights: [
      'Same-day pickup service',
      'Certified data destruction',
      'Cash for old electronics',
      'Corporate bulk processing'
    ],
    stats: {
      totalPickups: '2,500+',
      totalWeight: '450+ tons',
      satisfactionRate: '98%'
    },
    servicesBlurb:
      'SP Recycling serves as reliable Hyderabad-based scrap purchasers managing everything from massive industrial IT hardware to small piles of home electronics. We clear out massive quantities for offices, server hubs, and tech campuses throughout the city. Our team provides accurate price assessments based on current metal values and follows a clear, honest sequence for getting rid of junk.',
    services: {
      title: 'Our Services in Hyderabad',
      items: [
        {
          name: 'IT Equipment Recycling',
          description: 'Secure disposal of servers, computers, and networking equipment',
          icon: 'Cpu'
        },
        {
          name: 'Mobile Device Recycling',
          description: 'Smartphone and tablet recycling with data wiping',
          icon: 'Smartphone'
        },
        {
          name: 'Corporate E-Waste',
          description: 'Bulk processing for businesses and organizations',
          icon: 'Building'
        },
        {
          name: 'Data Destruction',
          descriptionHtml: 'Certified secure <a href="https://www.sprecycling.in/blog/data-security-when-recycling-electronics-protecting-your-personal-information-in-hyderabad">data destruction services</a>',
          description: 'Certified secure data destruction services',
          icon: 'Shield'
        }
      ]
    },
    faqs: [
      {
        question: 'How can I sell old electronics in Hyderabad responsibly?',
        answer:
          'SP Recycling makes responsible resale simple. Every pickup follows a certified e-waste workflow: secure data wiping or destruction on laptops, servers, and storage devices; environmentally compliant processing at our licensed facility; and documentation for corporate or personal records. We offer free doorstep collection across Hyderabad, and higher-value IT assets may qualify for buyback after inspection—so you earn from old gear while keeping e-waste out of landfills.',
      },
      {
        question: 'Do you offer cash for electronic scrap?',
        answer:
          'Yes. SP Recycling buys electronic scrap for recycling and pays based on current metal and component values. We purchase old computers, desktops, servers, networking equipment, smartphones, printers, and other gadgets from homes, offices, server hubs, and tech campuses. Our team provides honest on-site assessments, handles certified data destruction before processing, and issues clear paperwork—whether you are clearing a small pile of home electronics or bulk office IT hardware.',
      },
      {
        question: 'Where is the best electronic scrap buyer in Hyderabad?',
        answer:
          'SP Recycling is a reliable Hyderabad-based scrap buyer with free doorstep pickup throughout the city—including Madhapur, Gachibowli, HITEC City, Secunderabad, and the wider IT Corridor under GHMC. We manage everything from single devices to massive corporate lots, with same-day or 24–48 hour scheduling, certified data destruction, and a verified ecological workflow. For offices and tech campuses that need fast, compliant clearance with fair pricing, our local team is built for the job.',
      },
      {
        question: 'How quickly can you pick up e-waste in Hyderabad?',
        answer: 'We offer same-day pickup for urgent requests and typically schedule pickups within 24-48 hours.'
      },
      {
        question: 'Do you provide data destruction certificates?',
        answer: 'Yes, we provide certified data destruction certificates for all devices containing sensitive information.'
      },
      {
        question: 'What areas in Hyderabad do you cover?',
        answer: 'All areas under GHMC, including HITEC City, Madhapur, Gachibowli, Kondapur, Secunderabad, Kukatpally, Uppal and Begumpet. For industrial belts such as Patancheru, Jeedimetla, Cherlapally and Pashamylaram, and for Genome Valley, we schedule pickups by volume and location.'
      },
      {
        question: 'Our services cover both commercial and residential scrap needs in Hyderabad.',
        answer: 'We take it all. SP Recycling stands as a heavyweight commercial waste specialist in the region. We focus on buying up old office desktops, server racks, networking gear, and heavy electronic machinery from businesses, academic institutions, and factories. Every transaction comes with proper legal paperwork and pricing that makes sense for your bottom line.'
      },
      {
        question: 'Which tech hubs and residential sectors in West Hyderabad and the Cyberabad corridor qualify for scheduled corporate and household e-waste collection?',
        answer: 'Our specialized green logistics network provides comprehensive, on-demand electronic waste collection across the entire western tech corridor and its surrounding commuter neighborhoods. For corporate IT offices, data centers, and enterprise tech parks located within Hitech City, Madhapur, Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Manikonda, Nallagandla, and Shaikpet, we offer certified asset auditing, bulk infrastructure decommissioning, and safe server room disposal. \n\nTo serve working professionals who need an eco-friendly way to clear out residential gadgets—ranging from old laptops and lithium batteries to dead smartphones—we run frequent doorstep collection routes through high-density residential developments in:\n\n Kukatpally, KPHB Colony, Nizampet, Hydernagar, and Miyapur\nMoosapet, Moti Nagar, Fathenagar, and Balanagar\nYousufguda, Borabanda, Srinagar Colony, Erragadda, and Sanathnagar\nSerilingampalle, Ameerpet, sr nagar, and Balkampet\n\nWhether you are coordinating an industrial electronics pickup at an assembly unit in Patancheru or R.C.Puram, or simply dropping off old home chargers from Tolichowki, Langar Houz, or Mehdipatnam, every single piece of scrap hardware is safely rerouted away from local municipal landfills and sent straight to authorized, pollution-control-board-compliant processing yards.'
      },
      {
        question: 'How can industrial zones, business hubs, and residential communities across East and North Hyderabad (including Secunderabad) safely recycle bulk electronic scrap?',
        answer: ' Industrial plants, educational institutions, and residential neighborhoods across the eastern and northern suburban areas can easily schedule systematic eco-compliance recycling through our localized pick-up channels. For heavy industrial belts, manufacturing corridors, and warehouse hubs situated in Cherlapally, Mallapur, Moula-Ali, Nacharam, and ECIL, we handle large-scale commercial electronic scrap, obsolete circuit boards, and defunct laboratory hardware. \n\nFor dense commercial centers, prominent educational zones, and long-standing residential suburbs, our routine collection trucks systematically cover:\n\n Uppal, Habsiguda, Ramanthapur, Tarnaka, and Padmarao Nagar\nAlwal, Yapral, Sainikpuri, Safilguda, and As rao nagar\nMalkajgiri, Neredmet, Marredpally, Begumpet, and Secunderabad\n\nLocal businesses and retail setups operating near busy commercial sectors like Panjagutta, Somajiguda, Ashok Nagar, Musheerabad, Ramnagar, and Gandhinagar can also utilize our quick-response collection vehicles. We ensure that all corporate electronics are recycled with full verification, preventing toxic heavy metals from contaminating urban ecosystems while ensuring old IT investments are handled with complete environmental accountability.'
      },
      {
        question: ' What eco-friendly disposal routes does S P Recycling provide for businesses and residents in Central, Southern, and Eastern Hyderabad neighborhoods?',
        answer: ' SP Recycling’ certified e-waste recovery operations extend deeply into the traditional commercial districts, core residential clusters, and expanding southern corridors of the city. For corporate outfits, healthcare centers, and trading firms operating out of busy business areas like Abids, Koti, Nampally, Sultan Bazar, Kachiguda, Barkatpura, Narayanaguda, and Himayat Nagar, we offer secure data sanitization alongside verified hardware disposal.\n\n Dilsukhnagar, L B Nagar, Kothapet, Saroornagar, and Karmanghat\n Vanasthalipuram, Hayathnagar, Bn reddy nagar, and Hasthinapuram\n Nagole, Moosarambagh, Saidabad, Champapet, and Malakpet\n Santosh nagar, Balapur, Jillelaguda, Meerpet, and Nadergul\nNagole, Moosarambagh, Saidabad, Champapet, and Malakpet\nSantosh nagar, Balapur, Jillelaguda, Meerpet, and Nadergul\nSantosh nagar, Balapur, Jillelaguda, Meerpet, and Nadergul\n\nFurthermore, our regular collection drives actively cover high-density markets and heritage sectors around Charminar, Ghansi Bazar, Begum Bazar, Osmangunj, Chaderghat, and Chikkadpally, stretching out seamlessly to Mettuguda, Amberpet, Red Hills, Mallepally, Masab Tank, and Rtc x Roads. From safely discarding household appliances in Vijayanagar Colony, Humain nagar, and Ziaguda to handling commercial hardware updates in Attapur, Rajendra Nagar, Bandlaguda, and Shamshabad, S P Recycling provides every neighborhood with a reliable, certified pathway to meet environmental safety norms effortlessly.'
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler in Hyderabad?',
        answer:
          'Yes. We hold e-waste authorization from the Central Pollution Control Board and the Telangana State Pollution Control Board. We can share copies before you book, and you can verify authorized recyclers on the CPCB website.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer: 'Form 6 is the manifest that travels with e-waste during transport. It records what is being moved, from whom, and to which authorized facility. Yes, we issue one with every pickup, and it forms part of the paper trail you keep for audits.'
      },
      {
        question: 'Do you offer on-site hard drive shredding in Hyderabad?',
        answer:
          'Yes. We bring shredding and degaussing equipment to your premises so drives never leave the building intact. Your team can witness the process, and you receive a certificate of destruction listing each serial number.',
      },
      {
        question: 'How fast can you pick up IT scrap in Hyderabad?',
        answer: 'Urgent requests within GHMC can often be collected the same day. Standard pickups are scheduled within 24–48 hours. Large decommissioning projects are planned with a site visit and a fixed date.'
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. Old CRT monitors, damaged items and some peripherals may have none. We tell you which is which in the quote, before pickup.',
      },
      {
        question: 'Can you handle e-waste from pharma and lab facilities?',
        answer:
          'Yes, including lab and analytical electronics and plant control equipment. If your site needs decontamination records or an EHS sign-off before material leaves, share the format and we will work to it.',
      },
      {
        question: 'What documents do I receive after pickup?',
        answer:
          'A Form 6 manifest, a weighment slip, a certificate of destruction for storage media, and a recycling certificate.',
      },
    ]
  },
  'mumbai': {
    slug: 'mumbai',
    name: 'Mumbai',
    title: 'E-Waste Recycling Services in Mumbai — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Mumbai — Sell E-Waste Online with Authorized Recycler',
    description: 'Leading e-waste recycling services in Mumbai with state-of-the-art facilities, secure data destruction, and comprehensive pickup services across the financial capital.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '20.4M',
    wasteCollection: 920,
    coverage: 'Brihanmumbai Municipal Corporation',
    establishedYear: '2016',
    metaTitle:'E-Waste Recycling Services in Mumbai — Sell E-Waste Online with Authorized Recycler',
    metaDescription:'Secure corporate e-waste recycling and certified IT asset disposal in Mumbai. Get free doorstep pickup across South Mumbai, Western Suburbs, and Eastern Suburbs. 100% data destruction guaranteed.',
    keywords: [
      'e-waste recycling in Mumbai',
      'scrap buyers in Mumbai',
      'sell old electronics in Mumbai',
      'IT asset disposal Mumbai',
      'authorized e-waste recycler Mumbai',
    ],
    lastReviewed: '2026-09-24',
    facilities: [
      'Advanced Data Destruction Center',
      'Multi-Metal Recovery Facility',
      'Plastic Granulation Unit',
      'Lithium Battery Processing Plant'
    ],
    highlights: [
      'Urgent pickup in working hours',
      'Corporate partnerships',
      'Financial district coverage',
      'Bulk processing capabilities'
    ],
    stats: {
      totalPickups: '5,200+',
      totalWeight: '920+ tons',
      satisfactionRate: '99%'
    },
    services: {
      title: 'Our Services in Mumbai',
      items: [
        {
          name: 'Financial Sector E-Waste',
          description: 'Specialized services for banks and financial institutions',
          icon: 'Building2'
        },
        {
          name: 'IT Infrastructure Disposal',
          description: 'Large-scale data center equipment recycling',
          icon: 'Server'
        },
        {
          name: 'Consumer Electronics',
          description: 'Individual and household electronics recycling',
          icon: 'Smartphone'
        },
        {
          name: 'Medical Equipment',
          description: 'Hospital and clinic equipment disposal',
          icon: 'Stethoscope'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you serve the Mumbai financial district?',
        answer:
          'Yes. We serve banks, NBFCs, brokerages and corporate offices across Nariman Point, Fort, BKC and related districts, with gate-pass planning, witnessed collection and data-destruction certificates when required.',
      },
      {
        question: 'What is your coverage area in Mumbai?',
        answer:
          'Mumbai city and the suburbs, including South Mumbai, BKC, Andheri, Powai, Goregaon, Malad, Vikhroli and Mulund. For Navi Mumbai, Thane, Taloja and Bhiwandi we schedule by volume and location — call to confirm your pin code.',
      },
      {
        question: 'Do you offer emergency pickup services?',
        answer:
          'Urgent requests are handled in working hours (Mon–Sat, 9 AM–6 PM) with a fast callback. After-hours and Sunday pickups for commercial buildings are available by arrangement.',
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler for Mumbai pickups?',
        answer:
          'We are authorized by the Central Pollution Control Board as an e-waste recycler. Mumbai consignments move under a Form 6 manifest to our authorized processing facility in Telangana. We share authorization copies before you book, and you can verify recyclers on the CPCB website.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is moved, from whom, and to which authorized facility. Yes, every Mumbai pickup comes with one, and it forms part of the audit trail you keep.',
      },
      {
        question: 'Where does my Mumbai e-waste go after pickup?',
        answer:
          'Loads move under a Form 6 manifest to our CPCB-authorized processing facility at Thumkunta, Bibinagar, Telangana. Your manifest and recycling certificate name the facility, so you always know where the waste went.',
      },
      {
        question: 'Can you destroy hard drives at our office in Mumbai?',
        answer:
          'Yes, for corporate sites we can arrange on-site shredding or degaussing so drives never leave the building intact. Your team can witness the process, and you receive a certificate listing every serial number. Off-site destruction under sealed escort is also available.',
      },
      {
        question: 'How fast can you pick up IT scrap in Mumbai?',
        answer:
          'Standard pickups are scheduled within 24–48 hours. Small urgent lots are slotted as soon as a vehicle is available, often within 24 hours. Large decommissioning projects are planned with a site visit and a fixed date.',
      },
      {
        question: 'Can you work around building rules in South Mumbai and BKC?',
        answer:
          "Yes. Send us your building's access rules: goods lift timings, permitted vehicle sizes, gate-pass requirements. We plan the pickup around them and share vehicle and team details in advance.",
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. CRT monitors, damaged items and some peripherals may not. We tell you which is which in the quote, before pickup.',
      },
    ]
  },
  'delhi': {
    slug: 'delhi',
    name: 'Delhi',
    title: 'E-Waste Recycling Services in Delhi — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Delhi — Sell E-Waste Online with Authorized Recycler',
    description: 'Comprehensive e-waste recycling services in Delhi NCR with certified facilities, secure data destruction, and extensive coverage across the national capital region.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '32.9M',
    wasteCollection: 850,
    coverage: 'Delhi Municipal Corporation',
    establishedYear: '2015',
    metaTitle: 'E-Waste Recycling Services in Delhi — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling & scrap buyers in Delhi NCR. Sell old electronics with free pickup across Delhi, Gurgaon, Noida and Faridabad. Secure data destruction included.',
    keywords: [
      'e-waste recycling in Delhi',
      'scrap buyers in Delhi NCR',
      'sell old electronics in Delhi',
      'e-waste pickup Gurgaon Noida',
      'authorized e-waste recycler Delhi',
    ],
    lastReviewed: '2026-09-24',
    facilities: [
      'Central Data Destruction Hub',
      'Multi-Material Recovery Facility',
      'Advanced Sorting Center',
      'Research & Development Lab'
    ],
    highlights: [
      'Government partnerships',
      'Educational institution services',
      'NCR-wide coverage',
      'Research collaborations'
    ],
    stats: {
      totalPickups: '4,800+',
      totalWeight: '850+ tons',
      satisfactionRate: '97%'
    },
    services: {
      title: 'Our Services in Delhi',
      items: [
        {
          name: 'Government E-Waste',
          description: 'Specialized services for government departments',
          icon: 'Building'
        },
        {
          name: 'Educational Institution',
          description: 'Campus-wide electronics recycling programs',
          icon: 'GraduationCap'
        },
        {
          name: 'Corporate Offices',
          description: 'Office equipment and IT asset disposal',
          icon: 'Briefcase'
        },
        {
          name: 'Residential Services',
          description: 'Household electronics pickup and recycling',
          icon: 'Home'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you cover Delhi NCR areas?',
        answer:
          'Yes. We plan pickups across Delhi, Gurugram (Gurgaon), Noida, Greater Noida, Faridabad and Ghaziabad. Because NCR spans three states, we confirm the paperwork route when you book. For Faridabad, Ghaziabad and outer industrial belts, call to confirm your pin code.',
      },
      {
        question: 'Do you work with government departments?',
        answer:
          'We provide serial-number lists, weighment slips, and destruction and recycling certificates that departments can use for audit and condemnation records. Share your department\'s format and we will work to it.',
      },
      {
        question: 'What about educational institutions?',
        answer:
          'Yes. We plan bulk pickups around term breaks and exam schedules, list devices by serial number, and give you recycling and destruction certificates for institutional records.',
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler for Delhi NCR pickups?',
        answer:
          'We are authorized by the Central Pollution Control Board as an e-waste recycler. NCR consignments move under a Form 6 manifest to our authorized processing facility in Telangana. We share authorization copies before you book, and you can verify recyclers on the CPCB and state board websites (DPCC, HSPCB, UPPCB).',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is moved, from whom, and to which authorized facility. Yes, every pickup comes with one, including pickups that cross between Delhi, Haryana and Uttar Pradesh.',
      },
      {
        question: 'Where does my NCR e-waste go after pickup?',
        answer:
          'Loads move under a Form 6 manifest to our CPCB-authorized processing facility at Thumkunta, Bibinagar, Telangana. Your manifest and recycling certificate name the facility, so you always know where the waste went.',
      },
      {
        question: 'Can you destroy hard drives at our office in Delhi NCR?',
        answer:
          'Yes, for corporate and institutional sites we can arrange on-site shredding or degaussing so drives never leave the building intact. Your team can witness the process, and you receive a certificate listing every serial number. Off-site destruction under sealed escort is also available.',
      },
      {
        question: 'Do you cover Gurugram, Noida and Faridabad as well as Delhi?',
        answer:
          'Yes, we plan pickups across Delhi NCR. Because NCR spans three states, we confirm the paperwork route when you book.',
      },
      {
        question: 'Do winter pollution restrictions affect pickups?',
        answer:
          'They can. From roughly October to January, air-quality restrictions may limit commercial vehicle movement. We plan around them and tell you early if a date needs to move.',
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. CRT monitors, damaged items and some peripherals may not. We tell you which is which in the quote, before pickup.',
      },
      {
        question: 'How fast can you pick up IT scrap in Delhi NCR?',
        answer:
          'Standard pickups are scheduled within 24–48 hours. Small urgent lots are slotted as soon as a vehicle is available, often within 24 hours. Large decommissioning projects are planned with a site visit and a fixed date. Small lots may be batched for route efficiency.',
      },
    ]
  },
  'bangalore': {
    slug: 'bangalore',
    name: 'Bangalore',
    title: 'E-Waste Recycling Services in Bangalore — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Bangalore — Sell E-Waste Online with Authorized Recycler',
    description: 'Laptops, servers, and networking gear are securely recycled with data destruction and complete asset recovery, while battery and circuit-board recovery for the city’s IT and EV sectors plays a crucial role in responsible waste management. WEEE handling supports end-to-end disposal for the region and beyond. EVs are increasingly part of the transition to cleaner transport and smarter asset planning, highlighting the importance of effective recovery processes for sustainable growth.',
   metaTitle: 'E-Waste Recycling Services in Bangalore — Sell E-Waste Online with Authorized Recycler',
   metaDescription: 'Secure corporate e-waste recycling and certified IT asset disposal in Bangalore. Get free doorstep pickup across Whitefield, Electronic City, and Koramangala. 100% data destruction guaranteed.',
    keywords: [
      'e-waste recycling in Bangalore',
      'scrap buyers in Bangalore',
      'sell old electronics in Bangalore',
      'IT asset disposal Whitefield',
      'authorized e-waste recycler Bangalore',
    ],
    lastReviewed: '2026-09-24',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '13.6M',
    wasteCollection: 680,
    coverage: 'Bruhat Bengaluru Mahanagara Palike',
    establishedYear: '2017',
    facilities: [
      'Tech-Specialized Processing Center',
      'Data Security Lab',
      'Component Recovery Facility',
      'Innovation Center'
    ],
    highlights: [
      'Tech company partnerships',
      'Startup-friendly services',
      'Innovation in recycling',
      'Silicon Valley coverage'
    ],
    stats: {
      totalPickups: '3,800+',
      totalWeight: '680+ tons',
      satisfactionRate: '99%'
    },
    services: {
      title: 'Our Services in Bangalore',
      items: [
        {
          name: 'Startup E-Waste',
          description: 'Tailored services for startups and tech companies',
          icon: 'Rocket'
        },
        {
          name: 'Data Center Equipment',
          description: 'Large-scale server and infrastructure disposal',
          icon: 'Database'
        },
        {
          name: 'R&D Equipment',
          description: 'Research and development electronics recycling',
          icon: 'Microscope'
        },
        {
          name: 'Gaming & Entertainment',
          description: 'Gaming consoles and entertainment electronics',
          icon: 'Gamepad2'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you serve tech startups in Bangalore?',
        answer: 'Yes, we offer special packages and flexible services tailored for startups and tech companies.'
      },
      {
        question: 'What areas of Bangalore do you cover?',
        answer:
          'All areas under BBMP, including Whitefield, Electronic City, Koramangala, Indiranagar, Marathahalli, Manyata, Hebbal, Peenya, HSR Layout, Jayanagar and Sarjapur. Industrial and tech-park pickups are scheduled by volume and location.',
      },
      {
        question: 'Do you handle data center equipment?',
        answer: 'Yes, we specialize in large-scale data center equipment disposal with enhanced security protocols.'
      },
      {
        question: 'How can businesses responsibly sell old electronics in Bangalore? ',
        answer: "SP Recycling simplifies corporate asset liquidation. Every single commercial pickup follows strict environmental and data protection workflows: multi-pass software overwriting or physical destruction for all data-bearing drives, eco-friendly processing at an authorized facility, and full audit documentation. We provide doorstep collection across Bangalore's commercial corridors. High-value infrastructure like enterprise servers and corporate laptops qualify for buyback rewards after an official inventory assessment.  "
      },
      {
        question: 'Do you purchase bulk electronic scrap from IT companies? ',
        answer: 'Yes, we specialize in high-volume commercial purchasing. We buy electronic scrap based on current commodity markets and asset market values. We regularly purchase bulk computers, server infrastructure, networking switches, UPS systems, and storage arrays from tech parks, research facilities, and corporate offices across Bangalore, providing official transaction manifests and clean settlements. '
      },
      {
        question: 'What geographical areas across Bangalore do you cover?  ',
        answer: 'We provide comprehensive logistical coverage throughout the entire Bruhat Bengaluru Mahanagara Palike (BBMP) metropolitan area and adjacent industrial zones. Our collection trucks operate daily across Whitefield, Electronic City, Koramangala, Indiranagar, Mahadevapura, Bellandur, Marathahalli, Manyata Tech Park, Hebbal, and Peenya Industrial Area.  '
      },
      {
        question: 'Do you provide authenticated Data Destruction Certificates?  ',
        answer: 'Absolutely. For every project involving storage media like hard disks, solid-state drives, or backup tapes, we execute rigorous data sanitization. Once the destruction or shredding process is complete, we issue an official, audit-ready Data Destruction Certificate detailing the serial numbers of the processed devices for your corporate compliance records.  '
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler serving Bangalore?',
        answer:
          'Yes. We operate as a CPCB-authorized e-waste recycling channel and issue the paperwork your auditor expects — including Form 6 manifests and certificates of destruction. You can verify authorized recyclers on the CPCB website before you book.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one in Bangalore?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is being moved, from whom, and to which authorized facility. Yes, we issue one with every Bangalore pickup as part of your audit trail.',
      },
      {
        question: 'Do you offer on-site hard drive shredding in Bangalore?',
        answer:
          'Yes. We can bring shredding and degaussing equipment to your premises so drives never leave the building intact. Your team can witness the process, and you receive a certificate of destruction listing each serial number.',
      },
      {
        question: 'How fast can you pick up IT scrap in Bangalore?',
        answer:
          'Urgent requests within BBMP can often be collected the same day. Standard pickups are scheduled within 24–48 hours. Large decommissioning projects are planned with a site visit and a fixed date.',
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. Old CRT monitors, damaged items and some peripherals may have none. We tell you which is which in the quote, before pickup.',
      },
      {
        question: 'What documents do I receive after a Bangalore pickup?',
        answer:
          'A Form 6 manifest, a weighment slip, a certificate of destruction for storage media, and a recycling certificate.',
      },
    ]
  },
  'chennai': {
    slug: 'chennai',
    name: 'Chennai',
    title: 'E-Waste Recycling Services in Chennai — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Chennai — Sell E-Waste Online with Authorized Recycler',
    description: 'Reliable e-waste recycling services in Chennai with certified facilities, secure data destruction, and comprehensive coverage across Tamil Nadu\'s capital.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '11.2M',
    wasteCollection: 520,
    coverage: 'Greater Chennai Corporation',
    metaTitle:'E-Waste Recycling Services in Chennai — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling & scrap buyers in Chennai. Sell old electronics with free doorstep pickup across Greater Chennai. Secure data destruction and transparent rates.',
    keywords: [
      'e-waste recycling in Chennai',
      'scrap buyers in Chennai',
      'sell old electronics in Chennai',
      'automotive electronics recycling Chennai',
      'authorized e-waste recycler Chennai',
    ],
    lastReviewed: '2026-09-24',
    establishedYear: '2018',
    facilities: [
      'Regional Processing Center',
      'Marine-Safe Disposal Unit',
      'Automotive Electronics Facility',
      'Manufacturing Equipment Center'
    ],
    highlights: [
      'Automotive industry focus',
      'Manufacturing partnerships',
      'Coastal city protocols',
      'Regional coverage'
    ],
    stats: {
      totalPickups: '2,800+',
      totalWeight: '520+ tons',
      satisfactionRate: '98%'
    },
    services: {
      title: 'Our Services in Chennai',
      items: [
        {
          name: 'Automotive Electronics',
          description: 'Specialized automotive electronics recycling',
          icon: 'Car'
        },
        {
          name: 'Manufacturing Equipment',
          description: 'Industrial and manufacturing electronics disposal',
          icon: 'Factory'
        },
        {
          name: 'Port Electronics',
          description: 'Marine and port equipment recycling',
          icon: 'Ship'
        },
        {
          name: 'Healthcare Equipment',
          description: 'Medical and healthcare electronics disposal',
          icon: 'Heart'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you handle automotive and industrial electronics?',
        answer:
          'We collect industrial electronics such as PLC panels, control cabinets, circuit boards, UPS and battery banks from plants in Sriperumbudur, Oragadam, Maraimalai Nagar and Guindy. Call us before booking if you have vehicle electronics in bulk, so we can confirm handling and paperwork.',
      },
      {
        question: 'What about manufacturing equipment?',
        answer:
          'Yes. We schedule pickups for plant electronics and obsolete office IT from manufacturing and engineering units, with category documentation and Form 6 manifests for your audit trail.',
      },
      {
        question: 'Do you cover Chennai port area?',
        answer:
          'We collect IT assets from shipping, logistics and port-side businesses around Ennore and Manali. For marine or salt-exposed equipment, contact us before booking so we can confirm what we can take and how it will be documented.',
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler for Chennai pickups?',
        answer:
          'We are authorized by the Central Pollution Control Board as an e-waste recycler. Chennai consignments move under a Form 6 manifest to our authorized processing facility in Telangana. We share authorization copies before you book, and you can verify recyclers on the CPCB website.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is moved, from whom, and to which authorized facility. Yes, every Chennai pickup comes with one, and it forms part of the audit trail you keep.',
      },
      {
        question: 'Where does my Chennai e-waste go after pickup?',
        answer:
          'Loads move under a Form 6 manifest to our CPCB-authorized processing facility at Thumkunta, Bibinagar, Telangana. Your manifest and recycling certificate name the facility, so you always know where the waste went.',
      },
      {
        question: 'Can you destroy hard drives at our office in Chennai?',
        answer:
          'Yes, for corporate sites we can arrange on-site shredding or degaussing so drives never leave the building intact. Your team can witness the process, and you receive a certificate listing every serial number. Off-site destruction under sealed escort is also available.',
      },
      {
        question: 'How fast can you pick up IT scrap in Chennai?',
        answer:
          'Standard pickups are scheduled within 24–48 hours. Small urgent lots are slotted as soon as a vehicle is available, often within 24 hours. Large decommissioning projects are planned with a site visit and a fixed date. Small lots may be batched for route efficiency.',
      },
      {
        question: 'Can you take flood-damaged or water-damaged equipment?',
        answer:
          'Tell us what was affected when you book. Water-damaged devices can carry battery and safety risks, and we plan the pickup accordingly.',
      },
      {
        question: 'Which areas of Chennai do you cover?',
        answer:
          'Greater Chennai, including OMR, Guindy, Ambattur, Anna Salai and Velachery. For Sriperumbudur, Oragadam, Maraimalai Nagar, Ennore and Manali we schedule by volume — call to confirm your pin code.',
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. CRT monitors, damaged items and some peripherals may not. We tell you which is which in the quote, before pickup.',
      },
    ]
  },
  'gujarat': {
    slug: 'gujarat',
    name: 'Gujarat',
    title: 'E-Waste Recycling Services in Gujarat — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Gujarat — Sell E-Waste Online with Authorized Recycler',
    description: 'Comprehensive e-waste recycling services across Gujarat with certified facilities, secure data destruction, and extensive coverage serving Ahmedabad, Surat, Vadodara, and other major cities.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '60.4M',
    wasteCollection: 1200,
    coverage: 'Gujarat State',
    establishedYear: '2017',
    metaTitle: 'E-Waste Recycling Services in Gujarat — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling across Gujarat — Ahmedabad, Surat, Vadodara & more. Sell industrial and household electronics with free pickup and secure data destruction.',
    keywords: [
      'e-waste recycling in Gujarat',
      'scrap buyers in Ahmedabad',
      'sell old electronics in Surat',
      'industrial e-waste recycling Gujarat',
      'authorized e-waste recycler Gujarat',
    ],
    lastReviewed: '2026-09-24',
    facilities: [
      'State-of-the-art Processing Center',
      'Multi-Material Recovery Facility',
      'Advanced Sorting Center',
      'Industrial Electronics Unit'
    ],
    highlights: [
      'State-wide coverage',
      'Industrial partnerships',
      'Manufacturing focus',
      'Port city services'
    ],
    stats: {
      totalPickups: '6,500+',
      totalWeight: '1,200+ tons',
      satisfactionRate: '98%'
    },
    services: {
      title: 'Our Services in Gujarat',
      items: [
        {
          name: 'Industrial E-Waste',
          description: 'Specialized services for manufacturing and industrial sectors',
          icon: 'Factory'
        },
        {
          name: 'Port Electronics',
          description: 'Marine and port equipment recycling services',
          icon: 'Ship'
        },
        {
          name: 'Corporate Services',
          description: 'Business and office equipment disposal',
          icon: 'Building'
        },
        {
          name: 'Consumer Electronics',
          description: 'Household electronics pickup and recycling',
          icon: 'Smartphone'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you cover all cities in Gujarat?',
        answer: 'Yes, we provide services across Gujarat including Ahmedabad, Surat, Vadodara, Rajkot, and other major cities.'
      },
      {
        question: 'Do you handle industrial electronics?',
        answer: 'Yes, we specialize in industrial and manufacturing electronics disposal with specialized protocols.'
      },
      {
        question: 'What about port cities like Surat?',
        answer: 'We provide specialized services for port cities with marine electronics handling capabilities.'
      }
    ]
  },
  'andhra-pradesh': {
    slug: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    title: 'E-Waste Recycling Services in Andhra Pradesh — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling Services in Andhra Pradesh — Sell E-Waste Online with Authorized Recycler',
    description: 'Professional e-waste recycling services across Andhra Pradesh with certified facilities, secure data destruction, and comprehensive coverage serving Visakhapatnam, Vijayawada, and other major cities.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '49.4M',
    wasteCollection: 850,
    coverage: 'Andhra Pradesh State',
    establishedYear: '2018',
    metaTitle: 'E-Waste Recycling Services in Andhra Pradesh — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling in Andhra Pradesh — Visakhapatnam, Vijayawada & more. Sell old electronics with free pickup, data destruction, and compliance support.',
    keywords: [
      'e-waste recycling in Andhra Pradesh',
      'scrap buyers in Visakhapatnam',
      'sell old electronics in Vijayawada',
      'e-waste pickup Andhra Pradesh',
      'authorized e-waste recycler Andhra Pradesh',
    ],
    lastReviewed: '2026-09-24',
    facilities: [
      'Regional Processing Hub',
      'Marine Electronics Facility',
      'IT Equipment Center',
      'Healthcare Electronics Unit'
    ],
    highlights: [
      'Coastal city expertise',
      'IT sector focus',
      'Healthcare partnerships',
      'Regional coverage'
    ],
    stats: {
      totalPickups: '4,200+',
      totalWeight: '850+ tons',
      satisfactionRate: '97%'
    },
    services: {
      title: 'Our Services in Andhra Pradesh',
      items: [
        {
          name: 'IT Equipment Recycling',
          description: 'Secure disposal of computers, servers, and networking equipment',
          icon: 'Cpu'
        },
        {
          name: 'Healthcare Electronics',
          description: 'Medical equipment and hospital electronics disposal',
          icon: 'Heart'
        },
        {
          name: 'Marine Electronics',
          description: 'Port and marine equipment recycling services',
          icon: 'Ship'
        },
        {
          name: 'Educational Services',
          description: 'Campus-wide electronics recycling programs',
          icon: 'GraduationCap'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you serve Visakhapatnam port area?',
        answer: 'Yes, we provide specialized services for port cities including marine electronics handling.'
      },
      {
        question: 'What cities in Andhra Pradesh do you cover?',
        answer: 'We cover major cities including Visakhapatnam, Vijayawada, Guntur, Tirupati, and other urban centers.'
      },
      {
        question: 'Do you handle healthcare electronics?',
        answer: 'Yes, we specialize in medical equipment disposal with proper compliance and documentation.'
      }
    ]
  },
  'pune': {
    slug: 'pune',
    name: 'Pune',
    title: 'E-Waste Recycling & Scrap Buyers in Pune — Sell E-Waste Online with Authorized Recycler',
    heroTitle: 'E-Waste Recycling & Scrap Buyers in Pune — Sell E-Waste Online with Authorized Recycler',
    description: 'Leading e-waste recycling services in Pune with state-of-the-art facilities, secure data destruction, and comprehensive coverage serving the educational and IT hub of Maharashtra.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '7.2M',
    wasteCollection: 380,
    coverage: 'Pune Municipal Corporation',
    establishedYear: '2018',
    metaTitle:'E-Waste Recycling & Scrap Buyers in Pune — Sell E-Waste Online with Authorized Recycler',
    metaDescription:
      'Certified e-waste recycling & scrap buyers in Pune. Sell old electronics from homes, colleges and IT parks with free doorstep pickup and secure data wiping.',
    keywords: [
      'e-waste recycling in Pune',
      'scrap buyers in Pune',
      'sell old electronics in Pune',
      'campus e-waste recycling Pune',
      'authorized e-waste recycler Pune',
    ],
    lastReviewed: '2026-09-24',
    facilities: [
      'Educational Electronics Center',
      'IT Equipment Processing Unit',
      'Automotive Electronics Facility',
      'Research Equipment Hub'
    ],
    highlights: [
      'Educational institution focus',
      'IT company partnerships',
      'Automotive industry services',
      'Research collaboration'
    ],
    stats: {
      totalPickups: '2,800+',
      totalWeight: '380+ tons',
      satisfactionRate: '99%'
    },
    services: {
      title: 'Our Services in Pune',
      items: [
        {
          name: 'Educational Electronics',
          description: 'Campus-wide electronics recycling for schools and colleges',
          icon: 'GraduationCap'
        },
        {
          name: 'IT Company Services',
          description: 'Specialized services for IT companies and startups',
          icon: 'Cpu'
        },
        {
          name: 'Automotive Electronics',
          description: 'Automotive industry electronics disposal',
          icon: 'Car'
        },
        {
          name: 'Research Equipment',
          description: 'Laboratory and research equipment recycling',
          icon: 'Microscope'
        }
      ]
    },
    faqs: [
      {
        question: 'Do you serve educational institutions in Pune?',
        answer:
          'Yes. We plan bulk pickups around term breaks and exam schedules, list devices by serial number, and give you recycling and destruction certificates for institutional records. Share your list for a quote.',
      },
      {
        question: 'What areas of Pune do you cover?',
        answer:
          'Pune city, including Hinjewadi, Baner, Kharadi, Magarpatta, Hadapsar and Shivajinagar, plus Pimpri-Chinchwad. For Chakan, Ranjangaon, Talegaon and other MIDC areas we schedule by volume — call to confirm your pin code.',
      },
      {
        question: 'Do you handle industrial and automotive electronics?',
        answer:
          'We collect industrial electronics such as PLC panels, control cabinets, circuit boards, UPS and battery banks from plants in Pimpri-Chinchwad, Chakan and Ranjangaon. Call us before booking if you have vehicle electronics in bulk, so we can confirm handling and paperwork.',
      },
      {
        question: 'Is SP Recycling an authorized e-waste recycler for Pune pickups?',
        answer:
          'We are authorized by the Central Pollution Control Board as an e-waste recycler. Pune consignments move under a Form 6 manifest to our authorized processing facility in Telangana. We share authorization copies before you book, and you can verify recyclers on the CPCB website.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is moved, from whom, and to which authorized facility. Yes, every Pune pickup comes with one, and it forms part of the audit trail you keep.',
      },
      {
        question: 'Where does my Pune e-waste go after pickup?',
        answer:
          'Loads move under a Form 6 manifest to our CPCB-authorized processing facility at Thumkunta, Bibinagar, Telangana. Your manifest and recycling certificate name the facility, so you always know where the waste went.',
      },
      {
        question: 'Can you destroy hard drives at our office or campus in Pune?',
        answer:
          'Yes, for corporate and institutional sites we can arrange on-site shredding or degaussing so drives never leave the building intact. Your team can witness the process, and you receive a certificate listing every serial number. Off-site destruction under sealed escort is also available.',
      },
      {
        question: 'How fast can you pick up IT scrap in Pune?',
        answer:
          'Standard pickups are scheduled within 24–48 hours. Small urgent lots are slotted as soon as a vehicle is available, often within 24 hours. Large decommissioning projects are planned with a site visit and a fixed date. Small lots may be batched for route efficiency.',
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. CRT monitors, damaged items and some peripherals may not. We tell you which is which in the quote, before pickup.',
      },
    ]
  },
  'kolkata': {
    slug: 'kolkata',
    name: 'Kolkata',
    title: 'E-Waste Recycling and IT Asset Disposal in Kolkata',
    heroTitle: 'E-Waste Recycling and IT Asset Disposal in Kolkata',
    description:
      "Kolkata's IT parks, banks, hospitals, universities and engineering units retire a lot of electronics, and each one needs proof of how it was disposed of. SP Recycling collects e-waste across Kolkata and Howrah, destroys the data, and gives you the documents your auditor, management or department will ask for. Every pickup comes with a weighed receipt, a Form 6 transport manifest, and a certificate of destruction or recycling.",
    metaTitle: 'E-Waste Recycling in Kolkata | Certified ITAD & IT Scrap Pickup',
    metaDescription:
      'Authorized e-waste recycling and IT asset disposal in Kolkata. Pickup from Salt Lake Sector V, New Town and Howrah. Data destruction certificate included.',
    keywords: [
      'e-waste recycling kolkata',
      'IT asset disposal kolkata',
      'e-waste pickup kolkata',
      'corporate e-waste disposal kolkata',
      'authorized e-waste recycler kolkata',
      'IT scrap buyers kolkata',
      'e-waste pickup salt lake',
      'e-waste pickup new town',
      'hard drive shredding kolkata',
    ],
    lastReviewed: '2026-10-05',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '14.8M',
    wasteCollection: 0,
    coverage: 'Kolkata Municipal Corporation & Howrah',
    establishedYear: '2018',
    facilities: [
      'CPCB-authorized processing (Telangana)',
      'Form 6 tracked transport',
      'On-site data destruction (corporate)',
      'Institutional documentation support',
    ],
    highlights: [
      'Salt Lake Sector V & New Town coverage',
      'Banks, hospitals and campuses',
      'Form 6 on every pickup',
      'Serving Kolkata from Telangana base',
    ],
    stats: {
      totalPickups: 'On request',
      totalWeight: 'Documented',
      satisfactionRate: 'Form 6',
    },
    servicesBlurb:
      'SP Recycling serves Kolkata IT parks, financial firms, hospitals, universities and engineering units with doorstep pickup, certified data destruction and audit-ready paperwork. Consignments move under Form 6 to our CPCB-authorized facility in Telangana.',
    services: {
      title: 'Our Services in Kolkata',
      items: [
        {
          name: 'IT & ITES Recycling',
          description: 'Laptop refresh batches and office IT from Sector V and New Town',
          icon: 'Cpu',
        },
        {
          name: 'Financial Sector ITAD',
          description: 'Secure collection and destruction certificates for banks and insurers',
          icon: 'Building2',
        },
        {
          name: 'Healthcare Electronics',
          description: 'Hospital and diagnostic IT with documented media destruction',
          icon: 'Heart',
        },
        {
          name: 'Data Destruction',
          description: 'On-site or escorted off-site destruction with serial-number certificates',
          icon: 'Shield',
        },
      ],
    },
    faqs: [
      {
        question: 'Is SP Recycling an authorized e-waste recycler for Kolkata pickups?',
        answer:
          'We are authorized by the Central Pollution Control Board as an e-waste recycler. Kolkata consignments move under a Form 6 manifest to our authorized processing facility in Telangana. We share authorization copies before you book, and you can verify recyclers on the CPCB and WBPCB websites.',
      },
      {
        question: 'What is a Form 6 manifest and will I get one?',
        answer:
          'Form 6 is the manifest that travels with e-waste during transport. It records what is moved, from whom, and to which authorized facility. Yes, every Kolkata pickup comes with one.',
      },
      {
        question: 'Where does my Kolkata e-waste go after pickup?',
        answer:
          'Loads move under a Form 6 manifest to our CPCB-authorized processing facility at Thumkunta, Bibinagar, Telangana. Your manifest and recycling certificate name the facility, so you always know where the waste went.',
      },
      {
        question: 'Can you destroy hard drives at our office in Kolkata?',
        answer:
          'Yes, for corporate and institutional sites we can arrange on-site shredding or degaussing so drives never leave the building intact. Your team can witness the process, and you receive a certificate listing every serial number. Off-site destruction under sealed escort is also available.',
      },
      {
        question: 'How fast can you pick up IT scrap in Kolkata?',
        answer:
          'Standard pickups are scheduled within 24–48 hours after confirmation. Large decommissioning projects are planned with a site visit and a fixed date. Small lots may be batched for route efficiency from our Telangana base.',
      },
      {
        question: 'Do you cover Salt Lake Sector V and New Town?',
        answer:
          'Yes, we plan pickups across Salt Lake, Sector V, New Town and Rajarhat. Send us your building\'s access rules and we plan around them.',
      },
      {
        question: 'Do you work with government departments?',
        answer:
          'We provide serial-number lists, weighment slips, and destruction and recycling certificates that departments can use for audit and condemnation records. Share your department\'s format and we will work to it.',
      },
      {
        question: 'Do you serve schools, colleges and universities?',
        answer:
          'Yes. We plan bulk pickups around term breaks and exam schedules, list devices by serial number, and give you recycling and destruction certificates for institutional records.',
      },
      {
        question: 'Do you pay for IT scrap, or do I pay for disposal?',
        answer:
          'It depends on the equipment. Working laptops, servers and networking gear usually carry value. CRT monitors, damaged items and some peripherals may not. We tell you which is which in the quote, before pickup.',
      },
      {
        question: 'Which areas of Kolkata do you cover?',
        answer:
          'Kolkata and Howrah, including Salt Lake Sector V, New Town, Rajarhat, Park Street, BBD Bagh and Ballygunge. For Dankuni, Uluberia, Barasat, Barrackpore and port-side areas we schedule by volume — call to confirm your pin code.',
      },
    ],
  },
};

type LinkedServiceItem = CityData['services']['items'][number];

const servicePageLinks = {
  ewaste: '/services/electronic-waste-recycle',
  itTelecom: '/services/it-telecom',
  consumer: '/services/consumer-electronics',
  dataDestruction: '/services/data-destruction',
  epr: '/services/EPR-Compliance-Solutions',
} as const;

function linkLabel(href: string, label: string) {
  return `<a href="${href}">${label}</a>`;
}

export function getCityBridgeParagraphHtml(city: CityData): string {
  if (city.bridgeParagraphHtml) return city.bridgeParagraphHtml;
  if (city.bridgeParagraph) {
    return `${city.bridgeParagraph} Explore our ${linkLabel(
      servicePageLinks.itTelecom,
      'IT & telecom equipment recycling'
    )}, ${linkLabel(
      servicePageLinks.dataDestruction,
      'data destruction services'
    )}, and ${linkLabel(
      servicePageLinks.ewaste,
      'electronic waste recycling services'
    )} for detailed process and compliance information.`;
  }

  return `At SP Recycling, we connect businesses and households in ${city.name} with certified ${linkLabel(
    servicePageLinks.ewaste,
    'electronic waste recycling services'
  )}, secure ${linkLabel(
    servicePageLinks.dataDestruction,
    'data destruction services'
  )}, and specialized ${linkLabel(
    servicePageLinks.itTelecom,
    'IT & telecom equipment recycling'
  )} for compliant disposal and asset recovery.`;
}

export function getCityServicesBlurbHtml(city: CityData): string | undefined {
  if (city.servicesBlurbHtml) return city.servicesBlurbHtml;
  if (city.servicesBlurb) {
    return `${city.servicesBlurb} Learn more about our ${linkLabel(
      servicePageLinks.ewaste,
      'electronic waste recycling'
    )}, ${linkLabel(
      servicePageLinks.consumer,
      'consumer electronics recycling'
    )}, and ${linkLabel(
      servicePageLinks.epr,
      'EPR compliance solutions'
    )}.`;
  }
  return `Discover our ${linkLabel(
    servicePageLinks.ewaste,
    'electronic waste recycling services'
  )}, ${linkLabel(
    servicePageLinks.itTelecom,
    'IT & telecom recycling'
  )}, and ${linkLabel(
    servicePageLinks.dataDestruction,
    'data destruction services'
  )} designed for organizations and households in ${city.name}.`;
}

function inferServiceHref(item: LinkedServiceItem): string | undefined {
  const name = item.name.toLowerCase();

  if (name.includes('data')) return servicePageLinks.dataDestruction;
  if (
    name.includes('it') ||
    name.includes('telecom') ||
    name.includes('server') ||
    name.includes('infrastructure')
  ) {
    return servicePageLinks.itTelecom;
  }
  if (
    name.includes('mobile') ||
    name.includes('consumer') ||
    name.includes('residential') ||
    name.includes('gaming')
  ) {
    return servicePageLinks.consumer;
  }
  if (name.includes('epr')) return servicePageLinks.epr;
  return servicePageLinks.ewaste;
}

export function getLinkedCityServices(city: CityData): CityData['services'] {
  return {
    ...city.services,
    items: city.services.items.map((item) => {
      if (item.descriptionHtml) return item;

      const href = inferServiceHref(item);
      if (!href) return item;

      return {
        ...item,
        descriptionHtml: `${linkLabel(href, item.name)}: ${item.description}`,
      };
    }),
  };
}

export function getCityFaqs(city: CityData): CityData['faqs'] {
  return [
    ...city.faqs,
    {
      question: `Which SP Recycling service page should I check before booking a pickup in ${city.name}?`,
      answer: `Start with our electronic waste recycling services page for the full pickup workflow, then review IT & telecom recycling or data destruction if you have office assets, servers, or storage devices in ${city.name}.`,
      answerHtml: `Start with our ${linkLabel(
        servicePageLinks.ewaste,
        'electronic waste recycling services'
      )} page for the full pickup workflow, then review ${linkLabel(
        servicePageLinks.itTelecom,
        'IT & telecom recycling'
      )} or ${linkLabel(
        servicePageLinks.dataDestruction,
        'data destruction services'
      )} if you have office assets, servers, or storage devices in ${city.name}.`,
    },
    {
      question: `Do you offer secure data wiping and destruction for corporate pickups in ${city.name}?`,
      answer: `Yes. Businesses in ${city.name} can request secure data destruction for laptops, desktops, servers, hard drives, SSDs, and backup media before final recycling.`,
      answerHtml: `Yes. Businesses in ${city.name} can request secure ${linkLabel(
        servicePageLinks.dataDestruction,
        'data destruction services'
      )} for laptops, desktops, servers, hard drives, SSDs, and backup media before final recycling.`,
    },
    {
      question: `Can brands and manufacturers in ${city.name} also get EPR support from SP Recycling?`,
      answer: `Yes. If your organization in ${city.name} needs compliance support beyond pickup and recycling, we also provide EPR compliance solutions for documentation, channelization, and reporting.`,
      answerHtml: `Yes. If your organization in ${city.name} needs compliance support beyond pickup and recycling, we also provide ${linkLabel(
        servicePageLinks.epr,
        'EPR compliance solutions'
      )} for documentation, channelization, and reporting.`,
    },
  ];
}

export function getCityData(slug: string): CityData | null {
  return cityData[slug] || null;
}

export function getAllCitySlugs(): string[] {
  return Object.keys(cityData);
}

export function getAllCities(): CityData[] {
  return Object.values(cityData);
}
