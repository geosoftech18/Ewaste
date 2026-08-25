import CategoryInquiry from "@/components/bangalore-landing-page/CategoryInquiry";
import Faq from "@/components/bangalore-landing-page/Faq";
import Hero from "@/components/bangalore-landing-page/Hero";
import HowItWorks from "@/components/bangalore-landing-page/HowItWorks";
import NeedAssistance from "@/components/bangalore-landing-page/NeedAssistance";
import { SellProductsCarousel } from "@/components/bangalore-landing-page/SellProductsCarousel";
import "@/app/e-waste-recycling-hyderabad/globals.css";
import { TestimonialsSection } from "@/components/testimonials-section";
import {
  electronicsGadgets,
  largeAppliances,
  smallAppliances,
} from "@/data/sell-products";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <main>
        <Hero />
        <HowItWorks />
        <SellProductsCarousel
          title="Turn Large Appliances into Cash"
          subtitle="Sell old ACs, fridges, washing machines and more in Hyderabad at fixed scrap rates."
          products={largeAppliances}
          cityName="Hyderabad"
        />
        <SellProductsCarousel
          title="Cash for Small Home Appliances"
          subtitle="Book a pickup for mixers, geysers, fans, chimneys and other household gadgets."
          products={smallAppliances}
          cityName="Hyderabad"
        />
        <SellProductsCarousel
          title="Sell Old Electronics & Gadgets"
          subtitle="Get instant quotes for laptops, mobiles, tablets, CPUs, printers and more."
          products={electronicsGadgets}
          cityName="Hyderabad"
        />
        <CategoryInquiry />
        <TestimonialsSection />
        <Faq />
      </main>
      <NeedAssistance />
    </div>
  );
}
