import { createContext, useContext, useState, ReactNode } from "react";

interface CartBook {
  id: string;
  title: string;
  author: string;
  cover: string;
}

interface ReadingBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  lastRead: string;
  textUrl: string;
}

interface AppContextType {
  cart: CartBook[];
  addToCart: (book: CartBook) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  readingList: ReadingBook[];
  finishedList: ReadingBook[];
  addToReading: (book: ReadingBook) => void;
  updateProgress: (id: string, progress: number) => void;
  isReading: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartBook[]>([]);
  const [readingList, setReadingList] = useState<ReadingBook[]>([]);
  const [finishedList, setFinishedList] = useState<ReadingBook[]>([]);

  const addToCart = (book: CartBook) => {
    setCart((prev) => prev.find((b) => b.id === book.id) ? prev : [...prev, book]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((b) => b.id !== id));
  };

  const isInCart = (id: string) => cart.some((b) => b.id === id);

  const addToReading = (book: ReadingBook) => {
    setReadingList((prev) => prev.find((b) => b.id === book.id) ? prev : [...prev, book]);
  };

  const updateProgress = (id: string, progress: number) => {
    const now = new Date();
    const lastRead = `Today at ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

    setReadingList((prev) => {
      const updated = prev.map((b) =>
        b.id === id ? { ...b, progress, lastRead } : b
      );

      // If progress is 100%, move to finished
      if (progress === 100) {
        const finishedBook = updated.find((b) => b.id === id);
        if (finishedBook) {
          setFinishedList((prevFinished) =>
            prevFinished.find((b) => b.id === id)
              ? prevFinished
              : [...prevFinished, { ...finishedBook, progress: 100 }]
          );
          return updated.filter((b) => b.id !== id);
        }
      }

      return updated;
    });
  };

  const isReading = (id: string) => readingList.some((b) => b.id === id);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, isInCart,
      readingList, finishedList, addToReading, updateProgress, isReading
    }}> 
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};