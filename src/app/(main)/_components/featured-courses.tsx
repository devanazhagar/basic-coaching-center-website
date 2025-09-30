import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { courses } from "@/lib/data";
import CourseCard from "@/app/(main)/courses/_components/course-card";

export default function FeaturedCourses() {
  const featured = courses.slice(0, 3);

  return (
    <section className="py-20 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Most Popular Courses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
            Explore a range of subjects designed to help students excel and achieve their academic goals.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/courses">
              View All Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
