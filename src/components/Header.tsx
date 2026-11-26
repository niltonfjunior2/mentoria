import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="pt-6 pb-4 px-4 text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Rede Acadêmica Aberta
      </div>
      
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Mentoria <span className="text-amber-600">Universitária</span>
        </h1>
      </div>

      <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
        Conecte-se com estudantes experientes prontos para te ajudar a desatar os nós das matérias mais difíceis.
      </p>
    </header>
  );
};
