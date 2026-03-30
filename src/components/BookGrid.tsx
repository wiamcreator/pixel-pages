import { Star, BookOpen } from "lucide-react";

const BOOKS = [
  { title: "Moonlit Wanderer", author: "Luna Ashworth", genre: "Fantasy", rating: 4.5, review: "Absolutely captivating! Couldn't put it down.", color: "bg-secondary" },
  { title: "Heart of Glass", author: "Rose Bennett", genre: "Romance", rating: 4.2, review: "A beautiful love story that warms the soul.", color: "bg-accent/80" },
  { title: "Neon Horizon", author: "Kai Steele", genre: "Sci-Fi", rating: 4.7, review: "Mind-bending sci-fi at its finest!", color: "bg-warm-700" },
  { title: "Silent Whispers", author: "Ivy Blackwood", genre: "Thriller", rating: 4.3, review: "Keeps you on the edge of your seat.", color: "bg-primary" },
  { title: "Dragon's Lament", author: "Finn Dragonhart", genre: "Fantasy", rating: 4.8, review: "Epic world-building and unforgettable characters.", color: "bg-secondary" },
  { title: "Café at Dawn", author: "Mia Fontaine", genre: "Romance", rating: 4.1, review: "Sweet, charming, and utterly delightful.", color: "bg-accent/80" },
  { title: "The Last Signal", author: "Zara Cosmos", genre: "Sci-Fi", rating: 4.6, review: "A thrilling space adventure!", color: "bg-warm-700" },
  { title: "Crimson Tide", author: "Jack Raven", genre: "Thriller", rating: 4.4, review: "Dark, gripping, and impossible to stop reading.", color: "bg-primary" },
];

const BookGrid = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Recommended For You
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Handpicked stories based on your reading preferences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {BOOKS.map((book, idx) => (
            <div
              key={idx}
              className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
            >
              {/* Cover */}
              <div className={`${book.color} h-44 flex items-center justify-center relative`}>
                <BookOpen size={36} className="text-primary-foreground/60 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-display text-base font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
                <p className="text-xs text-muted-foreground italic mb-3 line-clamp-2 leading-relaxed">
                  "{book.review}"
                </p>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i <= Math.floor(book.rating) ? "text-accent fill-accent" : "text-border"}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1.5 font-medium">{book.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookGrid;
