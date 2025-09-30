import EnrollmentForm from "./_components/enrollment-form";

export default function EnrollPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Enroll at Academify
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground">
          Begin your journey to academic excellence. Complete the form below to get started.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <EnrollmentForm />
      </div>
    </div>
  );
}
