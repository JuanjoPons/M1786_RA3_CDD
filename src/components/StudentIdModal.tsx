import React, { useState } from 'react';
import { StudentProfile } from '../types/course';
import { User, X, Check, Calendar, Users, FileText } from 'lucide-react';

interface StudentIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSaveStudent: (student: StudentProfile) => void;
}

export const StudentIdModal: React.FC<StudentIdModalProps> = ({
  isOpen,
  onClose,
  student,
  onSaveStudent
}) => {
  const [formData, setFormData] = useState<StudentProfile>(student);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveStudent(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#060b19] border border-cyan-500/40 p-6 sm:p-8 glow-cyan shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white tracking-wide uppercase">
                Identificación del Alumno/a
              </h3>
              <p className="text-[11px] font-mono text-cyan-400">
                MPCDPD (1786) · RESULTADO DE APRENDIZAJE 3
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Nombre y Apellidos <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Agus Salman / María Gómez"
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Grupo / Aula <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="Ej. GRUPO-A / 1º CFGM"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Fecha
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-100 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Observaciones o notas personales (opcional)
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Reflexiones previas, contexto educativo o anotaciones del módulo..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-sans"
            />
          </div>

          <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
            * El nombre y grupo figurarán en la cabecera del informe individual acreditativo que entregas al docente.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-500/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Guardar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
