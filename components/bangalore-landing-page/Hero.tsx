import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[min(52vh,400px)] items-center overflow-hidden sm:min-h-[min(60vh,460px)] md:min-h-[80vh]"
    >
      <Image
        src="/mobile-slider/slide-3.jpeg"
        alt="E-waste recycling truck and workers loading electronics for authorised recycling"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden"
      />
      <Image
        src="/bangalore-landing/hero-image.jpg"
        alt="Circuit board from electronics prepared for authorised e-waste recycling"
        fill
        sizes="90vw"
        className="hidden object-cover object-center md:block"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-emerald-950/60 via-slate-950/55 to-emerald-900/25"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20 md:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm md:mb-5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path
                  d="M10 2.2 12.1 6l4.2.6-3 3 .7 4.2L10 12.1 6 13.8l.7-4.2-3-3L8 6.2 10 2.2Z"
                  fill="white"
                />
              </svg>
            </span>
            Authorised E Waste recycler
          </p>

          <h1 className="text-2xl md:font-extrabold font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
            E-Waste Recycling Services in Hyderabad — Sell Old Electronics Fast
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:mt-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">
            Turn unused phones, laptops, TVs and gadgets into cash while they are
            recycled the right way. EcoRevive offers fixed prices, free doorstep
            pickup across Hyderabad, and authorised e-waste processing you can
            trust.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <a
              href="#categories"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Get a fixed price
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Schedule pickup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
