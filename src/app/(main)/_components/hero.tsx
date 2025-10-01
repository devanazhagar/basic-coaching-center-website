"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const quotes = [
  "Your Success Starts Here",
  "The Path to Success",
  "Begin Your Journey to Success",
];

function AnimatedHeroText() {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setKey(prevKey => prevKey + 1); // Reset animation by changing key
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const text = quotes[index];

  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <p className="mt-2 text-3xl font-semibold text-primary-foreground/80 h-16">
      <AnimatePresence mode="wait">
        <motion.span
          key={key}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="inline-block"
        >
          {text.split("").map((char, i) => (
            <motion.span key={`${char}-${i}`} custom={i} variants={variants}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}


export default function Hero() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container">
        <motion.div
          className="relative isolate overflow-hidden bg-primary text-primary-foreground px-6 py-20 text-left shadow-2xl sm:rounded-3xl sm:px-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center text-sm mb-4">
            <Home className="w-4 h-4 mr-2" />
            <ChevronRight className="w-4 h-4 mr-2" />
            <span>Academify</span>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Academify Learning Centre
          </h1>
          <AnimatedHeroText />
          <div className="mt-6">
            <span className="inline-block bg-primary-foreground/10 text-primary-foreground px-4 py-1 rounded-md font-semibold">
              K-12 | TEST PREP | TUTORING
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-4">
            <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 transition-transform duration-300 hover:scale-105">
              <Link href="/enroll">Book a Free Trial <ChevronRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 transition-transform duration-300 hover:scale-105">
              <Link href="/courses">
                Download Brochure
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
