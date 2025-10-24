"use client"
import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Package, Eraser, Award, CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  aria: string;
  icon: typeof Package;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Collect',
    description: 'Secure transport from your location',
    aria: 'Step 1: Collect devices for secure transport',
    icon: Package,
  },
  {
    id: 2,
    title: 'Wipe',
    description: 'Multi-pass data sanitization',
    aria: 'Step 2: Secure data wiping and destruction',
    icon: Eraser,
  },
  {
    id: 3,
    title: 'Certify',
    description: 'Official destruction certificate',
    aria: 'Step 3: Issue Certificate of Destruction',
    icon: Award,
  },
];

export default function DataDestructionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const announcerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches;
    }
  }, []);

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = `${steps[activeStep].title}: ${steps[activeStep].description}`;
    }
  }, [activeStep]);

  useEffect(() => {
    if (!hasInteracted && sectionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasInteracted && !prefersReducedMotion.current) {
            setHasInteracted(true);
            autoplaySequence();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, [hasInteracted]);

  const autoplaySequence = async () => {
    if (prefersReducedMotion.current || isPlaying) return;
    setIsPlaying(true);

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    setIsPlaying(false);
  };

  const handleCardClick = (index: number) => {
    setActiveStep(index);
    setHasInteracted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
      setHasInteracted(true);
    } else if (e.key === 'ArrowLeft') {
      setActiveStep((prev) => Math.max(prev - 1, 0));
      setHasInteracted(true);
    }
  };

  const progressPercentage = (activeStep / (steps.length - 1)) * 100;

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-primary/50 via-secondary/60 to-accent/60 relative overflow-hidden"
      aria-labelledby="data-destruction-title"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-primary rounded-full filter blur-3xl top-0 right-0 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-secondary rounded-full filter blur-3xl bottom-0 left-0 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 animate-float">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h2 id="data-destruction-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Secure Data Destruction
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Protect your sensitive information with our certified data destruction service. We ensure complete data sanitization with documented proof of destruction.
          </p>
          <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Certificate of Destruction provided • Optional on-site witness available
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => handleCardClick(index)}
                  className={`group relative p-6 rounded-2xl transition-all duration-500 text-left
                    ${isActive
                      ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white shadow-2xl shadow-white/20 scale-105'
                      : isCompleted
                      ? 'bg-primary/30 border-2 border-primary/50 hover:border-primary/70'
                      : 'bg-secondary/50 border-2 border-secondary/50 hover:border-secondary/70'
                    }
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white`}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={step.aria}
                >
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50 animate-pulse-glow'
                        : isCompleted
                        ? 'bg-primary/30'
                        : 'bg-secondary/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          isActive
                            ? 'bg-primary text-white'
                            : isCompleted
                            ? 'bg-primary/30 text-gray-400'
                            : 'bg-secondary/50 text-gray-400'
                        }`}>
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-300'
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-sm transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-200'
                  }`}>
                    {step.description}
                  </p>

                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse-border pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block relative mb-12">
            <div className="relative h-2">
              <div className="absolute inset-0 bg-secondary/50 rounded-full"></div>

              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-1000 ease-out shadow-lg shadow-primary/50"
                style={{
                  width: `${progressPercentage}%`,
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg animate-pulse-scale">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="absolute inset-0 flex justify-between items-center">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <div
                      key={step.id}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-4 transition-all duration-500 flex items-center justify-center ${
                          isActive
                            ? 'border-white bg-primary scale-125 shadow-lg shadow-primary/50 animate-pulse-ring'
                            : isCompleted
                            ? 'border-primary bg-primary text-gray-400'
                            : 'border-secondary/50 bg-secondary/50 text-gray-400'
                        }`}
                      >
                        {isCompleted && !isActive && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {isActive && (
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        )}
                        {!isCompleted && !isActive && (
                          <span className="text-gray-300 text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span className={`mt-3 text-xs font-medium transition-colors duration-300 ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-300'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:hidden mb-12 ">
            <div className="relative">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;

                return (
                  <div key={step.id} className="flex gap-4 mb-6 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'border-primary bg-primary scale-110'
                            : isCompleted
                            ? 'border-primary bg-primary'
                            : 'border-gray-600 bg-gray-800'
                        }`}
                      >
                        {isCompleted || isActive ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-gray-500 text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-0.5 flex-1 my-2 transition-all duration-500 ${
                          isCompleted ? 'bg-primary' : 'bg-gray-700'
                        }`} style={{ minHeight: '40px' }}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className={`text-lg font-semibold mb-1 ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                      {isActive && (
                        <span className="inline-block mt-2 text-xs text-primary font-semibold">Active</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                Request Data Destruction Certificate
              </button>

              {!isPlaying && (
                <button
                  onClick={() => {
                    setActiveStep(0);
                    autoplaySequence();
                  }}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  {isPlaying ? 'Process Running...' : 'Start Process Demo'}
                </button>
              )}
            </div>

            <p className="text-gray-100 text-sm">
              Use arrow keys (← →) to navigate between steps
            </p>
          </div>
        </div>

        <div aria-live="polite" className="sr-only" ref={announcerRef} />
      </div>
    </section>
  );
}
