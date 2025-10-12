'use client';

import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsSummaryProps {
  summary: string;
  benefits: Benefit[];
}

export function BenefitsSummary({ summary, benefits }: BenefitsSummaryProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-xl text-center text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed">
          {summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = (Icons as any)[
              benefit.icon.split('-').map((word: string, i: number) =>
                i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
              ).join('')
            ] as LucideIcon || Icons.CheckCircle;

            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 group cursor-pointer"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
