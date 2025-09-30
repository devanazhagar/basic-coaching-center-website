import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container">
        <div className="relative isolate overflow-hidden bg-primary/10 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="font-headline mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Unlock Your Full Potential?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join Academify today and take the first step towards academic excellence. Our counselors are ready to help you create a personalized learning plan.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/enroll">Get Started Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/schedule">Create a Schedule</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
