import { describe, it, expect } from 'vitest';
import mentores from '../data/mentores.json';
import { Mentor } from '../types/mentor';

describe('Validação da Base Estática de Mentores (JSON)', () => {
  it('deve ser um array com registros de mentores', () => {
    expect(Array.isArray(mentores)).toBe(true);
    expect(mentores.length).toBeGreaterThan(0);
  });

  it('todos os mentores devem cumprir o schema obrigatório', () => {
    const ids = new Set<string>();

    mentores.forEach((m: Mentor) => {
      // Identificador único
      expect(m.id).toBeDefined();
      expect(typeof m.id).toBe('string');
      expect(ids.has(m.id)).toBe(false);
      ids.add(m.id);

      // Nome e dados acadêmicos
      expect(m.nome.trim().length).toBeGreaterThan(0);
      expect(m.curso.trim().length).toBeGreaterThan(0);
      expect(m.semestre.trim().length).toBeGreaterThan(0);

      // Matérias
      expect(Array.isArray(m.materias)).toBe(true);
      expect(m.materias.length).toBeGreaterThan(0);

      // WhatsApp (apenas dígitos com DDI e DDD)
      expect(m.whatsapp).toMatch(/^\d{10,14}$/);

      // E-mail válido
      expect(m.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });
});
