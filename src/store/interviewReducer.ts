import type { InterviewState, InterviewAction } from '../types/interview';

export const initialState: InterviewState = {
  role: '',
  currentQuestion: '',
  questionNumber: 0,
  answers: [],
  history: [],
  status: 'idle',
  error: null,
};

export function interviewReducer(state: InterviewState, action: InterviewAction): InterviewState {
  switch (action.type) {
    case 'START_INTERVIEW':
      return {
        ...initialState,
        role: action.payload,
        status: 'loading',
      };
    
    case 'RECEIVE_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        questionNumber: state.questionNumber + 1,
        status: 'answering',
        history: [...state.history, { role: 'assistant', content: action.payload }],
        error: null,
      };

    case 'SUBMIT_ANSWER':
      return {
        ...state,
        status: 'evaluating',
        history: [...state.history, { role: 'user', content: action.payload }],
        error: null,
      };

    case 'RECEIVE_EVALUATION':
      const newAnswerRecord = {
        question: state.currentQuestion,
        answer: state.history[state.history.length - 1].content,
        score: action.payload.evaluation.score,
        feedback: action.payload.evaluation.feedback,
        improvement: action.payload.evaluation.improvement,
      };

      return {
        ...state,
        answers: [...state.answers, newAnswerRecord],
        currentQuestion: action.payload.nextQuestion || '',
        questionNumber: action.payload.nextQuestion ? state.questionNumber + 1 : state.questionNumber,
        status: action.payload.isFinished ? 'finished' : 'answering',
        history: action.payload.nextQuestion 
          ? [...state.history, { role: 'assistant', content: action.payload.nextQuestion }]
          : state.history,
        error: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        status: state.status === 'loading' ? 'idle' : state.status === 'evaluating' ? 'answering' : state.status,
        error: action.payload,
      };

    case 'RESET_INTERVIEW':
      return initialState;

    default:
      return state;
  }
}
