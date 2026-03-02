"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  microText?: string;
  bullets?: string[];
}

const faqData: FAQItem[] = [
  {
    question: "Is pickup free?",
    answer: "Yes. We provide complimentary pickup services for qualifying corporate and bulk e-waste collections. Our team coordinates secure logistics, documentation, and scheduling at no additional charge.",
    microText: "Same-Day Pickup Available in Select Locations."
  },
  {
    question: "How is data destroyed?",
    answer: "All storage devices undergo certified data destruction using industrial-grade shredding or physical destruction methods. The process ensures complete data irrecoverability.",
    microText: "On-site destruction available upon request.",
    bullets: ["Hard drive shredding", "SSD destruction", "Media crushing"]
  },
  {
    question: "Do you provide certificate?",
    answer: "Yes. A Certificate of Data Destruction and recycling compliance documentation is provided after processing. This ensures full audit readiness and regulatory alignment.",
    microText: "Certificate Provided Post Destruction."
  },
  {
    question: "Are you CPCB approved?",
    answer: "Yes. Our operations follow CPCB and State Pollution Control Board guidelines. We ensure regulatory compliance through documented and auditable processes.",
    microText: "EPR Authorized Recycler."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve IT companies, telecom providers, manufacturing units, government institutions, banking, healthcare, and other regulated sectors requiring certified e-waste and compliance management.",
    bullets: ["Enterprise", "Government", "Financial Institutions"]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:py-30 py-20 px-6 bg-[#0E1218] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
      <div className="absolute inset-0 noise-texture" />

      <div className="relative max-w-[900px] mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            Clear answers to help your organization stay compliant and secure.
          </p>
        </div>

        <div className="space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? `${100 * (index + 1)}ms` : "0ms"
              }}
            >
              <div
                className={`relative bg-white/[0.03] backdrop-blur-xl border rounded-2xl
                  shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                  hover:-translate-y-1 transition-all duration-300
                  ${
                    openIndex === index
                      ? "border-emerald-500/30 bg-white/[0.05]"
                      : "border-emerald-500/15"
                  }`}
              >
                {openIndex === index && (
                  <div className="absolute left-0 top-7 bottom-7 w-1 bg-emerald-500 rounded-r-full" />
                )}

                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-7 py-7 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-white/95 pr-6 group-hover:text-emerald-400 transition-colors duration-300">
                    {faq.question}
                  </span>

                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                      bg-emerald-500/10 border border-emerald-500/30
                      transition-all duration-300
                      ${
                        openIndex === index
                          ? "rotate-0 shadow-[0_0_20px_rgba(31,164,99,0.3)]"
                          : "rotate-0"
                      }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden  ease-in-out ${
                    openIndex === index ? "max-h-[800px]" : "max-h-0"
                  }`}
                >
                  <div className="px-7 pb-7 pt-0">
                    <div
                      className={`transition-all  ${
                        openIndex === index
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-base text-white/80 leading-relaxed mb-3">
                        {faq.answer}
                      </p>

                      {faq.microText && (
                        <p className="text-sm text-emerald-400/90 font-medium mt-4">
                          {faq.microText}
                        </p>
                      )}

                      {faq.bullets && (
                        <ul className="mt-4 space-y-2">
                          {faq.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-center text-sm text-white/70"
                            >
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
