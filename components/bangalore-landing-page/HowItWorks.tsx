function FixedPriceArt() {
  return (
    <svg viewBox="0 0 220 160" className="mx-auto h-[150px] w-[210px]" aria-hidden>
      <ellipse cx="110" cy="82" rx="78" ry="70" fill="#c9ead6" />
      <rect x="86" y="42" width="52" height="92" rx="8" fill="#1f2937" />
      <rect x="90" y="48" width="44" height="72" rx="3" fill="#ecfdf5" />
      <circle cx="112" cy="128" r="4" fill="#9ca3af" />
      <circle cx="112" cy="84" r="12" fill="#22c55e" />
      <path
        d="M106 84.5 110 88.5l8-9"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M68 118c8-18 22-28 38-30"
        stroke="#f8b4a0"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="64" cy="126" r="9" fill="#f8b4a0" />
      <g transform="translate(118 18)">
        <rect width="78" height="36" rx="6" fill="#f5c518" />
        <text
          x="39"
          y="15"
          textAnchor="middle"
          fill="#1f2937"
          fontSize="8"
          fontWeight="800"
        >
          BEST PRICE
        </text>
        <text
          x="39"
          y="28"
          textAnchor="middle"
          fill="#1f2937"
          fontSize="8"
          fontWeight="700"
        >
          SELL NOW
        </text>
      </g>
    </svg>
  );
}

function DoorstepPickupArt() {
  return (
    <svg viewBox="0 0 220 160" className="mx-auto h-[150px] w-[210px]" aria-hidden>
      <ellipse cx="110" cy="82" rx="78" ry="70" fill="#c9ead6" />
      <rect x="58" y="28" width="70" height="100" rx="4" fill="#dbeafe" />
      <rect x="64" y="36" width="58" height="84" fill="#93c5fd" />
      <rect x="118" y="28" width="12" height="100" fill="#64748b" />
      <circle cx="126" cy="80" r="3" fill="#fbbf24" />
      <circle cx="86" cy="58" r="12" fill="#f8b4a0" />
      <rect x="72" y="70" width="28" height="36" rx="6" fill="#86efac" />
      <circle cx="148" cy="56" r="12" fill="#e8b48a" />
      <rect x="134" y="68" width="28" height="38" rx="6" fill="#fb923c" />
      <rect x="108" y="78" width="22" height="14" rx="3" fill="#1f2937" />
      <rect x="112" y="81" width="14" height="8" rx="1" fill="#86efac" />
    </svg>
  );
}

function InstantPaymentArt() {
  return (
    <svg viewBox="0 0 220 160" className="mx-auto h-[150px] w-[210px]" aria-hidden>
      <ellipse cx="110" cy="82" rx="78" ry="70" fill="#c9ead6" />
      <rect x="98" y="22" width="70" height="116" rx="10" fill="#1f2937" />
      <rect x="104" y="30" width="58" height="92" rx="4" fill="#ecfdf5" />
      <circle cx="133" cy="68" r="16" fill="#22c55e" />
      <path
        d="M125 68.5 131 74.5l16-16"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="133"
        y="102"
        textAnchor="middle"
        fill="#166534"
        fontSize="6"
        fontWeight="700"
      >
        Payment Received
      </text>
      <circle cx="74" cy="58" r="12" fill="#f8b4a0" />
      <rect x="60" y="70" width="28" height="40" rx="6" fill="#4ade80" />
      <rect x="66" y="108" width="8" height="18" fill="#1f2937" />
      <rect x="74" y="108" width="8" height="18" fill="#1f2937" />
    </svg>
  );
}

const steps = [
  {
    title: "Fixed Price",
    description: "What we show is what we pay",
    Art: FixedPriceArt,
  },
  {
    title: "Doorstep Pickup",
    description: "Schedule now and get it picked up within 24-48 hours",
    Art: DoorstepPickupArt,
  },
  {
    title: "Instant Payment",
    description: "Get the best price with instant payment after pickup",
    Art: InstantPaymentArt,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Sell Used Electronics in 3 Simple Steps
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-gray-500 sm:text-lg">
          India’s largest online platform for selling used electronics
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ title, description, Art }) => (
            <article
              key={title}
              className="rounded-[22px] bg-mint px-6 py-8 text-center"
            >
              <Art />
              <h3 className="mt-2 text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-gray-700">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
