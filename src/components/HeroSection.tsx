import { useState } from "react";
import { Star, TrendingUp, Award, BookOpen, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <section className="hero-gradient py-20 px-4">
      <div className="container mx-auto">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-accent/20">
            <TrendingUp size={14} />
            Trending this week
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4">
            Discover stories that <em className="text-primary">warm your soul</em>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Curated recommendations, community reviews, and your personal AI reading companion — all in one cozy place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a book or author..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <Button type="submit" className="rounded-xl px-5">
              Search
            </Button>
          </form>
        </div>

        {/* Featured Books */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeaturedCard
            badge="Most Read"
            badgeIcon={<TrendingUp size={12} />}
            badgeColor="bg-accent text-accent-foreground"
            title="The Enchanted Forest"
            author="Elara Nightwood"
            description="A magical journey through ancient woods where every tree tells a story and every path leads to wonder."
            rating={4.8}
            coverColor="bg-secondary"
          />
          <FeaturedCard
            badge="Editor's Pick"
            badgeIcon={<Award size={12} />}
            badgeColor="bg-primary text-primary-foreground"
            title="Stardust & Swords"
            author="Marcus Thorne"
            description="An epic tale of heroes who battle cosmic forces to save their realm from eternal darkness."
            rating={4.9}
            coverColor="bg-warm-700"
          />
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  coverColor: string;
}

const FeaturedCard = ({ badge, badgeIcon, badgeColor, title, author, description, rating, coverColor }: FeaturedCardProps) => (
  <div className="glass-card p-6 group hover:scale-[1.01] transition-transform duration-300">
    <div className="flex gap-5">
      <div className={`${coverColor} w-28 h-40 rounded-lg flex items-center justify-center shrink-0 elegant-shadow`}>
        <BookOpen size={28} className="text-primary-foreground/80" />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`inline-flex items-center gap-1 ${badgeColor} px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3`}>
          {badgeIcon}
          {badge}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">by {author}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className={i <= Math.floor(rating) ? "text-accent fill-accent" : "text-muted"} />
            ))}
            <span className="text-xs text-muted-foreground ml-1 font-medium">{rating}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight size={12} />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;