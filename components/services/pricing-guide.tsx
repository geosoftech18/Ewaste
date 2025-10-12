'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { QuoteModal } from './quote-modal';

interface PricingInfo {
  item: string;
  price: string;
}

interface PricingGuideProps {
  pricingType: 'table' | 'quote';
  pricingInfo?: PricingInfo[];
}

export function PricingGuide({ pricingType, pricingInfo }: PricingGuideProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  return (
    <>
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">💰</span>
              Simple, Transparent Pricing
            </h2>
          </div>

          <Card className="p-8 shadow-xl">
            {pricingType === 'table' && pricingInfo ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-lg">Item Type</TableHead>
                      <TableHead className="text-lg text-right">Price Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricingInfo.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.item}</TableCell>
                        <TableCell className="text-right font-semibold text-emerald-600">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Prices may vary based on quantity, condition, and location. Contact us for accurate quotes.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Pricing varies by item type, volume, and service requirements. Get a customized quote tailored to your specific needs.
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={() => setShowQuoteModal(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-10"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Request a Quote
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <QuoteModal open={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </>
  );
}
