import { useState } from "react";
import { Sparkles } from "lucide-react";

const GENRES = [
  { id: "fantasy", label: "🧙 Fantasy", emoji: "🐉" },
  { id: "romance", label: "💕 Romance", emoji: "🌹" },
  { id: "scifi", label: "🚀 Sci-Fi", emoji: "🛸" },
  { id: "thriller", label: "🔪 Polar/Thriller", emoji: "🕵️" },
  { id: "horror", label: "👻 Horror", emoji: "🎃" },
  { id: "historical", label: "🏛️ Historical", emoji: "📜" },
  { id: "manga", label: "🎌 Manga", emoji: "⛩️" },
  { id: "poetry", label: "🪶 Poetry", emoji: "🌸" },
  { id: "adventure", label: "⚔️ Adventure", emoji: "🗺️" },
  { id: "comedy", label: "😂 Comedy", emoji: "🎭" },
  { id: "mystery", label: "🔍 Mystery", emoji: "🕯️" },
  { id: "nonfiction", label: "📰 Non-Fiction", emoji: "🎓" },
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pixel-dark/60">
      <div className="pixel-border bg-pixel-cream w-full max-w-lg mx-4">
        <div className="bg-pixel-green px-4 py-3 border-b-4 border-pixel-dark">
          <span className="font-pixel text-[10px] text-pixel-cream pixel-text-shadow">
            ✨ Choose Your Genres
          </span>
        </div>

        <div className="p-6 space-y-4">
          <p className="font-pixel-body text-xl text-center text-pixel-dark">
            What kind of stories do you love? Pick your favorites!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`pixel-border-sm p-3 font-pixel text-[8px] leading-relaxed transition-all ${
                  selected.includes(genre.id)
                    ? "bg-pixel-amber text-pixel-dark scale-105"
                    : "bg-pixel-beige text-pixel-dark hover:bg-pixel-amber/30"
                }`}
              >
                <div className="text-2xl mb-1">{genre.emoji}</div>
                {genre.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onComplete}
              className="flex-1 pixel-btn bg-pixel-amber text-pixel-dark font-pixel text-[10px] flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              Start Reading! ({selected.length} selected)
            </button>
            <button
              onClick={onComplete}
              className="pixel-btn bg-muted text-muted-foreground font-pixel text-[8px]"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
