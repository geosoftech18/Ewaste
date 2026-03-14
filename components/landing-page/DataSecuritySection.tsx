"use client";

import { Shield, CheckCircle2, Lock, FileCheck, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function DataSecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0F14] py-20 lg:py-30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-blue-950/20" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(31,164,99,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,164,99,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[sweep_12s_ease-in-out_infinite]" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          {/* Left Column - Desktop: Heading + Content, Mobile: Heading first, Content after visual */}
          <div className="w-full lg:col-span-1 space-y-6 sm:space-y-8 order-1 lg:order-1">
            {/* Heading - Mobile: First, Desktop: First in left column */}
            <div>
              <div
                className={`transform transition-all duration-900 ${
                  isVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-97"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] text-white">
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                    100% Certified
                  </span>
                  <br />
                  <span className="relative inline-block">
                    Data Destruction
                    <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/60 to-emerald-500/0 animate-[glow_8s_ease-in-out_infinite]" />
                  </span>
                  <br />
                  Guarantee
                </h2>
              </div>
            </div>

            {/* Content - Mobile: Hidden (will show after visual), Desktop: Second in left column */}
            <div className="hidden lg:block space-y-6 sm:space-y-8">
              <div
                className={`transform transition-all duration-900 delay-200 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <p className="text-base sm:text-lg text-white/80 max-w-[720px] leading-relaxed">
                  Enterprise-grade secure destruction of storage devices with verifiable certification and compliance documentation.
                </p>

                <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-emerald-500/40 to-transparent mt-4 sm:mt-6" />

                <div className="flex items-center gap-2 mt-4 sm:mt-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-xs uppercase tracking-[1.5px] text-white/70 font-medium">
                    Certificate Provided Post Destruction
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transform transition-all duration-900 delay-400 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {[
                  { icon: Truck, text: "On-Site Destruction Available" },
                  { icon: Lock, text: "Encrypted Logistics Chain" },
                  { icon: FileCheck, text: "Audit-Ready Documentation" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white/[0.03] backdrop-blur-xl border border-emerald-500/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(31,164,99,0.15)]"
                    style={{
                      transitionDelay: `${600 + idx * 100}ms`
                    }}
                  >
                    <item.icon className="w-5 h-5 text-emerald-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-xs sm:text-sm text-white/90 font-medium leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`transform transition-all duration-900 delay-[800ms] ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <Link href="/audit-request">
                <button className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(31,164,99,0.35)] hover:shadow-[0_16px_50px_rgba(31,164,99,0.45)] hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 overflow-hidden w-full sm:w-auto">
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Request Secure Destruction Audit
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
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                </Link>

                <p className="text-xs text-white/60 mt-3 font-medium text-center sm:text-left">
                  Confidential & Enterprise Secure.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Section - Mobile: Second (after heading), Desktop: Second Column */}
          <div className="w-full lg:col-span-1 order-2 lg:order-2">
            <div className="relative flex items-center justify-center">
              <div
                className={`relative transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />

                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <svg
                    className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M200 40 L200 20 M320 80 L334 66 M360 200 L380 200 M320 320 L334 334 M200 360 L200 380 M80 320 L66 334 M40 200 L20 200 M80 80 L66 66"
                      stroke="rgba(31,164,99,0.3)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="animate-[pulse_3s_ease-in-out_infinite]"
                    />
                  </svg>

                  <Shield
                    className="absolute inset-0 m-auto w-48 h-48 lg:w-56 lg:h-56 text-emerald-400/30 animate-[pulse_6s_ease-in-out_infinite]"
                    strokeWidth={1}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
                      <div className="relative">
                        <svg
                          className="w-24 h-24 lg:w-28 lg:h-28"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="20"
                            y="30"
                            width="80"
                            height="60"
                            rx="4"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-emerald-400"
                          />
                          <rect
                            x="30"
                            y="40"
                            width="60"
                            height="40"
                            rx="2"
                            fill="currentColor"
                            className="text-emerald-400/20"
                          />
                          <line
                            x1="40"
                            y1="50"
                            x2="80"
                            y2="50"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-emerald-400"
                          />
                          <line
                            x1="40"
                            y1="60"
                            x2="80"
                            y2="60"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-emerald-400"
                          />
                          <line
                            x1="40"
                            y1="70"
                            x2="80"
                            y2="70"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-emerald-400"
                          />

                          <path
                            d="M85 45 L95 55 L85 65"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-400 animate-[pulse_2s_ease-in-out_infinite]"
                          />
                        </svg>

                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-[ping_2s_ease-in-out_infinite]" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse]">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400/40 rounded-full"
                        style={{
                          top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                          left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                          animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Mobile: Third (after visual), Desktop: Hidden (already in left column) */}
          <div className="w-full lg:hidden order-3 space-y-6 sm:space-y-8">
            <div
              className={`transform transition-all duration-900 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <p className="text-base sm:text-lg text-white/80 max-w-[720px] leading-relaxed">
                Enterprise-grade secure destruction of storage devices with verifiable certification and compliance documentation.
              </p>

              <div className="h-[1px] w-24 sm:w-32 bg-gradient-to-r from-emerald-500/40 to-transparent mt-4 sm:mt-6" />

              <div className="flex items-center gap-2 mt-4 sm:mt-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <p className="text-xs uppercase tracking-[1.5px] text-white/70 font-medium">
                  Certificate Provided Post Destruction
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transform transition-all duration-900 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {[
                { icon: Truck, text: "On-Site Destruction Available" },
                { icon: Lock, text: "Encrypted Logistics Chain" },
                { icon: FileCheck, text: "Audit-Ready Documentation" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white/[0.03] backdrop-blur-xl border border-emerald-500/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(31,164,99,0.15)]"
                  style={{
                    transitionDelay: `${600 + idx * 100}ms`
                  }}
                >
                  <item.icon className="w-5 h-5 text-emerald-400 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-xs sm:text-sm text-white/90 font-medium leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div
              className={`transform transition-all duration-900 delay-[800ms] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <button className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(31,164,99,0.35)] hover:shadow-[0_16px_50px_rgba(31,164,99,0.45)] hover:-translate-y-1 active:scale-[0.97] transition-all duration-300 overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Request Secure Destruction Audit
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
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <p className="text-xs text-white/60 mt-3 font-medium text-center sm:text-left">
                Confidential & Enterprise Secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sweep {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
