"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Success Stories from Our Students
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
            See how we've made a difference in the lives of students just like you.
          </p>
        </motion.div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto mt-16"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const image = PlaceHolderImages.find(p => p.id === testimonial.image);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="p-4 h-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-card backdrop-blur-sm">
                      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="rounded-full"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <p className="mt-4 text-base font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{testimonial.course}</p>
                        <div className="my-3 flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="mt-2 text-sm text-muted-foreground italic">
                          "{testimonial.text}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
