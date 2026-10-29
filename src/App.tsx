/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SESSIONS_DATA, COURSE_META } from './data/courseData';
import { StudentProfile, ActivityState } from './types/course';
import { Header } from './components/Header';
import { HeroVanguard } from './components/HeroVanguard';
import { SessionView } from './components/SessionView';
import { StudentIdModal } from './components/StudentIdModal';
import { ReportModal } from './components/ReportModal';
import { PresentationMode } from './components/PresentationMode';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'CDPD_RA3_VANGUARD_STATE_V1';

export default function App() {
  const [currentSessionId, setCurrentSessionId] = useState<string>('S9');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Student Profile state
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) return parsed.student;
      }
    } catch {
      // ignore
    }
    return {
      name: '',
      group: '',
      date: new Date().toISOString().slice(0, 10),
      notes: ''
    };
  });

  // Activity Responses and States
  const [activityStates, setActivityStates] = useState<Record<string, ActivityState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activityStates) return parsed.activityStates;
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Save to localStorage
  useEffect(() => {
    try {
      const payload = {
        student,
        activityStates,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [student, activityStates]);

  const handleUpdateActivityState = (id: string, newState: ActivityState) => {
    setActivityStates((prev) => ({
      ...prev,
      [id]: newState
    }));
  };

  const handleImportData = (data: any) => {
    if (data.student) setStudent(data.student);
    if (data.activityStates) setActivityStates(data.activityStates);
  };

  const handleClearData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setStudent({
      name: '',
      group: '',
      date: new Date().toISOString().slice(0, 10),
      notes: ''
    });
    setActivityStates({});
  };

  // Find active session
  const currentSessionIndex = SESSIONS_DATA.findIndex((s) => s.id === currentSessionId);
  const currentSession = SESSIONS_DATA[currentSessionIndex >= 0 ? currentSessionIndex : 0];

  // Calculate statistics
  let totalActs = 0;
  let totalCompleted = 0;
  SESSIONS_DATA.forEach((s) => {
    s.acts.forEach((a) => {
      totalActs++;
      const st = activityStates[a.id];
      if (st) {
        if (a.type === 'teacher') {
          if (st.status === 'lliu' || st.tReviewed) totalCompleted++;
        } else {
          if (st.attempts && st.attempts > 0) totalCompleted++;
        }
      }
    });
  });

  const handleNextSession = () => {
    if (currentSessionIndex < SESSIONS_DATA.length - 1) {
      setCurrentSessionId(SESSIONS_DATA[currentSessionIndex + 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handlePrevSession = () => {
    if (currentSessionIndex > 0) {
      setCurrentSessionId(SESSIONS_DATA[currentSessionIndex - 1].id);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* Background space grid pattern */}
      <div className="fixed inset-0 bg-grid-cyber opacity-35 pointer-events-none" />

      {/* Teacher Mode Alert Banner */}
      {isTeacherMode && (
        <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-300 text-xs font-mono py-1.5 px-4 text-center sticky top-0 z-50 backdrop-blur-md">
          MODO DOCENTE ACTIVADO // Las calificaciones y notas introducidas se registrarán como evaluación oficial.
        </div>
      )}

      {/* Header */}
      <Header
        currentSessionId={currentSessionId}
        onSelectSession={(id) => {
          setCurrentSessionId(id);
          window.scrollTo({ top: 420, behavior: 'smooth' });
        }}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onTogglePresentation={() => setIsPresentationMode(true)}
        onToggleTeacherMode={() => setIsTeacherMode(!isTeacherMode)}
        isTeacherMode={isTeacherMode}
        student={student}
        totalCompletedActs={totalCompleted}
        totalActs={totalActs}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Vanguard Hero Section */}
        <HeroVanguard
          onStartSession={(id) => {
            setCurrentSessionId(id);
            const el = document.getElementById('session-content');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          currentSessionId={currentSessionId}
        />

        {/* Active Session Content */}
        <div id="session-content" className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
          {/* Session Selector Pills */}
          <div className="flex items-center justify-between gap-4 pb-6 overflow-x-auto scrollbar-none border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase mr-2 hidden sm:inline">
                ESTACIÓN:
              </span>
              {SESSIONS_DATA.map((sess, idx) => {
                const isActive = sess.id === currentSessionId;
                const doneCount = sess.acts.filter((a) => {
                  const st = activityStates[a.id];
                  return a.type === 'teacher' ? (st?.status === 'lliu' || st?.tReviewed) : (st?.attempts && st.attempts > 0);
                }).length;

                return (
                  <button
                    key={sess.id}
                    onClick={() => setCurrentSessionId(sess.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{sess.id}</span>
                    <span className="text-[10px] opacity-75">
                      ({doneCount}/{sess.acts.length})
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsReportOpen(true)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 whitespace-nowrap hidden md:inline"
            >
              Ver Informe de Actividades ({totalCompleted}/{totalActs})
            </button>
          </div>

          {/* Render Active Session */}
          <SessionView
            session={currentSession}
            activityStates={activityStates}
            onUpdateActivityState={handleUpdateActivityState}
            isTeacherMode={isTeacherMode}
            onNextSession={handleNextSession}
            onPrevSession={handlePrevSession}
            isFirst={currentSessionIndex === 0}
            isLast={currentSessionIndex === SESSIONS_DATA.length - 1}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <StudentIdModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        student={student}
        onSaveStudent={setStudent}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        sessions={SESSIONS_DATA}
        student={student}
        activityStates={activityStates}
        onImportData={handleImportData}
        onClearData={handleClearData}
      />

      {isPresentationMode && (
        <PresentationMode
          session={currentSession}
          onClose={() => setIsPresentationMode(false)}
        />
      )}
    </div>
  );
}
