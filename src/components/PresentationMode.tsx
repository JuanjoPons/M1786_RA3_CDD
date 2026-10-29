import React, { useState, useEffect } from 'react';
import { SessionBlock, ContentNode, ActivityDef } from '../types/course';
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, Orbit, Sparkles } from 'lucide-react';
import { ThreeSpaceCanvas } from './ThreeSpaceCanvas';

interface PresentationModeProps {
  session: SessionBlock;
  onClose: () => void;
}

type SlideItem =
  | {
      type: 'cover';
      title: string;
      subtitle: string;
      lead: string;
      signs: Array<[string, string, string]>;
    }
  | {
      type: '3d';
      title: string;
      subtitle: string;
    }
  | {
      type: 'section';
      title: string;
      subtitle: string;
      nodes: ContentNode[];
    }
  | {
      type: 'acts';
      title: string;
      subtitle: string;
      acts: ActivityDef[];
    };

export const PresentationMode: React.FC<PresentationModeProps> = ({
  session,
  onClose
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate typed slides array from session data
  const slides: SlideItem[] = [
    // Slide 0: Cover
    {
      type: 'cover',
      title: session.title,
      subtitle: `SESIÓN ${session.id} · ${session.ud}`,
      lead: session.cover.lead,
      signs: session.cover.signs
    },
    // Slide 1: 3D Hologram Laboratory
    {
      type: '3d',
      title: 'Espacio Didáctico & Órbita 3D',
      subtitle: 'Visualización Interactiva de Nodos de Conocimiento'
    },
    // Sections Slides
    ...session.sections.map((sec) => ({
      type: 'section' as const,
      title: sec.title,
      subtitle: sec.kind === 'theory' ? 'Desarrollo Teórico' : 'Autoevaluación Diagnóstica',
      nodes: sec.nodes
    })),
    // Activities Overview Slide
    {
      type: 'acts',
      title: 'Prácticas y Actividades de Aprendizaje',
      subtitle: `${session.acts.length} Actividades programadas`,
      acts: session.acts
    }
  ];

  const totalSlides = slides.length;
  const currentSlide = slides[slideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] text-white flex flex-col justify-between overflow-hidden">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Orbit className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="font-heading font-black text-sm tracking-widest text-cyan-400">
              MODO PRESENTACIÓN // {session.id}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {session.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Pantalla Completa"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Salir del Modo Presentación (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Content Arena */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto z-10">
        <div className="max-w-5xl w-full">
          {/* SLIDE: COVER */}
          {currentSlide.type === 'cover' && (
            <div className="space-y-8 text-center max-w-3xl mx-auto py-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-950/40">
                <span>{currentSlide.subtitle}</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-wide leading-tight uppercase">
                {currentSlide.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed font-light">
                {currentSlide.lead}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 text-left">
                {currentSlide.signs.map((sign, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-200 flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span>{sign[2]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE: 3D VIEWPORT */}
          {currentSlide.type === '3d' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  {currentSlide.subtitle}
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                  {currentSlide.title}
                </h2>
              </div>
              <div className="h-[520px] rounded-3xl overflow-hidden border border-cyan-500/30 glow-cyan">
                <ThreeSpaceCanvas activeView="tpack" />
              </div>
            </div>
          )}

          {/* SLIDE: SECTION */}
          {currentSlide.type === 'section' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  {currentSlide.subtitle}
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                  {currentSlide.title}
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 text-base leading-relaxed bg-slate-900/60 p-8 rounded-3xl border border-cyan-500/20">
                {currentSlide.nodes.map((node, i) => {
                  if (node.t === 'p' && typeof node.x === 'string') {
                    return <p key={i} className="leading-relaxed">{node.x}</p>;
                  }
                  if (node.t === 'viz' && node.v) {
                    return (
                      <div key={i} className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono text-sm">
                        <Sparkles className="w-4 h-4 inline mr-2 text-cyan-400" />
                        {node.v.title || 'Infografía conceptual integrada'}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          {/* SLIDE: ACTIVITIES */}
          {currentSlide.type === 'acts' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  {currentSlide.subtitle}
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                  {currentSlide.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSlide.acts.map((act, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>ACTIVIDAD 0{i + 1}</span>
                      <span>⏱ {act.time || '15 min'}</span>
                    </div>
                    <h4 className="font-bold text-white text-base font-heading">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {act.instr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Slide Controller Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-md border-t border-cyan-500/20 z-20">
        <button
          onClick={() => setSlideIndex((prev) => Math.max(prev - 1, 0))}
          disabled={slideIndex === 0}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 text-xs font-mono disabled:opacity-20 cursor-pointer flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                slideIndex === i ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Diapositiva ${i + 1}`}
            />
          ))}
          <span className="text-xs font-mono text-slate-400 ml-2">
            {slideIndex + 1} / {totalSlides}
          </span>
        </div>

        <button
          onClick={() => setSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1))}
          disabled={slideIndex === totalSlides - 1}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider disabled:opacity-20 cursor-pointer flex items-center gap-1.5"
        >
          Siguiente <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
