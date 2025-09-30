import { faculty } from "@/lib/data";
import FacultyCard from "./_components/faculty-card";

export default function FacultyPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Meet Our Experts
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Our dedicated team of educators is here to guide you on your path to success.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {faculty.map((member, index) => (
          <FacultyCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}
