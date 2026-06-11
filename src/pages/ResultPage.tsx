import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InterviewState, InterviewAction } from '../types/interview';
import { Award, RefreshCcw, CheckCircle } from 'lucide-react';

interface ResultPageProps {
  state: InterviewState;
  dispatch: React.Dispatch<InterviewAction>;
}

export function ResultPage({ state, dispatch }: ResultPageProps) {
  const navigate = useNavigate();

  // If no answers, redirect home
  if (state.answers.length === 0) {
    navigate('/');
    return null;
  }

  const totalScore = state.answers.reduce((acc, curr) => acc + curr.score, 0);
  const maxPossible = state.answers.length * 10;
  const percentage = Math.round((totalScore / maxPossible) * 100);

  const getGradeColor = (p: number) => {
    if (p >= 80) return 'text-emerald-400';
    if (p >= 60) return 'text-yellow-400';
    return 'text-rose-400';
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_INTERVIEW' });
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-slide-up">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-indigo-500/10 mb-6">
          <Award className="w-16 h-16 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Interview Completed!</h1>
        <p className="text-slate-400 text-lg">Here is your comprehensive evaluation for the {state.role} role.</p>
      </div>

      {/* Score Summary */}
      <div className="glass-panel p-8 rounded-2xl mb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">Total Score</h2>
          <div className={`text-6xl font-extrabold ${getGradeColor(percentage)} mb-4`}>
            {totalScore} <span className="text-2xl text-slate-500">/ {maxPossible}</span>
          </div>
          <p className="text-slate-400">You achieved {percentage}% of the total possible score.</p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <CheckCircle className="text-indigo-400" /> Detailed Breakdown
      </h3>
      <div className="space-y-8 mb-12">
        {state.answers.map((ans, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-6 border-l-4 border-l-indigo-500 hover:border-l-indigo-400 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-slate-200">Question {idx + 1}</h4>
              <span className={`font-bold px-3 py-1 rounded-full bg-slate-800 ${getGradeColor(ans.score * 10)}`}>
                {ans.score}/10
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Question</p>
                <p className="text-white bg-slate-800/50 p-3 rounded-lg">{ans.question}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Your Answer</p>
                <p className="text-slate-300 bg-slate-800/50 p-3 rounded-lg italic border-l border-slate-600">"{ans.answer}"</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                  <p className="text-sm text-emerald-400 font-semibold mb-2">Feedback</p>
                  <p className="text-slate-300 text-sm">{ans.feedback}</p>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl">
                  <p className="text-sm text-indigo-400 font-semibold mb-2">How to improve</p>
                  <p className="text-slate-300 text-sm">{ans.improvement}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={handleRestart} className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
          <RefreshCcw className="w-6 h-6" />
          Start New Interview
        </button>
      </div>
    </div>
  );
}
