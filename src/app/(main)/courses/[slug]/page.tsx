import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Layers, DollarSign, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.id === params.slug);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === course.image);

  return (
    <div>
      <div className="relative h-64 bg-primary/10">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="object-cover brightness-50"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="container relative flex h-full items-end pb-8">
            <h1 className="font-headline text-4xl font-bold text-white">{course.title}</h1>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-headline text-2xl font-bold">About this course</h2>
            <p className="mt-4 text-muted-foreground">{course.description}</p>
            <h3 className="font-headline mt-8 text-xl font-bold">Curriculum</h3>
            <ul className="mt-4 space-y-2">
              {course.curriculum.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card className="sticky top-24">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Layers className="mr-3 h-5 w-5 text-primary" />
                            <span><span className="font-semibold">Subject:</span> {course.subject}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-3 h-5 w-5 text-primary" />
                            <span><span className="font-semibold">Duration:</span> {course.duration}</span>
                        </div>
                        <div className="flex items-center">
                            <DollarSign className="mr-3 h-5 w-5 text-primary" />
                            <span><span className="font-semibold">Fees:</span> {course.fees}</span>
                        </div>
                         <div className="flex items-center">
                            <Badge variant="secondary">Grades {course.grade}</Badge>
                        </div>
                    </div>
                    <Button asChild size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
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
