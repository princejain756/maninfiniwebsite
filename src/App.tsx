import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CloudSolutionsPage from "./pages/services/cloud-solutions";
import CyberCloudPage from "./pages/services/cyber-cloud";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";

// Service pages
import WebDevelopment from "./pages/services/web-development";
import GraphicDesign from "./pages/services/graphic-design";
import EcommerceInventory from "./pages/services/ecommerce-inventory";
import WhatsAppCommunications from "./pages/services/whatsapp-communications";
import VirtualOffice from "./pages/services/virtual-office";
import OffshoreTalent from "./pages/services/offshore-talent";
import Quantiti from "./pages/services/quantiti";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import { IntelligentChatbot } from "./components/ui/intelligent-chatbot";

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
            // Intro audio started playing
          }
        } catch (error) {
          // Audio autoplay was prevented by the browser
          
          // Set up user interaction listener to play audio on first click
          const handleFirstUserInteraction = async () => {
            try {
              if (audioRef.current && !audioEnabled) {
                await audioRef.current.play();
                setAudioEnabled(true);
                // Intro audio started playing after user interaction
              }
            } catch (err) {
              // Could not play audio even after user interaction
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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PerformanceOptimizer>
            <Toaster />
            <Sonner />
            {/* Background intro audio */}
            <audio
              ref={audioRef}
              preload="auto"
              crossOrigin="anonymous"
              style={{ display: 'none' }}
              onCanPlayThrough={() => {/* Audio can play through */}}
              onError={(e) => {/* Audio error handled */}}
              onLoadStart={() => {/* Audio loading started */}}
            >
              <source src="/intro.mp3" type="audio/mpeg" />
              <source src="/intro.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Service Routes */}
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/graphic-design" element={<GraphicDesign />} />
                <Route path="/services/ecommerce-inventory" element={<EcommerceInventory />} />
                <Route path="/services/whatsapp-communications" element={<WhatsAppCommunications />} />
                <Route path="/services/virtual-office" element={<VirtualOffice />} />
                <Route path="/services/offshore-talent" element={<OffshoreTalent />} />
                <Route path="/services/quantiti" element={<Quantiti />} />
                <Route path="/services/cyber-cloud" element={<CyberCloudPage />} />
                <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
                
                {/* Blog Routes */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/category/:category" element={<BlogCategory />} />
                
                {/* Policy Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                
                {/* Blog redirection routes */}
                <Route path="/blogs" element={<Blog />} />
                <Route path="/articles" element={<Blog />} />
                <Route path="/news" element={<Blog />} />
                
                {/* Error pages */}
                <Route path="/404" element={<NotFound />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Intelligent Auto-Learning Chatbot */}
              <IntelligentChatbot
                autoLearningApiUrl="http://localhost:3001"
              />
            </BrowserRouter>
          </PerformanceOptimizer>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
