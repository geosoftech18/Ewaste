'use client';

import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { QuoteModal } from './quote-modal';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export function HeroSection({ title, subtitle, backgroundImage }: HeroSectionProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-900/85 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium">CPCB Certified Recycler</span>
            <span className="text-white/40">•</span>
            <span className="text-sm font-medium">ISO 14001 Compliant</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Pickup
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowQuoteModal(true)}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Request a Quote
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <QuoteModal open={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </>
  );
}
