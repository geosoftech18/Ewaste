import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Battery, Package, Car } from 'lucide-react';
import { getAllEPRServices } from '@/lib/epr-service-data';

export const metadata: Metadata = {
  title: 'EPR Compliance Solutions in India | Extended Producer Responsibility Services - SP Recycling',
  description: 'Comprehensive EPR compliance solutions for Electronics, Battery, Packaging, and Automotive sectors. Complete EPR registration, documentation, and regulatory compliance support for manufacturers, importers, and brand owners in India.',
  keywords: 'EPR compliance, extended producer responsibility, EPR registration, EPR compliance services, regulatory compliance, environmental compliance, electronics EPR, battery EPR, packaging EPR',
  openGraph: {
    title: 'EPR Compliance Solutions | Extended Producer Responsibility Services',
    description: 'Complete EPR registration, documentation, and regulatory compliance support for manufacturers, importers, and brand owners.',
    type: 'website',
  },
};

const serviceIcons = {
  'electronics-epr': Shield,
  'battery-epr': Battery,
  'packaging-epr': Package,
  'automotive-epr': Car,
};

export default function EPRCompliancePage() {
  const eprServices = getAllEPRServices();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              EPR Compliance Solutions
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
              Extended Producer Responsibility
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {' '}Compliance
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive EPR compliance solutions for Electronics, Battery, Packaging, and Automotive sectors. 
              Ensure regulatory compliance and environmental responsibility with our expert services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our EPR Compliance Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of EPR compliance solutions tailored to your industry needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eprServices.map((service) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] || Shield;
              
              return (
                <Card key={service.slug} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                      {service.summary}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-sm text-foreground">Key Benefits:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {service.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                            {benefit.title}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-full group-hover:bg-primary/90">
                      <Link href={`/services/EPR-compliance/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our EPR Services?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide expert EPR compliance solutions with comprehensive support and regulatory expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Expert Compliance</h3>
              <p className="text-muted-foreground">
                Deep understanding of EPR regulations across all sectors with proven compliance track record.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">End-to-End Support</h3>
              <p className="text-muted-foreground">
                Complete support from assessment to reporting with dedicated compliance managers.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Battery className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Sector Expertise</h3>
              <p className="text-muted-foreground">
                Specialized knowledge across Electronics, Battery, Packaging, and Automotive sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Ensure EPR Compliance?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get expert EPR compliance solutions tailored to your industry. Contact us today for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Get Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
