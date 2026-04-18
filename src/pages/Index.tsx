import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoginPopup from "@/components/LoginPopup";
import PreferencesModal from "@/components/PreferencesModal";
import HeroSection from "@/components/HeroSection";
import BookGrid from "@/components/BookGrid";
import BookOwlChat from "@/components/BookOwlChat";

type Step = "login" | "preferences" | "home";

const Index = () => {
  const [step, setStep] = useState<Step>(() => {
    return (localStorage.getItem("bookwarm-onboarded") === "true" ? "home" : "login");
  });

  const completeOnboarding = () => {
    localStorage.setItem("bookwarm-onboarded", "true");
    setStep("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {step === "login" && (
        <LoginPopup
          onClose={() => setStep("preferences")}
          onLogin={() => setStep("preferences")}
        />
      )}

      {step === "preferences" && (
        <PreferencesModal onComplete={completeOnboarding} />
      )}

      <main className="pt-16">
        <HeroSection />
        <BookGrid />

        <footer className="bg-warm-700 py-10 px-4">
          <div className="container mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">📚</span>
              <span className="font-display text-lg font-bold text-primary-foreground">
                Book Warm
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Your cozy corner of the digital library
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Instagram</a>
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Contact</a>
              <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Privacy</a>
            </div>
            <p className="text-primary-foreground/30 text-xs">© 2026 Book Warm. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <BookOwlChat />
    </div>
  );
};

export default Index;
