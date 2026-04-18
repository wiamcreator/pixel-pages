import { useNavigate } from "react-router-dom";
import { ArrowLeft, Instagram, Facebook, Twitter, Youtube, Linkedin, Mail, MapPin, Phone, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", handle: "@bookwarm.official", url: "https://instagram.com", color: "from-pink-500 to-purple-500" },
  { icon: Facebook, label: "Facebook", handle: "/BookWarmCommunity", url: "https://facebook.com", color: "from-blue-600 to-blue-400" },
  { icon: Twitter, label: "Twitter / X", handle: "@bookwarm_app", url: "https://twitter.com", color: "from-sky-500 to-sky-300" },
  { icon: Youtube, label: "YouTube", handle: "Book Warm Channel", url: "https://youtube.com", color: "from-red-600 to-red-400" },
  { icon: Linkedin, label: "LinkedIn", handle: "/company/bookwarm", url: "https://linkedin.com", color: "from-blue-700 to-blue-500" },
  { icon: Github, label: "GitHub", handle: "/bookwarm", url: "https://github.com", color: "from-zinc-700 to-zinc-500" },
];

const CONTACTS = [
  { icon: Mail, label: "Email", value: "hello@bookwarm.app" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Address", value: "42 Library Lane, Reading City" },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <header className="text-center mb-12">
          <span className="text-5xl">📚</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-3">
            About Book Warm
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A cozy digital library where readers discover, collect and share stories. Crafted with love
            for book lovers — track your reads, earn rewards, and let our AI companion guide you to your next favorite.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Follow Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOCIALS.map(({ icon: Icon, label, handle, url, color }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                <Card className="p-5 hover:elegant-shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{label}</div>
                      <div className="text-sm text-muted-foreground">{handle}</div>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Get in Touch
          </h2>
          <Card className="p-6 md:p-8">
            <div className="grid gap-5">
              {CONTACTS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 pb-5 last:pb-0 border-b last:border-0 border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                    <div className="font-medium text-foreground">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
