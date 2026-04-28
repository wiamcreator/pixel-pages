import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

interface BookDetail {
  title: string;
  author: string;
  cover: string;
  subjects: string[];
  description: string;
  free: boolean;
  textUrl?: string;
  olKey?: string;
}

const BookReader = ({
  bookId,
  title,
}: {
  bookId: string;
  title: string;
}) => {
  const { updateProgress } = useCart();
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchText = async () => {
      setLoading(true);
      try {
        const gutId = bookId.replace("gut-", "");
        const urls = [
          `https://www.gutenberg.org/files/${gutId}/${gutId}-0.txt`,
          `https://www.gutenberg.org/files/${gutId}/${gutId}.txt`,
          `https://www.gutenberg.org/cache/epub/${gutId}/pg${gutId}.txt`,
        ];

        let text = "";
        for (const url of urls) {
          try {
            const proxy = `https://corsproxy.io/?${encodeURIComponent(url)}`;
            const res = await fetch(proxy);
            if (res.ok) {
              const t = await res.text();
              if (t && !t.includes("404") && t.length > 500) {
                text = t;
                break;
              }
            }
          } catch {
            continue;
          }
        }

        if (text.length > 500) {
          // Split into paragraphs and clean up
          const parts = text
            .split(/\n\n+/)
            .map((p) => p.replace(/\n/g, " ").trim())
            .filter((p) => p.length > 30);
          setParagraphs(parts);
        } else {
          setParagraphs(["Could not load book content. Please try another book."]);
        }
      } catch {
        setParagraphs(["Could not load book content."]);
      } finally {
        setLoading(false);
      }
    };
    fetchText();
  }, [bookId]);

  useEffect(() => {
    const el = readerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
      setProgress(pct);
      updateProgress(bookId, pct);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [bookId, updateProgress, paragraphs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground animate-pulse">Loading book content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="glass-card p-3 flex items-center gap-4">
        <span className="text-sm font-medium text-foreground whitespace-nowrap truncate max-w-xs">
          {title}
        </span>
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">
          {progress}%
        </span>
      </div>

      {/* Reader */}
      <div
        ref={readerRef}
        className="glass-card overflow-y-auto"
        style={{ height: "75vh" }}
      >
        <div className="max-w-2xl mx-auto px-8 py-10 space-y-5">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-foreground leading-8 text-[17px]"
              style={{ fontFamily: "Georgia, serif", textAlign: "justify" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const BookDetail = () => {
  const { bookKey } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, addToReading, isReading } = useCart();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        if (bookKey?.startsWith("gut-")) {
          const id = bookKey.replace("gut-", "");
          const res = await fetch(`https://gutendex.com/books/${id}`);
          const data = await res.json();
          const textUrl =
            data.formats?.["text/plain; charset=utf-8"] ||
            data.formats?.["text/plain"] ||
            data.formats?.["text/html"] || "";
          setBook({
            title: data.title,
            author: data.authors?.[0]?.name || "Unknown Author",
            cover: data.formats?.["image/jpeg"] || "",
            subjects: data.subjects?.slice(0, 5) || [],
            description: "Classic literature available for free.",
            free: true,
            textUrl,
          });
        } else if (bookKey?.startsWith("ol-")) {
          const id = bookKey.replace("ol-", "");
          const res = await fetch(`https://openlibrary.org/works/${id}.json`);
          const data = await res.json();
          setBook({
            title: data.title,
            author: "Unknown Author",
            cover: data.covers?.[0]
              ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
              : "",
            subjects: data.subjects?.slice(0, 5) || [],
            description:
              typeof data.description === "string"
                ? data.description
                : data.description?.value || "No description available.",
            free: false,
            olKey: id,
          });
        }
      } catch {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    if (bookKey) fetchBook();
  }, [bookKey]);

  const handleStartReading = () => {
    if (!book || !bookKey) return;
    if (!isReading(bookKey)) {
      addToReading({
        id: bookKey,
        title: book.title,
        author: book.author,
        cover: book.cover,
        progress: 0,
        lastRead: "Just now",
        textUrl: book.textUrl || "",
      });
    }
    setReading(true);
  };

  const handleAddToCart = () => {
    if (!book || !bookKey) return;
    addToCart({ id: bookKey, title: book.title, author: book.author, cover: book.cover });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            className="mb-8 gap-2 text-muted-foreground"
            onClick={() => (reading ? setReading(false) : navigate(-1))}
          >
            <ArrowLeft size={16} /> {reading ? "Retour aux détails" : "Retour"}
          </Button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground animate-pulse">Chargement...</p>
            </div>
          ) : reading && book?.textUrl ? (
            <BookReader bookId={bookKey!} title={book.title} />
          ) : book ? (
            <div className="glass-card p-8 flex flex-col sm:flex-row gap-8">
              <div className="shrink-0">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-40 rounded-xl elegant-shadow"
                  />
                ) : (
                  <div className="w-40 h-56 bg-secondary rounded-xl flex items-center justify-center elegant-shadow">
                    <BookOpen size={40} className="text-primary-foreground/60" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                  {book.title}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">by {book.author}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {book.description}
                </p>

                {book.subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.subjects.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {book.free ? (
                  <div className="flex flex-col gap-3">
                    <Button className="gap-2 w-fit" onClick={handleStartReading}>
                      <BookOpen size={15} />
                      {isReading(bookKey!) ? "Continue Reading" : "Start Reading"}
                    </Button>
                    {isReading(bookKey!) && (
                      <button
                        onClick={() => navigate("/my-library")}
                        className="text-xs text-primary underline w-fit"
                      >
                        Voir dans Ma Bibliothèque →
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <span className="text-xs bg-red-500/10 text-red-600 px-3 py-1 rounded-full w-fit">
                      🔒 Livre sous droits d'auteur — Paiement à la livraison
                    </span>
                    <Button
                      className="gap-2 w-fit"
                      onClick={handleAddToCart}
                      disabled={isInCart(bookKey!)}
                    >
                      {isInCart(bookKey!) || added ? (
                        <><Check size={15} /> Ajouté au panier</>
                      ) : (
                        <><ShoppingCart size={15} /> Ajouter au panier</>
                      )}
                    </Button>
                    {isInCart(bookKey!) && (
                      <button
                        onClick={() => navigate("/my-library")}
                        className="text-xs text-primary underline w-fit"
                      >
                        Voir mon panier →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Livre non trouvé.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookDetail;