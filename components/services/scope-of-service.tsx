'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ScopeItem {
  icon: string;
  title: string;
  items: string[];
}

interface ScopeOfServiceProps {
  items: ScopeItem[];
  categories: string[];
}

export function ScopeOfService({ items, categories }: ScopeOfServiceProps) {
  // Function to get EPR slug based on title
  const getEPRSlug = (title: string): string | null => {
    const titleToSlug: Record<string, string> = {
      'Electronics EPR': 'electronics-epr',
      'Battery EPR': 'battery-epr',
      'Packaging EPR': 'packaging-epr',
      'Automotive EPR': 'automotive-epr',
    };
    return titleToSlug[title] || null;
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">♻️</span>
            What We Collect and Recycle
          </h2>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-1.5 text-sm">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const IconComponent = (Icons as any)[
              item.icon.split('-').map((word: string, i: number) =>
                i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
              ).join('')
            ] as LucideIcon || Icons.Package;

            const eprSlug = getEPRSlug(item.title);
            const isEPRService = eprSlug !== null;

            const CardContent = () => (
              <Card className={`p-6 transition-all duration-300 border-l-4 border-l-emerald-500 relative overflow-hidden ${
                isEPRService 
                  ? 'hover:shadow-lg hover:scale-105 cursor-pointer group' 
                  : 'hover:shadow-lg'
              }`}>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-emerald-50 text-emerald-600">
                  <IconComponent className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
                {isEPRService && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-50 via-emerald-50/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="flex items-center justify-center text-emerald-600 text-sm font-semibold group-hover:text-emerald-700">
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                )}
                {/* Loading Progress Bar */}
                {isEPRService && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-200/30">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                  </div>
                )}
              </Card>
            );

            return isEPRService ? (
              <Link key={index} href={`/services/EPR-compliance/${eprSlug}`}>
                <CardContent />
              </Link>
            ) : (
              <div key={index}>
                <CardContent />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
