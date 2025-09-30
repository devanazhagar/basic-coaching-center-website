'use server';

/**
 * @fileOverview A dynamic schedule generation AI agent.
 *
 * - generateSchedule - A function that generates a tutoring schedule based on student availability and preferred subjects.
 * - GenerateScheduleInput - The input type for the generateSchedule function.
 * - GenerateScheduleOutput - The return type for the generateSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScheduleInputSchema = z.object({
  availability: z
    .string()
    .describe(
      'Student availability, specifying days and times available for tutoring. Example: Monday 3-5pm, Wednesday 6-8pm'
    ),
  preferredSubjects: z
    .string()
    .describe('List of preferred subjects for tutoring. Example: Math, Science, English'),
  scheduleLength: z
    .string()
    .describe(
      'The length of the schedule to be generated. Example: One week, Two weeks, One month'
    ),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;

const GenerateScheduleOutputSchema = z.object({
  schedule: z
    .string()
    .describe(
      'A formatted tutoring schedule that includes the subject, day, and time for each session.'
    ),
});
export type GenerateScheduleOutput = z.infer<typeof GenerateScheduleOutputSchema>;

export async function generateSchedule(input: GenerateScheduleInput): Promise<GenerateScheduleOutput> {
  return generateScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSchedulePrompt',
  input: {schema: GenerateScheduleInputSchema},
  output: {schema: GenerateScheduleOutputSchema},
  prompt: `You are a tutoring schedule generator. A student will provide their availability and preferred subjects, and you will respond with an ideal schedule.

Availability: {{{availability}}}
Preferred Subjects: {{{preferredSubjects}}}
Schedule Length: {{{scheduleLength}}}

Create a tutoring schedule:
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateScheduleFlow = ai.defineFlow(
  {
    name: 'generateScheduleFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
