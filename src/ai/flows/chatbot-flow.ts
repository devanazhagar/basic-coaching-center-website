'use server';
/**
 * @fileOverview A chatbot flow that responds to user queries about the institution.
 *
 * - chat - The main chat function.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { courses, faculty } from '@/lib/data';

const ChatInputSchema = z.string();
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  reply: z.string().describe("The chatbot's response to the user's query."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const systemInstruction = `You are a friendly and helpful chatbot for Academify, a tutoring and academic coaching center. Your goal is to answer user questions about the institution.

Use the following context to answer questions. If the information is not in the context, politely state that you don't have the information.

**Available Courses:**
${courses
  .map(
    (c) =>
      `- ${c.title} (Subject: ${c.subject}, Grades: ${c.grade}, Duration: ${c.duration}, Fees: ${c.fees})`
  )
  .join('\n')}

**Faculty Members:**
${faculty
  .map(
    (f) =>
      `- ${f.name} (${f.title}, Specialization: ${f.specialization}, Rating: ${f.rating})`
  )
  .join('\n')}

Keep your answers concise and helpful.`;

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
      system: systemInstruction,
      config: {
        // Using OpenRouter for this specific flow
        client: {
          provider: 'openrouter',
          apiKey: process.env.OPENROUTER_API_KEY,
        },
        modelName: 'deepseek/deepseek-chat-v3.1:free',
      },
    });

    return { reply: llmResponse.text };
  }
);
