import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import EligibilityCheck from './free-resources/EligibilityCheck';
import ApplicationGuidance from './free-resources/ApplicationGuidance';
import PDURenewalGuidance from './free-resources/PDURenewalGuidance';
import ExamSuccessGuide from './free-resources/ExamSuccessGuide';
import ResumeAssistance from './free-resources/ResumeAssistance';
import { ChevronRight } from 'lucide-react';

const LMSFreeResources = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { id: 'eligibility', label: "🎯 PMP Eligibility Check" },
    { id: 'application', label: "📋 PMP Application Guidance" },
    { id: 'renewal', label: "🔄 PMP Renewal (PDUs) Guidance" },
    { id: 'success-guide', label: "📖 PMP Exam Success Guide" },
    { id: 'resume-job', label: "💼 Resume & Job Assistance" }
  ];

  // Normalize incoming tab parameter (handling spaces, subpaths, and Navbar variations)
  let resolvedTab = tab ? tab.toLowerCase().trim().replace(/%20/g, ' ').replace(/\s+/g, '-') : 'eligibility';
  
  const tabMapping = {
    'application-guidance': 'application',
    'renewal-guidance': 'renewal',
    'resume-assistance': 'resume-job',
    'success-guide': 'success-guide',
    'eligibility': 'eligibility'
  };

  if (tabMapping[resolvedTab]) {
    resolvedTab = tabMapping[resolvedTab];
  }

  // Default to eligibility if no tab matches or is specified
  const activeTab = tabs.some(t => t.id === resolvedTab) ? resolvedTab : 'eligibility';

  const handleTabChange = (tabId) => {
    navigate(`/lms/free-resources/${tabId}`);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'eligibility':
        return <EligibilityCheck />;
      case 'application':
        return <ApplicationGuidance />;
      case 'renewal':
        return <PDURenewalGuidance />;
      case 'success-guide':
        return <ExamSuccessGuide setActiveTab={(tabId) => navigate(`/lms/free-resources/${tabId}`)} />;
      case 'resume-job':
        return <ResumeAssistance />;
      default:
        return <EligibilityCheck />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Premium Blue Hero Banner (LMS style) */}
      <div className="bg-gradient-to-r from-primary to-[#052b66] text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div className="flex flex-col gap-2">
          {/* Breadcrumb */}
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Link to="/lms/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/lms/activity" className="hover:text-white transition-colors">Activity</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-white">Free Resources</span>
          </div>
          
          <h1 className="text-2xl font-black uppercase tracking-tight mt-2">Free PMP® Resources</h1>
          <p className="text-xs font-semibold text-slate-200 mt-1 max-w-2xl leading-relaxed">
            Everything you need to start, prepare, and succeed in your project management journey — natively in your LMS dashboard.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-4xl mx-auto w-full">
        
        {/* RIGHT CONTENT PANEL (Now Full Width) */}
        <div className="bg-white border border-slate-200/60 rounded-2xl p-0 overflow-hidden shadow-sm">
          {renderActiveComponent()}
        </div>

      </div>
    </div>
  );
};

export default LMSFreeResources;
