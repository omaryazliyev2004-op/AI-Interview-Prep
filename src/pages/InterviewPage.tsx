import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { InterviewState, InterviewAction } from '../types/interview';
import { ProgressBar } from '../components/ProgressBar';
import { EvaluationCard } from '../components/EvaluationCard';
import { claudeService } from '../services/claudeService';
import { Loader2, Send, ArrowRight } from 'lucide-react';

interface InterviewPageProps {
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}

export function InterviewPage({ state, dispatch }: InterviewPageProps) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  // Start interview if role is selected but no question is loaded
  useEffect(() => {
    if (!state.role) {
      navigate('/');
      return;
    }
    
    if (state.status === 'loading') {
      fetchNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.role, state.status, navigate]);

  const fetchNextQuestion = async () => {
    try {
      const response = await claudeService.sendMessage(state.history, state.role);
      
      if (response.type === 'question' && response.question) {
        dispatch({ type: 'RECEIVE_QUESTION', payload: response.question });
      } else {
        dispatch({ type: 'SET_ERROR', payload: "Invalid API response structure." });
      }
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || "Something went wrong." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || state.status !== 'answering') return;

    dispatch({ type: 'SUBMIT_ANSWER', payload: answer });
    setAnswer('');
    
    try {
      const updatedHistory = [...state.history, { role: 'user' as const, content: answer }];
      const response = await claudeService.sendMessage(updatedHistory, state.role);
      
      if (response.evaluation) {
        dispatch({ 
          type: 'RECEIVE_EVALUATION', 
          payload: {
            evaluation: response.evaluation,
            nextQuestion: response.nextQuestion,
            isFinished: response.isFinished
          }
        });
      }
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message || "Failed to submit answer." });
    }
  };

  const handleNext = () => {
    if (state.status === 'finished') {
      navigate('/result');
    }
  };

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h2 className="text-xl text-slate-300">Preparing your interview...</h2>
      </div>
    );
  }

  const latestAnswer = state.answers[state.answers.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-slide-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Interview for {state.role}</h1>
        <ProgressBar current={state.questionNumber} total={5} />
      </div>

      {state.error && (
        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-4 rounded-xl mb-6">
          {state.error}
        </div>
      )}

      {/* Question Section */}
      <div className="glass-panel p-8 rounded-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4">Question {state.questionNumber}</h2>
        <p className="text-xl text-slate-100 leading-relaxed font-medium">
          {state.currentQuestion}
        </p>
      </div>

      {/* Evaluation Section */}
      {state.status === 'evaluating' && (
        <div className="flex items-center justify-center p-12 glass-panel rounded-2xl mb-6">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mr-3" />
          <span className="text-slate-300 text-lg">Evaluating your answer...</span>
        </div>
      )}

      {/* Display Evaluation if we have one for the current state and are not answering */}
      {(state.status === 'answering' || state.status === 'finished') && state.history[state.history.length - 1]?.role === 'assistant' && state.answers.length >= state.questionNumber && latestAnswer && (
        <div className="mb-6">
           <EvaluationCard 
             score={latestAnswer.score} 
             feedback={latestAnswer.feedback} 
             improvement={latestAnswer.improvement} 
           />
           <div className="mt-6 flex justify-end">
             <button 
               onClick={handleNext} 
               className="btn-primary flex items-center gap-2"
             >
               {state.status === 'finished' ? 'View Final Results' : 'Next Question'}
               <ArrowRight className="w-5 h-5" />
             </button>
           </div>
        </div>
      )}

      {/* Answer Form */}
      {state.status === 'answering' && state.answers.length < state.questionNumber && (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="relative">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none shadow-inner"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={!answer.trim()}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Answer
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
