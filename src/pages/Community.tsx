import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Search, MessageCircle, Send, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";

type Community = {
  id: string;
  book: string;
  author: string;
  genre: string;
  members: number;
  description: string;
  color: string;
};

type Message = {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
};

const COMMUNITIES: Community[] = [
  { id: "1", book: "Moonlit Wanderer", author: "Luna Ashworth", genre: "Fantasy", members: 1243, description: "Pour les passionnés de mondes oniriques et de quêtes magiques.", color: "bg-secondary" },
  { id: "2", book: "Heart of Glass", author: "Rose Bennett", genre: "Romance", members: 892, description: "Discutez des moments romantiques qui font fondre le cœur.", color: "bg-accent/80" },
  { id: "3", book: "Neon Horizon", author: "Kai Steele", genre: "Sci-Fi", members: 2104, description: "Théories, futurs et technologies — débattons-en !", color: "bg-warm-700" },
  { id: "4", book: "Silent Whispers", author: "Ivy Blackwood", genre: "Thriller", members: 1567, description: "Décortiquez les indices et partagez vos théories.", color: "bg-primary" },
  { id: "5", book: "Dragon's Lament", author: "Finn Dragonhart", genre: "Fantasy", members: 3421, description: "La plus grande communauté de dresseurs de dragons.", color: "bg-secondary" },
  { id: "6", book: "Café at Dawn", author: "Mia Fontaine", genre: "Romance", members: 654, description: "Histoires douces autour d'un café virtuel.", color: "bg-accent/80" },
  { id: "7", book: "The Last Signal", author: "Zara Cosmos", genre: "Sci-Fi", members: 1789, description: "Explorez les confins de l'espace ensemble.", color: "bg-warm-700" },
  { id: "8", book: "Crimson Tide", author: "Jack Raven", genre: "Thriller", members: 980, description: "Pour les amateurs de suspense haletant.", color: "bg-primary" },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  default: [
    { id: "1", user: "Emma", avatar: "👩‍🦰", text: "Le chapitre 12 m'a complètement bouleversée 😭", time: "10:24" },
    { id: "2", user: "Lucas", avatar: "🧑", text: "Je viens de finir, qui veut en parler ?", time: "10:31" },
    { id: "3", user: "Sofia", avatar: "👩", text: "La fin était parfaite à mon avis !", time: "10:45" },
    { id: "4", user: "Marc", avatar: "🧔", text: "Quelqu'un a remarqué le foreshadowing au début ?", time: "11:02" },
  ],
};

const Community = () => {
  const [search, setSearch] = useState("");
  const [joined, setJoined] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("bookwarm-joined-communities");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES.default);
  const [newMessage, setNewMessage] = useState("");

  const filtered = COMMUNITIES.filter(
    (c) =>
      c.book.toLowerCase().includes(search.toLowerCase()) ||
      c.author.toLowerCase().includes(search.toLowerCase()) ||
      c.genre.toLowerCase().includes(search.toLowerCase())
  );

  const toggleJoin = (id: string, bookTitle: string) => {
    const next = new Set(joined);
    if (next.has(id)) {
      next.delete(id);
      toast.info(`Vous avez quitté la communauté "${bookTitle}"`);
    } else {
      next.add(id);
      toast.success(`Bienvenue dans la communauté "${bookTitle}" ! 📚`);
    }
    setJoined(next);
    localStorage.setItem("bookwarm-joined-communities", JSON.stringify([...next]));
  };

  const openChat = (c: Community) => {
    setActiveCommunity(c);
    setMessages(MOCK_MESSAGES.default);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        user: "Vous",
        avatar: "📖",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">Communautés de lecteurs</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trouve une communauté de fans de ton livre préféré et rejoins la discussion.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher un livre, auteur ou genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-card border-border"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((c) => {
            const isJoined = joined.has(c.id);
            return (
              <Card key={c.id} className="overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div className={`${c.color} h-32 flex items-center justify-center relative`}>
                  <BookOpen size={36} className="text-primary-foreground/60" />
                  <span className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {c.genre}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{c.book}</h3>
                  <p className="text-xs text-muted-foreground mb-2">par {c.author}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{c.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <Users size={14} />
                    <span>{c.members.toLocaleString()} membres</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleJoin(c.id, c.book)}
                      variant={isJoined ? "outline" : "default"}
                      size="sm"
                      className="flex-1"
                    >
                      {isJoined ? "Quitter" : "Rejoindre"}
                    </Button>
                    {isJoined && (
                      <Button onClick={() => openChat(c)} variant="secondary" size="sm" className="flex-1">
                        <MessageCircle size={14} />
                        Discuter
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">Aucune communauté trouvée.</p>
        )}
      </main>

      {/* Chat Dialog */}
      <Dialog open={!!activeCommunity} onOpenChange={(open) => !open && setActiveCommunity(null)}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 border-b border-border">
            <DialogTitle className="flex items-center gap-3">
              <button onClick={() => setActiveCommunity(null)} className="md:hidden">
                <ArrowLeft size={18} />
              </button>
              <div className={`w-10 h-10 rounded-lg ${activeCommunity?.color} flex items-center justify-center`}>
                <BookOpen size={18} className="text-primary-foreground/70" />
              </div>
              <div className="text-left">
                <div className="font-display text-base">{activeCommunity?.book}</div>
                <div className="text-xs text-muted-foreground font-normal flex items-center gap-1">
                  <Users size={11} /> {activeCommunity?.members.toLocaleString()} membres
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.user === "Vous" ? "flex-row-reverse" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-sm shrink-0">
                  {m.avatar}
                </div>
                <div className={`max-w-[75%] ${m.user === "Vous" ? "items-end" : ""} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-0.5 px-1">
                    <span className="text-xs font-medium text-foreground">{m.user}</span>
                    <span className="text-[10px] text-muted-foreground">{m.time}</span>
                  </div>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      m.user === "Vous"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card text-foreground rounded-tl-sm border border-border"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              placeholder="Écris un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon">
              <Send size={16} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
