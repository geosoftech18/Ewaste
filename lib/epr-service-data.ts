export interface EPRServiceData {
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
      value: string;
      label: string;
    }>;
  };
}

export const eprServiceData: Record<string, EPRServiceData> = {
  'electronics-epr': {
    slug: 'electronics-epr',
    title: 'Electronics EPR Compliance',
    subtitle: 'Comprehensive EPR compliance solutions for electronic products ensuring regulatory adherence and environmental responsibility.',
    heroImage: '/services/epr-compliance-solutions.jpg',
    summary: 'Our Electronics EPR services help manufacturers, importers, and brand owners comply with Extended Producer Responsibility regulations for electronic products.',
    benefits: [
      {
        icon: 'Shield',
        title: 'Regulatory Compliance',
        description: 'Ensure full compliance with EPR regulations for electronic products'
      },
      {
        icon: 'Leaf',
        title: 'Environmental Impact',
        description: 'Reduce environmental footprint through proper e-waste management'
      },
      {
        icon: 'FileText',
        title: 'Documentation',
        description: 'Complete documentation and reporting for regulatory authorities'
      },
      {
        icon: 'TrendingUp',
        title: 'Cost Optimization',
        description: 'Optimize compliance costs while meeting regulatory requirements'
      }
    ],
    scopeItems: [
      {
        icon: 'Cpu',
        title: 'IT Equipment',
        items: ['Computers', 'Servers', 'Laptops', 'Tablets', 'Printers', 'Networking Equipment']
      },
      {
        icon: 'Smartphone',
        title: 'Consumer Electronics',
        items: ['Mobile Phones', 'Televisions', 'Audio Equipment', 'Gaming Consoles', 'Cameras']
      },
      {
        icon: 'Monitor',
        title: 'Office Equipment',
        items: ['Monitors', 'Projectors', 'Scanners', 'Fax Machines', 'Copiers']
      }
    ],
    categories: ['IT Equipment', 'Consumer Electronics', 'Office Equipment'],
    processSteps: [
      {
        number: 1,
        title: 'Assessment',
        description: 'Evaluate your electronic products and determine EPR obligations',
        icon: 'Search'
      },
      {
        number: 2,
        title: 'Registration',
        description: 'Register with relevant authorities and obtain necessary licenses',
        icon: 'FileText'
      },
      {
        number: 3,
        title: 'Collection Setup',
        description: 'Establish collection mechanisms for end-of-life products',
        icon: 'Truck'
      },
      {
        number: 4,
        title: 'Processing',
        description: 'Process collected electronics through certified recycling facilities',
        icon: 'Recycle'
      },
      {
        number: 5,
        title: 'Reporting',
        description: 'Submit periodic reports to regulatory authorities',
        icon: 'BarChart'
      }
    ],
    hasDataSecurity: true,
    dataSecurityFeatures: [
      {
        title: 'Data Destruction',
        description: 'Secure data wiping and destruction of storage devices'
      },
      {
        title: 'Certification',
        description: 'Certified data destruction certificates for compliance'
      }
    ],
    galleryImages: [
      {
        src: '/services/electronic-waste.jpg',
        alt: 'Electronics EPR Processing',
        type: 'process'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What is Electronics EPR?',
        answer: 'Electronics EPR (Extended Producer Responsibility) is a policy approach where producers are responsible for the entire lifecycle of their electronic products, including end-of-life management.'
      },
      {
        question: 'Who needs Electronics EPR compliance?',
        answer: 'Manufacturers, importers, and brand owners of electronic products are required to comply with EPR regulations in India.'
      },
      {
        question: 'What are the penalties for non-compliance?',
        answer: 'Non-compliance can result in penalties, fines, and potential suspension of business operations. It\'s crucial to maintain proper EPR compliance.'
      }
    ],
    caseStudies: [
      {
        client: 'TechCorp India',
        description: 'Successfully implemented Electronics EPR compliance for their IT equipment range',
        metrics: '100% compliance rate, 50% cost reduction'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our Electronics EPR Services?',
      subtitle: 'Expert compliance solutions for electronic products',
      description: 'We provide comprehensive EPR compliance services tailored to your electronic products, ensuring regulatory adherence and environmental responsibility.',
      features: [
        {
          icon: 'CheckCircle',
          title: 'Expert Knowledge',
          description: 'Deep understanding of EPR regulations for electronic products'
        },
        {
          icon: 'Clock',
          title: 'Timely Compliance',
          description: 'Ensure timely submission of reports and documentation'
        },
        {
          icon: 'Shield',
          title: 'Risk Mitigation',
          description: 'Minimize compliance risks and regulatory penalties'
        }
      ],
      stats: [
        { value: '500+', label: 'Products Compliant' },
        { value: '100%', label: 'Success Rate' },
        { value: '24/7', label: 'Support Available' }
      ]
    }
  },
  'battery-epr': {
    slug: 'battery-epr',
    title: 'Battery EPR Compliance',
    subtitle: 'Complete EPR compliance solutions for batteries ensuring proper disposal and environmental protection.',
    heroImage: '/services/epr-compliance-solutions.jpg',
    summary: 'Our Battery EPR services help manufacturers and importers comply with Extended Producer Responsibility regulations for various types of batteries.',
    benefits: [
      {
        icon: 'Battery',
        title: 'Battery Management',
        description: 'Comprehensive battery lifecycle management and disposal'
      },
      {
        icon: 'Leaf',
        title: 'Environmental Safety',
        description: 'Safe disposal preventing environmental contamination'
      },
      {
        icon: 'FileText',
        title: 'Compliance Documentation',
        description: 'Complete documentation for regulatory compliance'
      },
      {
        icon: 'Recycle',
        title: 'Resource Recovery',
        description: 'Recovery of valuable materials from used batteries'
      }
    ],
    scopeItems: [
      {
        icon: 'Battery',
        title: 'Lithium-ion Batteries',
        items: ['Mobile Phone Batteries', 'Laptop Batteries', 'Power Banks', 'EV Batteries']
      },
      {
        icon: 'Zap',
        title: 'Lead-acid Batteries',
        items: ['Car Batteries', 'UPS Batteries', 'Industrial Batteries', 'Marine Batteries']
      },
      {
        icon: 'Circle',
        title: 'Dry Cell Batteries',
        items: ['AA Batteries', 'AAA Batteries', 'Button Cells', 'Alkaline Batteries']
      }
    ],
    categories: ['Lithium-ion', 'Lead-acid', 'Dry Cell'],
    processSteps: [
      {
        number: 1,
        title: 'Battery Assessment',
        description: 'Evaluate battery types and determine EPR obligations',
        icon: 'Search'
      },
      {
        number: 2,
        title: 'Collection Network',
        description: 'Establish battery collection points and networks',
        icon: 'MapPin'
      },
      {
        number: 3,
        title: 'Safe Transport',
        description: 'Transport batteries safely to processing facilities',
        icon: 'Truck'
      },
      {
        number: 4,
        title: 'Processing',
        description: 'Process batteries through certified recycling facilities',
        icon: 'Recycle'
      },
      {
        number: 5,
        title: 'Material Recovery',
        description: 'Recover valuable materials from processed batteries',
        icon: 'Package'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: '/services/electronic-waste.jpg',
        alt: 'Battery EPR Processing',
        type: 'process'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What types of batteries are covered under EPR?',
        answer: 'EPR covers lithium-ion, lead-acid, and dry cell batteries used in various electronic devices and vehicles.'
      },
      {
        question: 'How do we ensure safe battery disposal?',
        answer: 'We use certified recycling facilities with proper safety protocols to handle different types of batteries safely.'
      },
      {
        question: 'What materials can be recovered from batteries?',
        answer: 'Valuable materials like lithium, cobalt, nickel, and lead can be recovered and reused in new battery production.'
      }
    ],
    caseStudies: [
      {
        client: 'AutoCorp India',
        description: 'Implemented Battery EPR compliance for their automotive battery range',
        metrics: '95% collection rate, 80% material recovery'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our Battery EPR Services?',
      subtitle: 'Specialized battery compliance solutions',
      description: 'We specialize in battery EPR compliance with expertise in handling different battery types safely and efficiently.',
      features: [
        {
          icon: 'Shield',
          title: 'Safety First',
          description: 'Priority on safe handling and disposal of hazardous battery materials'
        },
        {
          icon: 'Recycle',
          title: 'Material Recovery',
          description: 'Maximum recovery of valuable materials from used batteries'
        },
        {
          icon: 'TrendingUp',
          title: 'Cost Effective',
          description: 'Optimize compliance costs while meeting regulatory requirements'
        }
      ],
      stats: [
        { value: '10,000+', label: 'Batteries Processed' },
        { value: '95%', label: 'Collection Rate' },
        { value: '80%', label: 'Material Recovery' }
      ]
    }
  },
  'packaging-epr': {
    slug: 'packaging-epr',
    title: 'Packaging EPR Compliance',
    subtitle: 'Comprehensive EPR compliance solutions for packaging materials ensuring sustainable waste management.',
    heroImage: '/services/epr-compliance-solutions.jpg',
    summary: 'Our Packaging EPR services help manufacturers and brand owners comply with Extended Producer Responsibility regulations for packaging materials.',
    benefits: [
      {
        icon: 'Package',
        title: 'Packaging Management',
        description: 'Complete lifecycle management of packaging materials'
      },
      {
        icon: 'Leaf',
        title: 'Sustainability',
        description: 'Promote sustainable packaging practices and circular economy'
      },
      {
        icon: 'FileText',
        title: 'Compliance Reporting',
        description: 'Comprehensive reporting for regulatory compliance'
      },
      {
        icon: 'Recycle',
        title: 'Waste Reduction',
        description: 'Reduce packaging waste through efficient collection and processing'
      }
    ],
    scopeItems: [
      {
        icon: 'Box',
        title: 'Primary Packaging',
        items: ['Product Containers', 'Bottles', 'Cans', 'Tubes', 'Pouches']
      },
      {
        icon: 'Package',
        title: 'Secondary Packaging',
        items: ['Cartons', 'Boxes', 'Wrappers', 'Labels', 'Tags']
      },
      {
        icon: 'Truck',
        title: 'Tertiary Packaging',
        items: ['Shipping Boxes', 'Pallets', 'Stretch Wrap', 'Protective Materials']
      }
    ],
    categories: ['Primary', 'Secondary', 'Tertiary'],
    processSteps: [
      {
        number: 1,
        title: 'Packaging Audit',
        description: 'Audit packaging materials and determine EPR obligations',
        icon: 'Search'
      },
      {
        number: 2,
        title: 'Collection System',
        description: 'Establish packaging collection and sorting systems',
        icon: 'MapPin'
      },
      {
        number: 3,
        title: 'Sorting',
        description: 'Sort packaging materials by type and recyclability',
        icon: 'Filter'
      },
      {
        number: 4,
        title: 'Processing',
        description: 'Process packaging materials through recycling facilities',
        icon: 'Recycle'
      },
      {
        number: 5,
        title: 'Reporting',
        description: 'Submit compliance reports to regulatory authorities',
        icon: 'BarChart'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: '/services/electronic-waste.jpg',
        alt: 'Packaging EPR Processing',
        type: 'process'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What packaging materials are covered under EPR?',
        answer: 'EPR covers all packaging materials including plastic, paper, metal, glass, and composite packaging used in products.'
      },
      {
        question: 'How do we ensure proper packaging waste collection?',
        answer: 'We establish comprehensive collection networks and work with local waste management systems to ensure proper collection.'
      },
      {
        question: 'What are the recycling targets for packaging?',
        answer: 'Recycling targets vary by material type, typically ranging from 60-80% depending on the packaging material and local regulations.'
      }
    ],
    caseStudies: [
      {
        client: 'FoodCorp India',
        description: 'Implemented Packaging EPR compliance for their food packaging range',
        metrics: '85% recycling rate, 30% cost reduction'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our Packaging EPR Services?',
      subtitle: 'Expert packaging compliance solutions',
      description: 'We provide specialized packaging EPR compliance services with expertise in different packaging materials and recycling processes.',
      features: [
        {
          icon: 'Recycle',
          title: 'Material Expertise',
          description: 'Expert knowledge of different packaging materials and recycling processes'
        },
        {
          icon: 'Target',
          title: 'Target Achievement',
          description: 'Help achieve recycling targets and compliance requirements'
        },
        {
          icon: 'Leaf',
          title: 'Sustainability',
          description: 'Promote sustainable packaging practices and circular economy'
        }
      ],
      stats: [
        { value: '1M+', label: 'Packages Processed' },
        { value: '85%', label: 'Recycling Rate' },
        { value: '50+', label: 'Brand Partners' }
      ]
    }
  },
  'automotive-epr': {
    slug: 'automotive-epr',
    title: 'Automotive EPR Compliance',
    subtitle: 'Complete EPR compliance solutions for automotive products ensuring proper end-of-life vehicle management.',
    heroImage: '/services/epr-compliance-solutions.jpg',
    summary: 'Our Automotive EPR services help automotive manufacturers comply with Extended Producer Responsibility regulations for vehicles and automotive components.',
    benefits: [
      {
        icon: 'Car',
        title: 'Vehicle Management',
        description: 'Complete lifecycle management of vehicles and components'
      },
      {
        icon: 'Leaf',
        title: 'Environmental Protection',
        description: 'Minimize environmental impact of automotive waste'
      },
      {
        icon: 'FileText',
        title: 'Regulatory Compliance',
        description: 'Ensure compliance with automotive EPR regulations'
      },
      {
        icon: 'Recycle',
        title: 'Resource Recovery',
        description: 'Recover valuable materials from end-of-life vehicles'
      }
    ],
    scopeItems: [
      {
        icon: 'Car',
        title: 'Complete Vehicles',
        items: ['Passenger Cars', 'Commercial Vehicles', 'Two-wheelers', 'Three-wheelers']
      },
      {
        icon: 'Cog',
        title: 'Automotive Components',
        items: ['Engines', 'Transmissions', 'Batteries', 'Tires', 'Catalytic Converters']
      },
      {
        icon: 'Wrench',
        title: 'Auto Parts',
        items: ['Body Parts', 'Interior Components', 'Electrical Parts', 'Mechanical Parts']
      }
    ],
    categories: ['Complete Vehicles', 'Components', 'Parts'],
    processSteps: [
      {
        number: 1,
        title: 'Vehicle Assessment',
        description: 'Assess vehicles and determine EPR obligations',
        icon: 'Search'
      },
      {
        number: 2,
        title: 'Collection',
        description: 'Collect end-of-life vehicles from designated points',
        icon: 'Truck'
      },
      {
        number: 3,
        title: 'Dismantling',
        description: 'Safely dismantle vehicles and separate components',
        icon: 'Wrench'
      },
      {
        number: 4,
        title: 'Processing',
        description: 'Process components through certified recycling facilities',
        icon: 'Recycle'
      },
      {
        number: 5,
        title: 'Material Recovery',
        description: 'Recover valuable materials from processed components',
        icon: 'Package'
      }
    ],
    hasDataSecurity: false,
    galleryImages: [
      {
        src: '/services/electronic-waste.jpg',
        alt: 'Automotive EPR Processing',
        type: 'process'
      }
    ],
    pricingType: 'quote',
    faqs: [
      {
        question: 'What vehicles are covered under Automotive EPR?',
        answer: 'Automotive EPR covers passenger cars, commercial vehicles, two-wheelers, and three-wheelers, along with their components.'
      },
      {
        question: 'How do we ensure safe vehicle dismantling?',
        answer: 'We use certified dismantling facilities with proper safety protocols to handle hazardous materials safely.'
      },
      {
        question: 'What materials can be recovered from vehicles?',
        answer: 'Valuable materials like steel, aluminum, copper, plastics, and rare earth elements can be recovered from end-of-life vehicles.'
      }
    ],
    caseStudies: [
      {
        client: 'AutoManufacturer India',
        description: 'Implemented Automotive EPR compliance for their vehicle range',
        metrics: '90% material recovery, 100% compliance rate'
      }
    ],
    whyChooseUs: {
      title: 'Why Choose Our Automotive EPR Services?',
      subtitle: 'Specialized automotive compliance solutions',
      description: 'We specialize in automotive EPR compliance with expertise in vehicle dismantling and component processing.',
      features: [
        {
          icon: 'Shield',
          title: 'Safety Protocols',
          description: 'Strict safety protocols for handling hazardous automotive materials'
        },
        {
          icon: 'Recycle',
          title: 'Material Recovery',
          description: 'Maximum recovery of valuable materials from vehicles'
        },
        {
          icon: 'CheckCircle',
          title: 'Compliance Assurance',
          description: 'Ensure complete compliance with automotive EPR regulations'
        }
      ],
      stats: [
        { value: '5,000+', label: 'Vehicles Processed' },
        { value: '90%', label: 'Material Recovery' },
        { value: '100%', label: 'Compliance Rate' }
      ]
    }
  }
};

export function getEPRServiceData(slug: string): EPRServiceData | null {
  return eprServiceData[slug] || null;
}

export function getAllEPRServiceSlugs(): string[] {
  return Object.keys(eprServiceData);
}

export function getAllEPRServices(): EPRServiceData[] {
  return Object.values(eprServiceData);
}
