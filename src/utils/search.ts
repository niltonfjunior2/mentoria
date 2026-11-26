import { Mentor } from '../types/mentor';

/**
 * Normaliza strings removendo diacríticos (acentos) e convertendo para minúsculas.
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Filtra a lista de mentores com base na matéria informada.
 * Caso a busca esteja vazia, retorna a lista completa.
 * A busca é insensível a maiúsculas/minúsculas e acentuação.
 */
export function filterMentoresByMateria(mentores: Mentor[], query: string): Mentor[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return mentores;
  }

  return mentores.filter((mentor) =>
    mentor.materias.some((materia) => normalizeText(materia).includes(normalizedQuery))
  );
}
