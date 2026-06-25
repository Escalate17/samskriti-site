import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Install } from "@/components/install";
import { PrivacyBand } from "@/components/privacy-band";
import { Pricing } from "@/components/pricing";
import { HowItWorks } from "@/components/how-it-works";
import { MemeComparison } from "@/components/meme-comparison";
import { TestUserSurvey } from "@/components/test-user-survey";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Live product, first and brightest */}
        <Hero />
        <Install />
        <PrivacyBand />
        <Pricing />
        {/* Where this is going — the long-term vision */}
        <HowItWorks />
        <MemeComparison />
        {/* Post-trial feedback */}
        <TestUserSurvey />
      </main>
      <Footer />
    </>
  );
}
