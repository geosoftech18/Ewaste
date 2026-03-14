import { Metadata } from 'next';
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
import { ServicesGrid } from '@/components/services-grid';

export const metadata: Metadata = {
  title: "E-Waste Recycling Services in India | Electronic Waste Disposal & Data Destruction - SP Recycling",
  description: "Comprehensive e-waste recycling services including IT equipment, consumer electronics, batteries, printers, and data destruction. ISO certified, secure, eco-friendly disposal across India. Get free quotes and same-day pickup.",
  keywords: "e-waste recycling services, electronic waste disposal, IT equipment recycling, data destruction services, battery recycling, printer recycling, consumer electronics recycling",
  openGraph: {
    title: "E-Waste Recycling Services in India | SP Recycling",
    description: "Comprehensive e-waste recycling services including IT equipment, consumer electronics, batteries, and data destruction. ISO certified and eco-friendly.",
    type: "website",
  },
}

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
      <ServicesGrid/>


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
