import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LotteryStats } from "@/components/lottery-stats";
import { LatestResults } from "@/components/latest-results";
import { HowToPlay } from "@/components/how-to-play";
import { WinnersShowcase } from "@/components/winners-showcase";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <LotteryStats />
      <LatestResults />
      <HowToPlay />
      <WinnersShowcase />
      <NewsletterSignup />
      <Footer />
    </main>
  );
}