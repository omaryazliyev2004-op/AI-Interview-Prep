import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { InterviewPage } from './pages/InterviewPage';
import { ResultPage } from './pages/ResultPage';
import { interviewReducer, initialState } from './store/interviewReducer';

function App() {
  const [state, dispatch] = useReducer(interviewReducer, initialState);

  const handleSelectRole = (role: string) => {
    dispatch({ type: 'START_INTERVIEW', payload: role });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-50 selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage onSelectRole={handleSelectRole} />} />
          <Route path="/interview" element={<InterviewPage state={state} dispatch={dispatch} />} />
          <Route path="/result" element={<ResultPage state={state} dispatch={dispatch} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
