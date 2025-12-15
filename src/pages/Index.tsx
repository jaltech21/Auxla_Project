import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import Resources from "@/components/Resources";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Donation from "@/components/Donation";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ImpactStats />
        <Resources />
        <Testimonials />
        <Blog />
        <About />
        <Donation />
        <Newsletter />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
