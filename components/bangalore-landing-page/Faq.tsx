"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What e-waste items do you accept in Hyderabad?",
    answer:
      "We accept computers, laptops, monitors, printers, phones, TVs, UPS systems, batteries, household appliances, industrial electronics, lighting waste, cables, and mixed electronic scrap. Select a category above to see the full item list.",
  },
  {
    question: "Are you an authorised e-waste recycler?",
    answer:
      "Yes. EcoRevive operates as an authorised e-waste recycler. Devices are collected, data-sanitised where needed, and processed through approved recycling channels instead of being dumped.",
  },
  {
    question: "How do I get a quote for old electronics?",
    answer:
      "Select one or more categories, add your name, phone, and Hyderabad area, then submit an inquiry. We confirm the items, share a fixed price where applicable, and schedule doorstep pickup.",
  },
  {
    question: "Do you offer doorstep pickup?",
    answer:
      "Yes. Pickup is available across Hyderabad. After you inquire, we typically collect items within 24–48 hours of scheduling.",
  },
  {
    question: "Will I get paid for selling old electronics?",
    answer:
      "Working and salvageable items such as phones, laptops, and TVs are quoted at a fixed price. Payment is made after pickup and inspection. Scrap-only items may be collected for authorised recycling with little or no buyback.",
  },
  {
    question: "Is data on phones, laptops, and hard drives destroyed?",
    answer:
      "Yes. Storage devices are wiped or physically destroyed as part of authorised recycling. Do not send devices with data you still need unless you have backed them up.",
  },
  {
    question: "Can offices and IT companies book bulk pickup?",
    answer:
      "Yes. We handle bulk IT asset disposal for offices, including desktops, servers, networking gear, printers, and UPS systems. Mention quantities in the inquiry form for a corporate pickup.",
  },
  {
    question: "Which areas of Hyderabad do you cover?",
    answer:
      "We cover major areas including Gachibowli, Madhapur, Hitech City, Kukatpally, Banjara Hills, Secunderabad, LB Nagar, and surrounding localities. Add your area in the inquiry so we can confirm the slot.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-base text-gray-500 sm:text-lg">
          Quick answers about e-waste recycling and selling old electronics in
          Hyderabad.
        </p>

        <div className="mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-medium ${
                      isOpen ? "bg-brand text-white" : "bg-mint text-brand"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
