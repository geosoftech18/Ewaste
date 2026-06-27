import {
  MapPin,
  FileText,
  ShieldCheck,
  PackageX,
  Leaf,
  type LucideIcon,
} from "lucide-react"

const highlights: { label: string; icon: LucideIcon }[] = [
  { label: "PAN India Service", icon: MapPin },
  { label: "Form 6 Documentation", icon: FileText },
  { label: "Data Destruction Certificates", icon: ShieldCheck },
  { label: "Asset Destruction Proof", icon: PackageX },
  { label: "Green Certification", icon: Leaf },
]

export default function FooterHighlights() {
  return (
    <section
      aria-label="Service highlights"
      className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 py-2 "
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-2 lg:px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {highlights.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 sm:gap-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-4 sm:py-2 hover:bg-white/15 transition-colors duration-300"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 text-white shadow-sm">
                <Icon className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2} aria-hidden />
              </span>
              <span className="text-sm sm:text-[0.9rem] lg:text-[12px] font-semibold text-white leading-snug">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
