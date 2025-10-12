import HeroSection from '@/components/service/HeroSection';
import ServiceOverview from '@/components/service/ServiceOverview';
import ServiceDetails from '@/components/service/ServiceDetails';
import DataDestructionSection from '@/components/service/DataDestructionSection';
import WhyChooseUs from '@/components/service/WhyChooseUs';
import Testimonials from '@/components/service/Testimonials';
import QuoteForm from '@/components/service/QuoteForm';
import FAQ from '@/components/service/FAQ';
import Footer from '@/components/service/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServiceOverview />
      <ServiceDetails />
      <DataDestructionSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <Footer />
    </div>
  );
}

export default App;
