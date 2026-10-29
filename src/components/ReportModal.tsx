import React, { useState } from 'react';
import { SessionBlock, StudentProfile, ActivityState } from '../types/course';
import { COURSE_META } from '../data/courseData';
import { X, Printer, Copy, Check, Download, Upload, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: SessionBlock[];
  student: StudentProfile;
  activityStates: Record<string, ActivityState>;
  onImportData: (data: any) => void;
  onClearData: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  sessions,
  student,
  activityStates,
  onImportData,
  onClearData
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Compute statistics
  let totalActs = 0;
  let completedActs = 0;
  let autoPoints = 0;
  let autoMax = 0;

  sessions.forEach((s) => {
    s.acts.forEach((a) => {
      totalActs++;
      const st = activityStates[a.id];
      if (st) {
        if (a.type === 'teacher') {
          if (st.status === 'lliu' || st.tReviewed) completedActs++;
        } else {
          if (st.attempts && st.attempts > 0) {
            completedActs++;
            if (st.best) {
              autoPoints += st.best.sc;
              autoMax += st.best.mx;
            }
          }
        }
      }
    });
  });

  const generateReportPlainText = () => {
    const hr = '============================================================';
    const lines = [
      `INFORME INDIVIDUAL DE ACTIVIDAD Y ACREDITACIÓN`,
      `${COURSE_META.title.toUpperCase()} — ${COURSE_META.code}`,
      `${COURSE_META.ud}: ${COURSE_META.udTitle}`,
      hr,
      `DATOS DEL ALUMNO/A:`,
      `Nombre y Apellidos: ${student.name || 'Sin identificar'}`,
      `Grupo: ${student.group || 'Sin grupo'}`,
      `Fecha: ${student.date || new Date().toISOString().slice(0, 10)}`,
      student.notes ? `Observaciones: ${student.notes}` : '',
      `Fecha de emisión: ${new Date().toLocaleString('es-ES')}`,
      hr,
      `RESUMEN DE PROGRESO:`,
      `Actividades completadas: ${completedActs} de ${totalActs} (${Math.round((completedActs / (totalActs || 1)) * 100)}%)`,
      `Rendimiento en actividades autocorregibles: ${autoPoints} / ${autoMax} puntos (${autoMax ? Math.round((autoPoints / autoMax) * 100) : 0}%)`,
      hr,
      `DESGLOSE DETALLADO POR SESIONES Y ACTIVIDADES:`
    ];

    sessions.forEach((sess) => {
      lines.push(`\n[SESIÓN ${sess.id}] ${sess.title.toUpperCase()}`);
      sess.acts.forEach((act) => {
        const st = activityStates[act.id];
        lines.push(`- ${act.title} [${act.type === 'teacher' ? 'Docente' : 'Autocorregible'}]`);
        if (act.type === 'teacher') {
          lines.push(`    Estado: ${st?.status === 'lliu' ? 'Entregada' : 'Pendiente'}`);
          if (st?.tGrade) lines.push(`    Calificación docente: ${st.tGrade}`);
          if (st?.tComment) lines.push(`    Retroalimentación: ${st.tComment}`);
          if (st?.text) {
            st.text.forEach((txt, i) => {
              if (txt) lines.push(`    Campo ${i + 1}: ${txt}`);
            });
          }
        } else {
          if (st?.attempts) {
            lines.push(`    Mejor puntuación: ${st.best?.sc}/${st.best?.mx} · Intentos: ${st.attempts}`);
          } else {
            lines.push(`    Estado: No completada`);
          }
        }
      });
    });

    lines.push('\n' + hr);
    lines.push(`Nota: La calificación final del RA es determinada exclusivamente por el docente según los instrumentos oficiales.`);
    return lines.filter(Boolean).join('\n');
  };

  const handleCopy = () => {
    const text = generateReportPlainText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const backup = {
      app: 'CDPD_RA3_VANGUARD',
      version: 1,
      exportedAt: new Date().toISOString(),
      student,
      activityStates
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_CDPD_RA3_${student.name.replace(/\s+/g, '_') || 'Alumno'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.student && json.activityStates) {
          onImportData(json);
        } else {
          alert('El archivo no tiene el formato de informe válido.');
        }
      } catch {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#060b19] border border-cyan-500/40 glow-cyan shadow-2xl overflow-hidden">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 border-b border-cyan-500/20 bg-slate-950/90 shrink-0">
          <div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wide uppercase">
              Informe Oficial Individual
            </h3>
            <p className="text-xs font-mono text-cyan-400">
              {student.name ? `${student.name} (${student.group})` : 'Acreditación RA3 · MPCDPD (1786)'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Imprimir o Guardar como PDF"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">PDF / Imprimir</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copiar texto al portapapeles"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-200 text-xs sm:text-sm font-sans print:text-black print:bg-white">
          {/* Header ID Card */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/25 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-500 block">ALUMNO/A:</span>
                <strong className="text-cyan-300 text-sm">{student.name || 'Sin identificar'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">GRUPO:</span>
                <strong className="text-white text-sm">{student.group || '—'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">FECHA:</span>
                <strong className="text-white text-sm">{student.date || new Date().toISOString().slice(0, 10)}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">MÓDULO:</span>
                <strong className="text-white text-sm">MPCDPD (1786) · RA3</strong>
              </div>
            </div>
            {student.notes && (
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 font-sans">
                <strong>Observaciones:</strong> {student.notes}
              </div>
            )}
          </div>

          {/* Progress Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-center">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Actividades Completadas</span>
              <div className="font-heading font-black text-2xl text-cyan-400 mt-1">
                {completedActs} / {totalActs}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{Math.round((completedActs / (totalActs || 1)) * 100)}% de avance</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-center">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Puntos Autocorregibles</span>
              <div className="font-heading font-black text-2xl text-sky-400 mt-1">
                {autoPoints} / {autoMax}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{autoMax ? Math.round((autoPoints / autoMax) * 100) : 0}% de acierto</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-center">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Estado Global RA3</span>
              <div className="font-heading font-black text-2xl text-emerald-400 mt-1">
                {completedActs === totalActs ? 'COMPLETO' : 'EN CURSO'}
              </div>
              <span className="text-[10px] font-mono text-slate-500">5 Sesiones Planificadas</span>
            </div>
          </div>

          {/* Session by Session Breakdown */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-sm tracking-widest text-cyan-400 uppercase flex items-center gap-2">
              <FileText className="w-4 h-4" /> Desglose Detallado de Actividades
            </h4>

            {sessions.map((sess) => (
              <div key={sess.id} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                  <span className="text-cyan-300 font-bold">SESIÓN {sess.id}: {sess.title}</span>
                  <span className="text-slate-500">{sess.acts.length} actividades</span>
                </div>

                <div className="space-y-3">
                  {sess.acts.map((act) => {
                    const st = activityStates[act.id];
                    const isDone = act.type === 'teacher' ? (st?.status === 'lliu' || st?.tReviewed) : (st?.attempts && st.attempts > 0);

                    return (
                      <div
                        key={act.id}
                        className={`p-3.5 rounded-xl border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isDone ? 'bg-cyan-950/15 border-cyan-500/30' : 'bg-slate-900/40 border-slate-850'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-200">
                            {act.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {act.type === 'teacher' ? 'Revisión docente / Práctica' : 'Autocorregible'} · {act.time || '10 min'}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {act.type === 'teacher' ? (
                            <div className="text-right">
                              <span className={`px-2 py-0.5 rounded font-bold ${st?.status === 'lliu' ? 'text-cyan-300 bg-cyan-950 border border-cyan-500/40' : 'text-slate-400'}`}>
                                {st?.status === 'lliu' ? 'ENTREGADA' : 'PENDIENTE'}
                              </span>
                              {st?.tGrade && (
                                <div className="text-[11px] text-amber-300 mt-0.5">
                                  Nota: {st.tGrade}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-right">
                              {st?.attempts ? (
                                <div className="text-cyan-300 font-bold">
                                  {st.best?.sc} / {st.best?.mx} ({Math.round(((st.best?.sc || 0) / (st.best?.mx || 1)) * 100)}%)
                                </div>
                              ) : (
                                <span className="text-slate-500">Sin realizar</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
            * La web no calcula una calificación numérica final del RA: muestra el resultado transparente de cada tarea formativa. La nota final la determina el docente con sus instrumentos reglamentarios de evaluación.
          </div>
        </div>

        {/* Bottom Utility Bar (Export / Import / Clear) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-cyan-500/20 bg-slate-950 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Exportar JSON</span>
            </button>

            <label className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Importar JSON</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm('¿Seguro que deseas reiniciar todos los datos y respuestas de la aplicación?')) {
                onClearData();
                onClose();
              }
            }}
            className="text-rose-400 hover:text-rose-300 transition-colors underline cursor-pointer"
          >
            Borrar datos locales
          </button>
        </div>
      </div>
    </div>
  );
};
