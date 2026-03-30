import { Star, BookOpen } from "lucide-react";

const BOOKS = [
  { title: "Moonlit Wanderer", author: "Luna Ashworth", genre: "Fantasy", rating: 4.5, review: "Absolutely captivating! Couldn't put it down.", color: "bg-pixel-green" },
  { title: "Heart of Glass", author: "Rose Bennett", genre: "Romance", rating: 4.2, review: "A beautiful love story that warms the soul.", color: "bg-pixel-amber" },
  { title: "Neon Horizon", author: "Kai Steele", genre: "Sci-Fi", rating: 4.7, review: "Mind-bending sci-fi at its finest!", color: "bg-pixel-brown" },
  { title: "Silent Whispers", author: "Ivy Blackwood", genre: "Thriller", rating: 4.3, review: "Keeps you on the edge of your seat.", color: "bg-secondary" },
  { title: "Dragon's Lament", author: "Finn Dragonhart", genre: "Fantasy", rating: 4.8, review: "Epic world-building and unforgettable characters.", color: "bg-pixel-green" },
  { title: "Café at Dawn", author: "Mia Fontaine", genre: "Romance", rating: 4.1, review: "Sweet, charming, and utterly delightful.", color: "bg-pixel-amber" },
  { title: "The Last Signal", author: "Zara Cosmos", genre: "Sci-Fi", rating: 4.6, review: "A thrilling space adventure!", color: "bg-pixel-brown" },
  { title: "Crimson Tide", author: "Jack Raven", genre: "Thriller", rating: 4.4, review: "Dark, gripping, and impossible to stop reading.", color: "bg-secondary" },
];

const BookGrid = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-pixel text-base sm:text-lg text-pixel-brown pixel-text-shadow mb-3">
            📖 Recommended For You
          </h2>
          <p className="font-pixel-body text-xl text-muted-foreground">
            Handpicked stories based on your taste
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {BOOKS.map((book, idx) => (
            <div
              key={idx}
              className="pixel-card hover:translate-y-[-4px] transition-transform cursor-pointer group"
            >
              {/* Book cover */}
              <div className={`${book.color} pixel-border-sm h-44 flex items-center justify-center mb-4 relative overflow-hidden`}>
                <BookOpen size={40} className="text-pixel-cream/80 group-hover:scale-110 transition-transform" />
                <div className="absolute top-2 right-2 bg-pixel-dark/80 px-2 py-1">
                  <span className="font-pixel text-[7px] text-pixel-cream">{book.genre}</span>
                </div>
              </div>

              {/* Book info */}
              <h3 className="font-pixel text-[9px] text-foreground mb-1 leading-relaxed">
                {book.title}
              </h3>
              <p className="font-pixel-body text-base text-muted-foreground mb-2">
                by {book.author}
              </p>

              {/* Review */}
              <p className="font-pixel-body text-sm text-muted-foreground italic mb-3 line-clamp-2">
                "{book.review}"
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i <= Math.floor(book.rating) ? "text-pixel-amber fill-pixel-amber" : "text-muted fill-muted"}
                  />
                ))}
                <span className="font-pixel text-[7px] text-muted-foreground ml-1">{book.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookGrid;
