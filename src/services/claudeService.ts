import Anthropic from '@anthropic-ai/sdk';
import type { AnthropicResponse, MessageHistory } from '../types/interview';

const SYSTEM_PROMPT = `You are an experienced technical interviewer. Your job is to conduct a realistic job interview.

Rules:
- Ask ONE question at a time
- After the candidate answers, evaluate their answer (score 1-10, feedback)
- Then ask the NEXT question
- Ask total 5 questions per session
- Questions should be role-specific and progressively harder
- Always respond in the same language the candidate uses (Uzbek, Russian, or English)

Response format (always JSON, no markdown):
{
  "type": "question" | "evaluation",
  "questionNumber": 1,
  "question": "...",
  "evaluation": {
    "score": 8,
    "feedback": "...",
    "improvement": "..."
  },
  "nextQuestion": "...",
  "isFinished": false
}`;

export const claudeService = {
  async sendMessage(history: MessageHistory[], role: string): Promise<AnthropicResponse> {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error("VITE_ANTHROPIC_API_KEY is not defined in .env file");
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const messages = history.length === 0 
      ? [{ role: 'user' as const, content: `I am ready to start my interview for the ${role} position.` }]
      : history.map(msg => ({ role: msg.role, content: msg.content }));

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    try {
      const textResponse = (response.content[0] as any).text;
      return JSON.parse(textResponse) as AnthropicResponse;
    } catch (error) {
      console.error("Failed to parse Claude response:", error);
      throw new Error("Invalid response format from AI");
    }
  }
};
