"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { courses } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

const STORAGE_KEY = 'enrollment_form_data';

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Invalid phone number."),
});

const courseSelectionSchema = z.object({
  courseId: z.string().min(1, "Please select a course."),
});

const documentUploadSchema = z.object({
  documents: z.any().optional(),
});

const formSchema = personalDetailsSchema.merge(courseSelectionSchema).merge(documentUploadSchema);
type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Personal Details', fields: ['fullName', 'email', 'phone'] as const },
  { id: 2, title: 'Course Selection', fields: ['courseId'] as const },
  { id: 3, title: 'Document Upload', fields: ['documents'] as const },
];

export default function EnrollmentForm() {
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      courseId: '',
      documents: undefined,
    }
  });

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    setIsClient(true);
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      }
    } catch (error) {
      console.error("Failed to load form data from localStorage", error);
    }
  }, [form]);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
      } catch (error) {
        console.error("Failed to save form data to localStorage", error);
      }
    }
  }, [watchedValues, isClient]);

  const handleNext = async () => {
    const fields = steps[step - 1].fields;
    const output = await form.trigger(fields);

    if (output) {
      if (step < steps.length) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    toast({
      title: "Enrollment Submitted!",
      description: "We have received your application and will be in touch shortly.",
    });
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    setStep(1);
  };

  if (!isClient) {
    return <Card className="shadow-lg"><CardHeader><Progress value={0} /></CardHeader><CardContent><div className="h-96"></div></CardContent></Card>;
  }

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl">
      <CardHeader>
        <CardTitle>Enrollment Form</CardTitle>
        <CardDescription>Step {step} of {steps.length}: {steps[step - 1].title}</CardDescription>
        <Progress value={(step / steps.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input type="tel" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            {step === 2 && (
              <FormField control={form.control} name="courseId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a Course</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            )}

            {step === 3 && (
                <FormField
                    control={form.control}
                    name="documents"
                    render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                        <FormLabel>Upload Documents</FormLabel>
                        <FormControl>
                          <label htmlFor="file-upload" className="relative flex justify-center w-full h-32 px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-300 hover:border-primary hover:bg-primary/5">
                            <div className="space-y-1 text-center">
                              <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
                              <div className="flex text-sm text-muted-foreground">
                                <span className="font-medium text-primary">Click to upload</span>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-muted-foreground">PDF, DOCX, PNG, JPG up to 10MB</p>
                              <Input id="file-upload" type="file" className="sr-only" onChange={(e) => onChange(e.target.files)} multiple {...rest} />
                            </div>
                          </label>
                        </FormControl>
                        <FormDescription>
                          Upload your previous transcripts or any relevant documents. (Optional)
                        </FormDescription>
                        <FormMessage />
                        {value && value.length > 0 && (
                            <div className="mt-2 text-sm text-muted-foreground">
                                {Array.from(value).map((file: any) => file.name).join(', ')}
                            </div>
                        )}
                    </FormItem>
                    )}
                />
            )}

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1} className="transition-transform duration-300 hover:scale-105">
                Back
              </Button>
              {step < steps.length ? (
                <Button type="button" onClick={handleNext} className="transition-transform duration-300 hover:scale-105">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105">
                  Submit Enrollment
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}