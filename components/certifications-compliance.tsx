"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Shield, Download, Award, Leaf, Lock, FileCheck, CheckCircle2, Building2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Certification {
  id: string
  title: string
  shortTitle: string
  icon: React.ReactNode
  description: string
  issuedBy: string
  validUntil?: string
  certificateNumber?: string
}

const certifications: Certification[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    shortTitle: "Quality Management",
    icon: <Award className="w-12 h-12" />,
    description:
      "International standard for Quality Management Systems, ensuring consistent quality in our recycling processes and customer service.",
    issuedBy: "International Organization for Standardization",
    validUntil: "December 2025",
    certificateNumber: "ISO-9001-2024-IN-12345",
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015",
    shortTitle: "Environmental Management",
    icon: <Leaf className="w-12 h-12" />,
    description:
      "Environmental Management System certification demonstrating our commitment to reducing environmental impact and promoting sustainability.",
    issuedBy: "International Organization for Standardization",
    validUntil: "December 2025",
    certificateNumber: "ISO-14001-2024-IN-67890",
  },
  {
    id: "iso-45001",
    title: "ISO 45001",
    shortTitle: "Health & Safety",
    icon: <Shield className="w-12 h-12" />,
    description:
      "Occupational Health and Safety Management System ensuring safe working conditions for our employees and partners.",
    issuedBy: "International Organization for Standardization",
    validUntil: "December 2025",
    certificateNumber: "ISO-45001-2024-IN-11223",
  },
  {
    id: "cpcb",
    title: "CPCB Authorization",
    shortTitle: "CPCB Certified",
    icon: <Building2 className="w-12 h-12" />,
    description:
      "Central Pollution Control Board authorization for handling, processing, and recycling electronic waste in compliance with E-Waste Management Rules.",
    issuedBy: "Central Pollution Control Board, India",
    validUntil: "March 2026",
    certificateNumber: "CPCB/E-WASTE/2024/MH/001",
  },
  {
    id: "epr",
    title: "EPR Compliance",
    shortTitle: "EPR Authorized",
    icon: <CheckCircle2 className="w-12 h-12" />,
    description:
      "Extended Producer Responsibility authorization ensuring proper collection, channelization, and recycling of electronic waste.",
    issuedBy: "Ministry of Environment, Forest and Climate Change",
    validUntil: "March 2026",
    certificateNumber: "EPR/2024/MH/E-WASTE/002",
  },
  {
    id: "rohs",
    title: "RoHS Compliant",
    shortTitle: "RoHS Certified",
    icon: <FileCheck className="w-12 h-12" />,
    description:
      "Restriction of Hazardous Substances compliance ensuring safe handling and disposal of electronic components without harmful materials.",
    issuedBy: "Bureau of Indian Standards",
    validUntil: "Ongoing",
    certificateNumber: "RoHS-2024-IN-445566",
  },
  {
    id: "data-destruction",
    title: "Data Destruction Certificate",
    shortTitle: "Secure Data Destruction",
    icon: <Lock className="w-12 h-12" />,
    description:
      "Certified secure data destruction services for IT equipment, ensuring complete data sanitization and privacy protection.",
    issuedBy: "National Association for Information Destruction",
    validUntil: "December 2025",
    certificateNumber: "NAID-AAA-2024-IN-7890",
  },
]

export function CertificationsCompliance() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const handleDownloadPDF = () => {
    // In a real implementation, this would download the actual PDF
    alert("Downloading certifications PDF...")
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Certified. Compliant. Trusted.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We follow the highest industry standards and government regulations for safe and sustainable e-waste
            management.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6 mb-8">
            {certifications.map((cert, index) => (
              <Tooltip key={cert.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedCert(cert)}
                    className="bg-white rounded-xl border-2 border-green-100 p-4 md:p-6 cursor-pointer group hover:border-green-400 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Icon with glow effect */}
                    <div className="flex justify-center mb-3 md:mb-4 text-green-600 group-hover:text-green-500 transition-colors relative">
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(34, 197, 94, 0)",
                            "0 0 20px rgba(34, 197, 94, 0.3)",
                            "0 0 0px rgba(34, 197, 94, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="rounded-full p-2"
                      >
                        {cert.icon}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 text-center mb-1 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-600 text-center leading-tight">{cert.shortTitle}</p>

                    {/* Hover indicator */}
                    <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-green-600 font-medium">Click for details</span>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm">{cert.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={handleDownloadPDF}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Our Certifications (PDF)
          </Button>
        </motion.div>
      </div>

      {/* Certificate Details Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="text-green-600">{selectedCert?.icon}</div>
              {selectedCert?.title}
            </DialogTitle>
            <DialogDescription className="text-base pt-4 space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Description</div>
                <p className="text-gray-600 leading-relaxed">{selectedCert?.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Issued By</div>
                  <p className="text-gray-600">{selectedCert?.issuedBy}</p>
                </div>

                {selectedCert?.validUntil && (
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Valid Until</div>
                    <p className="text-gray-600">{selectedCert.validUntil}</p>
                  </div>
                )}
              </div>

              {selectedCert?.certificateNumber && (
                <div>
                  <div className="font-semibold text-gray-900 mb-1">Certificate Number</div>
                  <p className="text-gray-600 font-mono text-sm">{selectedCert.certificateNumber}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 italic">Click outside or press ESC to close</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
