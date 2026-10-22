import AboutFounder from "@/components/AboutFounder";
import BulkOrders from "@/components/BulkOrders";
import ContactForm from "@/components/ContactForm";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import PlaceOrder from "@/components/PlaceOrder";
import Testimonials from "@/components/Testimonials";
import TrustStrip from "@/components/TrustStrip";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <PlaceOrder />
        <HowItWorks />
        <BulkOrders />
        <Testimonials />
        <AboutFounder />
        <CtaBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
