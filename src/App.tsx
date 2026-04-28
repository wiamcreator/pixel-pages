import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import MyLibrary from "./pages/MyLibrary.tsx";
import Challenges from "./pages/Challenges.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import FAQ from "./pages/FAQ.tsx";
import MyPocket from "./pages/MyPocket.tsx";
import Community from "./pages/Community.tsx";
import NotFound from "./pages/NotFound.tsx";
import BookDetail from "./pages/BookDetail.tsx";
import { CartProvider } from "./context/CartContext.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/my-library" element={<MyLibrary />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/my-pocket" element={<MyPocket />} />
            <Route path="/community" element={<Community />} />
            <Route path="/book/:bookKey" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;