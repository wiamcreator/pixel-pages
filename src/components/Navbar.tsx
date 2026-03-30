import { useState } from "react";
import { Book, ChevronDown, Home, Library, Wallet, Users, HelpCircle, Info, Trophy } from "lucide-react";

const Navbar = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pixel-brown pixel-border-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="font-pixel text-xs text-pixel-cream pixel-text-shadow">
            Book Warm
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <a href="#" className="pixel-btn bg-pixel-amber text-pixel-dark font-pixel text-[10px] flex items-center gap-2">
            <Home size={14} />
            Homepage
          </a>
          <a href="#" className="pixel-btn bg-pixel-green text-pixel-cream font-pixel text-[10px] flex items-center gap-2">
            <Library size={14} />
            My Library
          </a>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="pixel-btn bg-pixel-beige text-pixel-dark font-pixel text-[10px] flex items-center gap-2"
            >
              More
              <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 pixel-border bg-pixel-cream z-50">
                <MenuItem icon={<Wallet size={16} />} label="My Pocket" />
                <MenuItem icon={<Users size={16} />} label="Community" />
                <MenuItem icon={<HelpCircle size={16} />} label="FAQ" />
                <MenuItem icon={<Info size={16} />} label="About Us" />
                
                {/* Challenges submenu */}
                <div className="relative">
                  <button
                    onClick={() => setChallengesOpen(!challengesOpen)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-lg font-pixel-body text-pixel-dark hover:bg-pixel-beige border-b-2 border-pixel-dark/20"
                  >
                    <Trophy size={16} />
                    Challenges
                    <ChevronDown size={12} className={`ml-auto transition-transform ${challengesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {challengesOpen && (
                    <div className="bg-pixel-beige border-t-2 border-pixel-dark/20">
                      <button className="w-full text-left px-8 py-2 text-base font-pixel-body text-pixel-dark hover:bg-pixel-amber/30">
                        ⚔️ Daily Challenges
                      </button>
                      <button className="w-full text-left px-8 py-2 text-base font-pixel-body text-pixel-dark hover:bg-pixel-amber/30">
                        🏰 Monthly Quests
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-3 text-lg font-pixel-body text-pixel-dark hover:bg-pixel-beige border-b-2 border-pixel-dark/20 transition-colors">
    {icon}
    {label}
  </button>
);

export default Navbar;
