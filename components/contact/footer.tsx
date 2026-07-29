import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            {/* <h3 className="text-white font-bold text-lg mb-4 group-hover:text-emerald-400 transition-colors">
              SP Recycling
            </h3> */}
            <Image src="/S.P recycling-footer.png" alt="SP Recycling" width={400} height={200} className="mb-4 h-10 !w-60" />
            <p className="text-sm text-gray-400 mb-4 hover:text-gray-300 transition-colors">
              Leading e-waste recycling solutions for a sustainable future.
            </p>
            <div className="flex gap-4">
              {(
                [
                  { Icon: Facebook, label: "SP Recycling on Facebook", href: "https://www.facebook.com/" },
                  { Icon: Linkedin, label: "SP Recycling on LinkedIn", href: "https://www.linkedin.com/" },
                  { Icon: Twitter, label: "SP Recycling on X (Twitter)", href: "https://twitter.com/" },
                  { Icon: Youtube, label: "SP Recycling on YouTube", href: "https://www.youtube.com/" },
                ] as const
              ).map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in animation-delay-200 border-l-2 border-white pl-4 sm:border-l-0 sm:pl-0">
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Social Impact", href: "/social-impact" },
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in animation-delay-400 border-l-2 border-white pl-4 sm:border-l-0 sm:pl-0">
            <h4 className="text-white text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "E-Waste Recycling", href: "/services/electronic-waste-recycle" },
                { label: "IT & Telecom Equipment", href: "/services/it-telecom" },
                { label: "Consumer Electronics", href: "/services/consumer-electronics" },
                { label: "Data Destruction", href: "/services/data-destruction" },
                { label: "Sustainable Waste Solutions", href: "/services/Sustainable-Waste-Solutions" },
                { label: "EPR Compliance", href: "/services/EPR-Compliance-Solutions" },
              ].map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in animation-delay-400 border-l-2 border-white pl-4 sm:border-l-0 sm:pl-0">
            <h4 className="text-white text-lg font-bold mb-4">Cities We Serve</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Hyderabad", slug: "hyderabad" },
                { label: "Delhi", slug: "delhi" },
                { label: "Mumbai", slug: "mumbai" },
                { label: "Bangalore", slug: "bangalore" },
                { label: "Chennai", slug: "chennai" },
                { label: "Pune", slug: "pune" },
                { label: "Andhra Pradesh", slug: "andhra-pradesh" },
                { label: "Gujarat", slug: "gujarat" },
              ].map((city) => (
                <li key={city.slug}>
                  <a
                    href={`/services/city/${city.slug}`}
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {city.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in animation-delay-600 border-l-2 border-white pl-4 sm:border-l-0 sm:pl-0">
            <h4 className="text-white text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+919949901238"
                  className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 inline-block"
                >
                  +91 9949 901 238
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sprecycling.in"
                  className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 inline-block"
                >
                  info@sprecycling.in
                </a>
              </li>
              <li className="text-xs text-gray-500 mt-4">Thumkunta, Bibinagar, Telangana 500078</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in animation-delay-800">
            <p className="text-sm text-gray-400">© {currentYear} SP Recycling Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 inline-block">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 inline-block">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
