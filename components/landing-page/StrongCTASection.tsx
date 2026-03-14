"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function StrongCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    city: "",
    phone: ""
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'strong-cta',
          data: {
            name: formData.name.trim(),
            company: formData.company.trim(),
            city: formData.city.trim(),
            phone: formData.phone.trim(),
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: "", company: "", city: "", phone: "" });
    }, 3000);
      } else {
        setIsSubmitting(false);
        console.error('Error submitting form:', result.error);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Unable to submit. Please check your connection and try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F3D2E 0%, #145C45 50%, #0E2A22 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-emerald-400/10 via-transparent to-transparent opacity-40" />

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(31,164,99,0.1) 50%, transparent 100%)",
          animation: "gradientShift 15s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-12 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transform transition-all duration-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-white mb-4 sm:mb-6">
              Dispose E-Waste Safely.{" "}
              <span className="relative inline-block">
                Stay Compliant.
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-transparent group-hover:w-full transition-all duration-700"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: '400ms'
                  }}
                />
              </span>{" "}
              <span className="relative text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Protect Your Brand.
              </span>
            </h2>

            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Certified corporate pickup with secure handling and regulatory compliance.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-sm font-semibold text-white uppercase tracking-[1.5px]">
                Same Day Pickup Available
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="tel:+919949901238"
                className={`group relative bg-white text-[#0F3D2E] px-7 py-4 rounded-2xl font-bold text-base
                  hover:-translate-y-1 transition-all duration-300
                  shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]
                  flex items-center justify-center gap-3 overflow-hidden
                  transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: '200ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative">
                  <Phone className="w-5 h-5 group-hover:animate-bounce" />
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </div>
                <span className="relative">Call Now</span>
              </a>

              <a
                href="https://wa.me/919949901238?text=Hi%2C%20I%27m%20interested%20in%20scheduling%20an%20instant%20pickup%20for%20e-waste.%20Please%20let%20me%20know%20the%20next%20available%20slot."
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-7 py-4 rounded-2xl font-bold text-base
                  hover:-translate-y-1 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300
                  shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_45px_rgba(31,164,99,0.4)]
                  flex items-center justify-center gap-3 overflow-hidden animate-float
                  transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: '300ms'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Chat on WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </a>
            </div>
          </div>

          <div
            className={`transform transition-all duration-800 delay-400 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">
                    Schedule Instant Pickup
                  </h3>
                  <div className="hidden md:flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      Certified
                    </span>
                  </div>
                </div>

                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative mb-4">
                      <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      Request Received!
                    </h4>
                    <p className="text-white/70">
                      We'll contact you shortly to confirm your pickup.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none
                          ${focusedField === "name" || formData.name
                            ? "top-2 text-xs text-emerald-400"
                            : "top-5 text-base text-white"
                          }`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full h-14 bg-white/15 border border-white/30 rounded-xl px-4 pt-6 pb-2
                          text-white placeholder-white/50 outline-none
                          focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(31,164,99,0.3)]
                          transition-all duration-300"
                      />
                    </div>

                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none
                          ${focusedField === "company" || formData.company
                            ? "top-2 text-xs text-emerald-400"
                            : "top-5 text-base text-white"
                          }`}
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("company")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full h-14 bg-white/15 border border-white/30 rounded-xl px-4 pt-6 pb-2
                          text-white placeholder-white/50 outline-none
                          focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(31,164,99,0.3)]
                          transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label
                          className={`absolute left-4 transition-all duration-300 pointer-events-none
                            ${focusedField === "city" || formData.city
                              ? "top-2 text-xs text-emerald-400"
                              : "top-5 text-base text-white"
                            }`}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("city")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full h-14 bg-white/15 border border-white/30 rounded-xl px-4 pt-6 pb-2
                            text-white placeholder-white/50 outline-none
                            focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(31,164,99,0.3)]
                            transition-all duration-300"
                        />
                      </div>

                      <div className="relative">
                        <label
                          className={`absolute left-4 transition-all duration-300 pointer-events-none
                            ${focusedField === "phone" || formData.phone
                              ? "top-2 text-xs text-emerald-400"
                              : "top-5 text-base text-white"
                            }`}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full h-14 bg-white/15 border border-white/30 rounded-xl px-4 pt-6 pb-2
                            text-white placeholder-white/50 outline-none
                            focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(31,164,99,0.3)]
                            transition-all duration-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full bg-white text-[#0F3D2E] px-8 py-4 rounded-2xl font-bold text-base
                        hover:-translate-y-1 transition-all duration-300
                        shadow-[0_12px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_45px_rgba(255,255,255,0.2)]
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                        overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-[#0F3D2E]/30 border-t-[#0F3D2E] rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Schedule Pickup
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>

                    <p className="text-center text-sm text-white/60 mt-4">
                      By submitting, you agree to our secure data handling policy.
                    </p>
                  </form>
                )}
              </div>

              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute -top-2 -left-2 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
