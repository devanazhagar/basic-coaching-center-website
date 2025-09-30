"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { GraduationCap, BookOpen, Star } from "lucide-react";

const stats = [
  { value: 5000, label: "Students Taught", icon: GraduationCap },
  { value: 98, label: "Success Rate", icon: Star, suffix: "%" },
  { value: 10, label: "Years of Experience", icon: BookOpen, suffix: "+" },
];

function AnimatedCounter({ to, duration = 2000 }: {to: number, duration?: number}) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }
    const progress = timestamp - startTime.current;
    const percentage = Math.min(progress / duration, 1);
    const newCount = Math.floor(to * percentage);
    setCount(newCount);

    if (progress < duration) {
      frameRef.current = requestAnimationFrame(animate);
    }
  };
  
  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if(frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    }
  }, [to, duration]);

  return <span>{count}</span>;
}

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="bg-card py-20 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-background">
              <stat.icon className="h-12 w-12 text-primary" />
              <div className="mt-4 text-4xl font-bold tracking-tight text-foreground">
                {inView ? <AnimatedCounter to={stat.value} /> : 0}
                {stat.suffix}
              </div>
              <p className="mt-2 text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}