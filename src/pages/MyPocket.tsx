import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, TrendingUp, Trophy, Gift, Sparkles, BookOpen, Flame, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRANSACTIONS = [
  { icon: Flame, label: "3-Day Reading Streak", type: "Daily Challenge", amount: 30, date: "Today" },
  { icon: BookOpen, label: "Read 30 pages", type: "Daily Challenge", amount: 15, date: "Today" },
  { icon: Crown, label: "Finished 'The Midnight Library'", type: "Monthly Quest", amount: 100, date: "Yesterday" },
  { icon: Trophy, label: "Century Sprint", type: "Monthly Quest", amount: 50, date: "2 days ago" },
  { icon: Gift, label: "Welcome Bonus", type: "Reward", amount: 50, date: "1 week ago" },
  { icon: BookOpen, label: "Morning Reader", type: "Daily Challenge", amount: 20, date: "1 week ago" },
  { icon: Sparkles, label: "Genre Explorer", type: "Monthly Quest", amount: 75, date: "2 weeks ago" },
];

const REWARDS = [
  { icon: BookOpen, label: "Unlock Premium Book", cost: 200 },
  { icon: Sparkles, label: "AI Deep Recommendation", cost: 100 },
  { icon: Crown, label: "Exclusive Author Interview", cost: 350 },
];

const MyPocket = () => {
  const navigate = useNavigate();
  const balance = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
  const thisMonth = TRANSACTIONS.filter(t => !t.date.includes("week")).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">My Pocket</h1>
          <p className="text-muted-foreground">Your reading rewards wallet</p>
        </header>

        {/* Balance card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground border-0 elegant-shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 opacity-90">
              <Wallet size={20} />
              <span className="text-sm uppercase tracking-wider font-medium">Current Balance</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-6xl font-bold">{balance}</span>
              <span className="text-2xl font-medium opacity-90">pts</span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>+{thisMonth} this month</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} />
                <span>{TRANSACTIONS.length} rewards earned</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
            <Card className="divide-y divide-border">
              {TRANSACTIONS.map(({ icon: Icon, label, type, amount, date }, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{label}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">{type}</Badge>
                      <span className="text-xs text-muted-foreground">{date}</span>
                    </div>
                  </div>
                  <div className="font-bold text-primary shrink-0">
                    +{amount}
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Redeem */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Redeem</h2>
            <div className="space-y-3">
              {REWARDS.map(({ icon: Icon, label, cost }, idx) => {
                const canAfford = balance >= cost;
                return (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent-foreground flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div className="font-medium text-foreground text-sm">{label}</div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      variant={canAfford ? "default" : "secondary"}
                      disabled={!canAfford}
                    >
                      {cost} pts
                    </Button>
                  </Card>
                );
              })}
            </div>
            <Card className="p-4 mt-4 bg-muted/40 border-dashed">
              <div className="flex items-start gap-3">
                <Trophy className="text-primary shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-muted-foreground">
                  Complete more challenges to earn extra points!
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPocket;
