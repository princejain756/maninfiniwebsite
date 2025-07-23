import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const playIntroAudio = async () => {
      if (audioRef.current && !audioEnabled) {
        try {
          // Set volume to a reasonable level (30% for better UX)
          audioRef.current.volume = 0.3;
          
          // Try to play audio
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            await playPromise;
            setAudioEnabled(true);
            console.log('Intro audio started playing');
          }
        } catch (error) {
          console.log('Audio autoplay was prevented by the browser:', error);
          
          // Set up user interaction listener to play audio on first click
          const handleFirstUserInteraction = async () => {
            try {
              if (audioRef.current && !audioEnabled) {
                await audioRef.current.play();
                setAudioEnabled(true);
                console.log('Intro audio started playing after user interaction');
              }
            } catch (err) {
              console.log('Could not play audio even after user interaction:', err);
            }
            
            // Remove listeners after first interaction
            document.removeEventListener('click', handleFirstUserInteraction);
            document.removeEventListener('touchstart', handleFirstUserInteraction);
            document.removeEventListener('keydown', handleFirstUserInteraction);
          };
          
          // Add event listeners for user interaction
          document.addEventListener('click', handleFirstUserInteraction, { once: true });
          document.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
          document.addEventListener('keydown', handleFirstUserInteraction, { once: true });
        }
      }
    };

    // Small delay to ensure DOM is fully loaded
    const timer = setTimeout(playIntroAudio, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [audioEnabled]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Background intro audio */}
        <audio
          ref={audioRef}
          preload="auto"
          crossOrigin="anonymous"
          style={{ display: 'none' }}
          onCanPlayThrough={() => console.log('Audio can play through')}
          onError={(e) => console.log('Audio error:', e)}
          onLoadStart={() => console.log('Audio loading started')}
        >
          <source src="/intro.mp3" type="audio/mpeg" />
          <source src="/intro.mp3" type="audio/mp3" />
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
