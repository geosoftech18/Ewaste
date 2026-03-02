"use client";

import { useEffect, useRef, useState } from "react";
import { Server, Radio, Factory, Building2, Landmark, Heart, Shield, Lock } from "lucide-react";

interface Industry {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  accent?: "security" | "shield";
}

const industries: Industry[] = [
  {
    icon: Server,
    title: "IT Companies",
    description: "Secure disposal of servers, storage devices, and enterprise IT infrastructure with certified data destruction.",
    tag: "High Data Sensitivity",
    accent: "security"
  },
  {
    icon: Radio,
    title: "Telecom",
    description: "Responsible recycling of network equipment, routers, and communication hardware.",
    tag: "Large-Scale Asset Management"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Compliance-driven EPR fulfillment and industrial electronic waste processing.",
    tag: "EPR Mandatory Sector"
  },
  {
    icon: Building2,
    title: "Government",
    description: "Secure and compliant handling of public-sector electronic assets and infrastructure.",
    tag: "Regulatory Sensitive",
    accent: "shield"
  },
  {
    icon: Landmark,
    title: "Banking",
    description: "Confidential data destruction and secure recycling for financial institutions.",
    tag: "High Confidentiality",
    accent: "security"
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Safe disposal of medical electronic devices and sensitive digital records.",
    tag: "Compliance Critical"
  }
];

export default function IndustriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0E1218] py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(31,164,99,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31,164,99,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-12">
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <div
            className={`transform transition-all duration-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4 sm:mb-6">
              Trusted Across{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Critical Industries
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-[720px] mx-auto leading-relaxed px-4">
              Delivering certified E-Waste management and compliance solutions across regulated sectors.
            </p>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              industry={industry}
              index={index}
              isVisible={isVisible}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <IndustryCarousel industries={industries} isVisible={isVisible} />
        </div>

        <div
          className={`mt-12 sm:mt-14 md:mt-16 text-center transform transition-all duration-800 delay-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <button className="group relative bg-transparent border-2 border-emerald-500/40 text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-emerald-500/10 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              See How We Serve Your Industry
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <p className="text-xs sm:text-sm text-white/50 mt-3 sm:mt-4 font-medium">
            Customized compliance solutions available.
          </p>
        </div>
      </div>
    </section>
  );
}

function IndustryCarousel({
  industries,
  isVisible
}: {
  industries: Industry[];
  isVisible: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 4000); // Auto-scroll every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isPaused, industries.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {industries.map((industry, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <IndustryCard
                industry={industry}
                index={index}
                isVisible={isVisible}
                hoveredIndex={null}
                setHoveredIndex={() => {}}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {industries.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-emerald-500"
                : "w-2 h-2 bg-white/20 hover:bg-white/30"
            }`}
            aria-label={`Go to industry ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function IndustryCard({
  industry,
  index,
  isVisible,
  hoveredIndex,
  setHoveredIndex,
  isMobile = false
}: {
  industry: Industry;
  index: number;
  isVisible: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`group relative bg-white/[0.03] backdrop-blur-xl border border-emerald-500/15 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-9
        ${!isMobile ? "hover:bg-white/[0.05] hover:-translate-y-2 hover:border-emerald-500/30 cursor-pointer" : ""}
        transition-all duration-300
        shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${!isMobile ? "hover:shadow-[0_24px_70px_rgba(31,164,99,0.2)]" : ""}
        transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }
        ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? "opacity-70" : "opacity-100"}
      `}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />

      <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-emerald-500 to-transparent group-hover:h-full transition-all duration-500" />

      <div className="relative z-10">
        <div className="relative mb-4 sm:mb-6">
          <div
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5
            flex items-center justify-center ${!isMobile ? "group-hover:scale-105" : ""} transition-transform duration-300
            ${industry.accent === "security" ? "animate-pulse" : ""}
          `}
          >
            {industry.accent === "security" && (
              <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-md animate-pulse" />
            )}
            {industry.accent === "shield" && (
              <Shield className="absolute inset-0 m-auto w-20 h-20 text-emerald-500/10 -z-10" />
            )}
            <industry.icon
              className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 relative z-10"
              strokeWidth={1.5}
            />
          </div>

          {industry.accent === "security" && (
            <>
              <div className="absolute top-0 left-0 w-14 h-14 sm:w-16 sm:h-16 border-2 border-emerald-500/30 rounded-xl animate-ping" />
              <Lock className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 bg-[#0E1218] rounded-full p-1" />
            </>
          )}
        </div>

        <div className="mb-3 sm:mb-4">
          <h3 className={`text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 ${!isMobile ? "group-hover:text-emerald-400" : ""} transition-colors duration-300`}>
            {industry.title}
          </h3>

          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              {industry.tag}
            </span>
          </div>
        </div>

        <p className={`text-white/70 leading-relaxed text-sm sm:text-[15px] ${!isMobile ? "group-hover:text-white/85" : ""} transition-colors duration-300`}>
          {industry.description}
        </p>

        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent group-hover:w-full transition-all duration-500" />
      </div>

      <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
      </div>
    </div>
  );
}
