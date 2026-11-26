import { useState, useMemo, useEffect } from 'react';
import mentoresData from './data/mentores.json';
import { Mentor } from './types/mentor';
import { filterMentoresByMateria } from './utils/search';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { MentorCard } from './components/MentorCard';
import { EmptyState } from './components/EmptyState';
import { InstallModal } from './components/InstallModal';
import { Users, Smartphone, Download, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Escuta evento do navegador para instalação como PWA
  useEffect(() => {
    // Verifica se já está rodando em modo standalone (PWA instalado)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallPrompt(null);
        setIsInstalled(true);
      }
    } else {
      // Se o navegador não disparou o prompt nativo (iOS, desktop ou já instalado), abre o guia
      setIsModalOpen(true);
    }
  };

  const mentores = mentoresData as Mentor[];

  const filteredMentores = useMemo(() => {
    return filterMentoresByMateria(mentores, query);
  }, [mentores, query]);

  return (
    <div className="min-h-screen bg-amber-50/40 flex flex-col font-sans">
      {/* Barra de Instalação PWA em Grande Destaque no Topo */}
      {!isInstalled && (
        <aside className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2.5 shadow-md sticky top-0 z-40">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/20 rounded-xl shrink-0">
                <Smartphone className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold tracking-tight">
                  Disponível para Instalar no Celular!
                </p>
                <p className="text-[11px] text-amber-100/90 hidden sm:block">
                  Adicione o app à sua tela de início para consultar mentores rapidamente.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleInstallClick}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white hover:bg-amber-50 active:scale-95 text-amber-900 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                title="Instalar aplicativo"
              >
                <Download className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>Instalar Aplicativo</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="p-1.5 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Como instalar no seu aparelho"
                aria-label="Como instalar"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal explicativo de instalação */}
      <InstallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Cabeçalho */}
      <Header />

      {/* Barra de Busca */}
      <SearchBar
        query={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pb-12">
        {/* Contador de resultados */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Users className="w-4 h-4 text-amber-600" />
            <span>
              {filteredMentores.length === 1
                ? '1 mentor disponível'
                : `${filteredMentores.length} mentores disponíveis`}
            </span>
          </div>

          {query.trim().length > 0 && (
            <span className="text-xs text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full font-medium">
              Filtrando por: <strong>"{query}"</strong>
            </span>
          )}
        </div>

        {/* Lista de Cards ou Estado Vazio */}
        {filteredMentores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMentores.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                currentSearch={query}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            query={query}
            onClear={() => setQuery('')}
          />
        )}
      </main>

      {/* Rodapé Acadêmico */}
      <footer className="border-t border-amber-200/60 bg-white/70 py-6 text-center text-xs text-slate-500 px-4">
        <p className="font-medium text-slate-600 mb-1">
          Mentoria Universitária • Projeto Comunitário Estudantil
        </p>
        <p className="text-[11px] text-slate-400">
          Dados abertos curados via GitHub • Hospedagem na Vercel
        </p>
      </footer>
    </div>
  );
}
