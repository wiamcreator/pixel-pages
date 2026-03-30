import { useState } from "react";
import { Send, X, MessageCircle, Sparkles } from "lucide-react";

interface Message {
  from: "user" | "owl";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { from: "owl", text: "Hi there! 🦉 I'm Book-Owl, your AI reading companion. Tell me what kind of stories you enjoy and I'll find the perfect book for you!" },
];

const BookOwlChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      const responses = [
        "Great taste! I'd recommend 'The Enchanted Forest' — it's a captivating read with beautiful prose. 📖",
        "Based on that, you might love 'Moonlit Wanderer'. It has wonderful character development! 🌙",
        "Interesting! 'Neon Horizon' is a sci-fi gem that readers can't stop talking about. 🚀",
        "Oh, 'Heart of Glass' has been getting amazing reviews. A heartfelt story you won't forget! 💕",
      ];
      setMessages((prev) => [...prev, {
        from: "owl",
        text: responses[Math.floor(Math.random() * responses.length)],
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full px-5 py-3 elegant-shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-medium"
        >
          <Sparkles size={18} />
          Ask Book-Owl
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card rounded-2xl elegant-shadow-lg border border-border flex flex-col overflow-hidden" style={{ height: "440px" }}>
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🦉</span>
              <div>
                <div className="text-sm font-semibold text-primary-foreground">Book-Owl</div>
                <div className="text-[11px] text-primary-foreground/60">AI Reading Companion</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                  msg.from === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border shrink-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me for book recommendations..."
                className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={sendMessage}
                className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookOwlChat;
