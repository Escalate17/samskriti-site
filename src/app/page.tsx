import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Install } from "@/components/install";
import { Demo } from "@/components/demo";
import { PrivacyBand } from "@/components/privacy-band";
import { Pricing } from "@/components/pricing";
import { HowItWorks } from "@/components/how-it-works";
import { ComparisonTable } from "@/components/comparison-table";
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
        <Demo />
        <PrivacyBand />
        <Pricing />
        {/* Where this is going — the long-term vision */}
        <HowItWorks />
        <ComparisonTable />
        <MemeComparison />
        {/* Post-trial feedback */}
        <TestUserSurvey />
      </main>
      <Footer />
    </>
  );
}
