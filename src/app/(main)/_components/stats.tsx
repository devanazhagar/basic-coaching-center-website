"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { GraduationCap, BookOpen, Star } from "lucide-react";
import AnimatedCounter from "./animated-counter";

const stats = [
  { value: 5000, label: "Students Taught", icon: GraduationCap },
  { value: 98, label: "Success Rate", icon: Star, suffix: "%" },
  { value: 10, label: "Years of Experience", icon: BookOpen, suffix: "+" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-20 sm:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-card backdrop-blur-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <stat.icon className="h-12 w-12 text-primary" />
              <div className="mt-4 text-4xl font-bold tracking-tight text-foreground">
                {inView ? <AnimatedCounter to={stat.value} /> : 0}
                {stat.suffix}
              </div>
              <p className="mt-2 text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
