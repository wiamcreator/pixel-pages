import { useState } from "react";
import { ChevronDown, Home, Library, Wallet, Users, HelpCircle, Info, Trophy, Menu, X } from "lucide-react";

const Navbar = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            Book Warm
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavItem icon={<Home size={16} />} label="Homepage" active />
          <NavItem icon={<Library size={16} />} label="My Library" />

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              More
              <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-60 bg-card border border-border rounded-xl elegant-shadow-lg z-50 py-2 overflow-hidden">
                  <DropdownItem icon={<Wallet size={16} />} label="My Pocket" desc="Your points wallet" />
                  <DropdownItem icon={<Users size={16} />} label="Community" desc="Group discussions" />
                  <DropdownItem icon={<HelpCircle size={16} />} label="FAQ" desc="Common questions" />
                  <DropdownItem icon={<Info size={16} />} label="About Us" desc="Contact & socials" />
                  <div className="border-t border-border my-1" />
                  <DropdownItem icon={<Trophy size={16} />} label="Daily Challenges" desc="New every day" />
                  <DropdownItem icon={<Trophy size={16} />} label="Monthly Quests" desc="Big rewards" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 space-y-1">
          <MobileItem icon={<Home size={16} />} label="Homepage" />
          <MobileItem icon={<Library size={16} />} label="My Library" />
          <MobileItem icon={<Wallet size={16} />} label="My Pocket" />
          <MobileItem icon={<Users size={16} />} label="Community" />
          <MobileItem icon={<HelpCircle size={16} />} label="FAQ" />
          <MobileItem icon={<Info size={16} />} label="About Us" />
          <MobileItem icon={<Trophy size={16} />} label="Challenges" />
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`}
  >
    {icon}
    {label}
  </a>
);

const DropdownItem = ({ icon, label, desc }: { icon: React.ReactNode; label: string; desc: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left">
    <span className="text-muted-foreground">{icon}</span>
    <div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
  </button>
);

const MobileItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
    {icon}
    {label}
  </a>
);

export default Navbar;
