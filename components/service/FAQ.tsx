"use client"
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What types of e-waste do you recycle?',
      answer: 'We recycle all types of electronic waste including IT equipment (computers, servers, laptops), consumer electronics (TVs, mobile phones, home appliances), telecommunication equipment, printers, batteries (lithium-ion, lead-acid, dry cell), and various other electronic devices. Our facilities are equipped to handle both small-scale and large-scale e-waste disposal needs.',
    },
    {
      question: 'How do you ensure data security during recycling?',
      answer: 'Data security is our top priority. We use certified data wiping software that meets international standards for data destruction. Our process includes multiple-pass data sanitization, physical destruction of storage media when required, and comprehensive documentation. We provide an official Certificate of Data Destruction for every data-bearing device processed, ensuring complete peace of mind.',
    },
    {
      question: 'Do you provide certificates for recycled waste?',
      answer: 'Yes, absolutely. We provide comprehensive documentation including Certificate of Recycling, Certificate of Data Destruction, EPR (Extended Producer Responsibility) documentation, and detailed reports outlining the recycling process and materials recovered. All certificates are issued upon completion of the recycling process and are compliant with government regulations.',
    },
    {
      question: 'Can you pick up e-waste from my location?',
      answer: 'Yes, we offer convenient nationwide pickup service. Whether you are a household with a few electronic items or a large organization with bulk e-waste, we provide flexible pickup solutions. Simply contact us through our website, phone, or WhatsApp, and our team will schedule a pickup at your preferred time and location. We serve residential, commercial, and industrial clients across India.',
    },
  ];

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
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#quote-form"
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
