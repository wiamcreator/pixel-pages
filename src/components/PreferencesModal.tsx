import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const GENRES = [
  { id: "fantasy", label: "Fantasy", icon: "🧙" },
  { id: "romance", label: "Romance", icon: "💕" },
  { id: "scifi", label: "Sci-Fi", icon: "🚀" },
  { id: "thriller", label: "Thriller", icon: "🔪" },
  { id: "horror", label: "Horror", icon: "👻" },
  { id: "historical", label: "Historical", icon: "🏛️" },
  { id: "manga", label: "Manga", icon: "🎌" },
  { id: "poetry", label: "Poetry", icon: "🪶" },
  { id: "adventure", label: "Adventure", icon: "⚔️" },
  { id: "comedy", label: "Comedy", icon: "😂" },
  { id: "mystery", label: "Mystery", icon: "🔍" },
  { id: "nonfiction", label: "Non-Fiction", icon: "📰" },
];

interface PreferencesModalProps {
  onComplete: () => void;
}

const PreferencesModal = ({ onComplete }: PreferencesModalProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleGenre = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-card w-full max-w-lg mx-4 rounded-2xl elegant-shadow-lg overflow-hidden animate-fade-up">
        <div className="px-6 py-8 text-center border-b border-border">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <Sparkles size={14} />
            Personalize your experience
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            What do you love to read?
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Select your favorite genres for personalized recommendations
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`relative flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  selected.includes(genre.id)
                    ? "border-primary bg-primary/5 text-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted"
                }`}
              >
                <span className="text-lg">{genre.icon}</span>
                {genre.label}
                {selected.includes(genre.id) && (
                  <Check size={14} className="absolute top-2 right-2 text-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={onComplete} size="lg" className="flex-1">
              <Sparkles size={16} />
              Get Recommendations {selected.length > 0 && `(${selected.length})`}
            </Button>
            <Button variant="ghost" onClick={onComplete} size="lg">
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
