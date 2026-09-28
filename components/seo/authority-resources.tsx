import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const AUTHORITY_LINKS = [
  {
    label: "CPCB — E-Waste Management",
    href: "https://cpcb.nic.in/e-waste/",
    note: "Central Pollution Control Board guidance on e-waste rules in India",
  },
  {
    label: "MoEFCC — Hazardous Waste & E-Waste",
    href: "https://moef.gov.in/",
    note: "Ministry of Environment, Forest and Climate Change",
  },
  {
    label: "India E-Waste Rules (overview)",
    href: "https://cpcb.nic.in/rules-3/",
    note: "Regulatory framework for authorized recycling channels",
  },
]

type AuthorityResourcesProps = {
  compact?: boolean
  className?: string
}

/**
 * Cites high-authority sources (trust + transparency).
 * Inbound backlinks still require outreach; this page is a linkable asset.
 */
export function AuthorityResources({ compact = false, className }: AuthorityResourcesProps) {
  return (
    <section className={cn("px-4 sm:px-6 lg:px-8 py-8", className)}>
      <div className={cn("mx-auto", compact ? "max-w-3xl" : "max-w-5xl")}>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Official resources & standards
        </h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
          We follow India&apos;s authorized e-waste framework. Use these official references when
          verifying recyclers, EPR duties, or disposal rules.
        </p>
        <ul className="space-y-3">
          {AUTHORITY_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {item.label}
                  <span className="block font-normal text-muted-foreground group-hover:no-underline">
                    {item.note}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        {!compact ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Media or partners: see our{" "}
            <Link href="/resources" className="text-primary font-medium underline underline-offset-4">
              resources & citeable facts
            </Link>{" "}
            page, or{" "}
            <Link href="/contact" className="text-primary font-medium underline underline-offset-4">
              contact us
            </Link>
            .
          </p>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">
            More citeable facts:{" "}
            <Link href="/resources" className="text-primary underline underline-offset-4">
              /resources
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
