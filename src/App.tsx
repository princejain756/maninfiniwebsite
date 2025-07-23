import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playIntroAudio = async () => {
      if (audioRef.current) {
        try {
          // Set volume to a reasonable level (50%)
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
        } catch (error) {
          // Autoplay might be blocked by browser, handle gracefully
          console.log('Audio autoplay was prevented by the browser');
        }
      }
    };

    // Play audio when component mounts
    playIntroAudio();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Background intro audio */}
        <audio
          ref={audioRef}
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src="/intro.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
