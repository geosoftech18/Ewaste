export interface CityData {
  slug: string;
  name: string;
  title: string;
  description: string;
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
      icon: string;
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const cityData: Record<string, CityData> = {
  'hyderabad': {
    slug: 'hyderabad',
    name: 'Hyderabad',
    title: 'E-Waste Recycling Services in Hyderabad',
    description: 'Professional e-waste recycling services in Hyderabad with certified data destruction, secure pickup, and eco-friendly disposal. Serving IT companies, hospitals, and businesses across the city.',
    heroImage: '/city/hyderabad-hero.jpg',
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
          description: 'Certified secure data destruction services',
          icon: 'Shield'
        }
      ]
    },
    faqs: [
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
        answer: 'We cover all areas under Greater Hyderabad Municipal Corporation including IT Corridor, Secunderabad, and surrounding areas.'
      }
    ]
  },
  'mumbai': {
    slug: 'mumbai',
    name: 'Mumbai',
    title: 'E-Waste Recycling Services in Mumbai',
    description: 'Leading e-waste recycling services in Mumbai with state-of-the-art facilities, secure data destruction, and comprehensive pickup services across the financial capital.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '20.4M',
    wasteCollection: 920,
    coverage: 'Brihanmumbai Municipal Corporation',
    establishedYear: '2016',
    facilities: [
      'Advanced Data Destruction Center',
      'Multi-Metal Recovery Facility',
      'Plastic Granulation Unit',
      'Lithium Battery Processing Plant'
    ],
    highlights: [
      '24/7 emergency pickup',
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
        answer: 'Yes, we have specialized services for the financial sector with enhanced security protocols.'
      },
      {
        question: 'What is your coverage area in Mumbai?',
        answer: 'We cover all areas under BMC including South Mumbai, Western Suburbs, and Eastern Suburbs.'
      },
      {
        question: 'Do you offer emergency pickup services?',
        answer: 'Yes, we provide 24/7 emergency pickup services for urgent e-waste disposal needs.'
      }
    ]
  },
  'delhi': {
    slug: 'delhi',
    name: 'Delhi',
    title: 'E-Waste Recycling Services in Delhi',
    description: 'Comprehensive e-waste recycling services in Delhi NCR with certified facilities, secure data destruction, and extensive coverage across the national capital region.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '32.9M',
    wasteCollection: 850,
    coverage: 'Delhi Municipal Corporation',
    establishedYear: '2015',
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
        answer: 'Yes, we provide services across Delhi NCR including Gurgaon, Noida, and Faridabad.'
      },
      {
        question: 'Do you work with government departments?',
        answer: 'Yes, we have specialized services and compliance protocols for government e-waste disposal.'
      },
      {
        question: 'What about educational institutions?',
        answer: 'We offer special programs for schools, colleges, and universities with bulk processing capabilities.'
      }
    ]
  },
  'bangalore': {
    slug: 'bangalore',
    name: 'Bangalore',
    title: 'E-Waste Recycling Services in Bangalore',
    description: 'Tech-focused e-waste recycling services in Bangalore with specialized IT equipment disposal, secure data destruction, and comprehensive coverage of India\'s Silicon Valley.',
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
        answer: 'We cover all areas under BBMP including Electronic City, Whitefield, and Koramangala.'
      },
      {
        question: 'Do you handle data center equipment?',
        answer: 'Yes, we specialize in large-scale data center equipment disposal with enhanced security protocols.'
      }
    ]
  },
  'chennai': {
    slug: 'chennai',
    name: 'Chennai',
    title: 'E-Waste Recycling Services in Chennai',
    description: 'Reliable e-waste recycling services in Chennai with certified facilities, secure data destruction, and comprehensive coverage across Tamil Nadu\'s capital.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '11.2M',
    wasteCollection: 520,
    coverage: 'Greater Chennai Corporation',
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
        question: 'Do you handle automotive electronics?',
        answer: 'Yes, we specialize in automotive electronics recycling with industry-specific protocols.'
      },
      {
        question: 'What about manufacturing equipment?',
        answer: 'We have specialized facilities for industrial and manufacturing electronics disposal.'
      },
      {
        question: 'Do you cover Chennai port area?',
        answer: 'Yes, we provide services for marine and port electronics with specialized handling protocols.'
      }
    ]
  },
  'gujarat': {
    slug: 'gujarat',
    name: 'Gujarat',
    title: 'E-Waste Recycling Services in Gujarat',
    description: 'Comprehensive e-waste recycling services across Gujarat with certified facilities, secure data destruction, and extensive coverage serving Ahmedabad, Surat, Vadodara, and other major cities.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '60.4M',
    wasteCollection: 1200,
    coverage: 'Gujarat State',
    establishedYear: '2017',
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
    title: 'E-Waste Recycling Services in Andhra Pradesh',
    description: 'Professional e-waste recycling services across Andhra Pradesh with certified facilities, secure data destruction, and comprehensive coverage serving Visakhapatnam, Vijayawada, and other major cities.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '49.4M',
    wasteCollection: 850,
    coverage: 'Andhra Pradesh State',
    establishedYear: '2018',
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
    title: 'E-Waste Recycling Services in Pune',
    description: 'Leading e-waste recycling services in Pune with state-of-the-art facilities, secure data destruction, and comprehensive coverage serving the educational and IT hub of Maharashtra.',
    heroImage: '/city/e-waste-recycling-facility-with-circuit-boards-and.jpg',
    population: '7.2M',
    wasteCollection: 380,
    coverage: 'Pune Municipal Corporation',
    establishedYear: '2018',
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
        answer: 'Yes, we have special programs for schools, colleges, and universities with bulk processing capabilities.'
      },
      {
        question: 'What areas of Pune do you cover?',
        answer: 'We cover all areas under PMC including IT parks, educational zones, and industrial areas.'
      },
      {
        question: 'Do you handle automotive electronics?',
        answer: 'Yes, we specialize in automotive electronics recycling with industry-specific protocols for Pune\'s automotive sector.'
      }
    ]
  }
};

export function getCityData(slug: string): CityData | null {
  return cityData[slug] || null;
}

export function getAllCitySlugs(): string[] {
  return Object.keys(cityData);
}

export function getAllCities(): CityData[] {
  return Object.values(cityData);
}
