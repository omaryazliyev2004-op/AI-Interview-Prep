import * as Icons from 'lucide-react';

interface RoleCardProps {
  id: string;
  name: string;
  description: string;
  iconName: string;
  onSelect: (roleId: string) => void;
}

export function RoleCard({ id, name, description, iconName, onSelect }: RoleCardProps) {
  // Dynamically resolve icon from lucide-react
  const Icon = (Icons as any)[iconName] || Icons.Briefcase;

  return (
    <div 
      onClick={() => onSelect(id)}
      className="glass-panel p-6 rounded-2xl cursor-pointer group hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
          <Icon className="w-8 h-8 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">{name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
