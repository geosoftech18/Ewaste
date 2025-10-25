import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { HeroSection } from '@/components/services/hero-section';
import { BenefitsSummary } from '@/components/services/benefits-summary';
import { WhyChooseUs } from '@/components/services/why-choose-us';
import { ScopeOfService } from '@/components/services/scope-of-service';
import { ProcessWorkflow } from '@/components/services/process-workflow';
import { DataSecurity } from '@/components/services/data-security';
import { PhotoGallery } from '@/components/services/photo-gallery';
import { PricingGuide } from '@/components/services/pricing-guide';
import { ServiceFAQ } from '@/components/services/service-faq';
import { RelatedCaseStudies } from '@/components/services/related-case-studies';
import { FinalCTA } from '@/components/services/final-cta';
import { getServiceData, getAllServiceSlugs } from '@/lib/service-data';

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceData(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | E-Waste Recycling Services`,
    description: service.subtitle,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceData(params.slug);

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

      {/* <BenefitsSummary
        summary={service.summary}
        benefits={service.benefits}
      /> */}

      {service.whyChooseUs && (
        <WhyChooseUs
          title={service.whyChooseUs.title}
          subtitle={service.whyChooseUs.subtitle}
          description={service.whyChooseUs.description}
          features={service.whyChooseUs.features}
          stats={service.whyChooseUs.stats}
        />
      )}

      <ScopeOfService
        items={service.scopeItems}
        categories={service.categories}
      />

      <ProcessWorkflow steps={service.processSteps} />

      {service.hasDataSecurity && service.dataSecurityFeatures && (
        <DataSecurity
          features={service.dataSecurityFeatures}
        />
      )}

      <PhotoGallery images={service.galleryImages} />

      <PricingGuide
        pricingType={service.pricingType}
        pricingInfo={service.pricingInfo}
      />

      <ServiceFAQ faqs={service.faqs} />

      <RelatedCaseStudies caseStudies={service.caseStudies} />

      <FinalCTA serviceName={service.title} />
    </main>
  );
}
