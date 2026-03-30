import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoginPopup from "@/components/LoginPopup";
import PreferencesModal from "@/components/PreferencesModal";
import HeroSection from "@/components/HeroSection";
import BookGrid from "@/components/BookGrid";
import BookOwlChat from "@/components/BookOwlChat";

type Step = "login" | "preferences" | "home";

const Index = () => {
  const [step, setStep] = useState<Step>("login");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Login popup */}
      {step === "login" && (
        <LoginPopup
          onClose={() => setStep("preferences")}
          onLogin={() => setStep("preferences")}
        />
      )}

      {/* Preferences modal */}
      {step === "preferences" && (
        <PreferencesModal onComplete={() => setStep("home")} />
      )}

      {/* Main content */}
      <main className="pt-16">
        <HeroSection />
        <BookGrid />

        {/* Footer */}
        <footer className="bg-pixel-brown py-8 px-4 border-t-4 border-pixel-dark">
          <div className="container mx-auto text-center space-y-3">
            <span className="font-pixel text-sm text-pixel-cream pixel-text-shadow">
              📚 Book Warm
            </span>
            <p className="font-pixel-body text-lg text-pixel-beige">
              Your cozy corner of the digital library • Made with 🦉 & ☕
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="font-pixel-body text-base text-pixel-amber hover:underline">Instagram</a>
              <a href="#" className="font-pixel-body text-base text-pixel-amber hover:underline">Contact</a>
              <a href="#" className="font-pixel-body text-base text-pixel-amber hover:underline">© 2026</a>
            </div>
          </div>
        </footer>
      </main>

      {/* AI Chatbot */}
      <BookOwlChat />
    </div>
  );
};

export default Index;
