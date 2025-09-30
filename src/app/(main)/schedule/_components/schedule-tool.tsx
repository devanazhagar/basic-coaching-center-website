"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateSchedule } from "@/ai/flows/dynamic-schedule-generation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  availability: z.string().min(1, "Please enter your availability."),
  preferredSubjects: z.string().min(1, "Please list your preferred subjects."),
  scheduleLength: z.string().min(1, "Please specify the schedule length."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ScheduleTool() {
  const [schedule, setSchedule] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: "Mon 4-6pm, Wed 7-9pm, Fri 3-5pm",
      preferredSubjects: "Math, Physics",
      scheduleLength: "One week",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setSchedule(null);
    setError(null);
    try {
      const result = await generateSchedule(values);
      setSchedule(result.schedule);
    } catch (e) {
      setError("An error occurred while generating the schedule. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl">
      <CardHeader>
        <CardTitle>Create Your Schedule</CardTitle>
        <CardDescription>Enter your preferences and let our AI do the planning.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Availability</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Monday 3-5pm, Wednesday 6-8pm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredSubjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Subjects</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Math, Science, English" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduleLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Length</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., One week, Two weeks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Schedule"
              )}
            </Button>
          </form>
        </Form>
        {error && (
          <div className="mt-6 text-sm text-destructive">{error}</div>
        )}
        {schedule && (
          <div className="mt-8">
            <h3 className="font-headline text-lg font-bold">Your Generated Schedule</h3>
            <Textarea
                readOnly
                value={schedule}
                className="mt-2 h-48 whitespace-pre-wrap font-mono bg-muted shadow-inner"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}