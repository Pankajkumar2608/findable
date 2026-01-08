import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { WhyDifferent } from "@/components/why-different";
import { EarlyAccess } from "@/components/early-access";
import { TrustPrivacy } from "@/components/trust-privacy";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <WhyDifferent />
      <EarlyAccess />
      <TrustPrivacy />
      <FinalCta />
      <Footer />
    </main>
  );
}
