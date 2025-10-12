export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  summary: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  scopeItems: Array<{
    icon: string;
    title: string;
    items: string[];
  }>;
  categories: string[];
  processSteps: Array<{
    number: number;
    title: string;
    description: string;
    icon: string;
  }>;
  hasDataSecurity: boolean;
  dataSecurityFeatures?: Array<{
    title: string;
    description: string;
  }>;
  galleryImages: Array<{
    src: string;
    alt: string;
    type: 'before' | 'after' | 'process';
  }>;
  pricingType: 'table' | 'quote';
  pricingInfo?: Array<{
    item: string;
    price: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  caseStudies: Array<{
    client: string;
    description: string;
    metrics: string;
  }>;
}

const servicesData: Record<string, ServiceData> = {
  'electronic-waste-recycle': {
    slug: 'electronic-waste-recycle',
    title: 'Electronic Waste Recycling Services',
    subtitle: 'Eco-friendly recycling for all types of electronic waste — safe, certified, and compliant.',
    heroImage: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
    summary: 'We handle every type of e-waste responsibly — from collection to certified recycling — ensuring zero landfill and full compliance.',
    benefits: [
      {
        icon: 'leaf',
        title: 'Environmentally Responsible',
        description: 'Zero landfill commitment with eco-friendly processes'
      },
      {
        icon: 'shield-check',
        title: 'Certified & Compliant',
        description: 'CPCB authorized and ISO 14001 certified'
      },
      {
        icon: 'eye',
        title: 'Transparent Process',
        description: 'Full visibility from pickup to recycling'
      },
      {
        icon: 'clock',
        title: 'Quick Turnaround',
        description: 'Efficient collection and processing timelines'
      }
    ],
    scopeItems: [
      {
        icon: 'laptop',
        title: 'Computing Devices',
        items: ['Laptops', 'Desktops', 'Servers', 'Workstations']
      },
      {
        icon: 'printer',
        title: 'Office Equipment',
        items: ['Printers', 'Monitors', 'UPS Units', 'Scanners']
      },
      {
        icon: 'cable',
        title: 'Accessories',
        items: ['Cables', 'Keyboards', 'Mice', 'Adapters']
      },
      {
        icon: 'router',
        title: 'Network Equipment',
        items: ['Routers', 'Modems', 'CCTV Equipment', 'Switches']
      }
    ],
    categories: ['Residential', 'Corporate', 'On-site'],
    processSteps: [
      {
        number: 1,
        title: 'Collection',
        description: 'Scheduled pickup or convenient drop-off at our facility',
        icon: 'truck'
      },
      {
        number: 2,
        title: 'Sorting & Dismantling',
        description: 'Material separation and hazard isolation by trained technicians',
        icon: 'package-open'
      },
      {
        number: 3,
        title: 'Data Handling',
        description: 'Secure erasure or physical destruction of storage drives',
        icon: 'shield'
      },
      {
        number: 4,
        title: 'Recycling & Recovery',
        description: 'Metals, plastics, and components recovered through certified processes',
        icon: 'recycle'
      },
      {
        number: 5,
        title: 'Certification & Reporting',
        description: 'Proof of responsible recycling with compliance certificates',
        icon: 'file-check'
      }
    ],
    hasDataSecurity: true,
    dataSecurityFeatures: [
      {
        title: 'DoD-Standard Data Wiping',
        description: 'Military-grade data erasure following DoD 5220.22-M standards'
      },
      {
        title: 'Physical Destruction',
        description: 'Hard drive shredding and degaussing for complete data elimination'
      },
      {
        title: 'Certificate of Destruction',
        description: 'Official documentation proving secure data destruction'
      }
    ],
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/7512827/pexels-photo-7512827.jpeg',
        alt: 'Electronic waste collection',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
        alt: 'E-waste processing facility',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        alt: 'Recycled materials',
        type: 'after'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What types of electronic waste do you accept?',
        answer: 'We accept all types of electronic waste including computers, laptops, monitors, printers, servers, networking equipment, mobile devices, and their accessories.'
      },
      {
        question: 'Do you provide pickup services?',
        answer: 'Yes, we offer scheduled pickup services for both residential and commercial clients. For large volumes, we provide on-site collection services.'
      },
      {
        question: 'How do you ensure data security?',
        answer: 'We use DoD-standard data wiping software and physical destruction methods. All clients receive a certificate of data destruction for their records.'
      },
      {
        question: 'What certifications do you hold?',
        answer: 'We are CPCB authorized recyclers with ISO 14001 environmental management certification and follow all government e-waste management rules.'
      }
    ],
    caseStudies: [
      {
        client: 'Tech Solutions Corp',
        description: 'Complete IT asset disposal for office relocation',
        metrics: 'Recycled 2,000+ units, 100% data destruction'
      },
      {
        client: 'Green Valley University',
        description: 'Annual e-waste collection drive',
        metrics: '5,000 kg processed, zero landfill'
      }
    ]
  },
  'it-telecom': {
    slug: 'it-telecom',
    title: 'IT & Telecom Equipment Recycling',
    subtitle: 'Specialized recycling services for IT infrastructure and telecommunications equipment',
    heroImage: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
    summary: 'Enterprise-grade recycling solutions for outdated IT and telecom equipment with complete audit trails and compliance documentation.',
    benefits: [
      {
        icon: 'server',
        title: 'Enterprise Solutions',
        description: 'Tailored for corporate IT infrastructure'
      },
      {
        icon: 'file-text',
        title: 'Complete Documentation',
        description: 'Detailed asset tracking and certificates'
      },
      {
        icon: 'lock',
        title: 'Data Security First',
        description: 'Bank-grade data destruction protocols'
      },
      {
        icon: 'truck',
        title: 'Logistics Support',
        description: 'Nationwide pickup and on-site services'
      }
    ],
    scopeItems: [
      {
        icon: 'server',
        title: 'Data Center Equipment',
        items: ['Servers', 'Storage Arrays', 'Blade Systems', 'Racks']
      },
      {
        icon: 'network',
        title: 'Network Infrastructure',
        items: ['Routers', 'Switches', 'Firewalls', 'Load Balancers']
      },
      {
        icon: 'phone',
        title: 'Telecom Equipment',
        items: ['PBX Systems', 'IP Phones', 'Modems', 'Base Stations']
      },
      {
        icon: 'hard-drive',
        title: 'Storage Devices',
        items: ['Hard Drives', 'SSDs', 'Tape Drives', 'NAS Units']
      }
    ],
    categories: ['Enterprise', 'Data Centers', 'Telecom Providers'],
    processSteps: [
      {
        number: 1,
        title: 'Asset Inventory',
        description: 'Complete cataloging of all equipment with serial numbers',
        icon: 'clipboard-list'
      },
      {
        number: 2,
        title: 'Secure Transportation',
        description: 'GPS-tracked vehicles with chain-of-custody documentation',
        icon: 'truck'
      },
      {
        number: 3,
        title: 'Data Sanitization',
        description: 'Multi-pass overwrite and physical destruction options',
        icon: 'shield-check'
      },
      {
        number: 4,
        title: 'Component Recovery',
        description: 'Precious metal and material extraction',
        icon: 'cpu'
      },
      {
        number: 5,
        title: 'Compliance Reporting',
        description: 'Detailed reports with weight slips and certificates',
        icon: 'file-check-2'
      }
    ],
    hasDataSecurity: true,
    dataSecurityFeatures: [
      {
        title: 'On-Site Data Destruction',
        description: 'Witness the destruction process at your location'
      },
      {
        title: 'Video Documentation',
        description: 'Recorded evidence of complete data elimination'
      },
      {
        title: 'Compliance Certificates',
        description: 'Legal documentation for audit requirements'
      }
    ],
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
        alt: 'Server equipment',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/2582935/pexels-photo-2582935.jpeg',
        alt: 'Network equipment processing',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg',
        alt: 'Recycled components',
        type: 'after'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'Can you handle large-scale data center decommissioning?',
        answer: 'Yes, we specialize in complete data center decommissioning projects with project management, logistics, and on-site support.'
      },
      {
        question: 'What data destruction methods do you use?',
        answer: 'We offer software-based wiping (DoD/NIST standards), degaussing, and physical shredding. Methods can be customized based on your security requirements.'
      },
      {
        question: 'Do you provide asset tracking?',
        answer: 'Yes, every item is tagged and tracked from pickup to final disposition with real-time updates and detailed reporting.'
      }
    ],
    caseStudies: [
      {
        client: 'National Bank Network',
        description: 'Data center migration and equipment disposal',
        metrics: '500+ servers, 100% data security compliance'
      },
      {
        client: 'Telecom Infrastructure Ltd',
        description: 'Network upgrade equipment recycling',
        metrics: '15 tons processed, full audit trail provided'
      }
    ]
  },
  'printer-recycle': {
    slug: 'printer-recycle',
    title: 'Printer & Imaging Equipment Recycling',
    subtitle: 'Responsible recycling of printers, copiers, scanners, and imaging equipment',
    heroImage: 'https://images.pexels.com/photos/4226890/pexels-photo-4226890.jpeg',
    summary: 'Specialized handling of printers and imaging equipment with proper disposal of toner cartridges and secure data removal from network-enabled devices.',
    benefits: [
      {
        icon: 'printer',
        title: 'All Printer Types',
        description: 'Inkjet, laser, multifunction, and industrial printers'
      },
      {
        icon: 'droplet',
        title: 'Toner Management',
        description: 'Safe disposal of cartridges and toner waste'
      },
      {
        icon: 'wifi-off',
        title: 'Memory Clearing',
        description: 'Complete data removal from network printers'
      },
      {
        icon: 'building',
        title: 'Bulk Services',
        description: 'Office-wide and fleet recycling programs'
      }
    ],
    scopeItems: [
      {
        icon: 'printer',
        title: 'Printers',
        items: ['Laser Printers', 'Inkjet Printers', 'Dot Matrix', '3D Printers']
      },
      {
        icon: 'copy',
        title: 'Multifunction Devices',
        items: ['All-in-One Units', 'Copiers', 'Fax Machines', 'Scanners']
      },
      {
        icon: 'image',
        title: 'Imaging Equipment',
        items: ['Plotters', 'Photo Printers', 'Label Printers', 'Barcode Scanners']
      },
      {
        icon: 'package',
        title: 'Consumables',
        items: ['Toner Cartridges', 'Ink Cartridges', 'Drums', 'Fusers']
      }
    ],
    categories: ['Office', 'Industrial', 'Retail'],
    processSteps: [
      {
        number: 1,
        title: 'Collection',
        description: 'Pickup from your location with proper handling',
        icon: 'package-check'
      },
      {
        number: 2,
        title: 'Memory Wiping',
        description: 'Secure deletion of stored documents and network data',
        icon: 'database'
      },
      {
        number: 3,
        title: 'Component Separation',
        description: 'Segregation of plastics, metals, and electronic parts',
        icon: 'git-branch'
      },
      {
        number: 4,
        title: 'Toner Disposal',
        description: 'Safe handling of toner powder and cartridges',
        icon: 'trash-2'
      },
      {
        number: 5,
        title: 'Material Recovery',
        description: 'Recycling of reusable components and materials',
        icon: 'arrow-right-circle'
      }
    ],
    hasDataSecurity: true,
    dataSecurityFeatures: [
      {
        title: 'Hard Drive Removal',
        description: 'Physical removal and destruction of internal storage'
      },
      {
        title: 'Memory Clearing',
        description: 'Deletion of cached documents and print jobs'
      },
      {
        title: 'Network Data Wipe',
        description: 'Clearing of stored credentials and network settings'
      }
    ],
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
        alt: 'Old printers collection',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/7512827/pexels-photo-7512827.jpeg',
        alt: 'Printer dismantling',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        alt: 'Component separation',
        type: 'after'
      }
    ],
    pricingType: 'table',
    pricingInfo: [
      { item: 'Desktop Printers', price: '₹50-150/unit' },
      { item: 'Large Format Printers', price: '₹500-2000/unit' },
      { item: 'Multifunction Copiers', price: '₹300-1500/unit' },
      { item: 'Toner Cartridges', price: '₹10-30/piece' }
    ],
    faqs: [
      {
        question: 'Do you accept toner and ink cartridges?',
        answer: 'Yes, we accept all types of toner and ink cartridges. We have specialized processes for safe disposal of toner powder.'
      },
      {
        question: 'What about printers with internal storage?',
        answer: 'All printers with internal storage or hard drives undergo complete data sanitization before recycling. We remove and destroy all storage media.'
      },
      {
        question: 'Can you handle large copier machines?',
        answer: 'Yes, we have the equipment and expertise to handle large industrial copiers and multifunction devices, including on-site dismantling if needed.'
      }
    ],
    caseStudies: [
      {
        client: 'Corporate Print Services',
        description: 'Fleet replacement program',
        metrics: '300+ units recycled, all data sanitized'
      },
      {
        client: 'Retail Chain Network',
        description: 'Store equipment upgrade',
        metrics: '150 locations serviced, zero downtime'
      }
    ]
  },
  'battery-recycle': {
    slug: 'battery-recycle',
    title: 'Battery Recycling Services',
    subtitle: 'Safe and compliant recycling of all battery types with specialized hazmat handling',
    heroImage: 'https://images.pexels.com/photos/9800098/pexels-photo-9800098.jpeg',
    summary: 'Expert handling of all battery types from consumer to industrial scale, ensuring safe disposal of hazardous materials and maximum material recovery.',
    benefits: [
      {
        icon: 'battery',
        title: 'All Battery Types',
        description: 'Li-ion, lead-acid, alkaline, and more'
      },
      {
        icon: 'shield-alert',
        title: 'Hazmat Certified',
        description: 'Licensed for hazardous material handling'
      },
      {
        icon: 'recycle',
        title: 'Material Recovery',
        description: 'Extract valuable metals and materials'
      },
      {
        icon: 'check-circle',
        title: 'Full Compliance',
        description: 'Meet all environmental regulations'
      }
    ],
    scopeItems: [
      {
        icon: 'battery-charging',
        title: 'Rechargeable Batteries',
        items: ['Li-ion', 'Li-polymer', 'NiMH', 'NiCd']
      },
      {
        icon: 'battery',
        title: 'Primary Batteries',
        items: ['Alkaline', 'Zinc-Carbon', 'Lithium', 'Button Cells']
      },
      {
        icon: 'car',
        title: 'Vehicle Batteries',
        items: ['Lead-Acid', 'Car Batteries', 'UPS Batteries', 'Inverter Batteries']
      },
      {
        icon: 'zap',
        title: 'Industrial Batteries',
        items: ['Forklift Batteries', 'Telecom Batteries', 'Solar Batteries', 'Marine Batteries']
      }
    ],
    categories: ['Consumer', 'Automotive', 'Industrial', 'Renewable Energy'],
    processSteps: [
      {
        number: 1,
        title: 'Safe Collection',
        description: 'Hazmat-compliant collection with proper containers',
        icon: 'shield-check'
      },
      {
        number: 2,
        title: 'Sorting & Testing',
        description: 'Classification by chemistry and condition',
        icon: 'list-filter'
      },
      {
        number: 3,
        title: 'Discharge & Neutralization',
        description: 'Safe discharge of remaining energy',
        icon: 'zap-off'
      },
      {
        number: 4,
        title: 'Material Extraction',
        description: 'Recovery of lithium, cobalt, lead, and other metals',
        icon: 'gem'
      },
      {
        number: 5,
        title: 'Certified Disposal',
        description: 'Proper disposal of non-recyclable components',
        icon: 'check-square'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/9800098/pexels-photo-9800098.jpeg',
        alt: 'Battery collection',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/7512827/pexels-photo-7512827.jpeg',
        alt: 'Battery sorting facility',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        alt: 'Recovered materials',
        type: 'after'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What types of batteries do you accept?',
        answer: 'We accept all types of batteries including alkaline, lithium-ion, lead-acid, NiMH, NiCd, button cells, and industrial battery packs.'
      },
      {
        question: 'How are hazardous materials handled?',
        answer: 'We follow strict hazmat protocols with certified facilities and trained personnel. All toxic materials are neutralized or disposed of according to environmental regulations.'
      },
      {
        question: 'Do you issue compliance certificates?',
        answer: 'Yes, we provide certificates of recycling that document the weight, type, and proper disposal of all battery materials for your compliance records.'
      },
      {
        question: 'Can damaged or swollen batteries be recycled?',
        answer: 'Yes, we have specialized procedures for damaged batteries. They require special handling and must be transported in UN-approved containers.'
      }
    ],
    caseStudies: [
      {
        client: 'Electric Vehicle Manufacturer',
        description: 'EV battery pack recycling program',
        metrics: '50+ packs processed, 95% material recovery'
      },
      {
        client: 'Telecom Tower Company',
        description: 'Annual battery replacement cycle',
        metrics: '2,000+ lead-acid batteries, full compliance'
      }
    ]
  },
  'consumer-electronics': {
    slug: 'consumer-electronics',
    title: 'Consumer Electronics Recycling',
    subtitle: 'Recycling services for home electronics, appliances, and personal devices',
    heroImage: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    summary: 'Convenient and responsible recycling for everyday electronics from homes and small businesses, making it easy to dispose of old devices sustainably.',
    benefits: [
      {
        icon: 'smartphone',
        title: 'Wide Acceptance',
        description: 'All consumer electronics welcome'
      },
      {
        icon: 'home',
        title: 'Convenient Dropoff',
        description: 'Multiple collection points'
      },
      {
        icon: 'coins',
        title: 'Value Recovery',
        description: 'Get paid for valuable items'
      },
      {
        icon: 'heart',
        title: 'Community Impact',
        description: 'Support local recycling initiatives'
      }
    ],
    scopeItems: [
      {
        icon: 'smartphone',
        title: 'Mobile Devices',
        items: ['Smartphones', 'Tablets', 'Smartwatches', 'E-readers']
      },
      {
        icon: 'tv',
        title: 'Home Entertainment',
        items: ['TVs', 'DVD Players', 'Gaming Consoles', 'Set-top Boxes']
      },
      {
        icon: 'microwave',
        title: 'Small Appliances',
        items: ['Microwaves', 'Coffee Makers', 'Toasters', 'Blenders']
      },
      {
        icon: 'headphones',
        title: 'Personal Electronics',
        items: ['Headphones', 'Speakers', 'Cameras', 'Chargers']
      }
    ],
    categories: ['Residential', 'Small Business', 'Community Events'],
    processSteps: [
      {
        number: 1,
        title: 'Drop-off or Pickup',
        description: 'Bring items to our center or schedule home pickup',
        icon: 'map-pin'
      },
      {
        number: 2,
        title: 'Assessment',
        description: 'Evaluation for reuse, refurbishment, or recycling',
        icon: 'search'
      },
      {
        number: 3,
        title: 'Data Clearing',
        description: 'Factory reset and data wiping for smart devices',
        icon: 'smartphone'
      },
      {
        number: 4,
        title: 'Processing',
        description: 'Dismantling and material separation',
        icon: 'settings'
      },
      {
        number: 5,
        title: 'Recycling',
        description: 'Materials sent to certified recycling facilities',
        icon: 'repeat'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
        alt: 'Consumer electronics',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
        alt: 'Electronics sorting',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        alt: 'Recycled components',
        type: 'after'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'Do you accept broken electronics?',
        answer: 'Yes, we accept electronics in any condition. Even broken items contain valuable materials that can be recycled.'
      },
      {
        question: 'Can I get money for my old devices?',
        answer: 'Depending on the condition and model, some devices may have resale value. We offer buyback options for functional items.'
      },
      {
        question: 'What should I do before dropping off my phone?',
        answer: 'Please back up your data and perform a factory reset if possible. We will also perform data wiping as part of our process.'
      },
      {
        question: 'Do you organize community collection drives?',
        answer: 'Yes, we partner with communities, schools, and organizations for e-waste collection events. Contact us to schedule one.'
      }
    ],
    caseStudies: [
      {
        client: 'Green Valley Apartments',
        description: 'Resident e-waste collection drive',
        metrics: '1,500 kg collected, 200+ households participated'
      },
      {
        client: 'Local School District',
        description: 'Student electronics recycling program',
        metrics: '500+ devices, educational workshops conducted'
      }
    ]
  },
  'data-destruction': {
    slug: 'data-destruction',
    title: 'Certified Data Destruction Services',
    subtitle: 'Professional data destruction services ensuring complete information security',
    heroImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    summary: 'Military-grade data destruction for businesses and individuals who need absolute assurance that sensitive information is permanently eliminated.',
    benefits: [
      {
        icon: 'shield',
        title: 'Bank-Grade Security',
        description: 'Military and government-approved methods'
      },
      {
        icon: 'file-check',
        title: 'Legal Compliance',
        description: 'Meet GDPR, HIPAA, and local regulations'
      },
      {
        icon: 'video',
        title: 'Witnessed Destruction',
        description: 'On-site service with video proof'
      },
      {
        icon: 'award',
        title: 'Certified Results',
        description: 'Official certificates for each drive'
      }
    ],
    scopeItems: [
      {
        icon: 'hard-drive',
        title: 'Storage Media',
        items: ['Hard Drives', 'SSDs', 'USB Drives', 'Memory Cards']
      },
      {
        icon: 'disc',
        title: 'Optical Media',
        items: ['CDs', 'DVDs', 'Blu-ray Discs', 'Backup Tapes']
      },
      {
        icon: 'smartphone',
        title: 'Mobile Devices',
        items: ['Smartphones', 'Tablets', 'Laptops', 'Smartwatches']
      },
      {
        icon: 'database',
        title: 'Enterprise Storage',
        items: ['SAN Arrays', 'NAS Units', 'RAID Systems', 'Tape Libraries']
      }
    ],
    categories: ['On-Site', 'Off-Site', 'Witnessed', 'Emergency'],
    processSteps: [
      {
        number: 1,
        title: 'Device Collection',
        description: 'Secure chain-of-custody from your location',
        icon: 'lock'
      },
      {
        number: 2,
        title: 'Media Identification',
        description: 'Cataloging with serial numbers and asset tags',
        icon: 'scan'
      },
      {
        number: 3,
        title: 'Data Wiping',
        description: 'DoD/NIST standard multi-pass overwrite',
        icon: 'file-x'
      },
      {
        number: 4,
        title: 'Physical Destruction',
        description: 'Industrial shredding to 6mm particles',
        icon: 'hammer'
      },
      {
        number: 5,
        title: 'Documentation',
        description: 'Certificate with serial numbers and photos',
        icon: 'file-text'
      }
    ],
    hasDataSecurity: true,
    dataSecurityFeatures: [
      {
        title: 'DoD 5220.22-M Wiping',
        description: '7-pass overwrite method certified by US Department of Defense'
      },
      {
        title: 'NIST 800-88 Compliance',
        description: 'Following National Institute of Standards guidelines'
      },
      {
        title: 'Physical Shredding',
        description: 'Industrial shredders reducing drives to 6mm particles'
      },
      {
        title: 'Degaussing',
        description: 'Magnetic field erasure for HDDs and tapes'
      }
    ],
    galleryImages: [
      {
        src: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
        alt: 'Data storage devices',
        type: 'before'
      },
      {
        src: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
        alt: 'Shredding process',
        type: 'process'
      },
      {
        src: 'https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg',
        alt: 'Destroyed media',
        type: 'after'
      }
    ],
    pricingType: 'table',
    pricingInfo: [
      { item: 'Hard Drive (Standard)', price: '₹150-300/unit' },
      { item: 'SSD', price: '₹200-400/unit' },
      { item: 'On-Site Witnessed (min 50 units)', price: '₹250/unit' },
      { item: 'Emergency Service (24hrs)', price: '₹500/unit' }
    ],
    faqs: [
      {
        question: 'What data destruction standards do you follow?',
        answer: 'We follow DoD 5220.22-M, NIST 800-88, and BSI guidelines. Our methods are certified and accepted by government agencies and financial institutions.'
      },
      {
        question: 'Can I witness the destruction process?',
        answer: 'Yes, we offer on-site witnessed destruction services where you can observe the entire process. We also provide video documentation.'
      },
      {
        question: 'What is the difference between data wiping and physical destruction?',
        answer: 'Data wiping overwrites data multiple times making it unrecoverable through software. Physical destruction mechanically destroys the media. We recommend both for maximum security.'
      },
      {
        question: 'Do you provide certificates of destruction?',
        answer: 'Yes, we provide detailed certificates listing all destroyed media with serial numbers, destruction method used, date, and technician signature.'
      }
    ],
    caseStudies: [
      {
        client: 'Financial Services Group',
        description: 'Quarterly drive destruction program',
        metrics: '5,000+ drives destroyed, on-site witnessed'
      },
      {
        client: 'Healthcare Provider',
        description: 'HIPAA-compliant media destruction',
        metrics: '1,200 units, full audit trail provided'
      }
    ]
  }
};

export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null;
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}
