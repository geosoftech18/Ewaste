"use client"
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQProps {
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FAQ({ faqs: customFaqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs = [
    {
      question: 'What types of e-waste do you accept?',
      answer: 'We accept all electronic waste including computers, laptops, mobile phones, servers, printers, network equipment, batteries, cables, circuit boards, household appliances, and IT peripherals. Both business and household e-waste are welcome.'
    },
    {
      question: 'How does your same-day pickup service work?',
      answer: 'Simply schedule a pickup through our website or call our support team. Once confirmed, our trained professionals will arrive at your location the same day to collect your e-waste safely and issue a collection receipt.',
    },
    {
      question: 'Is my data completely secure during recycling?',
      answer: 'Absolutely. We provide certified data destruction services with complete confidentiality. All storage devices are physically destroyed or degaussed, and you receive documentation certifying the secure erasure of all sensitive information.',
    },
    {
      question: 'Are your recycling processes certified and compliant?',
      answer: 'Yes. We are fully certified and authorized by government regulatory bodies. Our processes comply with EPR regulations, e-waste management rules, and international environmental standards, ensuring complete legal compliance for your organization.',
    },
    {
      question: 'Do you offer recycling services for businesses?',
      answer: 'Yes. We provide comprehensive corporate e-waste solutions including bulk pickups, EPR compliance support, asset management, certified reporting, and customized recycling programs tailored to your industry&apos;s specific requirements and sustainability goals.',
    },
  ];

  const faqs = customFaqs || defaultFaqs;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our e-waste recycling services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[2000px]' : 'max-h-0'
                }`}
                // Keep answers in the HTML for crawlers; collapse only visually for users.
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
