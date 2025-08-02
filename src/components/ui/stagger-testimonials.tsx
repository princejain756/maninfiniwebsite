"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import testimonial images
import kamnajain from '@/assets/kamnajain.png';
import pradeepkumar from '@/assets/pradeepkumar.png';
import manojdidwania from '@/assets/manojdidwania.png';
import pawankumar from '@/assets/pawankumar.png';
import ashishdugar from '@/assets/ashishdugar.png';
import nikithsurana from '@/assets/nikithsurana.png';
import mambeehoney from '@/assets/mambeehoney.png';
import praveenganna from '@/assets/praveenganna.png';
import prateekoswal from '@/assets/prateekoswal.png';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Superb service and follow up by Mitesh Sir's Team. Indeed a one place solution for all automation needs. Would highly recommend.",
    by: "Kamna Jain, Local Guide",
    imgSrc: kamnajain
  },
  {
    tempId: 1,
    testimonial: "Wow wow wow the best and ever service I saw. Always and always the best of it",
    by: "Pradeep Kumar",
    imgSrc: pradeepkumar
  },
  {
    tempId: 2,
    testimonial: "The Whatsapp API of Maninfini was an easy one to understand. The onboarding was well taken care of. We have purchased the package and will continue to be their client.",
    by: "Manoj Didwania, Local Guide",
    imgSrc: manojdidwania
  },
  {
    tempId: 3,
    testimonial: "Thank you Mitesh and his team for their amazing work done on our website Aaujo and always guiding us in right track from understanding my needs from translating my ideas into design. They were a pleasure to work with and brought vision to life!",
    by: "Pavan Kumar",
    imgSrc: pawankumar
  },
  {
    tempId: 4,
    testimonial: "They will save a lot of your time by helping you automate your business. Super service 👌",
    by: "Ashish Dugar, Local Guide",
    imgSrc: ashishdugar
  },
  {
    tempId: 5,
    testimonial: "Massive team. Glad to have our projects run through them. 👍 Cheers Mithesh 🎉",
    by: "NIKITH SURANA",
    imgSrc: nikithsurana
  },
  {
    tempId: 6,
    testimonial: "Very good, easily deliver the invoice/ledger to the customer from Tally",
    by: "Mambee Honey, Local Guide",
    imgSrc: mambeehoney
  },
  {
    tempId: 7,
    testimonial: "Simply superb EXCELLENT SERVICE",
    by: "Vikram Jain",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 8,
    testimonial: "Excellent service, best team work, always available",
    by: "Info MK",
    imgSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 9,
    testimonial: "Good",
    by: "Praveen Ganna, Local Guide",
    imgSrc: praveenganna
  },
  {
    tempId: 10,
    testimonial: "Excellent Service experience",
    by: "Roshni Jain",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 11,
    testimonial: "Great Service",
    by: "Sohel Pathan, Local Guide",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 12,
    testimonial: "👌🏻",
    by: "Pratik Oswal",
    imgSrc: prateekoswal
  },
  {
    tempId: 13,
    testimonial: "oduba. run",
    by: "NAKODA BULLION",
    imgSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 14,
    testimonial: "Excellent automation solutions",
    by: "Jiya K",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 15,
    testimonial: "Professional team and great service",
    by: "Nikhil Jain",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover why businesses trust Maninfini Automation for their digital transformation needs
          </p>
        </div>
        
        <div
          className="relative w-full overflow-hidden bg-muted/30 rounded-lg"
          style={{ height: 600 }}
        >
          {testimonialsList.map((testimonial, index) => {
            const position = testimonialsList.length % 2
              ? index - (testimonialsList.length + 1) / 2
              : index - testimonialsList.length / 2;
            return (
              <TestimonialCard
                key={testimonial.tempId}
                testimonial={testimonial}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            <button
              onClick={() => handleMove(-1)}
              className={cn(
                "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
                "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => handleMove(1)}
              className={cn(
                "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
                "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 