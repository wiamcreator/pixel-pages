import { useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";

interface Message {
  from: "user" | "owl";
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { from: "owl", text: "Hoo-hoo! 🦉 I'm Book-Owl, your reading companion! Ask me anything about books and I'll help you find your next adventure!" },
];

const BookOwlChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "Great choice! Based on that, I'd recommend 'The Enchanted Forest' — it's a magical read! 📖✨",
        "Hoo! Let me think... You might love 'Moonlit Wanderer' if you enjoy fantasy adventures! 🌙",
        "Interesting! Have you tried 'Neon Horizon'? It's a sci-fi gem that readers can't put down! 🚀",
        "Oh, that's a tough one! But 'Heart of Glass' has been getting amazing reviews lately! 💕",
      ];
      const owl: Message = {
        from: "owl",
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, owl]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 pixel-btn bg-pixel-green text-pixel-cream font-pixel text-[10px] flex items-center gap-2 animate-float"
        >
          <span className="text-xl">🦉</span>
          Book-Owl
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 pixel-border bg-pixel-cream flex flex-col" style={{ height: "420px" }}>
          {/* Header */}
          <div className="bg-pixel-green px-4 py-3 flex items-center justify-between border-b-4 border-pixel-dark shrink-0">
            <span className="font-pixel text-[9px] text-pixel-cream pixel-text-shadow flex items-center gap-2">
              🦉 Book-Owl AI
            </span>
            <button onClick={() => setIsOpen(false)} className="text-pixel-cream hover:text-pixel-amber">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 pixel-border-sm font-pixel-body text-base ${
                    msg.from === "user"
                      ? "bg-pixel-amber text-pixel-dark"
                      : "bg-pixel-beige text-foreground"
                  }`}
                >
                  {msg.from === "owl" && <span className="text-sm mr-1">🦉</span>}
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t-4 border-pixel-dark shrink-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask Book-Owl..."
                className="flex-1 px-3 py-2 pixel-border-sm bg-pixel-beige font-pixel-body text-base text-pixel-dark placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="pixel-btn bg-pixel-green text-pixel-cream p-2"
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
