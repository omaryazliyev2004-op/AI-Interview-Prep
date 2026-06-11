import React from 'react';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

interface EvaluationCardProps {
  score: number;
  feedback: string;
  improvement: string;
}

export function EvaluationCard({ score, feedback, improvement }: EvaluationCardProps) {
  const getScoreColor = (s: number) => {
    if (s >= 8) return 'text-emerald-400';
    if (s >= 5) return 'text-yellow-400';
    return 'text-rose-400';
  };

  return (
    <div className="glass-panel p-6 rounded-2xl animate-fade-in mt-6 border-indigo-500/30">
      <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle className="text-indigo-400" />
          Evaluation Result
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Score:</span>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/10</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Feedback
          </h4>
          <p className="text-slate-200 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            {feedback}
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Area for Improvement
          </h4>
          <p className="text-slate-200 leading-relaxed bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20">
            {improvement}
          </p>
        </div>
      </div>
    </div>
  );
}
