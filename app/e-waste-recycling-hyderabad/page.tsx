import CategoryInquiry from "@/components/bangalore-landing-page/CategoryInquiry";
import Faq from "@/components/bangalore-landing-page/Faq";
import Header from "@/components/bangalore-landing-page/Header";
import Hero from "@/components/bangalore-landing-page/Hero";
import HowItWorks from "@/components/bangalore-landing-page/HowItWorks";
import NeedAssistance from "@/components/bangalore-landing-page/NeedAssistance";
import "@/app/e-waste-recycling-hyderabad/globals.css";
import  { TestimonialsSection }  from "@/components/testimonials-section";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      
      <main>
        <Hero />
        <HowItWorks />
        <CategoryInquiry />
        <TestimonialsSection />
        <Faq />
      </main>
      <NeedAssistance />
    </div>
  );
}
