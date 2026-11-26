import React, { useState } from 'react';
import { MessageCircle, Mail, BookOpen } from 'lucide-react';
import { Mentor } from '../types/mentor';

interface MentorCardProps {
  mentor: Mentor;
  currentSearch?: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor, currentSearch = '' }) => {
  const [imageError, setImageError] = useState(false);

  // Iniciais do nome para fallback visual
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // URL amigável do WhatsApp com mensagem inicial
  const materiaMencao = mentor.materias[0] || 'as matérias que você ensina';
  const whatsappMessage = encodeURIComponent(
    `Olá ${mentor.nome}! Encontrei seu perfil no app de Mentorias e gostaria de tirar dúvidas sobre ${materiaMencao}. Você teria disponibilidade para me ajudar?`
  );
  const whatsappUrl = `https://wa.me/${mentor.whatsapp}?text=${whatsappMessage}`;

  // URL do e-mail
  const emailSubject = encodeURIComponent(`Mentoria Acadêmica - Dúvidas sobre ${materiaMencao}`);
  const emailUrl = `mailto:${mentor.email}?subject=${emailSubject}`;

  return (
    <article className="bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex items-start gap-4 mb-3">
          {mentor.avatarUrl && !imageError ? (
            <img
              src={mentor.avatarUrl}
              alt={mentor.nome}
              onError={() => setImageError(true)}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-xs shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-lg shadow-xs shrink-0">
              {getInitials(mentor.nome)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 truncate" title={mentor.nome}>
              {mentor.nome}
            </h2>
            <p className="text-xs text-amber-700 font-medium truncate">
              {mentor.curso} • {mentor.semestre}
            </p>
          </div>
        </div>

        {/* Bio */}
        {mentor.bio && (
          <p className="text-xs text-slate-600 italic line-clamp-2 mb-3 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
            "{mentor.bio}"
          </p>
        )}

        {/* Matérias */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Matérias de mentoria:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mentor.materias.map((materia, idx) => {
              const isHighlighted =
                currentSearch.trim().length > 0 &&
                materia.toLowerCase().includes(currentSearch.toLowerCase());

              return (
                <span
                  key={idx}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    isHighlighted
                      ? 'bg-amber-500 text-white shadow-xs font-semibold'
                      : 'bg-amber-100/70 text-amber-900 border border-amber-200/50'
                  }`}
                >
                  {materia}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        <a
          href={emailUrl}
          className="inline-flex items-center justify-center p-2.5 bg-slate-100 hover:bg-amber-100/70 text-slate-700 hover:text-amber-900 rounded-xl transition-colors border border-slate-200"
          title={`Enviar e-mail para ${mentor.nome}`}
          aria-label={`Enviar e-mail para ${mentor.nome}`}
        >
          <Mail className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </article>
  );
};
