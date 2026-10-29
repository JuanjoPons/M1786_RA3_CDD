import React from 'react';
import { User, FileText, Presentation, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../types/course';

interface HeaderProps {
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onOpenReport: () => void;
  onOpenStudentModal: () => void;
  onTogglePresentation: () => void;
  onToggleTeacherMode: () => void;
  isTeacherMode: boolean;
  student: StudentProfile;
  totalCompletedActs: number;
  totalActs: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSessionId,
  onSelectSession,
  onOpenReport,
  onOpenStudentModal,
  onTogglePresentation,
  onToggleTeacherMode,
  isTeacherMode,
  student,
  totalCompletedActs,
  totalActs
}) => {
  const sessionTabs = [
    { id: 'S9', label: 'S09 TPACK' },
    { id: 'S10', label: 'S10 Planificación' },
    { id: 'S11', label: 'S11 Acompañamiento' },
    { id: 'S12', label: 'S12 Autorregulación' },
    { id: 'S13', label: 'S13 Moodle & Eval' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Brand Zone (Left) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectSession('S9')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-cyan-400"
          >
            {/* Vanguard Abstract Delta Space Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all">
              <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L3 20h6l3-6 3 6h6L12 2z" />
                  <circle cx="12" cy="11" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div>
              <span className="font-heading font-black tracking-widest text-lg text-white group-hover:text-cyan-400 transition-colors">
                A-SPACE <span className="text-cyan-400 text-xs font-mono font-medium tracking-normal border border-cyan-500/40 px-1.5 py-0.5 rounded ml-1">CDPD</span>
              </span>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
                RA3 · INTEGRACIÓN DIGITAL (1786)
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Tabs (Center) */}
        <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {sessionTabs.map((tab) => {
            const isActive = currentSessionId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectSession(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Controls & Student Zone (Right) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Presentation Mode button */}
          <button
            onClick={onTogglePresentation}
            className="p-2 text-slate-400 hover:text-cyan-300 hover:bg-slate-900/80 rounded-lg border border-slate-800 transition-colors"
            title="Modo Presentación Aula (Pantalla Completa)"
            aria-label="Modo Presentación"
          >
            <Presentation className="w-4 h-4" />
          </button>

          {/* Teacher Mode toggle */}
          <button
            onClick={onToggleTeacherMode}
            className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
              isTeacherMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-900/80'
            }`}
            title={isTeacherMode ? "Modo Docente Activado" : "Activar Modo Docente"}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden xl:inline font-mono">Docente</span>
          </button>

          {/* Student Profile pill button (like Agus Salman in reference) */}
          <button
            onClick={onOpenStudentModal}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-850 border border-cyan-500/30 hover:border-cyan-400/60 rounded-lg text-xs font-mono text-slate-200 transition-all cursor-pointer shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[110px] truncate font-medium">
              {student.name.trim() || 'Identificarse'}
            </span>
          </button>

          {/* Report Generation CTA */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider font-mono shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INFORME</span>
            <span className="bg-slate-950/20 px-1 py-0.2 rounded text-[10px]">
              {totalCompletedActs}/{totalActs}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
