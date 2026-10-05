import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, FileText, RefreshCw, Award, UserCheck, X, Maximize2 
} from 'lucide-react';
import EligibilityCheck from './free-resources/EligibilityCheck';
import ApplicationGuidance from './free-resources/ApplicationGuidance';
import PDURenewalGuidance from './free-resources/PDURenewalGuidance';
import ExamSuccessGuide from './free-resources/ExamSuccessGuide';
import ResumeAssistance from './free-resources/ResumeAssistance';

export default function ActivityPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const resources = [
    { title: 'Eligibility Check', icon: '📝', desc: 'Check if you are eligible for certifications', slug: 'eligibility' },
    { title: 'Application Guidance', icon: '📋', desc: 'Step-by-step help for your exam application', slug: 'application' },
    { title: 'Renewal Guidance', icon: '🔄', desc: 'Learn how to earn PDUs and renew certificates', slug: 'renewal' },
    { title: 'Exam Success Guide', icon: '🏆', desc: 'Tips and tricks to pass on your first try', slug: 'success-guide' },
    { title: 'Resume Assistance', icon: '📄', desc: 'Get expert feedback on your resume', slug: 'resume-job' }
  ];

  const renderModalComponent = () => {
    if (!activeModal) return null;
    switch (activeModal.slug) {
      case 'eligibility':
        return <EligibilityCheck />;
      case 'application':
        return <ApplicationGuidance />;
      case 'renewal':
        return <PDURenewalGuidance />;
      case 'success-guide':
        return <ExamSuccessGuide setActiveTab={(slug) => {
          const matched = resources.find(r => r.slug === slug || r.slug.includes(slug));
          if (matched) setActiveModal(matched);
        }} />;
      case 'resume-job':
        return <ResumeAssistance />;
      default:
        return <EligibilityCheck />;
    }
  };

  return (
    <div className="space-y-6 text-left select-none">
      
      {/* Modal Activity Viewer (Exact CLONE Content - Zero Loop) */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-slate-100 my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeModal.icon}</span>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-800 leading-tight">
                    {activeModal.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    LearnersKart Free Learning Resources (CLONE Content)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/lms/free-resources/${activeModal.slug}`)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-slate-200 rounded-full transition-colors hidden sm:block"
                  title="Open Full Page View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Native CLONE Components */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-50/50 flex-1 text-slate-700">
              {renderModalComponent()}
            </div>
          </div>
        </div>
      )}

      {/* Free Resources Section */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-end border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Free Resources & Activities</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Select any activity module to launch interactive calculators, templates and guides directly from CLONE.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, idx) => (
            <div
              key={idx}
              onClick={() => setActiveModal(res)}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 rounded-2xl p-5 transition-all duration-300 group flex items-start gap-4 cursor-pointer"
            >
              <div className="bg-slate-50 group-hover:bg-primary/10 text-3xl p-3 rounded-2xl transition-colors shrink-0">
                {res.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800 group-hover:text-primary transition-colors">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {res.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-primary pt-2 uppercase tracking-wider group-hover:underline">
                  Launch Activity &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
