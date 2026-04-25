import { useState, useEffect } from "react";
import { Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GUTENBERG_GENRES = [
  { label: "Fantasy", query: "fantasy" },
  { label: "Romance", query: "romance" },
];

const OPENLIBRARY_GENRES = [
  { label: "Science Fiction", query: "science+fiction" },
  { label: "Thriller", query: "thriller" },
];

const GENRE_COLORS: Record<string, string> = {
  "Fantasy": "bg-secondary",
  "Romance": "bg-accent/80",
  "Science Fiction": "bg-warm-700",
  "Thriller": "bg-primary",
};

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  free: boolean;
  source: "gutenberg" | "openlibrary";
}

interface BookGridProps {
  searchQuery?: string;
}

const BookGrid = ({ searchQuery }: BookGridProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let results: Book[] = [];

        if (searchQuery) {
          // Search on both APIs simultaneously
          const [gutRes, olRes] = await Promise.all([
            fetch(`https://gutendex.com/books/?search=${encodeURIComponent(searchQuery)}&page_size=4`).then(r => r.json()),
            fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=4&fields=key,title,author_name,cover_i,ratings_average`).then(r => r.json()),
          ]);

          const gutBooks: Book[] = (gutRes.results || []).map((book: any) => ({
            id: `gut-${book.id}`,
            title: book.title,
            author: book.authors?.[0]?.name || "Unknown Author",
            genre: "Classic",
            cover: book.formats?.["image/jpeg"] || "",
            free: true,
            source: "gutenberg",
          }));

          const olBooks: Book[] = (olRes.docs || []).map((doc: any) => ({
            id: `ol-${doc.key.replace("/works/", "")}`,
            title: doc.title,
            author: doc.author_name?.[0] || "Unknown Author",
            genre: "Modern",
            cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "",
            free: false,
            source: "openlibrary",
          }));

          results = [...gutBooks, ...olBooks];

        } else {
          // Default: fetch by genre from both APIs
          const [gutFetched, olFetched] = await Promise.all([
            Promise.all(
              GUTENBERG_GENRES.map(({ label, query }) =>
                fetch(`https://gutendex.com/books/?topic=${query}&page_size=2`)
                  .then(r => r.json())
                  .then(data => (data.results || []).slice(0, 2).map((book: any) => ({
                    id: `gut-${book.id}`,
                    title: book.title,
                    author: book.authors?.[0]?.name || "Unknown Author",
                    genre: label,
                    cover: book.formats?.["image/jpeg"] || "",
                    free: true,
                    source: "gutenberg" as const,
                  })))
              )
            ),
            Promise.all(
              OPENLIBRARY_GENRES.map(({ label, query }) =>
                fetch(`https://openlibrary.org/search.json?subject=${query}&limit=2&fields=key,title,author_name,cover_i`)
                  .then(r => r.json())
                  .then(data => (data.docs || []).slice(0, 2).map((doc: any) => ({
                    id: `ol-${doc.key.replace("/works/", "")}`,
                    title: doc.title,
                    author: doc.author_name?.[0] || "Unknown Author",
                    genre: label,
                    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "",
                    free: false,
                    source: "openlibrary" as const,
                  })))
              )
            ),
          ]);

          results = [...gutFetched.flat(), ...olFetched.flat()];
        }

        setBooks(results);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            {searchQuery ? `Results for "${searchQuery}"` : "Recommended For You"}
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            {searchQuery ? `${books.length} books found` : "Handpicked stories based on your reading preferences"}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground animate-pulse">Loading books...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {books.map((book, idx) => (
              <div
                key={idx}
                className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className={`${GENRE_COLORS[book.genre] || "bg-secondary"} h-44 flex items-center justify-center relative`}>
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen size={36} className="text-primary-foreground/60" />
                  )}
                  <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {book.genre}
                  </span>
                  <span className={`absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    book.free ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                  }`}>
                    {book.free ? "🔓 Gratuit" : "🔒 Payant"}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-base font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">by {book.author}</p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookGrid;