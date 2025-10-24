"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What types of e-waste do you accept?",
      answer:
        "We accept all types of electronic waste including computers, laptops, mobile phones, tablets, printers, monitors, keyboards, mice, cables, and other IT equipment. We also handle larger items like servers and networking equipment.",
    },
    {
      question: "Is my data safe during the recycling process?",
      answer:
        "We follow certified data destruction protocols. All hard drives and storage devices are securely wiped or physically destroyed before recycling. We provide detailed certificates of destruction for compliance.",
    },
    {
      question: "How do I schedule a pickup?",
      answer:
        "Simply fill out our online form or call us. We'll arrange a convenient time for pickup. For bulk items, we offer free pickup service. You can also drop off items at our collection centers.",
    },
    {
      question: "Do you provide documentation for tax purposes?",
      answer:
        "Yes! We provide detailed recycling certificates and documentation for all items recycled. This can be used for corporate sustainability reporting and tax deductions.",
    },
    {
      question: "What happens to the recycled materials?",
      answer:
        "Recovered materials like metals, plastics, and glass are sold to certified recyclers and manufacturers. This creates a circular economy and reduces the need for new raw materials.",
    },
    {
      question: "Are there any charges for the service?",
      answer:
        "For bulk quantities (10+ devices), pickup is completely free. For smaller quantities, we offer affordable rates. Contact us for a custom quote based on your needs.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our e-waste recycling services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <span className="font-semibold text-foreground text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center animate-fade-in-up">
          <p className="text-foreground mb-4">
            <span className="font-semibold">Still have questions?</span> Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Call Us
            </a>
            <a
              href="mailto:info@sprecycling.com"
              className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
