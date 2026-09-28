import { cn } from "@/lib/utils"

type ContentFreshnessProps = {
  lastReviewed: string
  className?: string
}

/** Visible freshness signal for users + crawlers (pair with sitemap lastModified). */
export function ContentFreshness({ lastReviewed, className }: ContentFreshnessProps) {
  const formatted = new Date(`${lastReviewed}T00:00:00`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <p className={cn("text-xs sm:text-sm text-muted-foreground", className)}>
      <time dateTime={lastReviewed}>Last reviewed: {formatted}</time>
      {" · "}
      Rates and coverage are checked regularly so this page stays accurate.
    </p>
  )
}
