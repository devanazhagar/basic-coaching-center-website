import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Layers, DollarSign, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.id === params.slug);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === course.image);

  return (
    <div>
      <div className="relative h-72 bg-primary/10">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative flex h-full items-end pb-12">
            <h1 className="font-headline text-5xl font-bold text-white drop-shadow-lg">{course.title}</h1>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl font-semibold">About this course</h2>
            <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            <h3 className="font-headline mt-10 text-3xl font-semibold">Curriculum</h3>
            <Accordion type="single" collapsible className="w-full mt-4">
              {course.curriculum.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-9 text-base text-muted-foreground">
                    Detailed explanation for {item.toLowerCase()} will be provided by our expert tutors during the course sessions. This module includes practical exercises and assessments.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <Card className="sticky top-24 shadow-2xl transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center text-lg">
                            <Layers className="mr-3 h-5 w-5 text-primary" />
                            <div><span className="font-semibold">Subject:</span> {course.subject}</div>
                        </div>
                        <div className="flex items-center text-lg">
                            <Clock className="mr-3 h-5 w-5 text-primary" />
                            <div><span className="font-semibold">Duration:</span> {course.duration}</div>
                        </div>
                        <div className="flex items-center text-lg">
                            <DollarSign className="mr-3 h-5 w-5 text-primary" />
                            <div><span className="font-semibold">Fees:</span> {course.fees}</div>
                        </div>
                         <div className="flex items-center">
                            <Badge variant="secondary" className="text-base font-medium">Grades {course.grade}</Badge>
                        </div>
                    </div>
                    <Button asChild size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105">
                        <Link href="/enroll">Enroll Now</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.id,
  }));
}

    