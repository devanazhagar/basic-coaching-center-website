import { genkit } from 'genkit';
import { openAICompatible } from '@genkit-ai/compat-oai';

export const ai = genkit({
  plugins: [
    openAICompatible({
      name: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    }),
  ],
  model: 'openrouter/deepseek/deepseek-chat-v3.1:free',
});