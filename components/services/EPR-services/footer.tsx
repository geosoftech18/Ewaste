"use client"

import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-accent" />
              <span className="font-bold text-lg">SP Recycling</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Leading provider of EPR compliance and plastic waste management solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-accent transition">
                  EPR Registration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Compliance Filing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Target Fulfillment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-accent transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/60">
            © 2025 SP Recycling Pvt Ltd. All rights reserved. | Committed to a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  )
}
