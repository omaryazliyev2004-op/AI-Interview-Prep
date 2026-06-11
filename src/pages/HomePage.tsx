import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleCard } from '../components/RoleCard';

const ROLES = [
  { id: 'frontend', name: 'Frontend Developer', description: 'React, Vue, HTML/CSS, JavaScript/TypeScript', iconName: 'Monitor' },
  { id: 'backend', name: 'Backend Developer', description: 'Node.js, Python, Java, Databases, APIs', iconName: 'Server' },
  { id: 'product_manager', name: 'Product Manager', description: 'Strategy, Agile, User Stories, Roadmapping', iconName: 'Target' },
  { id: 'ux_designer', name: 'UX Designer', description: 'Wireframing, User Research, Prototyping, Figma', iconName: 'PenTool' },
  { id: 'data_analyst', name: 'Data Analyst', description: 'SQL, Python, Data Visualization, Statistics', iconName: 'BarChart' },
  { id: 'engineering_manager', name: 'Engineering Manager', description: 'Leadership, System Design, Team Building', iconName: 'Users' },
];

export function HomePage({ onSelectRole }: { onSelectRole: (role: string) => void }) {
  const navigate = useNavigate();

  const handleSelect = (roleId: string) => {
    const role = ROLES.find(r => r.id === roleId);
    if (role) {
      onSelectRole(role.name);
      navigate('/interview');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16 animate-slide-up">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-6 tracking-tight">
          AI Interview Prep
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Choose a role to start your realistic, AI-powered mock interview. Get instant feedback and improve your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROLES.map((role) => (
          <div key={role.id} className="animate-fade-in" style={{ animationFillMode: 'both', animationDelay: `${Math.random() * 0.2}s` }}>
            <RoleCard
              id={role.id}
              name={role.name}
              description={role.description}
              iconName={role.iconName}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
