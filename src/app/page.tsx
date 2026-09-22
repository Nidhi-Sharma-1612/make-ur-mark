import AboutFounder from "@/components/AboutFounder";
import BulkOrders from "@/components/BulkOrders";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ShopCategories from "@/components/ShopCategories";
import Testimonials from "@/components/Testimonials";
import TrustStrip from "@/components/TrustStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <ShopCategories />
        <HowItWorks />
        <BulkOrders />
        <Testimonials />
        <AboutFounder />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
