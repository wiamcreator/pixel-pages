import { useState } from "react";
import { X, User, LogIn } from "lucide-react";

interface LoginPopupProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginPopup = ({ onClose, onLogin }: LoginPopupProps) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pixel-dark/60">
      <div className="pixel-border bg-pixel-cream w-full max-w-md mx-4 relative">
        {/* Title bar */}
        <div className="bg-pixel-brown px-4 py-3 flex items-center justify-between border-b-4 border-pixel-dark">
          <span className="font-pixel text-[10px] text-pixel-cream pixel-text-shadow">
            📖 {isSignup ? "Create Account" : "Welcome Back!"}
          </span>
          <button onClick={onClose} className="text-pixel-cream hover:text-pixel-amber transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🦉</div>
            <p className="font-pixel text-[8px] text-pixel-brown leading-relaxed">
              {isSignup ? "Join the adventure!" : "Good to see you, reader!"}
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 pixel-border-sm bg-pixel-beige font-pixel-body text-lg text-pixel-dark placeholder:text-muted-foreground focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 pixel-border-sm bg-pixel-beige font-pixel-body text-lg text-pixel-dark placeholder:text-muted-foreground focus:outline-none"
            />
            {isSignup && (
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 pixel-border-sm bg-pixel-beige font-pixel-body text-lg text-pixel-dark placeholder:text-muted-foreground focus:outline-none"
              />
            )}
          </div>

          <button
            onClick={onLogin}
            className="w-full pixel-btn bg-pixel-green text-pixel-cream font-pixel text-[10px] flex items-center justify-center gap-2 py-3"
          >
            {isSignup ? <User size={16} /> : <LogIn size={16} />}
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="font-pixel-body text-lg text-pixel-brown hover:text-pixel-amber underline"
            >
              {isSignup ? "Already have an account? Log in" : "New here? Create an account"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full pixel-btn bg-muted text-muted-foreground font-pixel text-[8px] py-2"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
