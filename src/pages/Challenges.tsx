import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Trophy, Clock, CheckCircle2, Lock, Star, BookOpen, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

type Challenge = {
  title: string;
  description: string;
  reward: number;
  progress: number;
  goal: number;
  unit: string;
  icon: React.ReactNode;
  status: "active" | "completed" | "locked";
};

const DAILY_CHALLENGES: Challenge[] = [
  { title: "Page Turner", description: "Read 30 pages of any book", reward: 10, progress: 22, goal: 30, unit: "pages", icon: <BookOpen size={18} />, status: "active" },
  { title: "Morning Reader", description: "Start a reading session before 9 AM", reward: 15, progress: 1, goal: 1, unit: "session", icon: <Clock size={18} />, status: "completed" },
  { title: "Genre Explorer", description: "Read from a genre you haven't tried this week", reward: 20, progress: 0, goal: 1, unit: "book", icon: <Star size={18} />, status: "active" },
  { title: "Review Time", description: "Write a review for a book you've finished", reward: 15, progress: 0, goal: 1, unit: "review", icon: <Target size={18} />, status: "active" },
  { title: "Speed Read", description: "Read 50 pages in a single session", reward: 25, progress: 0, goal: 50, unit: "pages", icon: <Zap size={18} />, status: "locked" },
  { title: "Bookworm Streak", description: "Read for 3 days in a row", reward: 30, progress: 2, goal: 3, unit: "days", icon: <Flame size={18} />, status: "active" },
];

const MONTHLY_CHALLENGES: Challenge[] = [
  { title: "Century Sprint", description: "Read 100 pages of a book of your choice", reward: 50, progress: 68, goal: 100, unit: "pages", icon: <BookOpen size={18} />, status: "active" },
  { title: "Five-Book Marathon", description: "Finish 5 complete books this month", reward: 150, progress: 3, goal: 5, unit: "books", icon: <Trophy size={18} />, status: "active" },
  { title: "Genre Master", description: "Read at least 1 book from 4 different genres", reward: 100, progress: 2, goal: 4, unit: "genres", icon: <Star size={18} />, status: "active" },
  { title: "The Thousand", description: "Read a total of 1,000 pages across all books", reward: 200, progress: 620, goal: 1000, unit: "pages", icon: <Target size={18} />, status: "active" },
  { title: "Deep Dive", description: "Read a book with 400+ pages from cover to cover", reward: 120, progress: 0, goal: 1, unit: "book", icon: <Zap size={18} />, status: "active" },
  { title: "Social Reader", description: "Share 3 reviews and get 10 likes from the community", reward: 80, progress: 1, goal: 3, unit: "reviews", icon: <Flame size={18} />, status: "active" },
  { title: "Classics Challenge", description: "Read 2 books published before 1950", reward: 100, progress: 0, goal: 2, unit: "books", icon: <BookOpen size={18} />, status: "locked" },
  { title: "Night Owl", description: "Complete 10 late-night reading sessions (after 10 PM)", reward: 75, progress: 4, goal: 10, unit: "sessions", icon: <Clock size={18} />, status: "active" },
];

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const pct = Math.min((challenge.progress / challenge.goal) * 100, 100);
  const isCompleted = challenge.status === "completed";
  const isLocked = challenge.status === "locked";

  return (
    <div
      className={`glass-card p-4 transition-all ${isLocked ? "opacity-50" : ""} ${isCompleted ? "ring-2 ring-secondary/40" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          isCompleted ? "bg-secondary text-secondary-foreground" : isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
        }`}>
          {isCompleted ? <CheckCircle2 size={18} /> : isLocked ? <Lock size={18} /> : challenge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="font-display text-sm font-semibold text-foreground truncate">{challenge.title}</h3>
            <span className="flex items-center gap-1 text-xs font-semibold text-accent shrink-0 ml-2">
              +{challenge.reward} pts
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>
          {!isLocked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {challenge.progress}/{challenge.goal} {challenge.unit}
                </span>
                <span className="font-medium text-foreground">{Math.round(pct)}%</span>
              </div>
              <Progress value={pct} className="h-1.5 bg-muted" />
            </div>
          )}
          {isLocked && (
            <p className="text-xs text-muted-foreground italic">Complete today's challenges to unlock</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Challenges = () => {
  const navigate = useNavigate();

  const dailyCompleted = DAILY_CHALLENGES.filter(c => c.status === "completed").length;
  const monthlyCompleted = MONTHLY_CHALLENGES.filter(c => c.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Trophy size={28} className="text-accent" />
            <h1 className="font-display text-3xl font-bold text-foreground">Challenges</h1>
          </div>
          <p className="text-muted-foreground mb-8">Complete reading challenges to earn points and rewards</p>

          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="bg-muted/60 mb-6">
              <TabsTrigger value="daily" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Flame size={14} /> Daily ({dailyCompleted}/{DAILY_CHALLENGES.length})
              </TabsTrigger>
              <TabsTrigger value="monthly" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy size={14} /> Monthly ({monthlyCompleted}/{MONTHLY_CHALLENGES.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-3">
              <div className="glass-card p-4 bg-muted/30 flex items-center gap-3 mb-4">
                <Flame size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Daily challenges reset in 14h 23m</p>
                  <p className="text-xs text-muted-foreground">Complete all to unlock bonus rewards</p>
                </div>
              </div>
              {DAILY_CHALLENGES.map((c, i) => (
                <ChallengeCard key={i} challenge={c} />
              ))}
            </TabsContent>

            <TabsContent value="monthly" className="space-y-3">
              <div className="glass-card p-4 bg-muted/30 flex items-center gap-3 mb-4">
                <Trophy size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">18 days remaining this month</p>
                  <p className="text-xs text-muted-foreground">Monthly challenges are harder but offer bigger rewards</p>
                </div>
              </div>
              {MONTHLY_CHALLENGES.map((c, i) => (
                <ChallengeCard key={i} challenge={c} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Challenges;
