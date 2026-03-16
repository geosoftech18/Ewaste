import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { HeroSection } from '@/components/services/hero-section';
import OurSolutions from '@/components/services/EPR-services/our-solutions';
import WhyChooseUs from '@/components/services/EPR-services/why-choose-us';
import OurProcess from '@/components/services/EPR-services/our-process';
import CategoriesManaged from '@/components/services/EPR-services/categories-managed';
import Partners from '@/components/services/EPR-services/partners';
import PWMTimeline from '@/components/services/EPR-services/pwm-timeline';
import CTA from '@/components/services/EPR-services/cta';
import Footer from '@/components/services/EPR-services/footer';
import { getEPRServiceData, getAllEPRServiceSlugs } from '@/lib/epr-service-data';

export async function generateStaticParams() {
  return getAllEPRServiceSlugs().map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getEPRServiceData(params.slug);

  if (!service) {
    return {
      title: 'EPR Service Not Found | SP Recycling',
    };
  }

  return {
    title: `${service.title} | EPR Compliance in India | SP Recycling`,
    description: `${service.subtitle} Complete EPR registration, documentation, and compliance support for manufacturers, importers, and brand owners. Regulatory compliance made easy.`,
    keywords: `${service.title.toLowerCase()}, EPR compliance, extended producer responsibility, EPR registration, regulatory compliance, environmental compliance, ${service.title.toLowerCase()} services`,
    openGraph: {
      title: `${service.title} | EPR Compliance Solutions - SP Recycling`,
      description: service.subtitle,
      images: [service.heroImage],
      type: 'website',
    },
  };
}

export default function EPRServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getEPRServiceData(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <HeroSection 
        title={service.title}
        subtitle={service.subtitle}
        backgroundImage={service.heroImage}
      />
       <PWMTimeline />
       <WhyChooseUs />
      <OurSolutions />

      <OurProcess />

     

      <CategoriesManaged />

      <Partners />

     

      <CTA />

    
    </main>
  );
}
