import React from 'react';
import { Smartphone, Share, PlusSquare, Monitor, X, CheckCircle2 } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 relative text-left">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do modal */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Como Instalar o Aplicativo</h3>
            <p className="text-xs text-amber-700 font-medium">Acesso rápido direto da sua tela inicial</p>
          </div>
        </div>

        {/* Instruções por plataforma */}
        <div className="space-y-4 my-5 text-xs sm:text-sm text-slate-600">
          {isIOS ? (
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/70 space-y-3">
              <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                <span>No iPhone ou iPad (Safari):</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Share className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>1. Toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta) na barra inferior.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <PlusSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>2. Role a lista e selecione <strong>"Adicionar à Tela de Início"</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>3. Toque em <strong>Adicionar</strong> no canto superior direito.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/70 space-y-2">
                <div className="font-bold text-amber-900 text-xs sm:text-sm">No Celular (Android / Chrome):</div>
                <p>1. Toque nos <strong>três pontinhos (⋮)</strong> no canto superior direito do navegador.</p>
                <p>2. Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-2">
                <div className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-slate-600" />
                  <span>No Computador (Chrome / Edge):</span>
                </div>
                <p>Clique no ícone de <strong>instalação (computadorzinho com seta)</strong> na barra de endereços no topo do navegador.</p>
              </div>
            </div>
          )}
        </div>

        {/* Botão Entendi */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md transition-all text-sm"
        >
          Entendido, obrigado!
        </button>
      </div>
    </div>
  );
};
