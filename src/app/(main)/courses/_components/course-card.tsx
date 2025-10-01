"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { courses } from "@/lib/data";

type CourseCardProps = {
  course: (typeof courses)[0];
};

export default function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(p => p.id === course.image);

  return (
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            {image && (
              <Image
                src={image.imageUrl}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-headline">{course.title}</CardTitle>
              <Badge variant="secondary">{course.subject}</Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{course.description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full transition-transform duration-300 hover:scale-105">
            <Link href={`/courses/${course.id}`}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
  );
}
