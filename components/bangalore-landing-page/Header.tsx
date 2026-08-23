export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M7.5 8.2 4.8 12l2.7 3.8M16.5 8.2 19.2 12l-2.7 3.8M9.2 19.2h5.6M9.2 4.8h5.6"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[17px] font-bold tracking-tight">EcoRevive</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#categories" className="transition hover:text-white">
            Categories
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <a
            href="#inquiry"
            className="rounded-full bg-brand px-5 py-2.5 text-white transition hover:bg-brand-dark"
          >
            Sell now
          </a>
        </nav>
      </div>
    </header>
  );
}
