export type Role = {
  id: string;
  name: string;
  description: string;
  iconName: string;
};

export type AnswerRecord = {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  improvement: string;
};

export type MessageHistory = {
  role: 'user' | 'assistant';
  content: string;
};

export type InterviewState = {
  role: string;
  currentQuestion: string;
  questionNumber: number;
  answers: AnswerRecord[];
  history: MessageHistory[];
  status: 'idle' | 'loading' | 'answering' | 'evaluating' | 'finished';
  error: string | null;
};

export type InterviewAction =
  | { type: 'START_INTERVIEW'; payload: string }
  | { type: 'RECEIVE_QUESTION'; payload: string }
  | { type: 'SUBMIT_ANSWER'; payload: string }
  | { type: 'RECEIVE_EVALUATION'; payload: { evaluation: Omit<AnswerRecord, 'question' | 'answer'>; nextQuestion?: string; isFinished: boolean } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET_INTERVIEW' };

// Expected Anthropic Response JSON
export type AnthropicResponse = {
  type: 'question' | 'evaluation';
  questionNumber: number;
  question?: string;
  evaluation?: {
    score: number;
    feedback: string;
    improvement: string;
  };
  nextQuestion?: string;
  isFinished: boolean;
};
