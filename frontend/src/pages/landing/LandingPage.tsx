import { ArchitectureSection } from "@/components/landing/ArchitectureSection"
import { BenchmarkSection } from "@/components/landing/BenchmarkSection"
import { CapabilityBoundary } from "@/components/landing/CapabilityBoundary"
import { CTASection } from "@/components/landing/CTASection"
import { Hero } from "@/components/landing/Hero"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { SecurityDemo } from "@/components/landing/SecurityDemo"
import { Footer } from "@/components/shared/Footer"
import { Navbar } from "@/components/shared/Navbar"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      <main className="pt-14">
        <Hero />

        <ProblemSection />

        <HowItWorks />

        <CapabilityBoundary />

        <SecurityDemo />

        <ArchitectureSection />

        <BenchmarkSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
