'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileCheck, Eye } from 'lucide-react';

interface DataSecurityFeature {
  title: string;
  description: string;
}

interface DataSecurityProps {
  features: DataSecurityFeature[];
}

export function DataSecurity({ features }: DataSecurityProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-6">
            <Shield className="h-12 w-12 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">🔐</span>
            100% Data Security Guaranteed
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Military-grade security protocols ensure your sensitive data is permanently and irrecoverably destroyed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/20">
                <FileCheck className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Certificate of Data Destruction</h3>
                <p className="text-white/70">Official documentation for compliance and audit requirements</p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 whitespace-nowrap"
            >
              <Eye className="mr-2 h-5 w-5" />
              Request Sample Certificate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
