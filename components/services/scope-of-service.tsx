'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

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

            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
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
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
