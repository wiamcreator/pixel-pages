import { useState } from "react";
import { X, LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginPopupProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginPopup = ({ onClose, onLogin }: LoginPopupProps) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md mx-4 rounded-2xl elegant-shadow-lg overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="relative bg-primary px-6 py-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <X size={20} />
          </button>
          <div className="text-4xl mb-3">📖</div>
          <h2 className="font-display text-2xl font-bold text-primary-foreground">
            {isSignup ? "Join Book Warm" : "Welcome Back"}
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            {isSignup ? "Start your reading adventure" : "We missed you, reader!"}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {isSignup && (
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button onClick={onLogin} size="lg" className="w-full">
            {isSignup ? <><UserPlus size={18} /> Create Account</> : <><LogIn size={18} /> Sign In</>}
          </Button>

          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignup ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="ghost" onClick={onClose} className="w-full text-muted-foreground">
            Continue as guest →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
