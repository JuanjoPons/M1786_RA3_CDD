import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-cyan-500/20 bg-[#030712] py-8 px-4 lg:px-8 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Technology & Curriculum Credits */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <span className="text-slate-400">Tecnología Educativa</span>
          <span className="text-slate-700">·</span>
          <span>MPCDPD (1786)</span>
          <span className="text-slate-700">·</span>
          <span>Resultado de Aprendizaje 3</span>
        </div>

        {/* Center: Copyright & Design Signature */}
        <div className="text-slate-500 text-center">
          Diseño Web Vanguardista ©2026 · Modelo Orbital 3D & TPACK
        </div>

        {/* Right: Supported by A-SPACE Brand Logo (Matching reference) */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Plataforma</span>
          <div className="flex items-center gap-1.5 text-cyan-400 font-heading font-black tracking-widest text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 20h6l3-6 3 6h6L12 2z" />
              <circle cx="12" cy="11" r="1.5" fill="currentColor" />
            </svg>
            <span>A-SPACE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
