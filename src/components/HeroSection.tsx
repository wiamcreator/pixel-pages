import { useState, useEffect } from "react";
import { Star, TrendingUp, Award, BookOpen, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

interface FeaturedBook {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  cover: string;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [query, setQuery] = useState("");
  const [mostRead, setMostRead] = useState<FeaturedBook | null>(null);
  const [editorPick, setEditorPick] = useState<FeaturedBook | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Most Read — top trending book
        const mostReadRes = await fetch(
          "https://openlibrary.org/search.json?q=trending&sort=readinglog&limit=1&fields=key,title,author_name,cover_i,ratings_average,first_sentence"
        );
        const mostReadData = await mostReadRes.json();
        const mr = mostReadData.docs?.[0];
        if (mr) {
          setMostRead({
            id: `ol-${mr.key.replace("/works/", "")}`,
            title: mr.title,
            author: mr.author_name?.[0] || "Unknown Author",
            description: mr.first_sentence?.[0] || "A captivating story waiting to be discovered.",
            rating: mr.ratings_average ? parseFloat(mr.ratings_average.toFixed(1)) : 4.5,
            cover: mr.cover_i ? `https://covers.openlibrary.org/b/id/${mr.cover_i}-M.jpg` : "",
          });
        }

        // Editor's Pick — top rated book
        const editorRes = await fetch(
          "https://openlibrary.org/search.json?q=award+winner&sort=rating&limit=1&fields=key,title,author_name,cover_i,ratings_average,first_sentence"
        );
        const editorData = await editorRes.json();
        const ep = editorData.docs?.[0];
        if (ep) {
          setEditorPick({
            id: `ol-${ep.key.replace("/works/", "")}`,
            title: ep.title,
            author: ep.author_name?.[0] || "Unknown Author",
            description: ep.first_sentence?.[0] || "An award-winning masterpiece you won't forget.",
            rating: ep.ratings_average ? parseFloat(ep.ratings_average.toFixed(1)) : 4.9,
            cover: ep.cover_i ? `https://covers.openlibrary.org/b/id/${ep.cover_i}-M.jpg` : "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch featured books", err);
      }
    };

    fetchFeatured();
  }, []);

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
          {mostRead ? (
            <FeaturedCard
              id={mostRead.id}
              badge="Most Read"
              badgeIcon={<TrendingUp size={12} />}
              badgeColor="bg-accent text-accent-foreground"
              title={mostRead.title}
              author={mostRead.author}
              description={mostRead.description}
              rating={mostRead.rating}
              cover={mostRead.cover}
              coverColor="bg-secondary"
            />
          ) : (
            <div className="glass-card p-6 animate-pulse h-40 bg-muted/30 rounded-xl" />
          )}

          {editorPick ? (
            <FeaturedCard
              id={editorPick.id}
              badge="Editor's Pick"
              badgeIcon={<Award size={12} />}
              badgeColor="bg-primary text-primary-foreground"
              title={editorPick.title}
              author={editorPick.author}
              description={editorPick.description}
              rating={editorPick.rating}
              cover={editorPick.cover}
              coverColor="bg-warm-700"
            />
          ) : (
            <div className="glass-card p-6 animate-pulse h-40 bg-muted/30 rounded-xl" />
          )}
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  cover: string;
  coverColor: string;
}

const FeaturedCard = ({ id, badge, badgeIcon, badgeColor, title, author, description, rating, cover, coverColor }: FeaturedCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="glass-card p-6 group hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
      onClick={() => navigate(`/book/${id}`)}
    >
      <div className="flex gap-5">
        <div className={`${coverColor} w-28 h-40 rounded-lg flex items-center justify-center shrink-0 elegant-shadow overflow-hidden`}>
          {cover ? (
            <img src={cover} alt={title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen size={28} className="text-primary-foreground/80" />
          )}
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
};

export default HeroSection;