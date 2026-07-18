export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  summary: string;
  link: string;
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
  whyChooseUs?: {
    title: string;
    subtitle: string;
    description: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
}

const servicesData: Record<string, ServiceData> = {
  'electronic-waste-recycle': {
    slug: 'electronic-waste-recycle',
    title: 'Electronic Waste Recycling Services',
    subtitle: 'Eco-conscious disposal for electronics. We ensure safety, compliance, and proper certification.',
    heroImage: '/services/electronic waste.jpg',
    summary: 'We handle every type of e-waste responsibly — from collection to certified recycling — ensuring zero landfill and full compliance.',
    link: '#',
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
    ],
    whyChooseUs: {
      title: 'Why Choose Our E-Waste Services',
      subtitle: 'Leading the way in responsible electronic waste management',
      description: 'We are pioneering the pathway to a landfill-free future! Our integrated e-waste management services offer a holistic approach to electronic waste, spanning from collection, transportation and ultimately, recycling. Through our robust solutions, organizations can seamlessly transition to achieve a \'zero waste to landfill\' status.',
      features: [
        {
          icon: 'check-circle',
          title: 'Certified Recycling',
          description: 'All e-waste is processed through certified facilities with full compliance documentation and audit trails.'
        },
        {
          icon: 'shield',
          title: 'Data Security',
          description: 'Complete data destruction with certified methods ensuring your sensitive information is permanently erased.'
        },
        {
          icon: 'award',
          title: 'Environmental Impact',
          description: 'Achieve zero landfill status with 95%+ material recovery rates and carbon footprint reduction.'
        },
        {
          icon: 'users',
          title: 'Expert Team',
          description: 'Certified technicians and environmental specialists with years of experience in e-waste management.'
        },
        {
          icon: 'clock',
          title: 'Convenient Pickup',
          description: 'Flexible scheduling with same-day or scheduled pickups to fit your business operations.'
        },
        {
          icon: 'leaf',
          title: 'Sustainability Reports',
          description: 'Monthly detailed reports on environmental impact, material recovery, and sustainability metrics.'
        }
      ],
      stats: [
        { number: '10,000+', label: 'Devices Recycled' },
        { number: '95%', label: 'Recovery Rate' },
        { number: '500+', label: 'Happy Clients' },
        { number: 'Zero', label: 'Landfill Waste' }
      ]
    }
  },
  'it-telecom': {
    slug: 'it-telecom',
    title: 'IT & Telecom Equipment Recycling',
    subtitle: 'Specialized recycling services for IT infrastructure and telecommunications equipment',
    heroImage: '/services/IT & Telecommunication.jpg',
    summary: 'Enterprise-grade recycling solutions for outdated IT and telecom equipment with complete audit trails and compliance documentation.',
    link: '#',
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
    scopeItems:[
      {
        icon: 'monitor',
        title: 'IT & Telecommunication Equipment',
        items: ['Desktops', 'Laptops', 'Printers', 'Scanners', 'Servers', 'Routers', 'Modems']
      },
      {
        icon: 'smartphone',
        title: 'Consumer Electronics',
        items: ['Mobile Phones', 'Tablets', 'Televisions', 'Home Theatre Systems', 'Speakers']
      },
      {
        icon: 'cpu',
        title: 'Computer Peripherals',
        items: ['Keyboards', 'Mice', 'Webcams', 'External Hard Drives', 'USB Devices']
      },
      {
        icon: 'settings',
        title: 'Electrical & Industrial Equipment',
        items: ['Motors', 'Control Panels', 'Power Tools', 'Industrial Batteries']
      },
      {
        icon: 'battery',
        title: 'Batteries & Power Equipment',
        items: ['UPS Units', 'Power Banks', 'Inverters', 'Lithium-ion Batteries']
      },
      {
        icon: 'microwave',
        title: 'Home Appliances',
        items: ['Refrigerators', 'Microwaves', 'Washing Machines', 'Air Conditioners']
      },
      {
        icon: 'server',
        title: 'Data Center Equipment',
        items: ['Blade Systems', 'Racks', 'Storage Arrays', 'Network Cables']
      },
      {
        icon: 'camera',
        title: 'Security & Surveillance Equipment',
        items: ['CCTV Cameras', 'DVR/NVR Systems', 'Access Control Devices', 'Sensors']
      },
      {
        icon: 'printer',
        title: 'Office Equipment',
        items: ['Fax Machines', 'Photocopiers', 'Projectors', 'Telephones']
      },
      {
        icon: 'chip',
        title: 'Electronic Components',
        items: ['Circuit Boards', 'Semiconductors', 'Capacitors', 'Resistors']
      }
    ]
    ,
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
    ],
    whyChooseUs: {
      title: 'Why Choose Our IT & Telecom Services',
      subtitle: 'Enterprise-grade solutions for IT infrastructure recycling',
      description: 'We specialize in handling complex IT and telecommunications equipment with enterprise-level security and compliance. Our solutions ensure secure data handling, efficient reuse, and environmentally safe disposal—supporting a sustainable and digitally connected future.',
      features: [
        {
          icon: 'shield',
          title: 'Enterprise Security',
          description: 'Bank-level data destruction with witnessed destruction and video documentation for maximum security.'
        },
        {
          icon: 'award',
          title: 'Compliance Certified',
          description: 'Full compliance with data protection regulations and industry standards for secure IT asset disposal.'
        },
        {
          icon: 'users',
          title: 'Expert Handling',
          description: 'Specialized technicians trained in enterprise IT equipment with years of experience in data center operations.'
        },
        {
          icon: 'clock',
          title: 'Minimal Downtime',
          description: 'Coordinated pickup and replacement services to ensure zero business disruption during equipment transitions.'
        },
        {
          icon: 'check-circle',
          title: 'Audit Trail',
          description: 'Complete documentation and tracking from collection to final disposition with detailed compliance reports.'
        },
        {
          icon: 'leaf',
          title: 'Sustainable Solutions',
          description: 'Maximize equipment reuse and material recovery while ensuring zero environmental impact from IT waste.'
        }
      ],
      stats: [
        { number: '15,000+', label: 'Servers Processed' },
        { number: '100%', label: 'Data Security' },
        { number: '200+', label: 'Enterprise Clients' },
        { number: 'Zero', label: 'Security Breaches' }
      ]
    }
  },
  'Sustainable-Waste-Solutions': {
    slug: 'Sustainable-Waste-Solutions',
    title: 'Sustainable Waste Solutions',
    subtitle: 'Integrated waste management for comprehensive recycling and environmental sustainability',
    heroImage: '/services/Sustainable Waste Solutions.jpg',
    summary: 'Holistic approach to waste management that combines waste collection, segregation, recycling, and disposal into one efficient system, focusing on reducing environmental impact while maximizing resource recovery.',
    link: '#',
      benefits: [
      {
        icon: 'recycle',
        title: 'Waste Segregation',
        description: 'Intelligent sorting of different waste streams for optimal recycling'
      },
      {
        icon: 'leaf',
        title: 'Resource Recovery',
        description: 'Maximizing material recovery and reducing landfill waste'
      },
      {
        icon: 'globe',
        title: 'Environmental Impact',
        description: 'Comprehensive approach to reducing carbon footprint'
      },
      {
        icon: 'users',
        title: 'Community Solutions',
        description: 'Tailored waste management programs for communities and industries'
      }
    ],
    scopeItems: [
      {
        icon: 'trash-2',
        title: 'Organic Waste',
        items: ['Food Waste', 'Garden Waste', 'Biodegradable Materials', 'Compost']
      },
      {
        icon: 'package',
        title: 'Recyclable Materials',
        items: ['Paper & Cardboard', 'Plastic Containers', 'Glass Bottles', 'Metal Cans']
      },
      {
        icon: 'battery',
        title: 'Hazardous Waste',
        items: ['Batteries', 'Electronic Waste', 'Chemicals', 'Medical Waste']
      },
      {
        icon: 'building',
        title: 'Industrial Waste',
        items: ['Manufacturing Waste', 'Construction Debris', 'Textile Waste', 'Packaging Materials']
      }
    ],
    categories: ['Office', 'Industrial', 'Retail'],
    processSteps: [
      {
        number: 1,
        title: 'Waste Collection',
        description: 'Comprehensive collection from residential, commercial, and industrial locations',
        icon: 'package-check'
      },
      {
        number: 2,
        title: 'Segregation',
        description: 'Intelligent sorting of waste streams for optimal processing',
        icon: 'git-branch'
      },
      {
        number: 3,
        title: 'Processing',
        description: 'Advanced processing techniques for different waste types',
        icon: 'settings'
      },
      {
        number: 4,
        title: 'Recycling',
        description: 'Transformation of waste into reusable materials and products',
        icon: 'refresh-cw'
      },
      {
        number: 5,
        title: 'Resource Recovery',
        description: 'Extraction of valuable materials and energy from waste streams',
        icon: 'arrow-right-circle'
      }
    ],
    hasDataSecurity: false,
    dataSecurityFeatures: [],
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&crop=center',
        alt: 'Waste collection and sorting',
        type: 'before'
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        alt: 'Waste processing facility',
        type: 'process'
      },
      {
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center',
        alt: 'Recycled materials output',
        type: 'after'
      }
    ],
    pricingType: 'table',
    pricingInfo: [
      { item: 'Organic Waste Collection', price: '₹200-500/ton' },
      { item: 'Recyclable Materials', price: '₹100-300/ton' },
      { item: 'Hazardous Waste', price: '₹500-1500/ton' },
      { item: 'Industrial Waste', price: '₹300-800/ton' }
    ],
    faqs: [
      {
        question: 'What types of waste do you handle?',
        answer: 'We handle all types of waste including organic, recyclable materials, hazardous waste, and industrial waste with specialized processing for each category.'
      },
      {
        question: 'Do you provide waste segregation services?',
        answer: 'Yes, we offer comprehensive waste segregation services to ensure optimal recycling and minimal environmental impact through intelligent sorting systems.'
      },
      {
        question: 'Can you handle large-scale industrial waste?',
        answer: 'Yes, we have the capacity and expertise to handle large-scale industrial waste management programs with customized solutions for different industries.'
      }
    ],
    caseStudies: [
      {
        client: 'Metropolitan City Corporation',
        description: 'City-wide waste management program',
        metrics: '500+ tons processed monthly, 85% recycling rate achieved'
      },
      {
        client: 'Industrial Manufacturing Hub',
        description: 'Zero-waste manufacturing initiative',
        metrics: '200+ companies served, 90% waste diversion from landfills'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our Sustainable Waste Solutions',
      subtitle: 'Comprehensive waste management for a cleaner future',
      description: 'We are pioneering the pathway to a landfill-free future! Our integrated waste management services offer a holistic approach to waste, spanning from collection, transportation and ultimately, recycling. Through our robust solutions, organizations can seamlessly transition to achieve a \'zero waste to landfill\' status.',
      features: [
        {
          icon: 'leaf',
          title: 'Zero Landfill',
          description: 'Achieve complete zero waste to landfill status with our comprehensive waste segregation and processing systems.'
        },
        {
          icon: 'award',
          title: 'Resource Recovery',
          description: 'Maximize material recovery and resource extraction from waste streams with advanced processing technologies.'
        },
        {
          icon: 'users',
          title: 'Community Impact',
          description: 'Tailored waste management programs for communities and industries with measurable environmental benefits.'
        },
        {
          icon: 'check-circle',
          title: 'Compliance Assured',
          description: 'Full compliance with environmental regulations and sustainability standards for responsible waste management.'
        },
        {
          icon: 'clock',
          title: 'Flexible Solutions',
          description: 'Customized waste management programs that adapt to your specific needs and operational requirements.'
        },
        {
          icon: 'shield',
          title: 'Environmental Impact',
          description: 'Comprehensive approach to reducing carbon footprint and environmental impact through sustainable practices.'
        }
      ],
      stats: [
        { number: '500+', label: 'Tons Processed' },
        { number: '85%', label: 'Recycling Rate' },
        { number: '200+', label: 'Companies Served' },
        { number: 'Zero', label: 'Landfill Waste' }
      ]
    }
  },
  'EPR-Compliance-Solutions': {
    slug: 'EPR-Compliance-Solutions',
    title: 'EPR Compliance Solutions',
    subtitle: 'Extended Producer Responsibility services for manufacturers and brands',
    heroImage: '/services/EPR Compliance Solutions.jpg',
    summary: 'Comprehensive EPR solutions that empower manufacturers and brands to take accountability for the entire lifecycle of their products, ensuring regulatory compliance and responsible waste management.',
    link: '/blog/the-growing-crisis-of-e-waste-and-how-responsible-recycling-can-fix-it',
    benefits: [
      {
        icon: 'file-check',
        title: 'Regulatory Compliance',
        description: 'Ensure full compliance with EPR regulations and environmental laws'
      },
      {
        icon: 'lifecycle',
        title: 'Lifecycle Management',
        description: 'Comprehensive product lifecycle tracking and management'
      },
      {
        icon: 'building',
        title: 'Brand Accountability',
        description: 'Take responsibility for product end-of-life management'
      },
      {
        icon: 'globe',
        title: 'Ecosystem Solutions',
        description: 'Create sustainable ecosystem for product waste management'
      }
    ],
    scopeItems: [
      {
        icon: 'smartphone',
        title: 'Electronics EPR',
        items: ['Mobile Phones', 'Laptops', 'Tablets', 'Consumer Electronics']
      },
      {
        icon: 'battery',
        title: 'Battery EPR',
        items: ['Lithium Batteries', 'Lead-Acid', 'Alkaline', 'Button Cells']
      },
      {
        icon: 'package',
        title: 'Packaging EPR',
        items: ['Plastic Packaging', 'Paper Packaging', 'Glass Containers', 'Metal Cans']
      },
      {
        icon: 'truck',
        title: 'Automotive EPR',
        items: ['End-of-Life Vehicles', 'Tires', 'Oil Filters', 'Auto Parts']
      }
    ],
    categories: ['Electronics', 'Packaging', 'Automotive', 'Batteries'],
    processSteps: [
      {
        number: 1,
        title: 'Compliance Assessment',
        description: 'Evaluate current EPR obligations and regulatory requirements',
        icon: 'file-check'
      },
      {
        number: 2,
        title: 'Strategy Development',
        description: 'Create comprehensive EPR strategy and implementation plan',
        icon: 'target'
      },
      {
        number: 3,
        title: 'Collection Network',
        description: 'Establish product collection and take-back systems',
        icon: 'network'
      },
      {
        number: 4,
        title: 'Processing & Recycling',
        description: 'Implement efficient recycling and material recovery processes',
        icon: 'refresh-cw'
      },
      {
        number: 5,
        title: 'Reporting & Compliance',
        description: 'Generate compliance reports and maintain regulatory records',
        icon: 'bar-chart'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center',
        alt: 'EPR compliance documentation',
        type: 'before'
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        alt: 'Product collection network',
        type: 'process'
      },
      {
        src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop&crop=center',
        alt: 'Sustainable ecosystem',
        type: 'after'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What is Extended Producer Responsibility (EPR)?',
        answer: 'EPR is a policy approach that makes manufacturers responsible for the entire lifecycle of their products, including end-of-life management, recycling, and disposal.'
      },
      {
        question: 'Which products require EPR compliance?',
        answer: 'EPR applies to electronics, batteries, packaging materials, automotive parts, and other products as defined by local regulations. We help identify your specific obligations.'
      },
      {
        question: 'How do you ensure regulatory compliance?',
        answer: 'We provide comprehensive compliance assessment, strategy development, and ongoing monitoring to ensure you meet all EPR requirements and environmental regulations.'
      },
      {
        question: 'Can you handle EPR for multiple product categories?',
        answer: 'Yes, we offer integrated EPR solutions for multiple product categories, providing a unified approach to compliance and waste management across your entire product portfolio.'
      }
    ],
    caseStudies: [
      {
        client: 'Electronics Manufacturing Company',
        description: 'Comprehensive EPR program for consumer electronics',
        metrics: '100% compliance achieved, 500+ tons processed annually'
      },
      {
        client: 'Packaging Industry Leader',
        description: 'Multi-category EPR implementation',
        metrics: '4 product categories covered, 90% recycling rate achieved'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our EPR Compliance Solutions',
      subtitle: 'Comprehensive EPR services for manufacturers and brands',
      description: 'We empower manufacturers and brands to take accountability for the entire lifecycle of their products. From design to post-consumer waste collection, our EPR services ensure regulatory compliance, efficient recycling, and responsible waste management—creating a cleaner and more sustainable ecosystem for all.',
      features: [
        {
          icon: 'file-check',
          title: 'Regulatory Compliance',
          description: 'Ensure full compliance with EPR regulations and environmental laws with expert guidance and support.'
        },
        {
          icon: 'award',
          title: 'Lifecycle Management',
          description: 'Comprehensive product lifecycle tracking and management from design to end-of-life disposal.'
        },
        {
          icon: 'users',
          title: 'Brand Accountability',
          description: 'Take responsibility for product end-of-life management with complete brand accountability solutions.'
        },
        {
          icon: 'check-circle',
          title: 'Ecosystem Solutions',
          description: 'Create sustainable ecosystem for product waste management with integrated solutions across categories.'
        },
        {
          icon: 'clock',
          title: 'Expert Support',
          description: 'Dedicated EPR specialists providing ongoing support and guidance for compliance and implementation.'
        },
        {
          icon: 'leaf',
          title: 'Sustainable Impact',
          description: 'Achieve measurable environmental impact with detailed reporting and sustainability metrics.'
        }
      ],
      stats: [
        { number: '100%', label: 'Compliance Rate' },
        { number: '500+', label: 'Tons Processed' },
        { number: '4+', label: 'Categories Covered' },
        { number: '90%', label: 'Recycling Rate' }
      ]
    }
  },
  'consumer-electronics': {
    slug: 'consumer-electronics',
    title: 'Consumer Electronics Recycling',
    subtitle: 'Recycling services for home electronics, appliances, and personal devices',
    heroImage: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    summary: 'Convenient and responsible recycling for everyday electronics from homes and small businesses, making it easy to dispose of old devices sustainably.',
    link: '#',
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
    link: '#',
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
