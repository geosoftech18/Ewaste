"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, ArrowRight, CheckCircle2, Award, TrendingUp, Users, Lock, Fingerprint, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  industry: string;
  service: string;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const industries = [
  "IT & Technology",
  "Banking & Finance",
  "Healthcare",
  "Manufacturing",
  "Telecommunications",
  "Government",
  "Education",
  "Retail & E-commerce",
  "Other"
];

const services = [
  "E-Waste Recycling",
  "Data Destruction",
  "EPR Compliance",
  "Bulk Pickup",
  "Consultation",
  "Certification Documentation"
];

export default function FinalLeadSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
    industry: "",
    service: ""
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newParticles: FloatingParticle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
          type: 'final-lead',
          data: {
            fullName: formData.fullName.trim(),
            companyName: formData.companyName.trim(),
            workEmail: formData.workEmail.trim(),
            phone: formData.phone.trim(),
            industry: formData.industry,
            service: formData.service,
            email: formData.workEmail.trim(), // For thank you email
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        // Reset form
        setFormData({
          fullName: "",
          companyName: "",
          workEmail: "",
          phone: "",
          industry: "",
          service: ""
        });
        alert('Request submitted successfully! We will contact you shortly.');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-30 lg:py-30 px-4 sm:px-6 bg-gradient-to-b from-[#0A0F14] via-[#0D1218] to-[#0A0F14] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/[0.08] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-500/[0.05] via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(31,164,99,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(31,164,99,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="absolute inset-0 noise-texture opacity-40" />

      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/[0.08] to-transparent blur-[120px] rounded-full animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-teal-500/[0.06] to-transparent blur-[100px] rounded-full animate-pulse"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative max-w-[1320px] mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-3 sm:space-y-4 transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-semibold tracking-wide">Enterprise-Grade Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Let's Secure Your<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Compliance Today
            </span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Join 1000+ enterprises trusting us with their e-waste management and EPR compliance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          <div
            ref={formRef}
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative group">
              <div className="absolute -inset-[2px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-500/20 rounded-[24px] blur-xl group-hover:blur-2xl transition-all duration-500" />

              <div className="relative bg-[#0D1218]/80 backdrop-blur-2xl border border-emerald-500/20 rounded-xl sm:rounded-2xl md:rounded-[24px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.7)] hover:border-emerald-500/30 transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

                <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                  <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                    Full Name
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      required
                      className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base placeholder:text-white/50 focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-white/20"
                    />
                    {focusedField === 'fullName' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                    )}
                  </div>
                </div>

                <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                  <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                    Company Name
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('companyName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your company name"
                      required
                      className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base placeholder:text-white/50 focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-white/20"
                    />
                    {focusedField === 'companyName' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                    <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                      Work Email
                    </label>
                    <div className="relative group/input">
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('workEmail')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@company.com"
                        required
                        className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base placeholder:text-white/50 focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-white/20"
                      />
                      {focusedField === 'workEmail' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>

                  <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                    <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                      Phone Number
                    </label>
                    <div className="relative group/input">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+91 00000 00000"
                        required
                        className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base placeholder:text-white/50 focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 hover:border-white/20"
                      />
                      {focusedField === 'phone' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '700ms' }}>
                    <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                      Industry
                    </label>
                    <div className="relative group/input">
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('industry')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 cursor-pointer hover:border-white/20 appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 1rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                        }}
                      >
                        <option value="" className="bg-[#0D1218] text-white/50">
                          Select industry
                        </option>
                        {industries.map((industry) => (
                          <option
                            key={industry}
                            value={industry}
                            className="bg-[#0D1218] text-white py-3"
                          >
                            {industry}
                          </option>
                        ))}
                      </select>
                      {focusedField === 'industry' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>

                  <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                    <label className="block text-white/90 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wide">
                      Service Required
                    </label>
                    <div className="relative group/input">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full h-[50px] sm:h-[58px] px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white/[0.06] border-2 border-white/10 text-white text-sm sm:text-base focus:border-emerald-500 focus:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 cursor-pointer hover:border-white/20 appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 1rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                        }}
                      >
                        <option value="" className="bg-[#0D1218] text-white/50">
                          Select service
                        </option>
                        {services.map((service) => (
                          <option
                            key={service}
                            value={service}
                            className="bg-[#0D1218] text-white py-3"
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                      {focusedField === 'service' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>
                </div>

                <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-[56px] sm:h-[64px] bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(31,164,99,0.4)] hover:shadow-[0_25px_80px_rgba(31,164,99,0.6)] hover:-translate-y-2 active:scale-[0.98] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                    {isSubmitting ? (
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="tracking-wide">Processing Securely...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center relative z-10">
                        <Lock className="mr-3 w-5 h-5" />
                        Request Secure Consultation
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <Shield className="w-5 h-5 text-emerald-400 animate-pulse" style={{ animationDuration: '3s' }} />
                    <p className="text-sm text-white/90 tracking-wide font-medium">
                      Your Data is 100% Secure. We Never Share Information.
                    </p>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <StatCard
                  number="10+"
                  label="Years Experience"
                  icon={<TrendingUp className="w-7 h-7" />}
                  delay="500ms"
                  isVisible={isVisible}
                />
                <StatCard
                  number="20+"
                  label="Industries Served"
                  icon={<Users className="w-7 h-7" />}
                  delay="600ms"
                  isVisible={isVisible}
                />
                <StatCard
                  number="99%"
                  label="Client Satisfaction"
                  icon={<Award className="w-7 h-7" />}
                  delay="700ms"
                  isVisible={isVisible}
                />
                <StatCard
                  number="1000+"
                  label="Successful Pickups"
                  icon={<CheckCircle2 className="w-7 h-7" />}
                  delay="800ms"
                  isVisible={isVisible}
                />
              </div>

              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent blur-sm" />
                  <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mb-10" />
                </div>

                <h3 className="text-white text-lg sm:text-xl font-black mb-6 sm:mb-8 text-center tracking-tight">
                  Certifications & Compliance
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                  <CertificationBadge
                    icon={<Shield className="w-6 h-6" />}
                    title="ISO Certified"
                    tooltip="ISO 9001:2015 Quality Management"
                    delay="1000ms"
                    isVisible={isVisible}
                  />
                  <CertificationBadge
                    icon={<FileCheck className="w-6 h-6" />}
                    title="CPCB Approved"
                    tooltip="Central Pollution Control Board"
                    delay="1100ms"
                    isVisible={isVisible}
                  />
                  <CertificationBadge
                    icon={<Award className="w-6 h-6" />}
                    title="EPR Authorized"
                    tooltip="Extended Producer Responsibility"
                    delay="1200ms"
                    isVisible={isVisible}
                  />
                  <CertificationBadge
                    icon={<Fingerprint className="w-6 h-6" />}
                    title="Data Destruction"
                    tooltip="Certified Data Destruction Services"
                    delay="1300ms"
                    isVisible={isVisible}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  icon,
  delay,
  isVisible
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setTimeout(() => {
        setHasAnimated(true);
        const target = parseInt(number.replace(/\D/g, ""));
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }, parseInt(delay));
    }
  }, [isVisible, hasAnimated, number, delay]);

  return (
    <div
      ref={cardRef}
      className={`group relative transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-emerald-500/30 rounded-xl sm:rounded-[18px] blur-md group-hover:blur-lg opacity-50 group-hover:opacity-100 transition-all duration-500 hidden sm:block" />

      <div className="relative bg-[#0D1218]/90 backdrop-blur-2xl border border-emerald-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:border-emerald-500/40 hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />

        <div className="relative space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex items-start justify-between">
            <div className="p-2 sm:p-2.5 md:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg sm:rounded-xl text-emerald-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                {icon}
              </div>
            </div>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <div className="text-white font-black text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-none bg-gradient-to-br from-white via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              {count}{number.includes("+") && "+"}{number.includes("%") && "%"}
            </div>

            <div className="text-white/80 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider sm:tracking-widest">
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificationBadge({
  icon,
  title,
  tooltip,
  delay,
  isVisible
}: {
  icon: React.ReactNode;
  title: string;
  tooltip: string;
  delay: string;
  isVisible: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative group transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: delay }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div className="absolute -inset-[0.5px] bg-gradient-to-br from-emerald-500/40 via-teal-500/20 to-emerald-500/40 rounded-lg sm:rounded-[14px] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block" />

      <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#0D1218]/80 backdrop-blur-2xl border border-emerald-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:border-emerald-500/50 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(31,164,99,0.3)] transition-all duration-500 cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-1 md:p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          {icon}
        </div>

        <span className="relative text-white/90 text-xs sm:text-sm font-bold tracking-wide group-hover:text-white transition-colors duration-300 truncate">
          {title}
        </span>

        <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400/50 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
      </div>

      {showTooltip && (
        <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#0D1218]/95 backdrop-blur-2xl border border-emerald-500/40 rounded-lg sm:rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-fadeIn max-w-[200px] sm:max-w-none sm:whitespace-nowrap">
          <p className="text-white text-[10px] sm:text-xs font-semibold tracking-wide text-center sm:text-left">{tooltip}</p>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-[#0D1218] border-r border-b border-emerald-500/40 rotate-45" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-lg sm:rounded-xl pointer-events-none" />
        </div>
      )}
    </div>
  );
}
