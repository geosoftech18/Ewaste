"use client"

import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapSection() {
  const offices = [
    {
      name: "Hyderabad Office",
      address: "Thumkunta, Bommalaramaram Mandal, Bibinagar, Yadadri Bhuvanagiri, Telangana, 500078",
      phone: "+91 9949 901 238",
      email: "sprecycling563@gmail.com",
      mapUrl: "https://www.google.com/maps/place/MANDAL+OFFICE+BOMMALARAMARAM/@17.560303,78.743674,13z/data=!4m6!3m5!1s0x3bcb798b399b1829:0xa9f5bab8e3461c20!8m2!3d17.5603031!4d78.7436737!16s%2Fg%2F11ddx8dr2y?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 animate-slide-up">Our Location</h2>
          <p className="text-lg text-gray-600 animate-fade-in animation-delay-200">
            Visit us or get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 lg:h-full min-h-96 hover:shadow-2xl transition-all duration-300 transform  animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8234567890!2d79.2!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d3d3d3d3d3d3d%3A0x0!2sBibinagar!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 transform  hover:-translate-y-2 animate-fade-in group"
              >
                <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-2 group-hover:text-emerald-700 transition-colors">
                  <MapPin className="w-6 h-6 text-emerald-600 group-hover:scale-125 transition-transform duration-300" />
                  {office.name}
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3 group/item">
                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1 group-hover/item:scale-125 transition-transform duration-300" />
                    <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                      {office.address}
                    </p>
                  </div>

                  <a
                    href={`tel:${office.phone}`}
                    className="flex gap-3 items-center text-gray-700 hover:text-emerald-600 transition-all duration-300 group/phone hover:scale-105"
                  >
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 group-hover/phone:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold group-hover/phone:underline">{office.phone}</span>
                  </a>

                  <a
                    href={`mailto:${office.email}`}
                    className="flex gap-3 items-center text-gray-700 hover:text-emerald-600 transition-all duration-300 group/email hover:scale-105"
                  >
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 group-hover/email:rotate-12 transition-transform duration-300" />
                    <span className="font-semibold group-hover/email:underline">{office.email}</span>
                  </a>

                  <Button
                    asChild
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
