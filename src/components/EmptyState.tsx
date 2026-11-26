import React from 'react';
import { BookX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  query: string;
  onClear: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ query, onClear }) => {
  return (
    <div className="text-center py-12 px-4 max-w-sm mx-auto">
      <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-xs">
        <BookX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">Nenhum mentor encontrado</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-5">
        Não encontramos mentores cadastrados para a matéria <span className="font-semibold text-amber-700">"{query}"</span>.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Ver todos os mentores
      </button>
    </div>
  );
};
