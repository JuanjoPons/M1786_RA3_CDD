import React from 'react';
import { SessionBlock, ActivityState } from '../types/course';
import { ActivityRunner } from './ActivityRunner';
import { 
  Compass, 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Cpu, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface SessionViewProps {
  session: SessionBlock;
  activityStates: Record<string, ActivityState>;
  onUpdateActivityState: (id: string, newState: ActivityState) => void;
  isTeacherMode: boolean;
  onNextSession?: () => void;
  onPrevSession?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const SessionView: React.FC<SessionViewProps> = ({
  session,
  activityStates,
  onUpdateActivityState,
  isTeacherMode,
  onNextSession,
  onPrevSession,
  isFirst,
  isLast
}) => {
  // Generated vanguard imagery for visual complements
  const rapidscatImg = '/src/assets/images/rapidscat_satellite_module_1793300679482.jpg';
  const probeImg = '/src/assets/images/futuristic_satellite_probe_1793300680116.jpg';
  const tpackRingsImg = '/src/assets/images/tpack_hologram_rings_1793300680139.jpg';

  return (
    <div className="space-y-12 py-8">
      {/* Session Hero Banner (Matching RAPIDSCAT / OUR MISSION from Vanguard reference) */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950/70 p-6 sm:p-10 glow-cyan">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Metadata & Mission statement */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
              <span className="w-4 h-[2px] bg-cyan-400" />
              <span>SESIÓN {session.id} · {session.ud}</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight">
              {session.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {session.cover.lead}
            </p>

            {/* Key Signs Grid (Vanguard HUD tags) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {session.cover.signs.map((sign, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">{sign[2]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Visual Complement module (Like Rapidscat satellite in reference) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] group">
              <img
                src={session.id === 'S9' ? tpackRingsImg : session.id === 'S11' ? probeImg : rapidscatImg}
                alt={session.title}
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 bg-slate-950/80 backdrop-blur-md rounded-lg border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                <span>ESTACIÓN DIDÁCTICA // {session.id}</span>
                <span className="text-slate-400">1 HORA LECTIVA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections & Theory Modules */}
      <div className="space-y-10">
        {session.sections.map((section, sIdx) => (
          <div
            key={sIdx}
            className="rounded-3xl bg-slate-900/40 border border-cyan-500/20 p-6 sm:p-8 space-y-6"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <span className="w-3 h-[2px] bg-cyan-400" />
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-wide uppercase">
                  {section.num > 0 && <span className="text-cyan-400 mr-2">{section.num}.</span>}
                  {section.title}
                </h3>
              </div>

              <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded bg-slate-950 border border-slate-800">
                {section.kind === 'theory' ? 'TEORÍA VANGUARD' : section.kind === 'selfcheck' ? 'EVALUACIÓN' : 'PRESENTACIÓN'}
              </span>
            </div>

            {/* Content Nodes Rendering */}
            <div className="space-y-6">
              {section.nodes.map((node, nIdx) => {
                // 1. Text Paragraph
                if (node.t === 'p' && typeof node.x === 'string') {
                  return (
                    <p key={nIdx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {node.x}
                    </p>
                  );
                }

                // 2. Visuals & Infographics
                if (node.t === 'viz' && node.v) {
                  const v = node.v;

                  // Infographic: Cards
                  if (v.type === 'cards' && v.items) {
                    return (
                      <div key={nIdx} className="space-y-3 pt-2">
                        {v.title && (
                          <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            {v.title}
                          </h5>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {v.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors flex items-start gap-3.5"
                            >
                              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 font-mono font-bold text-xs">
                                {v.num ? iIdx + 1 : <Layers className="w-4 h-4" />}
                              </div>
                              <div className="space-y-1">
                                <h6 className="font-semibold text-slate-100 text-sm">{item.x}</h6>
                                {item.d && <p className="text-xs text-slate-400 leading-relaxed">{item.d}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Infographic: Triangle (TPACK / Variables)
                  if (v.type === 'tri') {
                    return (
                      <div key={nIdx} className="p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 glow-cyan space-y-4">
                        {v.title && (
                          <div className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400 text-center">
                            {v.title}
                          </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          {v.top && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-1.5 md:col-span-3 max-w-md mx-auto w-full">
                              <div className="text-xs font-mono font-bold text-cyan-300 uppercase">{v.top.x}</div>
                              {v.top.d && <p className="text-xs text-slate-300 leading-relaxed">{v.top.d}</p>}
                            </div>
                          )}

                          {v.left && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 text-center space-y-1.5">
                              <div className="text-xs font-mono font-bold text-sky-300 uppercase">{v.left.x}</div>
                              {v.left.d && <p className="text-xs text-slate-300 leading-relaxed">{v.left.d}</p>}
                            </div>
                          )}

                          <div className="p-4 rounded-xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-sky-950 border border-cyan-400 text-center flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            <span className="font-heading font-black text-xl text-white tracking-widest">{v.center}</span>
                            <span className="text-[10px] font-mono text-cyan-400">NÚCLEO INTEGRADO</span>
                          </div>

                          {v.right && (
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 text-center space-y-1.5">
                              <div className="text-xs font-mono font-bold text-amber-300 uppercase">{v.right.x}</div>
                              {v.right.d && <p className="text-xs text-slate-300 leading-relaxed">{v.right.d}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Infographic: Compare
                  if (v.type === 'compare' && v.cols) {
                    return (
                      <div key={nIdx} className="space-y-3 pt-2">
                        {v.title && (
                          <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400">
                            {v.title}
                          </h5>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {v.cols.map((col, cIdx) => (
                            <div
                              key={cIdx}
                              className={`p-4 rounded-xl border space-y-3 ${
                                col.s === 'ban'
                                  ? 'bg-rose-950/20 border-rose-500/40'
                                  : 'bg-cyan-950/20 border-cyan-500/40'
                              }`}
                            >
                              <div className="flex items-center gap-2 font-heading font-bold text-xs text-white uppercase">
                                {col.s === 'ban' ? (
                                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                                )}
                                <span>{col.x}</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                {col.items.map((it, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-1.5">
                                    <span className="text-slate-500">•</span>
                                    <span>{it[0]}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Infographic: Steps
                  if (v.type === 'steps' && v.items) {
                    return (
                      <div key={nIdx} className="space-y-3 pt-2">
                        {v.title && (
                          <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400">
                            {v.title}
                          </h5>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {v.items.map((step, stIdx) => (
                            <div
                              key={stIdx}
                              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors"
                            >
                              <div className="text-xs font-mono font-bold text-cyan-400">
                                PASO 0{stIdx + 1}
                              </div>
                              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                                {step.x}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Infographic: Key Highlight Box
                  if (v.type === 'key') {
                    return (
                      <div
                        key={nIdx}
                        className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-amber-200 space-y-2"
                      >
                        {v.big && <div className="font-heading font-bold text-sm text-amber-400 uppercase">{v.big}</div>}
                        <p className="text-sm leading-relaxed text-slate-200 font-normal">{v.x}</p>
                        {v.src && <div className="text-[11px] font-mono text-amber-500/80">{v.src}</div>}
                      </div>
                    );
                  }

                  // Infographic: Chain of Tasks
                  if (v.type === 'chain' && v.items) {
                    return (
                      <div key={nIdx} className="space-y-3 pt-2">
                        {v.title && (
                          <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400">
                            {v.title}
                          </h5>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {v.items.map((ch, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/25 space-y-2 relative"
                            >
                              <div className="text-xs font-mono font-bold text-cyan-400 flex items-center justify-between">
                                <span>FASE 0{cIdx + 1}</span>
                                {cIdx < v.items!.length - 1 && (
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block" />
                                )}
                              </div>
                              <h6 className="text-xs font-bold text-slate-100">{ch.x}</h6>
                              {ch.d && <p className="text-[11px] text-slate-400">{ch.d}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Infographic: Metacognitive Cycle
                  if (v.type === 'cycle' && v.items) {
                    return (
                      <div key={nIdx} className="p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 text-center space-y-4">
                        {v.title && (
                          <div className="font-heading font-bold text-xs uppercase tracking-widest text-cyan-400">
                            {v.title}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          {v.items.map((cyc, cycIdx) => (
                            <div
                              key={cycIdx}
                              className="px-5 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-center min-w-[140px]"
                            >
                              <div className="font-heading font-bold text-sm text-cyan-300">{cyc.x}</div>
                              {cyc.d && <div className="text-[11px] text-slate-400 font-mono mt-0.5">{cyc.d}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                }

                // 3. Educational External Links
                if (node.t === 'links' && node.items) {
                  return (
                    <div key={nIdx} className="pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {node.items.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center justify-between group"
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-mono font-bold text-cyan-300 group-hover:text-cyan-200">
                                {link.x}
                              </div>
                              {link.d && <p className="text-[11px] text-slate-400">{link.d}</p>}
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Session Activities Section */}
      {session.acts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <span className="w-4 h-[2px] bg-cyan-400" />
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide uppercase">
              Actividades y Prácticas de la Sesión ({session.acts.length})
            </h3>
          </div>

          <div className="space-y-6">
            {session.acts.map((act) => (
              <ActivityRunner
                key={act.id}
                activity={act}
                state={activityStates[act.id]}
                onUpdateState={onUpdateActivityState}
                isTeacherMode={isTeacherMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* Session Bottom Navigation */}
      <div className="flex items-center justify-between gap-4 pt-8 border-t border-cyan-500/20">
        <button
          onClick={onPrevSession}
          disabled={isFirst}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white font-mono text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          ← Sesión Anterior
        </button>

        <span className="text-xs font-mono text-slate-500 hidden sm:inline">
          SESIÓN {session.id} DE 5
        </span>

        <button
          onClick={onNextSession}
          disabled={isLast}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <span>Siguiente Sesión</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
