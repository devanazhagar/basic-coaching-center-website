import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/dynamic-schedule-generation.ts';
import '@/ai/flows/chatbot-flow.ts';
