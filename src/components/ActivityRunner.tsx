import React, { useState } from 'react';
import { ActivityDef, ActivityState } from '../types/course';
import { CheckCircle2, XCircle, RefreshCw, Award, ChevronDown, ChevronUp, Lock, Unlock, HelpCircle, FileCheck } from 'lucide-react';

interface ActivityRunnerProps {
  activity: ActivityDef;
  state?: ActivityState;
  onUpdateState: (id: string, newState: ActivityState) => void;
  isTeacherMode: boolean;
}

export const ActivityRunner: React.FC<ActivityRunnerProps> = ({
  activity,
  state = {},
  onUpdateState,
  isTeacherMode
}) => {
  const [showSolution, setShowSolution] = useState(false);

  // Initialize response state based on activity type
  const localResp = state.resp ?? (
    activity.type === 'classify' || activity.type === 'match'
      ? (activity.pairs || activity.items)?.map(() => '') ?? []
      : activity.type === 'tf' || activity.type === 'mcq'
      ? (activity.questions)?.map(() => null) ?? []
      : null
  );

  const localText = state.text ?? (activity.fields?.map(() => '') ?? []);
  const localGrid = state.grid ?? (
    activity.grid
      ? Array.from({ length: activity.grid.rows }, () => Array(activity.grid!.cols.length).fill(''))
      : []
  );

  const isChecked = !!state.checked;
  const attempts = state.attempts ?? 0;
  const bestScore = state.best ?? { sc: 0, mx: 0 };
  const lastScore = state.last ?? { sc: 0, mx: 0 };

  // --- Handlers for auto-correct activities ---
  const handleAnswerChange = (index: number, val: any) => {
    if (isChecked) return;
    const newResp = Array.isArray(localResp) ? [...localResp] : [];
    newResp[index] = val;
    onUpdateState(activity.id, {
      ...state,
      resp: newResp
    });
  };

  const handleCheck = () => {
    let sc = 0;
    let mx = 0;

    if (activity.type === 'tf') {
      const qs = activity.questions || [];
      mx = qs.length;
      qs.forEach((q, i) => {
        if (localResp[i] === q.ans) sc++;
      });
    } else if (activity.type === 'mcq') {
      const qs = activity.questions || [];
      mx = qs.length;
      qs.forEach((q, i) => {
        if (localResp[i] === q.ans) sc++;
      });
    } else if (activity.type === 'classify') {
      const items = activity.items || [];
      mx = items.length;
      items.forEach((it, i) => {
        if (Number(localResp[i]) === it.c) sc++;
      });
    } else if (activity.type === 'match') {
      const pairs = activity.pairs || [];
      mx = pairs.length;
      pairs.forEach((p, i) => {
        if (localResp[i] === p.b) sc++;
      });
    }

    const newBest = (!state.best || sc > state.best.sc) ? { sc, mx } : state.best;
    const newAttempts = attempts + 1;

    onUpdateState(activity.id, {
      ...state,
      checked: true,
      attempts: newAttempts,
      best: newBest,
      last: { sc, mx, at: new Date().toISOString(), resp: localResp }
    });
  };

  const handleRetry = () => {
    const blankResp = activity.type === 'tf' || activity.type === 'mcq'
      ? activity.questions?.map(() => null) ?? []
      : (activity.pairs || activity.items)?.map(() => '') ?? [];

    onUpdateState(activity.id, {
      ...state,
      checked: false,
      resp: blankResp
    });
  };

  // --- Handlers for teacher review activities ---
  const handleFieldChange = (idx: number, val: string) => {
    const newTexts = [...localText];
    newTexts[idx] = val;
    onUpdateState(activity.id, {
      ...state,
      text: newTexts
    });
  };

  const handleGridCellChange = (rIdx: number, cIdx: number, val: string) => {
    const newGrid = localGrid.map((row) => [...row]);
    newGrid[rIdx][cIdx] = val;
    onUpdateState(activity.id, {
      ...state,
      grid: newGrid
    });
  };

  const handleToggleDelivery = () => {
    const newStatus = state.status === 'lliu' ? 'pend' : 'lliu';
    onUpdateState(activity.id, {
      ...state,
      status: newStatus
    });
  };

  const handleTeacherGrade = (grade: string, comment: string, reviewed: boolean) => {
    onUpdateState(activity.id, {
      ...state,
      tGrade: grade,
      tComment: comment,
      tReviewed: reviewed
    });
  };

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/25 overflow-hidden glow-cyan transition-all my-6">
      {/* Activity Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-950/70 border-b border-cyan-500/20">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h4 className="font-heading font-bold text-white text-base tracking-wide">
            {activity.title}
          </h4>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
            {activity.type === 'teacher' ? 'REVISIÓN DOCENTE' : 'AUTOCORREGIBLE'}
          </span>
          {activity.time && (
            <span className="text-slate-400">
              ⏱ {activity.time}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Instructions */}
        {activity.instr && (
          <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
            {activity.instr}
          </p>
        )}

        {/* 1. MATCH TYPE ACTIVITY */}
        {activity.type === 'match' && activity.pairs && (
          <div className="space-y-4">
            {activity.pairs.map((pair, idx) => {
              const selectedVal = localResp[idx] || '';
              const isCorrect = selectedVal === pair.b;
              const allDefinitions = activity.pairs!.map((p) => p.b);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'bg-emerald-950/25 border-emerald-500/50'
                        : 'bg-rose-950/25 border-rose-500/50'
                      : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <div className="text-sm font-semibold text-cyan-300 mb-2">
                    {idx + 1}. {pair.a}
                  </div>
                  <select
                    disabled={isChecked}
                    value={selectedVal}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:outline-cyan-400 font-mono"
                  >
                    <option value="">— Seleccionar definición coincidente —</option>
                    {allDefinitions.map((def, dIdx) => (
                      <option key={dIdx} value={def}>
                        {def}
                      </option>
                    ))}
                  </select>

                  {isChecked && (
                    <div className="mt-2 text-xs flex items-start gap-1.5 pt-1">
                      {isCorrect ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcto
                        </span>
                      ) : (
                        <div className="text-rose-400 space-y-0.5">
                          <span className="flex items-center gap-1 font-medium">
                            <XCircle className="w-3.5 h-3.5" /> Solución:
                          </span>
                          <p className="text-slate-300 pl-4">{pair.b}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 2. TRUE/FALSE (TF) ACTIVITY */}
        {activity.type === 'tf' && activity.questions && (
          <div className="space-y-4">
            {activity.questions.map((q, idx) => {
              const userAns = localResp[idx];
              const isCorrect = userAns === q.ans;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'bg-emerald-950/25 border-emerald-500/50'
                        : 'bg-rose-950/25 border-rose-500/50'
                      : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <p className="text-sm text-slate-200 font-medium mb-3">
                    {idx + 1}. {q.q}
                  </p>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                      <input
                        type="radio"
                        name={`tf-${activity.id}-${idx}`}
                        disabled={isChecked}
                        checked={userAns === true}
                        onChange={() => handleAnswerChange(idx, true)}
                        className="accent-cyan-400 w-4 h-4 cursor-pointer"
                      />
                      <span className={userAns === true ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                        Verdadero
                      </span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                      <input
                        type="radio"
                        name={`tf-${activity.id}-${idx}`}
                        disabled={isChecked}
                        checked={userAns === false}
                        onChange={() => handleAnswerChange(idx, false)}
                        className="accent-cyan-400 w-4 h-4 cursor-pointer"
                      />
                      <span className={userAns === false ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                        Falso
                      </span>
                    </label>
                  </div>

                  {isChecked && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-mono">
                      {isCorrect ? (
                        <div className="text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>¡Correcto! {q.exp}</span>
                        </div>
                      ) : (
                        <div className="text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrecto. Respuesta correcta: {q.ans ? 'Verdadero' : 'Falso'}. ({q.exp})</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 3. CLASSIFY ACTIVITY */}
        {activity.type === 'classify' && activity.items && activity.cats && (
          <div className="space-y-4">
            {activity.items.map((it, idx) => {
              const selectedCat = localResp[idx];
              const isCorrect = Number(selectedCat) === it.c;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'bg-emerald-950/25 border-emerald-500/50'
                        : 'bg-rose-950/25 border-rose-500/50'
                      : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <p className="text-sm text-slate-200 font-medium mb-2.5">
                    {idx + 1}. {it.x}
                  </p>

                  <select
                    disabled={isChecked}
                    value={selectedCat !== undefined ? selectedCat : ''}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:outline-cyan-400 font-mono"
                  >
                    <option value="">— Elegir categoría correspondiente —</option>
                    {activity.cats!.map((cat, cIdx) => (
                      <option key={cIdx} value={cIdx}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  {isChecked && (
                    <div className="mt-2 text-xs flex items-start gap-1.5">
                      {isCorrect ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcto ({it.exp})
                        </span>
                      ) : (
                        <span className="text-rose-400 font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Categoría correcta: {activity.cats![it.c!]} ({it.exp})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 4. MULTIPLE CHOICE (MCQ) EXAM (e.g. S13 Final Eval 10 Questions) */}
        {activity.type === 'mcq' && activity.questions && (
          <div className="space-y-6">
            {activity.questions.map((q, idx) => {
              const userAns = localResp[idx];
              const isCorrect = userAns === q.ans;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'bg-emerald-950/25 border-emerald-500/50'
                        : 'bg-rose-950/25 border-rose-500/50'
                      : 'bg-slate-950/50 border-slate-800'
                  }`}
                >
                  <div className="font-semibold text-slate-100 text-sm sm:text-base mb-3.5">
                    <span className="text-cyan-400 font-mono mr-2">{idx + 1}.</span>
                    {q.q}
                  </div>

                  <div className="space-y-2">
                    {q.opts?.map((opt, oIdx) => {
                      const isOptionSelected = userAns === oIdx;
                      const isOptionRight = q.ans === oIdx;

                      let optClass = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (isChecked) {
                        if (isOptionRight) {
                          optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                        } else if (isOptionSelected && !isOptionRight) {
                          optClass = 'bg-rose-950/40 border-rose-500 text-rose-200';
                        }
                      } else if (isOptionSelected) {
                        optClass = 'bg-cyan-950/50 border-cyan-500 text-cyan-200 font-medium';
                      }

                      return (
                        <label
                          key={oIdx}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${optClass}`}
                        >
                          <input
                            type="radio"
                            name={`mcq-${activity.id}-${idx}`}
                            disabled={isChecked}
                            checked={isOptionSelected}
                            onChange={() => handleAnswerChange(idx, oIdx)}
                            className="mt-0.5 accent-cyan-400 w-4 h-4 cursor-pointer"
                          />
                          <span className="leading-snug">{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {isChecked && (
                    <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-xs font-mono">
                      {isCorrect ? (
                        <div className="text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>¡Correcto! {q.exp}</span>
                        </div>
                      ) : (
                        <div className="text-rose-400 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <XCircle className="w-4 h-4" />
                            <span>Respuesta incorrecta.</span>
                          </div>
                          <p className="text-slate-300 pl-5 text-[11px]">{q.exp}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 5. TEACHER PRACTICAL CASE ACTIVITY (Fields & Table) */}
        {activity.type === 'teacher' && (
          <div className="space-y-6">
            {/* Grid Table if present (e.g. Actividad 9 Planning & Actividad 11 Units) */}
            {activity.grid && (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/50">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80">
                      {activity.grid.cols.map((col, cIdx) => (
                        <th key={cIdx} className="p-3 text-left text-cyan-300 font-semibold uppercase tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {localGrid.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/30">
                        {activity.grid!.cols.map((col, cIdx) => (
                          <td key={cIdx} className="p-2">
                            <textarea
                              rows={2}
                              value={row[cIdx] || ''}
                              onChange={(e) => handleGridCellChange(rIdx, cIdx, e.target.value)}
                              placeholder={`Fila ${rIdx + 1}: ${col}`}
                              className="w-full bg-slate-900/90 border border-slate-800 rounded p-2 text-xs text-slate-200 focus:outline-cyan-400 resize-y"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Structured Text Fields */}
            {activity.fields?.map((field, fIdx) => (
              <div key={fIdx} className="space-y-2">
                <label className="block text-xs font-mono text-cyan-300 font-semibold">
                  {activity.fields!.length > 1 ? `${fIdx + 1}. ` : ''}{field}
                </label>
                <textarea
                  rows={4}
                  value={localText[fIdx] || ''}
                  onChange={(e) => handleFieldChange(fIdx, e.target.value)}
                  placeholder="Redacta aquí tu respuesta o justificación fundamentada..."
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-cyan-400 focus:border-cyan-500/50 font-sans leading-relaxed"
                />
              </div>
            ))}

            {/* Rubric Info */}
            {activity.rubric && (
              <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-400 font-mono">
                <span className="text-cyan-400 font-bold">Rúbrica de evaluación:</span> {activity.rubric.join(' ')}
              </div>
            )}

            {/* Status & Delivery Switch */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Estado de entrega:</span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                    state.status === 'lliu'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {state.status === 'lliu' ? 'ENTREGADA' : 'PENDIENTE'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleDelivery}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  state.status === 'lliu'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                {state.status === 'lliu' ? 'Marcar como pendiente' : 'Marcar como entregada'}
              </button>
            </div>

            {/* Manual Official Solution (Revealed upon delivery or in Teacher Mode) */}
            {activity.solution && (
              <div className="pt-2">
                {state.status === 'lliu' || isTeacherMode ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <button
                      type="button"
                      onClick={() => setShowSolution(!showSolution)}
                      className="w-full flex items-center justify-between text-xs font-mono text-emerald-400 font-bold cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Unlock className="w-4 h-4" /> Solución Oficial Propuesta en el Manual
                      </span>
                      {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showSolution && (
                      <div className="mt-3.5 pt-3 border-t border-emerald-500/20 text-xs text-slate-200 space-y-2 leading-relaxed">
                        {activity.solution.map((par, pIdx) => (
                          <p key={pIdx}>{par}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs font-mono text-slate-500">
                    <Lock className="w-3.5 h-3.5" />
                    <span>La solución oficial se mostrará cuando marques la actividad como entregada.</span>
                  </div>
                )}
              </div>
            )}

            {/* Teacher Review Grading Box */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs tracking-wider text-amber-400 uppercase">
                  Espacio del Docente (Evaluación)
                </span>
                {!isTeacherMode && (
                  <span className="text-[10px] font-mono text-slate-500">
                    Solo editable con Modo Docente activado
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Calificación
                  </label>
                  <input
                    type="text"
                    disabled={!isTeacherMode}
                    value={state.tGrade || ''}
                    onChange={(e) => handleTeacherGrade(e.target.value, state.tComment || '', !!state.tReviewed)}
                    placeholder="Ej. 9 / Apto"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono disabled:opacity-50"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Observaciones y retroalimentación docente
                  </label>
                  <input
                    type="text"
                    disabled={!isTeacherMode}
                    value={state.tComment || ''}
                    onChange={(e) => handleTeacherGrade(state.tGrade || '', e.target.value, !!state.tReviewed)}
                    placeholder="Comentarios formativos..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={!isTeacherMode}
                  checked={!!state.tReviewed}
                  onChange={(e) => handleTeacherGrade(state.tGrade || '', state.tComment || '', e.target.checked)}
                  className="accent-amber-400 w-4 h-4 cursor-pointer"
                />
                <span>Actividad revisada y validada por el docente</span>
              </label>
            </div>
          </div>
        )}

        {/* Footer for Auto-Correct Activities (Check / Retry / Score) */}
        {activity.type !== 'teacher' && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div>
              {!isChecked ? (
                <button
                  type="button"
                  onClick={handleCheck}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer transition-all"
                >
                  Corregir Respuestas
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold rounded-xl border border-slate-700 cursor-pointer transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Intentar de nuevo
                </button>
              )}
            </div>

            {/* Score Metrics HUD */}
            {isChecked && (
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    Puntuación: <strong>{lastScore.sc} / {lastScore.mx}</strong> ({Math.round((lastScore.sc / (lastScore.mx || 1)) * 100)}%)
                  </span>
                </div>

                <div className="text-slate-400 hidden sm:block">
                  Mejor: {bestScore.sc}/{bestScore.mx} · Intentos: {attempts}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
