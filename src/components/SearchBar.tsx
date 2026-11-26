import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, onClear }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 mb-6">
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-amber-600">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Busque por matéria (ex: Cálculo, Algoritmos, Física...)"
          className="w-full pl-12 pr-11 py-3.5 bg-white border-2 border-amber-200/80 rounded-2xl text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium shadow-sm transition-all focus:outline-hidden focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
          aria-label="Buscar matéria"
        />

        {query.trim().length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title="Limpar busca"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
