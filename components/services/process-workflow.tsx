'use client';

import { Card } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface ProcessWorkflowProps {
  steps: ProcessStep[];
}

export function ProcessWorkflow({ steps }: ProcessWorkflowProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">🔄</span>
            Our Process – Safe, Transparent, and Certified
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transform -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = (Icons as any)[
                step.icon.split('-').map((word: string, i: number) =>
                  i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
                ).join('')
              ] as LucideIcon || Icons.Circle;

              return (
                <Card
                  key={index}
                  className="p-6 bg-background hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 relative group"
                >
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  <div className="mb-4 inline-flex p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600">
                    <IconComponent className="h-8 w-8" />
                  </div>

                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
