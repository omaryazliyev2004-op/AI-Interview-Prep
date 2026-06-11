import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
