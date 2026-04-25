import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const OrderForm = ({ bookTitle }: { bookTitle: string }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-lg font-bold text-green-700 mb-1">
          Demande reçue !
        </h3>
        <p className="text-sm text-green-600">
          Merci <strong>{name}</strong> ! Votre commande pour <strong>"{bookTitle}"</strong> a bien été enregistrée. Nous vous contacterons bientôt au <strong>{phone}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl p-5 space-y-4">
      <h3 className="font-display text-base font-semibold text-foreground">
        🛒 Commander ce livre
      </h3>
      <p className="text-xs text-muted-foreground">
        Paiement à la livraison — remplissez vos informations et nous vous contacterons.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Numéro de téléphone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Votre numéro"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Adresse de livraison</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Votre adresse"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <Button
        className="w-full gap-2"
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim() || !address.trim()}
      >
        <ShoppingCart size={15} />
        Confirmer la commande
      </Button>
    </div>
  );
};

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

const BookDetail = () => {
  const { bookKey } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reading, setReading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        if (bookKey?.startsWith("gut-")) {
          const id = bookKey.replace("gut-", "");
          const res = await fetch(`https://gutendex.com/books/${id}`);
          const data = await res.json();

          const textUrl =
            data.formats?.["text/html"] ||
            data.formats?.["text/plain; charset=utf-8"] ||
            data.formats?.["text/plain"] || "";

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
            description: typeof data.description === "string"
              ? data.description
              : data.description?.value || "No description available.",
            free: false,
            olKey: id,
          });
        }
      } catch (err) {
        console.error("Failed to fetch book", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    if (bookKey) fetchBook();
  }, [bookKey]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            className="mb-8 gap-2 text-muted-foreground"
            onClick={() => reading ? setReading(false) : navigate(-1)}
          >
            <ArrowLeft size={16} /> {reading ? "Retour aux détails" : "Retour"}
          </Button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground animate-pulse">Chargement...</p>
            </div>
          ) : reading && book?.textUrl ? (
            <iframe
              src={book.textUrl}
              className="w-full rounded-xl elegant-shadow"
              style={{ height: "80vh" }}
              title={book.title}
            />
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
                      <span key={i} className="text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {book.free ? (
                  <div className="flex gap-3">
                    <Button className="gap-2" onClick={() => setReading(true)}>
                      <BookOpen size={15} />
                      Lire maintenant
                    </Button>
                    <Button variant="outline" onClick={() => window.open(book.textUrl, "_blank")}>
                      Ouvrir dans un nouvel onglet
                    </Button>
                  </div>
                ) : (
                  <OrderForm bookTitle={book.title} />
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