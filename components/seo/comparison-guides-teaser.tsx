import Link from "next/link"
import { ArrowRight, Scale } from "lucide-react"
import { comparisonGuides } from "@/data/comparisons"

export function ComparisonGuidesTeaser() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary mb-1">Compare & decide</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Helpful comparison guides
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Clear side-by-side answers before you sell or schedule pickup.
            </p>
          </div>
          <Link
            href="/compare"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {comparisonGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/compare/${guide.slug}`}
              className="group rounded-2xl border border-border bg-background p-5 transition hover:border-primary/40 hover:shadow-md"
            >
              <Scale className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {guide.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{guide.excerpt}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/compare"
          className="mt-4 inline-flex sm:hidden items-center gap-1 text-sm font-semibold text-primary"
        >
          View all comparisons
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
