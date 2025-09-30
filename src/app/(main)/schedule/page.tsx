import ScheduleTool from "./_components/schedule-tool";

export default function SchedulePage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Dynamic Schedule Generator
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Let our AI assistant create the perfect tutoring schedule based on your needs.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <ScheduleTool />
      </div>
    </div>
  );
}
