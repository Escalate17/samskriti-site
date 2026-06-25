import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MemeComparison } from "@/components/meme-comparison";
import { HowItWorks } from "@/components/how-it-works";
import { PrivacyBand } from "@/components/privacy-band";
import { Pricing } from "@/components/pricing";
import { TestUserSurvey } from "@/components/test-user-survey";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MemeComparison />
        <HowItWorks />
        <PrivacyBand />
        <Pricing />
        <TestUserSurvey />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
