'use client';

import { Card } from '@/components/ui/card';
import { Building2, TrendingUp } from 'lucide-react';

interface CaseStudy {
  client: string;
  description: string;
  metrics: string;
}

interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export function RelatedCaseStudies({ caseStudies }: RelatedCaseStudiesProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">🏢</span>
            Trusted by Businesses & Institutions
          </h2>
          <p className="text-muted-foreground text-lg">Real results from real clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{study.client}</h3>
                  <p className="text-muted-foreground mb-4">{study.description}</p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <TrendingUp className="h-5 w-5" />
                    <span>{study.metrics}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
