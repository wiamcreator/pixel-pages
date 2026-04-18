import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How do I create an account on Book Warm?",
    a: "Click the login button on the homepage and choose to sign up. You'll be asked to pick your favorite genres so we can personalize your library and recommendations from the start.",
  },
  {
    q: "Is Book Warm free to use?",
    a: "Yes! Browsing the library, reading featured books, tracking progress and chatting with our Book-Owl AI companion are completely free. Some premium titles may require points earned through challenges.",
  },
  {
    q: "How do I earn points?",
    a: "You earn points by completing Daily Challenges (like reading 30 pages a day) and Monthly Quests (like finishing 5 books in a month). Points are stored in My Pocket and can be used to unlock premium content.",
  },
  {
    q: "What's the difference between Daily Challenges and Monthly Quests?",
    a: "Daily Challenges are short, achievable goals that reset every 24 hours and give 10–30 points. Monthly Quests are bigger, harder objectives that span the whole month and reward 50–500 points.",
  },
  {
    q: "How does the Book-Owl AI work?",
    a: "Book-Owl is your personal reading companion. Tell it what mood you're in or what you liked recently, and it will suggest titles tailored to your taste based on your library and reading history.",
  },
  {
    q: "Can I download books to read offline?",
    a: "Yes. Any book in your library can be downloaded for offline reading. Downloaded books appear in the Downloads tab of My Library.",
  },
  {
    q: "How do I add a book to my Wishlist?",
    a: "Click the bookmark icon on any book card. Your saved books will appear in the Wishlist tab inside My Library.",
  },
  {
    q: "Can I track my reading progress?",
    a: "Absolutely. Every book in your library has a progress bar that updates as you read. The Currently Reading section on My Library shows your active book at a glance.",
  },
  {
    q: "I forgot my password. What should I do?",
    a: "On the login popup, click 'Forgot password?' and enter your email. We'll send you a secure link to reset your password.",
  },
  {
    q: "How do I contact support?",
    a: "Visit our About Us page for email, phone, and social media contacts. We typically respond within 24 hours.",
  },
];

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-16 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <header className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-primary/10 text-primary items-center justify-center mb-4">
            <HelpCircle size={28} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about Book Warm — answered.
          </p>
        </header>

        <Card className="p-2 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline px-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed px-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </main>
    </div>
  );
};

export default FAQ;
