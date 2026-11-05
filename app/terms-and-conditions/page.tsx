import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { absoluteUrl, SITE_URL } from "@/lib/seo"

const LAST_UPDATED = "2026-11-04"
const LAST_UPDATED_DISPLAY = "4 November 2026"

export const metadata: Metadata = {
  title: "Terms and Conditions | SP Recycling",
  description:
    "Terms for using sprecycling.in and booking SP Recycling's e-waste pickup, scrap buyback, data destruction and recycling services across India.",
  ...canonicalMetadata("/terms-and-conditions"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms and Conditions | SP Recycling",
    description:
      "Terms for using sprecycling.in and booking SP Recycling's e-waste pickup, scrap buyback, data destruction and recycling services across India.",
    url: absoluteUrl("/terms-and-conditions"),
    siteName: "SP Recycling",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl("/S.P recycling.png"),
        alt: "SP Recycling",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions | SP Recycling",
    description:
      "Terms for using sprecycling.in and booking SP Recycling's e-waste pickup, scrap buyback, data destruction and recycling services across India.",
  },
}

const toc = [
  { id: "who-we-are", label: "1. Who we are and what these terms cover" },
  { id: "using-this-website", label: "2. Using this website" },
  { id: "pickup-requests-and-quotes", label: "3. Pickup requests and quotes" },
  { id: "prices-and-payment", label: "4. Prices, rates and payment" },
  { id: "ownership-and-lawful-disposal", label: "5. Ownership and lawful disposal" },
  { id: "items-we-cannot-accept", label: "6. Items we cannot accept" },
  { id: "data-on-your-devices", label: "7. Data on your devices" },
  { id: "collection-handover-and-documents", label: "8. Collection, handover and documents" },
  { id: "ownership-of-items-and-risk", label: "9. Ownership of items and risk" },
  { id: "recycling-and-compliance", label: "10. Recycling and compliance" },
  { id: "business-and-epr-services", label: "11. Business and EPR services" },
  { id: "contact-details-and-messages", label: "12. Contact details and messages" },
  { id: "our-responsibility", label: "13. Our responsibility" },
  { id: "your-responsibility", label: "14. Your responsibility" },
  { id: "complaints-and-grievance-officer", label: "15. Complaints and grievance officer" },
  { id: "governing-law-and-disputes", label: "16. Governing law and disputes" },
  { id: "changes-to-these-terms", label: "17. Changes to these terms" },
  { id: "general", label: "18. General" },
  { id: "contact-us", label: "19. Contact us" },
]

function TermsJsonLd() {
  const pageUrl = absoluteUrl("/terms-and-conditions")
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions | SP Recycling",
    url: pageUrl,
    inLanguage: "en-IN",
    dateModified: LAST_UPDATED,
    isPartOf: {
      "@type": "WebSite",
      name: "SP Recycling",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "SP Recycling Pvt Ltd",
      url: SITE_URL,
      telephone: "+919949901238",
      email: "info@sprecycling.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thumkunta, Bibinagar",
        addressRegion: "Telangana",
        postalCode: "500078",
        addressCountry: "IN",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
    />
  )
}

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50/80">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms-and-conditions" },
        ]}
      />
      <TermsJsonLd />

      {/* Page hero */}
      <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span>Terms and Conditions</span>
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Effective date: {LAST_UPDATED_DISPLAY}. Last updated:{" "}
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            These terms apply when you use{" "}
            <a
              href="https://www.sprecycling.in"
              className="font-medium text-primary hover:underline"
            >
              sprecycling.in
            </a>
            , or ask SP Recycling Pvt Ltd for a quote, a pickup or any of our services. Please read
            them before you book. If you do not agree with them, please do not use the website or
            book a service.
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section
          aria-labelledby="in-short-heading"
          className="mb-10 rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="in-short-heading" className="text-xl font-semibold text-foreground">
            In short
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2 sm:text-base lg:gap-x-8">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              Rates on the website are the most we may offer. The final price is set after
              inspection and weighing, in front of you.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              We tell you before pickup if an item has no value, or if any fee applies.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              You are responsible for backing up and removing your own data, unless you hand
              devices to us for destruction under our data destruction process.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              You receive documents for each pickup.
            </li>
            <li className="flex gap-2 sm:col-span-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              We cannot accept certain items, such as radioactive material and leaking or damaged
              batteries, unless agreed in advance.
            </li>
          </ul>
        </section>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-12">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="Table of contents"
              className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Contents
              </h2>
              <ol className="mt-4 max-h-[70vh] space-y-1.5 overflow-y-auto pr-1 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-lg px-2 py-1.5 text-muted-foreground transition hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-6 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
          <section
            id="who-we-are"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              1. Who we are and what these terms cover
            </h2>
            <p className="mt-3">
              SP Recycling Pvt Ltd (we, us, our) runs this website and provides{" "}
              <Link
                href="/services/electronic-waste-recycle"
                className="text-primary hover:underline"
              >
                e-waste recycling
              </Link>
              ,{" "}
              <Link href="/services/it-telecom" className="text-primary hover:underline">
                IT and telecom equipment
              </Link>{" "}
              recycling, consumer electronics recycling,{" "}
              <Link href="/services/data-destruction" className="text-primary hover:underline">
                data destruction
              </Link>
              , sustainable waste solutions and{" "}
              <Link
                href="/services/EPR-Compliance-Solutions"
                className="text-primary hover:underline"
              >
                EPR compliance
              </Link>{" "}
              services. We also buy scrap electronics and appliances from homes, offices and
              businesses across the cities listed on our{" "}
              <Link href="/services/city" className="text-primary hover:underline">
                Cities We Serve
              </Link>{" "}
              page.
            </p>
            <p className="mt-3">
              You (you, your) means anyone who uses this website, requests a quote or pickup, or
              hands items to us.
            </p>
            <p className="mt-3">
              Our address is Thumkunta, Bibinagar, Telangana 500078.
            </p>
            <p className="mt-3">
              If you are a business and we have given you a written quotation, purchase order or
              service agreement, that document applies together with these terms. If the two
              conflict, the written agreement for your job prevails.
            </p>
          </section>

          <section
            id="using-this-website"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              2. Using this website
            </h2>
            <p className="mt-3">
              You may use this website for lawful purposes only. Please do not misuse it, attempt
              to disrupt it, or submit false or misleading requests.
            </p>
            <p className="mt-3">
              We take care to keep the information on this site accurate, but we do not promise
              that it is complete or always current. Rates, coverage areas and timelines can
              change.
            </p>
            <p className="mt-3">
              The environmental impact calculator and the figures it shows are estimates for
              general information. They are not a certified measurement.
            </p>
            <p className="mt-3">
              The content on this site, including text, logos and images, belongs to us or is used
              with permission. Please do not copy or reuse it without our written permission.
            </p>
            <p className="mt-3">
              The site links to outside websites, such as government pages. We do not control them
              and are not responsible for their content.
            </p>
          </section>

          <section
            id="pickup-requests-and-quotes"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              3. Pickup requests and quotes
            </h2>
            <p className="mt-3">
              You can request a pickup or quote through the website, by phone, by WhatsApp or by
              email. Please give accurate details of what you have, how much, where it is and how
              we can reach it.
            </p>
            <p className="mt-3">
              We offer pickup in the cities listed on this website, subject to availability.
              Response times on our pages, such as same-day pickup for urgent small lots or pickup
              within 24 to 48 hours, are targets and not guarantees. They depend on your location,
              the size of the job and slot availability.
            </p>
            <p className="mt-3">
              A quote is based on what you tell us. If what we find on inspection differs from your
              description, we may change the quote. We will explain why before we collect anything,
              and you can decline.
            </p>
            <p className="mt-3">
              You can cancel or reschedule free of charge before our team is dispatched.
            </p>
          </section>

          <section
            id="prices-and-payment"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              4. Prices, rates and payment
            </h2>
            <p className="mt-3">
              Rates shown on this website, such as &ldquo;Get up to&rdquo; prices for laptops,
              appliances and other items, are indicative. They show the most we may offer, not a
              promise. Your actual price depends on the item, its condition and completeness, its
              weight, and current material prices.
            </p>
            <p className="mt-3">
              We weigh and inspect items in front of you, and tell you the price before you hand
              anything over.
            </p>
            <p className="mt-3">
              Some items have little or no value. We will tell you before pickup. If a disposal fee
              applies, we will state it before you hand items over.
            </p>
            <p className="mt-3">
              We will confirm the payment method and timing when we confirm your quote or at
              pickup. For businesses, payment follows the written quote or purchase order.
            </p>
          </section>

          <section
            id="ownership-and-lawful-disposal"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              5. Ownership and lawful disposal
            </h2>
            <p className="mt-3">By handing items to us, you confirm that:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>You own the items, or have the authority to dispose of them.</li>
              <li>They are free of any lease, loan, lien or legal dispute.</li>
              <li>You have described them honestly, including any damage or hazard.</li>
            </ul>
            <p className="mt-3">
              We may refuse items if we have reason to doubt ownership, and we may report suspected
              stolen property to the authorities.
            </p>
            <p className="mt-3">
              If you are a bulk consumer under the E-Waste (Management) Rules, 2022, the Rules
              require you to hand your e-waste only to a registered producer, refurbisher or
              recycler. You can ask us for our registration documents at any time.
            </p>
          </section>

          <section
            id="items-we-cannot-accept"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              6. Items we cannot accept
            </h2>
            <p className="mt-3">We may not be able to accept:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Radioactive material</li>
              <li>Explosives, or items that contain them</li>
              <li>
                Infectious or biomedical waste, unless it has been properly decontaminated
              </li>
              <li>
                Items that leak chemicals, or damaged or swollen lithium batteries, unless agreed
                with us beforehand
              </li>
              <li>Any item that the law does not allow us to take</li>
            </ul>
            <p className="mt-3">
              Please tell us before booking if you have unusual or damaged equipment. We may refuse
              an item on the day, collect only part of a load, or change the quote.
            </p>
          </section>

          <section
            id="data-on-your-devices"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              7. Data on your devices
            </h2>
            <p className="mt-3">
              Please back up what you need, and sign out of accounts and remove locks, passwords
              and activation locks before you hand devices over.
            </p>
            <p className="mt-3">
              Devices that hold data can be handled under our{" "}
              <Link href="/services/data-destruction" className="text-primary hover:underline">
                data destruction
              </Link>{" "}
              process. Depending on the job, we may shred, degauss or wipe storage media, at your
              premises or at our facility, as agreed with you.
            </p>
            <p className="mt-3">
              If you ask for a certificate of destruction, it lists each serial number, the method
              used, the date and who witnessed it.
            </p>
            <p className="mt-3">
              Data destruction cannot be undone. Once destruction begins, data cannot be recovered,
              and we are not responsible for data you did not back up.
            </p>
          </section>

          <section
            id="collection-handover-and-documents"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              8. Collection, handover and documents
            </h2>
            <p className="mt-3">
              Our team will count and weigh items with you at handover. Please check the list and
              weights before you sign.
            </p>
            <p className="mt-3">
              For each pickup, we give you the documents that apply to the job. These can include a
              signed handover manifest in the Form 6 format, a weighed receipt, a certificate of
              destruction for storage media, and a recycling certificate.
            </p>
            <p className="mt-3">
              A certificate covers only the items listed for that pickup. Please check each
              document when you receive it, and tell us promptly if anything is wrong, so we can
              correct it.
            </p>
          </section>

          <section
            id="ownership-of-items-and-risk"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              9. Ownership of items and risk
            </h2>
            <p className="mt-3">
              When we collect items, they are our responsibility from the moment they are loaded.
              For scrap items you sell to us, ownership passes to us at handover once you accept
              the price. After that, items cannot be returned, because they may be dismantled or
              destroyed soon after.
            </p>
            <p className="mt-3">
              Where we act only as your service provider, for example for data destruction or EPR
              work, ownership of the items does not pass to us, and we process them as you
              instruct, within the law.
            </p>
          </section>

          <section
            id="recycling-and-compliance"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              10. Recycling and compliance
            </h2>
            <p className="mt-3">
              We handle e-waste in line with the E-Waste (Management) Rules, 2022 and other laws
              that apply, at our facility in Thumkunta, Bibinagar, Telangana.
            </p>
            <p className="mt-3">
              Copies of our registration and consent documents are available on request.
            </p>
          </section>

          <section
            id="business-and-epr-services"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              11. Business and EPR services
            </h2>
            <p className="mt-3">
              For business clients and EPR work, we agree the scope, fees and timelines in writing.
              You are responsible for the accuracy of the information and documents you give us,
              including the product and sales data used for EPR reporting.
            </p>
          </section>

          <section
            id="contact-details-and-messages"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              12. Contact details and messages
            </h2>
            <p className="mt-3">
              When you send us a request, you agree that we may contact you about it by phone,
              WhatsApp, SMS and email, using the details you give us.
            </p>
            <p className="mt-3">
              We handle your personal information as described in our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section
            id="our-responsibility"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              13. Our responsibility
            </h2>
            <p className="mt-3">
              We take reasonable care of your items from collection, and we carry out our services
              with reasonable skill.
            </p>
            <p className="mt-3">
              Subject to the next paragraph, our total responsibility for any claim connected with
              a service is limited to the amount payable for that service under the quote or
              agreement. We are not responsible for indirect or consequential loss.
            </p>
            <p className="mt-3">
              Nothing in these terms limits liability that cannot be limited by law, including
              liability for fraud, or for death or injury caused by our negligence. Nothing in them
              reduces your rights as a consumer under the Consumer Protection Act, 2019.
            </p>
            <p className="mt-3">
              We are not responsible for delay or failure caused by events outside our reasonable
              control, such as severe weather, strikes, government orders, road closures or
              building access refusals.
            </p>
          </section>

          <section
            id="your-responsibility"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              14. Your responsibility
            </h2>
            <p className="mt-3">
              You agree to compensate us for loss we suffer because you gave false information, or
              because you handed us items you had no right to dispose of.
            </p>
          </section>

          <section
            id="complaints-and-grievance-officer"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              15. Complaints and grievance officer
            </h2>
            <p className="mt-3">
              If you have a complaint about our website or services, please write to our Grievance
              Officer. We will acknowledge your complaint within 48 hours and aim to resolve it
              within one month of receiving it.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Email:{" "}
                <a href="mailto:info@sprecycling.in" className="text-primary hover:underline">
                  info@sprecycling.in
                </a>{" "}
                (mark for the attention of the Grievance Officer)
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+919949901238" className="text-primary hover:underline">
                  +91 99499 01238
                </a>
              </li>
              <li>Address: Thumkunta, Bibinagar, Telangana 500078</li>
            </ul>
          </section>

          <section
            id="governing-law-and-disputes"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              16. Governing law and disputes
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of India. If you have a problem, please talk to
              us first, and we will try to settle it fairly.
            </p>
            <p className="mt-3">
              If we cannot, any dispute is subject to the courts at Hyderabad, Telangana. This does
              not affect your right to approach a Consumer Commission or any forum that the law
              gives you.
            </p>
          </section>

          <section
            id="changes-to-these-terms"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              17. Changes to these terms
            </h2>
            <p className="mt-3">
              We may update these terms from time to time. We will post the new version on this
              page with a new last-updated date. A change applies to requests made after the date
              it is posted. Continuing to use the website or our services after that date means you
              accept the updated terms.
            </p>
          </section>

          <section
            id="general"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              18. General
            </h2>
            <p className="mt-3">
              If any part of these terms is found to be invalid, the rest stays in force. If we do
              not enforce a term at some point, that does not mean we give it up. These terms,
              together with any written quote or agreement and our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              , are the whole agreement between us for the services.
            </p>
          </section>

          <section
            id="contact-us"
            className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              19. Contact us
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Phone and WhatsApp:{" "}
                <a href="tel:+919949901238" className="text-primary hover:underline">
                  +91 99499 01238
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:info@sprecycling.in" className="text-primary hover:underline">
                  info@sprecycling.in
                </a>
              </li>
              <li>Address: Thumkunta, Bibinagar, Telangana 500078</li>
              <li>Hours: Monday to Saturday, 9 AM to 7 PM</li>
            </ul>
            <p className="mt-3">
              Or use our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>

          {/* <p className="rounded-xl border border-border bg-white/80 px-4 py-3 text-xs text-muted-foreground">
            This page is a working draft for sprecycling.in. Have a lawyer review it before relying
            on it as final legal advice.
          </p> */}
          </div>
        </div>
      </article>
    </main>
  )
}
