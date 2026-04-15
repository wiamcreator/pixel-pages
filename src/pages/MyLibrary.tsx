import { useState } from "react";
import { BookOpen, Heart, Download, Star, ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const READ_BOOKS = [
  { title: "Moonlit Wanderer", author: "Luna Ashworth", genre: "Fantasy", rating: 4.5, progress: 100, color: "bg-secondary" },
  { title: "Heart of Glass", author: "Rose Bennett", genre: "Romance", rating: 4.2, progress: 100, color: "bg-accent/80" },
  { title: "Crimson Tide", author: "Jack Raven", genre: "Thriller", rating: 4.4, progress: 100, color: "bg-primary" },
  { title: "Café at Dawn", author: "Mia Fontaine", genre: "Romance", rating: 4.1, progress: 100, color: "bg-accent/80" },
];

const WISHLIST = [
  { title: "Dragon's Lament", author: "Finn Dragonhart", genre: "Fantasy", rating: 4.8, color: "bg-secondary" },
  { title: "Neon Horizon", author: "Kai Steele", genre: "Sci-Fi", rating: 4.7, color: "bg-warm-700" },
  { title: "Stellar Drift", author: "Nova Chen", genre: "Sci-Fi", rating: 4.3, color: "bg-warm-700" },
];

const DOWNLOADED = [
  { title: "The Last Signal", author: "Zara Cosmos", genre: "Sci-Fi", rating: 4.6, size: "2.4 MB", color: "bg-warm-700" },
  { title: "Silent Whispers", author: "Ivy Blackwood", genre: "Thriller", rating: 4.3, size: "1.8 MB", color: "bg-primary" },
];

type Book = { title: string; author: string; genre: string; rating: number; color: string; progress?: number; size?: string };

const BookCard = ({ book, icon }: { book: Book; icon: React.ReactNode }) => (
  <div className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300">
    <div className={`${book.color} h-36 flex items-center justify-center relative`}>
      <BookOpen size={32} className="text-primary-foreground/60" />
      <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
        {book.genre}
      </span>
      <span className="absolute top-3 left-3 text-primary-foreground/80">{icon}</span>
    </div>
    <div className="p-4">
      <h3 className="font-display text-sm font-semibold text-foreground mb-0.5">{book.title}</h3>
      <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={12} className={i <= Math.floor(book.rating) ? "text-accent fill-accent" : "text-border"} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
        </div>
        {book.progress !== undefined && (
          <span className="text-[10px] text-secondary font-medium">Finished ✓</span>
        )}
        {book.size && (
          <span className="text-[10px] text-muted-foreground">{book.size}</span>
        )}
      </div>
    </div>
  </div>
);

const MyLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Library</h1>
          <p className="text-muted-foreground mb-8">Your personal collection of books</p>

          <Tabs defaultValue="read" className="w-full">
            <TabsList className="bg-muted/60 mb-8">
              <TabsTrigger value="read" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen size={14} /> Read ({READ_BOOKS.length})
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart size={14} /> Wishlist ({WISHLIST.length})
              </TabsTrigger>
              <TabsTrigger value="downloaded" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Download size={14} /> Downloaded ({DOWNLOADED.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="read">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {READ_BOOKS.map((book, i) => (
                  <BookCard key={i} book={book} icon={<BookOpen size={16} />} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wishlist">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {WISHLIST.map((book, i) => (
                  <BookCard key={i} book={book} icon={<Heart size={16} />} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="downloaded">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {DOWNLOADED.map((book, i) => (
                  <BookCard key={i} book={book} icon={<Download size={16} />} />
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
