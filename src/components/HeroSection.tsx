import { Star, TrendingUp, BookOpen } from "lucide-react";
import heroBookshelf from "@/assets/hero-bookshelf.png";

const HeroSection = () => {
  return (
    <section className="cozy-gradient py-16 px-4">
      <div className="container mx-auto">
        {/* Hero Image */}
        <div className="flex justify-center mb-8">
          <img src={heroBookshelf} alt="Cozy pixel art bookshelf" width={1280} height={512} className="max-w-2xl w-full h-auto" />
        </div>
          <h1 className="font-pixel text-lg sm:text-xl text-pixel-brown pixel-text-shadow mb-4">
            📚 Featured Books
          </h1>
          <p className="font-pixel-body text-2xl text-muted-foreground">
            The most loved stories of the moment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Most Read */}
          <div className="pixel-border bg-pixel-cream p-6 relative">
            <div className="absolute -top-3 -left-1 bg-pixel-amber px-3 py-1 pixel-border-sm">
              <span className="font-pixel text-[8px] text-pixel-dark flex items-center gap-1">
                <TrendingUp size={12} /> MOST READ
              </span>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-28 h-40 bg-pixel-green pixel-border-sm flex items-center justify-center shrink-0">
                <BookOpen size={32} className="text-pixel-cream" />
              </div>
              <div>
                <h3 className="font-pixel text-[10px] text-pixel-brown mb-2">
                  The Enchanted Forest
                </h3>
                <p className="font-pixel-body text-lg text-foreground mb-2">
                  by Elara Nightwood
                </p>
                <p className="font-pixel-body text-base text-muted-foreground mb-3">
                  "A magical journey through ancient woods where every tree tells a story..."
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= 4 ? "text-pixel-amber fill-pixel-amber" : "text-muted fill-muted"}
                    />
                  ))}
                  <span className="font-pixel text-[8px] text-muted-foreground ml-2">4.8/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Most Popular */}
          <div className="pixel-border bg-pixel-cream p-6 relative">
            <div className="absolute -top-3 -left-1 bg-pixel-green px-3 py-1 pixel-border-sm">
              <span className="font-pixel text-[8px] text-pixel-cream flex items-center gap-1">
                <Star size={12} /> MOST POPULAR
              </span>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-28 h-40 bg-pixel-brown pixel-border-sm flex items-center justify-center shrink-0">
                <BookOpen size={32} className="text-pixel-cream" />
              </div>
              <div>
                <h3 className="font-pixel text-[10px] text-pixel-brown mb-2">
                  Stardust & Swords
                </h3>
                <p className="font-pixel-body text-lg text-foreground mb-2">
                  by Marcus Thorne
                </p>
                <p className="font-pixel-body text-base text-muted-foreground mb-3">
                  "An epic tale of heroes who battle cosmic forces to save their realm..."
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= 5 ? "text-pixel-amber fill-pixel-amber" : "text-muted fill-muted"}
                    />
                  ))}
                  <span className="font-pixel text-[8px] text-muted-foreground ml-2">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
