"use client"

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
            <Image src="/S.P recycling-footer.png" alt="SP Recycling" width={400} height={200} className="mb-4 h-15 !w-46" />
            <p className="text-sm text-gray-400 mb-4 hover:text-gray-300 transition-colors">
              Leading e-waste recycling solutions for a sustainable future.
            </p>
            <div className="flex gap-4">
              {[Facebook, Linkedin, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-emerald-400  transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in animation-delay-200">
            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Services", "Contact Us"].map((link, index) => (
                <li key={index}>
                  <a
                    href={link === "Home" ? "/" : link === "About Us" ? "/about" : link === "Services" ? "/services" : "/contact"}
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in animation-delay-400">
            <h4 className="text-white text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {["E-Waste Pickup", "IT & Telecom Equipment", "Sustainable Waste Solutions", "EPR Compliance Solutions"].map((service, index) => (
                <li key={index}>
                  <a
                    href={service === "E-Waste Pickup" ? "/services/electronic-waste-recycle" : service === "IT & Telecom Equipment" ? "/services/it-telecom" : service === "Sustainable Waste Solutions" ? "/services/Sustainable-Waste-Solutions" : service === "EPR Compliance Solutions" ? "/services/EPR-Compliance-Solutions" : "/services/data-destruction"}
                    className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in animation-delay-400">
            <h4 className="text-white text-lg font-bold mb-4">Cities We Serve</h4>
            <ul className="space-y-2 text-sm">
              {["Hyderabad", "Delhi", "Mumbai", "Bangalore", "Chennai","Pune","Andhra-Pradesh"].map((city, index) => (
                <li key={index}>
                  <a href={`/services/city/${city.toLowerCase()}`} className="hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 inline-block">
                    {city}
                  </a>
                </li>
              ))} 
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in animation-delay-600">
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
                  href="mailto:sprecycling563@gmail.com"
                  className="hover:text-emerald-400 transition-all duration-300 hover:scale-105 inline-block"
                >
                  sprecycling563@gmail.com
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
