"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const winners = [
  {
    id: 1,
    name: "Rahim Ahmed",
    location: "Dhaka",
    amount: "৳5,00,00,000",
    date: "May 2025",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "I never thought I would win. This money will help me start my dream business and support my family."
  },
  {
    id: 2,
    name: "Fatima Begum",
    location: "Chittagong",
    amount: "৳3,50,00,000",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "Winning the lottery has changed my life. I can now pay for my children's education and buy a new home."
  },
  {
    id: 3,
    name: "Kamal Hossain",
    location: "Sylhet",
    amount: "৳7,00,00,000",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "I've been playing the lottery for years. Persistence pays off! Now I can retire early and travel the world."
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    location: "Rajshahi",
    amount: "৳2,75,00,000",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    quote: "This win came at the perfect time. I can now afford the medical treatment my mother needs."
  }
];

export function WinnersShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextWinner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % winners.length);
  };
  
  const prevWinner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + winners.length) % winners.length);
  };
  
  return (
    <section id="winners" className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Meet Our Winners</h2>
          <p className="mt-4 text-muted-foreground">Real people, real stories, real wins</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-primary/10 p-8 flex flex-col justify-center items-center text-center">
                      <Badge className="mb-4">{winners[currentIndex].date}</Badge>
                      <Avatar className="w-32 h-32 border-4 border-primary mb-4">
                        <AvatarImage src={winners[currentIndex].image} alt={winners[currentIndex].name} />
                        <AvatarFallback>{winners[currentIndex].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-2xl font-bold">{winners[currentIndex].name}</h3>
                      <p className="text-muted-foreground">{winners[currentIndex].location}</p>
                      <p className="text-xl font-bold mt-2 text-primary">{winners[currentIndex].amount}</p>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <blockquote className="text-lg italic">
                        "{winners[currentIndex].quote}"
                      </blockquote>
                      <div className="mt-6">
                        <p className="text-sm text-muted-foreground">
                          Winner of Bangladesh National Lottery
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-6 space-x-2">
            <Button variant="outline" size="icon" onClick={prevWinner}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {winners.map((_, index) => (
              <Button
                key={index}
                variant={index === currentIndex ? "default" : "outline"}
                size="icon"
                className="w-8 h-8"
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={nextWinner}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}