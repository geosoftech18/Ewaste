import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle } from 'lucide-react';
import HeroSection from '@/components/service/HeroSection';
import ServiceOverview from '@/components/service/ServiceOverview';
import DataDestructionSection from '@/components/service/DataDestructionSection';
import WhyChooseUs from '@/components/service/WhyChooseUs';
import Testimonials from '@/components/service/Testimonials';
import FAQ from '@/components/service/FAQ';
import QuoteForm from '@/components/service/QuoteForm';
import Footer from '@/components/service/Footer';

const services = [
  {
    slug: 'electronic-waste-recycle',
    title: 'Electronic Waste Recycling',
    description: 'Eco-friendly recycling for all types of electronic waste',
    gradient: 'from-emerald-500 to-teal-600',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg'
  },
  {
    slug: 'it-telecom',
    title: 'IT & Telecom Equipment',
    description: 'Specialized recycling for IT infrastructure and telecom equipment',
    gradient: 'from-blue-500 to-cyan-600',
    image:'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg'
  },
  {
    slug: 'printer-recycle',
    title: 'Printer & Imaging Equipment',
    description: 'Responsible recycling of printers, copiers, and scanners',
    gradient: 'from-sky-500 to-blue-600',
    image:  'https://images.pexels.com/photos/4226890/pexels-photo-4226890.jpeg',
  },
  {
    slug: 'battery-recycle',
    title: 'Battery Recycling',
    description: 'Safe and compliant recycling of all battery types',
    gradient: 'from-orange-500 to-red-600',
    image: 'https://images.pexels.com/photos/9800098/pexels-photo-9800098.jpeg'
  },
  {
    slug: 'consumer-electronics',
    title: 'Consumer Electronics',
    description: 'Recycling services for home electronics and personal devices',
    gradient: 'from-pink-500 to-rose-600',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'
  },
  {
    slug: 'data-destruction',
    title: 'Data Destruction Services',
    description: 'Professional data destruction ensuring complete information security',
    gradient: 'from-slate-700 to-slate-900',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <section className="relative py-20 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-6">
            <Recycle className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            E-Waste Recycling Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional, certified, and eco-friendly recycling solutions for all your electronic waste needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>CPCB Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>ISO 14001 Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Zero Landfill</span>
            </div>
          </div>
        </div>
      </section> */}
      <HeroSection />
      <ServiceOverview />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive recycling solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.slug}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-emerald-200 p-0 relative"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full group-hover:bg-emerald-50 group-hover:text-emerald-600 border border-transparent group-hover:border-emerald-200"
                  >
                    <Link href={`/services/${service.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                {/* Flowing Line Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-600 group-hover:w-full transition-all duration-500 ease-out"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DataDestructionSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <QuoteForm />
     
      {/* <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Choose a service to learn more and request a quote
          </p>
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-white/90 px-10 py-6 text-lg shadow-2xl"
          >
            Contact Us Today
          </Button>
        </div>
      </section> */}
    </div>
  );
}
