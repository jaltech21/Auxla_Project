import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Resources from "@/components/Resources";
import Blog from "@/components/Blog";
import About from "@/components/About";
import Donation from "@/components/Donation";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";

const HomePage = () => {
  console.log("HomePage rendering");
  
  return (
    <div className="w-full">
      <Helmet>
        <title>OCSLAA - Mental Health Support in Sierra Leone</title>
        <meta
          name="description"
          content="Breaking mental health stigma in Sierra Leone. Access resources, support, and expert guidance for your mental wellness journey."
        />
      </Helmet>
      <Hero />
      <Resources />
      <Blog />
      <About />
      <Donation />
      <Newsletter />
      <FAQ />
    </div>
  );
};

export default HomePage;
