import React, { useState } from 'react';
import { Layers, Rocket, Sparkles, Orbit, Box, BookOpen, ChevronRight } from 'lucide-react';
import { ThreeSpaceCanvas } from './ThreeSpaceCanvas';

interface HeroVanguardProps {
  onStartSession: (id: string) => void;
  currentSessionId: string;
}

export const HeroVanguard: React.FC<HeroVanguardProps> = ({
  onStartSession,
  currentSessionId
}) => {
  const [showInteractive3D, setShowInteractive3D] = useState<boolean>(false);

  // Exact generated asset path from Phase 1
  const heroSpaceImage = '/src/assets/images/hero_orbit_earth_satellite_1793300678923.jpg';

  return (
    <section className="relative pt-6 pb-14 px-4 lg:px-8 border-b border-cyan-500/15 overflow-hidden">
      {/* Background glow and subtle space nebula effects */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Column: Typography & CTAs (Like A-SPACE reference) */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Tag / Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>MPCDPD (1786) · RESULTADO DE APRENDIZAJE 3</span>
            </div>

            {/* Giant Vanguard Title */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-[1.08] uppercase">
              ORBIT THE <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                LEARNING
              </span>
            </h1>

            {/* Explanatory Paragraph (Matches NASA quote format in reference) */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Marco de referencia integral para articular pedagógicamente las tecnologías digitales en el aula. 
              Del modelo <strong className="text-white font-semibold">TPACK</strong> y la planificación preventiva 
              al acompañamiento tutorial continuo, el aprendizaje autorregulado y la evaluación formativa acreditada.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onStartSession(currentSessionId || 'S9')}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explorar Sesiones</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => setShowInteractive3D(!showInteractive3D)}
                className="px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Box className="w-4 h-4 text-cyan-400" />
                <span>{showInteractive3D ? 'Ver Fotografía 3D' : 'Laboratorio 3D Interactivo'}</span>
              </button>
            </div>

            {/* Quick Curriculum Indicators */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                5 Sesiones Guiadas
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Autoevaluación Oficial
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Informe Acreditativo
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual (Interactive 3D or Photorealistic Aerospace Render) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {showInteractive3D ? (
              <div className="w-full h-[440px] sm:h-[480px]">
                <ThreeSpaceCanvas activeView="earth" />
              </div>
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 glow-cyan group">
                <img
                  src={heroSpaceImage}
                  alt="Vista orbital de la Tierra y satélite de investigación vanguardista"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
                
                {/* Visual HUD Badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-cyan-500/30 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                    <span>ÓRBITA LUNAR // SENSOR EDUCATIVO CDPD</span>
                  </div>
                  <button
                    onClick={() => setShowInteractive3D(true)}
                    className="text-[11px] text-cyan-400 hover:text-white underline underline-offset-2 cursor-pointer"
                  >
                    Abrir en 3D
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Metrics / Feature Glassmorphic Cards (Exact match of LEO / HI-SPEED / EARTH from reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {/* Card 1: TPACK Core */}
          <div className="relative p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300 glow-cyan group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              {/* Atom / Rings Icon */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="font-heading font-bold text-sm tracking-widest text-slate-400 uppercase mb-1">
              MODELO TPACK
            </div>
            <div className="font-heading font-black text-2xl text-white tracking-wide mb-1">
              TK · PK · CK
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Intersección tripartita: tecnología, pedagogía y contenido.
            </p>
          </div>

          {/* Card 2: Planificación Hi-Speed */}
          <div className="relative p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300 glow-cyan group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              {/* Satellite Icon */}
              <Rocket className="w-6 h-6" />
            </div>
            <div className="font-heading font-bold text-sm tracking-widest text-slate-400 uppercase mb-1">
              PLANIFICACIÓN
            </div>
            <div className="font-heading font-black text-2xl text-white tracking-wide mb-1">
              5 SESIONES
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Previsión técnica, adaptación contextual y planes de contingencia.
            </p>
          </div>

          {/* Card 3: Acreditación Oficial */}
          <div className="relative p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md border border-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300 glow-cyan group">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              {/* Globe Icon */}
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="font-heading font-bold text-sm tracking-widest text-slate-400 uppercase mb-1">
              ACREDITACIÓN
            </div>
            <div className="font-heading font-black text-2xl text-white tracking-wide mb-1">
              RA3 OFICIAL
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Autoevaluación diagnóstica con generación de informe individual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
