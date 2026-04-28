import { useState } from "react";
import { BookOpen, Download, Star, ArrowLeft, Play, BookMarked, ChevronRight, ShoppingCart, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const FINISHED_BOOKS = [
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4, color: "bg-secondary" },
  { title: "Normal People", author: "Sally Rooney", rating: 5, color: "bg-accent/80" },
  { title: "The Midnight Library", author: "Matt Haig", rating: 4.5, color: "bg-primary" },
  { title: "Sapiens", author: "Yuval Noah Harari", rating: 4, color: "bg-warm-700" },
];

const DOWNLOADED = [
  { title: "The Last Signal", author: "Zara Cosmos", genre: "Sci-Fi", rating: 4.6, size: "2.4 MB", color: "bg-warm-700" },
  { title: "Silent Whispers", author: "Ivy Blackwood", genre: "Thriller", rating: 4.3, size: "1.8 MB", color: "bg-primary" },
];

const OrderForm = ({ books, onSuccess }: { books: { title: string }[], onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) return;
    setSubmitted(true);
    onSuccess();
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-6">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-lg font-bold text-green-700 mb-1">Demande reçue !</h3>
        <p className="text-sm text-green-600">
          Merci <strong>{name}</strong> ! Votre commande a bien été enregistrée. Nous vous contacterons bientôt au <strong>{phone}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl p-5 space-y-4 mt-6">
      <h3 className="font-display text-base font-semibold text-foreground">📋 Informations de livraison</h3>
      <p className="text-xs text-muted-foreground">Paiement à la livraison — remplissez vos informations et nous vous contacterons.</p>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Nom complet</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Numéro de téléphone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Votre numéro"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Adresse de livraison</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Votre adresse"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      </div>
      <Button className="w-full gap-2" onClick={handleSubmit} disabled={!name.trim() || !phone.trim() || !address.trim()}>
        <ShoppingCart size={15} /> Confirmer la commande
      </Button>
    </div>
  );
};

const MyLibrary = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, readingList } = useCart();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </button>

          <Tabs defaultValue="reading" className="w-full">
            <TabsList className="bg-muted/60 mb-8 w-full sm:w-auto">
              <TabsTrigger value="reading" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen size={14} /> Reading
              </TabsTrigger>
              <TabsTrigger value="finished" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookMarked size={14} /> Finished
              </TabsTrigger>
              <TabsTrigger value="cart" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative">
                <ShoppingCart size={14} /> My Cart
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="downloaded" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Download size={14} /> Downloads
              </TabsTrigger>
            </TabsList>

            {/* CURRENTLY READING */}
            <TabsContent value="reading" className="space-y-6">
              <div className="flex items-end justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">Currently Reading</h1>
                <span className="text-sm text-muted-foreground">{readingList.length} books active</span>
              </div>

              {readingList.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Vous n'avez pas encore commencé de livre.</p>
                  <button onClick={() => navigate("/")} className="text-primary text-sm underline mt-2">
                    Parcourir les livres
                  </button>
                </div>
              ) : (
                <>
                  {/* Featured book */}
                  <div className="glass-card overflow-hidden">
                    <div className="bg-secondary h-56 sm:h-64 flex items-center justify-center overflow-hidden">
                      {readingList[0].cover ? (
                        <img src={readingList[0].cover} alt={readingList[0].title} className="w-full h-full object-cover" />
                      ) : (
                        <BookOpen size={56} className="text-primary-foreground/40" />
                      )}
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Reading Now</p>
                        <h2 className="font-display text-xl font-bold text-foreground">{readingList[0].title}</h2>
                        <p className="text-sm text-muted-foreground italic">{readingList[0].author}</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Progress</span>
                          <span className="text-foreground font-semibold">{readingList[0].progress}%</span>
                        </div>
                        <Progress value={readingList[0].progress} className="h-2.5 bg-muted" />
                      </div>
                      <p className="text-xs text-muted-foreground">Last read: {readingList[0].lastRead}</p>
                      <button
                        onClick={() => navigate(`/book/${readingList[0].id}`)}
                        className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                      >
                        <Play size={16} fill="currentColor" /> Continue Reading
                      </button>
                    </div>
                  </div>

                  {/* Other books */}
                  {readingList.slice(1).map((book, i) => (
                    <div key={i} className="glass-card p-4 flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/book/${book.id}`)}>
                      <div className="w-16 h-20 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-secondary">
                        {book.cover ? (
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen size={20} className="text-primary-foreground/50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                        <div className="flex items-center gap-3">
                          <Progress value={book.progress} className="h-1.5 flex-1 bg-muted" />
                          <span className="text-xs font-medium text-foreground">{book.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Last read: {book.lastRead}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Stats */}
              <div className="glass-card p-5 text-center space-y-3 bg-muted/40">
                <BookMarked size={28} className="mx-auto text-foreground" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{readingList.length}</p>
                  <p className="text-sm text-muted-foreground">Books reading this year</p>
                </div>
              </div>

              {/* Curator's insight */}
              <div className="glass-card p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-foreground">Curator's Insight</h3>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  {readingList.length > 0
                    ? `You are currently reading "${readingList[0].title}". Keep up the great work!`
                    : "Start reading a book to get personalized insights from Book-Owl AI."}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg">🦉</span>
                  <span className="text-xs text-muted-foreground font-medium">Book-Owl AI</span>
                </div>
              </div>
            </TabsContent>

            {/* FINISHED */}
            <TabsContent value="finished" className="space-y-6">
              <div className="flex items-end justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">Finished</h1>
                <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  View Archive <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {FINISHED_BOOKS.map((book, i) => (
                  <div key={i} className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className={`${book.color} h-36 flex items-center justify-center`}>
                      <BookOpen size={28} className="text-primary-foreground/50" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1.5">{book.author}</p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= Math.floor(book.rating) ? "text-accent fill-accent" : "text-border"} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* MY CART */}
            <TabsContent value="cart" className="space-y-6">
              <div className="flex items-end justify-between">
                <h1 className="font-display text-3xl font-bold text-foreground">My Cart</h1>
                <span className="text-sm text-muted-foreground">{cart.length} livre{cart.length > 1 ? "s" : ""}</span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingCart size={40} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Votre panier est vide.</p>
                  <button onClick={() => navigate("/")} className="text-primary text-sm underline mt-2">
                    Parcourir les livres
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((book) => (
                      <div key={book.id} className="glass-card p-4 flex items-center gap-4">
                        {book.cover ? (
                          <img src={book.cover} alt={book.title} className="w-14 h-20 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-14 h-20 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen size={20} className="text-primary-foreground/50" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                          <p className="text-xs text-muted-foreground">by {book.author}</p>
                          <span className="text-xs bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full mt-1 inline-block">🔒 Payant</span>
                        </div>
                        <button onClick={() => removeFromCart(book.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {!showForm && (
                    <Button className="w-full gap-2" onClick={() => setShowForm(true)}>
                      <ShoppingCart size={15} /> Procéder à la commande
                    </Button>
                  )}

                  {showForm && (
                    <OrderForm books={cart} onSuccess={() => setShowForm(false)} />
                  )}
                </>
              )}
            </TabsContent>

            {/* DOWNLOADED */}
            <TabsContent value="downloaded" className="space-y-6">
              <h1 className="font-display text-3xl font-bold text-foreground">Downloaded</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {DOWNLOADED.map((book, i) => (
                  <div key={i} className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className={`${book.color} h-36 flex items-center justify-center relative`}>
                      <BookOpen size={28} className="text-primary-foreground/50" />
                      <span className="absolute top-2 right-2 bg-card/90 text-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">{book.genre}</span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1.5">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} className={s <= Math.floor(book.rating) ? "text-accent fill-accent" : "text-border"} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{book.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MyLibrary;