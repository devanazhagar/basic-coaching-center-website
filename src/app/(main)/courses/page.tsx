import { courses } from "@/lib/data";
import CourseList from "./_components/course-list";

export default function CoursesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Our Courses
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Find the perfect course to advance your knowledge and skills.
        </p>
      </div>
      <CourseList allCourses={courses} />
    </div>
  );
}
