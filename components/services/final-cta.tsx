'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Phone, Mail, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PickupFormModal } from '../pickup-form-modal';
import { useState } from 'react';

interface FinalCTAProps {
  serviceName: string;
}

export function FinalCTA({ serviceName }: FinalCTAProps) {
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
    return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let&apos;s handle your e-waste responsibly
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Get started with {serviceName.toLowerCase()} today. Our team is ready to assist you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-white text-emerald-600 hover:bg-white/90 px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            onClick={() => setPickupModalOpen(true)}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Pickup
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <Phone className="mr-2 h-5 w-5" />
            Talk to an Expert
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <Phone className="h-6 w-6" />
            <span className="font-semibold">+91 9949901238</span>
            <span className="text-sm text-white/80">Mon-Sat, 9AM-6PM</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <MessageCircle className="h-6 w-6" />
            <span className="font-semibold">WhatsApp Support</span>
            <span className="text-sm text-white/80">Quick responses</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <Mail className="h-6 w-6" />
            <span className="font-semibold">siliconplanetrecycling@gmail.com</span>
            <span className="text-sm text-white/80">24hr response time</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <span className="text-white/80">Certified by:</span>
          <Badge variant="secondary" className="px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
            CPCB Authorized
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
            ISO 14001
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
            Authorized Recycler
          </Badge>
        </div>
      </div>

      {/* Pickup Form Modal */}
      <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  );
}
