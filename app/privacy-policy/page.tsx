import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { absoluteUrl, SITE_URL } from "@/lib/seo"

const LAST_UPDATED = "2026-11-04"
const LAST_UPDATED_DISPLAY = "4 November 2026"

export const metadata: Metadata = {
  title: "Privacy Policy | SP Recycling",
  description:
    "How SP Recycling collects, uses and protects your personal information when you request a pickup, get a quote or use sprecycling.in.",
  ...canonicalMetadata("/privacy-policy"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | SP Recycling",
    description:
      "How SP Recycling collects, uses and protects your personal information when you request a pickup, get a quote or use sprecycling.in.",
    url: absoluteUrl("/privacy-policy"),
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
    title: "Privacy Policy | SP Recycling",
    description:
      "How SP Recycling collects, uses and protects your personal information when you request a pickup, get a quote or use sprecycling.in.",
  },
}

const toc = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "what-we-collect", label: "2. What we collect and why" },
  { id: "data-on-devices", label: "3. Data on devices you give us" },
  { id: "how-we-use", label: "4. How we use your information" },
  { id: "messages-from-us", label: "5. Messages from us" },
  { id: "cookies", label: "6. Cookies and similar tools" },
  { id: "who-we-share", label: "7. Who we share information with" },
  { id: "where-stored", label: "8. Where your information is stored" },
  { id: "how-long", label: "9. How long we keep information" },
  { id: "how-we-protect", label: "10. How we protect information" },
  { id: "your-rights", label: "11. Your rights and choices" },
  { id: "children", label: "12. Children" },
  { id: "links", label: "13. Links to other sites" },
  { id: "changes", label: "14. Changes to this policy" },
  { id: "complaints", label: "15. Complaints and Grievance Officer" },
  { id: "contact-us", label: "16. Contact us" },
]

const collectRows = [
  {
    info: "Your name, phone number and email",
    when: "When you fill in a form, call, message us on WhatsApp or email us",
    why: "To reply, give you a quote, schedule a pickup and give support",
  },
  {
    info: "Pickup details: address, city, item type, quantity, photos you send and your message",
    when: "In the pickup form, the calculator, calls and chats",
    why: "To quote, plan and carry out the collection",
  },
  {
    info: "Business details: company, your role, site contact, gate-pass and vehicle details, asset lists",
    when: "When a business requests a quote or pickup",
    why: "To plan access to your site and document the job",
  },
  {
    info: "Transaction records: items, weights, prices, invoices and GST details",
    when: "At pickup and payment",
    why: "To pay you, issue invoices and keep tax records",
  },
  {
    info: "Compliance records: names and addresses on handover manifests, weighment slips and certificates, and the names of witnesses",
    when: "When we collect and process your items",
    why: "To keep the records that recycling rules require, and to give you proof for your audits",
  },
  {
    info: "Website and device data: IP address, browser, device type, pages visited, the page that sent you, approximate location, and cookies",
    when: "Automatically when you use the site",
    why: "To run and secure the site, and to understand how it is used",
  },
  {
    info: "Reviews and testimonials: your name, role, company, and photo or video if you share them",
    when: "When you choose to give a review",
    why: "To publish it, with your permission",
  },
  {
    info: "Messages and complaints",
    when: "When you write to us",
    why: "To look into your concern and respond",
  },
]

const cookieRows = [
  {
    type: "Essential",
    what: "Keeps the site working and secure, and remembers cookie choices",
  },
  {
    type: "Analytics",
    what: "Shows us how many people visit, and which pages they use",
  },
  {
    type: "Advertising",
    what: "Measures our ads, and may show you our ads on other sites",
  },
]

function PrivacyJsonLd() {
  const pageUrl = absoluteUrl("/privacy-policy")
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | SP Recycling",
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

function SectionCard({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50/80">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <PrivacyJsonLd />

      <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span>Privacy Policy</span>
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Effective date: {LAST_UPDATED_DISPLAY}. Last updated:{" "}
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            This policy explains what personal information SP Recycling Pvt Ltd collects, why we
            collect it, who we share it with, how long we keep it, and what choices and rights you
            have. It applies to sprecycling.in and to the services we provide when you ask us for a
            quote or pickup. Please read it together with our{" "}
            <Link href="/terms-and-conditions" className="font-medium text-primary hover:underline">
              Terms and Conditions
            </Link>
            .
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
              We collect what we need to quote, collect, pay for and document your pickup.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              We do not read or copy the data on devices you give us for destruction. We destroy
              or wipe it under our data destruction process.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              We do not sell your personal information.
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              You can ask to see, correct or delete your information, and you can withdraw your
              consent at any time.
            </li>
            <li className="flex gap-2 sm:col-span-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden />
              Write to our Grievance Officer if you have a concern. Details are in section 15.
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

          <div className="space-y-6">
            <SectionCard id="who-we-are" title="1. Who we are">
              <p>
                SP Recycling Pvt Ltd (we, us, our) decides how and why your personal information is
                used, as described in this policy. Our address is Thumkunta, Bibinagar, Telangana
                500078.
              </p>
              <p>
                You can reach us at{" "}
                <a href="mailto:info@sprecycling.in" className="text-primary hover:underline">
                  info@sprecycling.in
                </a>{" "}
                or{" "}
                <a href="tel:+919949901238" className="text-primary hover:underline">
                  +91 99499 01238
                </a>
                . For privacy questions, write to the same email and mark it for privacy or the
                Grievance Officer.
              </p>
            </SectionCard>

            <SectionCard id="what-we-collect" title="2. What we collect and why">
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-emerald-50 text-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Information</th>
                      <th className="px-4 py-3 font-semibold">When we collect it</th>
                      <th className="px-4 py-3 font-semibold">Why we use it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectRows.map((row, i) => (
                      <tr
                        key={row.info}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}
                      >
                        <td className="px-4 py-3 align-top font-medium text-foreground">
                          {row.info}
                        </td>
                        <td className="px-4 py-3 align-top">{row.when}</td>
                        <td className="px-4 py-3 align-top">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                We only ask for information we need for the purposes above. You may choose not to
                give some of it, but then we may not be able to give you a quote, collect your items
                or pay you.
              </p>
            </SectionCard>

            <SectionCard id="data-on-devices" title="3. Data on devices you give us">
              <p>
                This section is separate from the rest of the policy because it covers something
                different. When you hand us laptops, phones, servers or drives, they may hold
                personal or business data.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  We do not read, copy or use that data for our own purposes. We destroy it as part
                  of our{" "}
                  <Link href="/services/data-destruction" className="text-primary hover:underline">
                    data destruction
                  </Link>{" "}
                  process, or we wipe devices that are being prepared for resale, as agreed for the
                  job.
                </li>
                <li>
                  For business clients, we act on your instructions. You decide what is destroyed
                  and how, and we give you a certificate that lists serial numbers.
                </li>
                <li>
                  Please back up what you need, and remove accounts and locks, before handover.
                  Data destruction cannot be undone. See section 7 of our{" "}
                  <Link
                    href="/terms-and-conditions#data-on-your-devices"
                    className="text-primary hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </li>
              </ul>
            </SectionCard>

            <SectionCard id="how-we-use" title="4. How we use your information">
              <p>We use your information to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Respond to your request, quote the job, and schedule, collect and weigh your items</li>
                <li>Pay you and issue invoices</li>
                <li>
                  Give you the documents for your pickup, such as the handover manifest, weighment
                  slip and certificates
                </li>
                <li>Keep the records that environmental, tax and company laws require</li>
                <li>Support you, and look into complaints</li>
                <li>Check ownership of items and prevent fraud or theft</li>
                <li>Run, secure and improve the website</li>
              </ul>
              <p>
                We use your information because you asked for a service and gave it to us for that
                purpose, because you agreed, or because the law requires or allows it. If you
                agreed, you can change your mind at any time.
              </p>
            </SectionCard>

            <SectionCard id="messages-from-us" title="5. Messages from us">
              <p>
                We will contact you about your request by phone, WhatsApp, SMS and email. These
                service messages are part of doing the job.
              </p>
              <p>
                You can ask us to stop any messages that are not needed for a service you have
                booked.
              </p>
            </SectionCard>

            <SectionCard id="cookies" title="6. Cookies and similar tools">
              <p>
                Cookies are small files that a website stores on your device. We use Google Tag
                Manager (container GTM-MVCCSXW6) to load tools on our site. Analytics tools, such
                as Vercel Analytics, may also run when you use the site.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-emerald-50 text-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieRows.map((row, i) => (
                      <tr
                        key={row.type}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                        <td className="px-4 py-3">{row.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Optional cookies are used only if you agree through our cookie banner. You can also
                block or delete cookies in your browser settings. Blocking some cookies can affect
                how the site works.
              </p>
            </SectionCard>

            <SectionCard id="who-we-share" title="7. Who we share information with">
              <p>
                We do not sell your personal information. We share it only as needed with:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Service providers working for us, such as transport and collection partners,
                  payment and banking providers, website hosting and maintenance, and communication
                  tools like WhatsApp and email services. They may use your information only to
                  serve us.
                </li>
                <li>
                  Analytics and advertising providers, through the cookies described in section 6
                </li>
                <li>
                  Authorities and regulators, such as pollution control boards, tax authorities and
                  courts, when the law requires it
                </li>
                <li>Our professional advisers, such as auditors and lawyers</li>
                <li>
                  A buyer or successor, if our business is sold or merged, and the same protections
                  continue
                </li>
              </ul>
            </SectionCard>

            <SectionCard id="where-stored" title="8. Where your information is stored">
              <p>
                Some of the tools we use, such as Google services and our hosting providers, may
                store or process information outside India. We do this only as the law allows, and
                we expect those providers to protect it.
              </p>
            </SectionCard>

            <SectionCard id="how-long" title="9. How long we keep information">
              <p>
                We keep information only for as long as we need it for the purpose it was collected,
                or as the law requires. Then we delete it or make it anonymous.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="font-semibold text-foreground">Enquiries that did not lead to a service:</strong>{" "}
                  only as long as needed to follow up, then deleted or anonymised.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Quotes, invoices and payment records:</strong>{" "}
                  as long as tax and company law require.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Handover manifests, weighment slips and certificates:
                  </strong>{" "}
                  as long as the E-Waste Rules and the authorities require.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Website analytics data:</strong>{" "}
                  according to the settings of the analytics tools we use.
                </li>
                <li>
                  <strong className="font-semibold text-foreground">Complaints and correspondence:</strong>{" "}
                  until the matter is closed, and then for as long as needed for follow-up or legal
                  reasons.
                </li>
              </ul>
            </SectionCard>

            <SectionCard id="how-we-protect" title="10. How we protect information">
              <p>
                We use reasonable safeguards, such as secure connections on our website and limiting
                who can see customer records.
              </p>
              <p>
                No website or method of sending information is completely secure, so we cannot
                promise absolute security. If a data breach affects you, we will tell you and the
                authorities as the law requires.
              </p>
            </SectionCard>

            <SectionCard id="your-rights" title="11. Your rights and choices">
              <p>You can write to us to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Ask for a summary of the personal information we hold about you, and who we have
                  shared it with
                </li>
                <li>Ask us to correct, complete or update it</li>
                <li>
                  Ask us to delete it, when we no longer need it for the purpose or the law does not
                  require us to keep it
                </li>
                <li>
                  Withdraw your consent. It should be as easy to withdraw as it was to give
                </li>
                <li>Make a complaint, as explained in section 15</li>
                <li>
                  Name another person to exercise these rights for you if you die or cannot do so
                </li>
              </ul>
              <p>
                To use any of these, email{" "}
                <a href="mailto:info@sprecycling.in" className="text-primary hover:underline">
                  info@sprecycling.in
                </a>{" "}
                from the address you gave us. We may ask you to confirm who you are first. If you
                withdraw consent, we may not be able to continue a service, and that does not affect
                anything we did lawfully before.
              </p>
              <p>
                Some records, such as tax invoices and environmental records, must be kept by law.
                We cannot delete those until the legal period ends.
              </p>
            </SectionCard>

            <SectionCard id="children" title="12. Children">
              <p>
                Our website and services are for adults. We do not knowingly collect information
                from anyone under 18. If you believe a child has given us information, please write
                to us and we will delete it.
              </p>
            </SectionCard>

            <SectionCard id="links" title="13. Links to other sites">
              <p>
                Our site links to other websites, such as government pages and social media. We are
                not responsible for their privacy practices. Please read their policies.
              </p>
            </SectionCard>

            <SectionCard id="changes" title="14. Changes to this policy">
              <p>
                We may update this policy from time to time. We will post the new version on this
                page with a new last-updated date. If a change affects how we use your information,
                we will tell you in a clear way, and we will ask for your consent again if the law
                requires it.
              </p>
            </SectionCard>

            <SectionCard id="complaints" title="15. Complaints and Grievance Officer">
              <p>
                If you have a concern about how we handle your information, please write to our
                Grievance Officer. We will acknowledge your complaint within 48 hours and aim to
                resolve it within one month.
              </p>
              <ul className="list-disc space-y-2 pl-5">
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
              <p>
                If you are not satisfied with our response, you may complain to the Data Protection
                Board of India once its complaint process is available, where the law allows it.
              </p>
            </SectionCard>

            <SectionCard id="contact-us" title="16. Contact us">
              <ul className="list-disc space-y-2 pl-5">
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
              <p>
                Or use our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>
                . See also our{" "}
                <Link href="/terms-and-conditions" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>
                .
              </p>
            </SectionCard>

            <p className="rounded-xl border border-border bg-white/80 px-4 py-3 text-xs text-muted-foreground">
              This page is a working draft for sprecycling.in. Have a lawyer review it before
              relying on it as final legal advice.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
