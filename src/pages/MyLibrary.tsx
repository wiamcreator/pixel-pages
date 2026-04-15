import { useState } from "react";
import { BookOpen, Heart, Download, Star, ArrowLeft, Play, BookMarked, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";

const CURRENTLY_READING = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    progress: 68,
    lastRead: "Yesterday at 9:45 PM",
    color: "bg-secondary",
    featured: true,
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    progress: 24,
    lastRead: "3 days ago",
    color: "bg-accent/80",
    featured: false,
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    progress: 45,
    lastRead: "Last week",
    color: "bg-warm-700",
    featured: false,
  },
];

const FINISHED_BOOKS = [
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4, color: "bg-secondary" },
  { title: "Normal People", author: "Sally Rooney", rating: 5, color: "bg-accent/80" },
  { title: "The Midnight Library", author: "Matt Haig", rating: 4.5, color: "bg-primary" },
  { title: "Sapiens", author: "Yuval Noah Harari", rating: 4, color: "bg-warm-700" },
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

const MyLibrary = () => {
  const navigate = useNavigate();
  const featured = CURRENTLY_READING[0];
  const others = CURRENTLY_READING.slice(1);
  const booksReadThisYear = 12;
  const yearlyGoal = 20;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <Tabs defaultValue="reading" className="w-full">
            <TabsList className="bg-muted/60 mb-8 w-full sm:w-auto">
              <TabsTrigger value="reading" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookOpen size={14} /> Reading
              </TabsTrigger>
              <TabsTrigger value="finished" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BookMarked size={14} /> Finished
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart size={14} /> Wishlist
              </TabsTrigger>
              <TabsTrigger value="downloaded" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Download size={14} /> Downloads
              </TabsTrigger>
            </TabsList>

            {/* ===== CURRENTLY READING ===== */}
            <TabsContent value="reading" className="space-y-6">
              {/* Header */}
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground">Currently Reading</h1>
                </div>
                <span className="text-sm text-muted-foreground">{CURRENTLY_READING.length} books active</span>
              </div>

              {/* Featured book */}
              <div className="glass-card overflow-hidden">
                <div className={`${featured.color} h-56 sm:h-64 flex items-center justify-center`}>
                  <BookOpen size={56} className="text-primary-foreground/40" />
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">Reading Now</p>
                    <h2 className="font-display text-xl font-bold text-foreground">{featured.title}</h2>
                    <p className="text-sm text-muted-foreground italic">{featured.author}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">Progress</span>
                      <span className="text-foreground font-semibold">{featured.progress}%</span>
                    </div>
                    <Progress value={featured.progress} className="h-2.5 bg-muted" />
                  </div>
                  <p className="text-xs text-muted-foreground">Last read: {featured.lastRead}</p>
                  <button className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                    <Play size={16} fill="currentColor" />
                    Continue Reading
                  </button>
                </div>
              </div>

              {/* Other books reading */}
              {others.map((book, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-4">
                  <div className={`${book.color} w-16 h-20 rounded-lg flex items-center justify-center shrink-0`}>
                    <BookOpen size={20} className="text-primary-foreground/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center gap-3">
                      <Progress value={book.progress} className="h-1.5 flex-1 bg-muted" />
                      <span className="text-xs font-medium text-foreground">{book.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Stats card */}
              <div className="glass-card p-5 text-center space-y-3 bg-muted/40">
                <BookMarked size={28} className="mx-auto text-foreground" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{booksReadThisYear}</p>
                  <p className="text-sm text-muted-foreground">Books read this year</p>
                </div>
                <div className="space-y-1">
                  <Progress value={(booksReadThisYear / yearlyGoal) * 100} className="h-2 bg-muted" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Goal: {yearlyGoal} books</p>
                </div>
              </div>

              {/* Curator's insight */}
              <div className="glass-card p-5 space-y-3">
                <h3 className="font-display text-lg font-bold text-foreground">Curator's Insight</h3>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "You are currently exploring a mix of 20th-century classics and modern mythology. This weekend would be perfect for finishing 'The Great Gatsby' to keep your momentum high."
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg">🦉</span>
                  <span className="text-xs text-muted-foreground font-medium">Book-Owl AI</span>
                </div>
              </div>
            </TabsContent>

            {/* ===== FINISHED ===== */}
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

            {/* ===== WISHLIST ===== */}
            <TabsContent value="wishlist" className="space-y-6">
              <h1 className="font-display text-3xl font-bold text-foreground">Wishlist</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {WISHLIST.map((book, i) => (
                  <div key={i} className="glass-card overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className={`${book.color} h-36 flex items-center justify-center relative`}>
                      <BookOpen size={28} className="text-primary-foreground/50" />
                      <span className="absolute top-2 right-2 bg-card/90 text-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">{book.genre}</span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1.5">{book.author}</p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= Math.floor(book.rating) ? "text-accent fill-accent" : "text-border"} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ===== DOWNLOADED ===== */}
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
