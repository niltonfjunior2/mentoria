import { describe, it, expect } from 'vitest';
import { normalizeText, filterMentoresByMateria } from '../utils/search';
import { Mentor } from '../types/mentor';

const mockMentores: Mentor[] = [
  {
    id: '1',
    nome: 'Carlos Exatas',
    curso: 'Engenharia',
    semestre: '5º',
    avatarUrl: '',
    materias: ['Cálculo I', 'Física Geral'],
    bio: 'Bio teste',
    whatsapp: '5511999999999',
    email: 'carlos@teste.com'
  },
  {
    id: '2',
    nome: 'Mariana Humanas',
    curso: 'Direito',
    semestre: '7º',
    avatarUrl: '',
    materias: ['Direito Constitucional', 'Filosofia'],
    bio: 'Bio teste',
    whatsapp: '5511988888888',
    email: 'mariana@teste.com'
  }
];

describe('Utilitário de Normalização e Busca de Matérias', () => {
  it('deve normalizar texto removendo acentos e maiúsculas', () => {
    expect(normalizeText('Cálculo I')).toBe('calculo i');
    expect(normalizeText('FÍSICA')).toBe('fisica');
    expect(normalizeText('  Química Orgânica  ')).toBe('quimica organica');
  });

  it('deve retornar todos os mentores quando a query estiver vazia', () => {
    const resultado = filterMentoresByMateria(mockMentores, '');
    expect(resultado).toHaveLength(2);
  });

  it('deve encontrar mentores por matéria sem se importar com acento', () => {
    const comAcento = filterMentoresByMateria(mockMentores, 'cálculo');
    const semAcento = filterMentoresByMateria(mockMentores, 'calculo');
    const maiuscula = filterMentoresByMateria(mockMentores, 'CALCULO');

    expect(comAcento).toHaveLength(1);
    expect(comAcento[0].id).toBe('1');
    expect(semAcento).toHaveLength(1);
    expect(maiuscula).toHaveLength(1);
  });

  it('deve retornar array vazio quando nenhuma matéria coincidir', () => {
    const resultado = filterMentoresByMateria(mockMentores, 'Medicina');
    expect(resultado).toHaveLength(0);
  });
});
