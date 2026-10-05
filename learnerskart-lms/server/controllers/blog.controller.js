const Blog = require('../models/Blog');
const BlogLike = require('../models/BlogLike');

// @desc    Get all blogs with pagination
// @route   GET /api/blogs
// @access  Public
const exactBlogImages = {
  "project-management-bridges-people-processes-and-business-to-deliver-successful-outcomes": "https://learnerskart.com/wp-content/uploads/2026/06/Project-Management-Bridges-Learnerskart-Website.jpg",
  "project-management-isnt-about-control-its-about-clarity-commitment-communication": "https://learnerskart.com/wp-content/uploads/2026/06/Project-Management-Clarity-Learnerskart-Website.jpg",
  "the-ultimate-project-management-dashboard-for-pmo-level-project-control": "https://learnerskart.com/wp-content/uploads/2026/05/Ultimate-Project-Dashboard-Learnerskart-Website.jpg",
  "best-project-management-tools-for-career-switchers-aspiring-pms": "https://learnerskart.com/wp-content/uploads/2026/05/Best-Project-Management-Tools-Learnerskart-Website.jpg",
  "10-soft-skills-of-successful-project-managers": "https://learnerskart.com/wp-content/uploads/2026/05/10-Soft-Skills-of-Project-Managers-Learnerskart-Website.jpg",
  "why-stakeholder-management-is-crucial-for-project-success": "https://learnerskart.com/wp-content/uploads/2026/05/Stakeholder-Management-in-Project-Management-Learnerskart-Website.jpg",
  "50-powerful-project-management-terms-to-help-you-crack-the-pmp-exam": "https://learnerskart.com/wp-content/uploads/2026/05/50-Powerful-Project-Management-Terms-to-Crack-PMP-Exam-Website.jpg",
  "feeling-stuck-as-a-project-manager-7-signs-its-time-to-move-on": "https://learnerskart.com/wp-content/uploads/2026/05/Feeling-Stuck-as-a-Project-Manager-Learnerskart-Website.jpg",
  "what-is-project-management-mindset-how-it-helps-you-clear-pmp-and-succeed-in-real-projects": "https://learnerskart.com/wp-content/uploads/2026/04/Project-Management-Mindset-Learnerskart-Website.jpg",
  "is-pmp-certification-worth-it-salary-growth-job-opportunities-in-2026": "https://learnerskart.com/wp-content/uploads/2026/04/Is-PMP-Certification-Worth-it-in-2026-Learnerskart-Website.jpg",
  "what-recruiters-really-look-for-in-a-project-manager-profile-2026-guide": "https://learnerskart.com/wp-content/uploads/2026/04/What-Recruiters-Look-for-in-a-Project-Manager-Profile-Learnerskart-Website.jpg",
  "open-to-work-as-a-project-manager-10-proven-tips-to-get-hired-faster-in-2026": "https://learnerskart.com/wp-content/uploads/2026/04/Open-to-Work-as-a-Project-Manager-Learnerskart-Website.jpg",
  "why-pmp-certified-professionals-proudly-celebrate-their-achievement": "https://learnerskart.com/wp-content/uploads/2026/04/Why-PMP-certified-professionals-Proudly-Celebrate-Learnerskart-Website.jpg",
  "pmp-study-plan-for-working-professionals-30-60-90-day-strategies-to-pass": "https://learnerskart.com/wp-content/uploads/2026/04/PMP-Study-Plan-Learnerskart-Website.jpg",
  "why-projects-fail-top-25-mistakes-and-how-to-avoid-them-in-2026": "https://learnerskart.com/wp-content/uploads/2026/04/Why-projects-fail-Learnerskart-Website.jpg",
  "how-the-p-a-c-e-framework-improves-project-delivery-and-control": "https://learnerskart.com/wp-content/uploads/2026/04/PACE-Framework-for-Project-Delivery-and-Control-Learnerskart-Website.jpg",
  "pmp-preparation-guide-identify-weak-areas-improve-fast": "https://learnerskart.com/wp-content/uploads/2026/04/PMP-Preparation-Guide-Learnerskart-Website.jpg",
  "top-5-mistakes-aspirants-make-while-preparing-for-pmp-and-how-to-avoid-them": "https://learnerskart.com/wp-content/uploads/2026/04/Top-5-PMP®-Exam-Preparation-Mistakes-Learnerskart-Website.jpg",
  "complicated-vs-complex-in-project-management-why-understanding-the-difference-matters": "https://learnerskart.com/wp-content/uploads/2026/04/Complicated-vs-Complex-in-Project-Management-Learnerskart-Website.jpg",
  "pmp-exam-changes-in-100-days-what-you-must-do-now": "https://learnerskart.com/wp-content/uploads/2026/04/PMP-Exam-Changes-in-100-Days-Learnerskart-Website.jpg",
  "8-pmi-grade-ai-prompts-every-senior-project-manager-should-use-in-2026": "https://learnerskart.com/wp-content/uploads/2026/03/8-AI-Prompts-for-Senior-Managers-Learnerskart-Website.jpg",
  "what-a-project-manager-can-fix-and-what-they-cant": "https://learnerskart.com/wp-content/uploads/2026/03/What-a-Project-Manager-Can-fix-Learnerskart-Website.jpg",
  "why-pmp-certification-demand-is-growing-a-30-year-global-trend-1993-2025": "https://learnerskart.com/wp-content/uploads/2026/03/PMP-Certified-Professional-Learnerskart-Website.jpg",
  "project-management-success-wheel-8-key-elements-every-pmp-aspirant-must-master": "https://learnerskart.com/wp-content/uploads/2026/03/Project-Management-Success-Wheel-Learnerskart-Website.jpg",
  "the-hidden-pmp-exam-mindset-10-core-principles-to-pass-on-your-first-attempt": "https://learnerskart.com/wp-content/uploads/2026/03/PMP-Exam-Mindset-to-pass-Learnerskart-Website.jpg",
  "the-invisible-power-of-a-great-project-manager": "https://learnerskart.com/wp-content/uploads/2026/03/Power-of-Invisible-Project-Manager-Learnerskart-Website.jpg",
  "pmp-exam-changing-in-2026-everything-project-managers-must-know": "https://learnerskart.com/wp-content/uploads/2026/03/PMP®-Exam-Changing-in-2026-Learnerskart-Website-1.jpg",
  "types-of-pmo-in-project-management-supportive-controlling-and-directive-explained": "https://learnerskart.com/wp-content/uploads/2026/03/Types-of-PMO-in-Project-Management-Learnerskart-Website.jpg",
  "project-manager-vs-product-manager-roles-salary-skills-career-growth-compared": "https://learnerskart.com/wp-content/uploads/2026/03/Project-Manager-Vs-Product-Manager-Differences-Learnerskart-Website.jpg",
  "pmp-vs-pgmp-career-growth-salary-comparison-for-senior-project-managers": "https://learnerskart.com/wp-content/uploads/2026/03/PMP-Vs-PgMP-Learnerskart-Website.jpg",
  "pmp-certification-vs-capm-certification-whats-the-difference-learnerskart": "https://learnerskart.com/wp-content/uploads/2026/03/CAPM-Vs-PMP-certification-Learnerskart-Website.jpg",
  "pmp-vs-prince2-which-project-management-certification-is-better-for-your-career-in-2026": "https://learnerskart.com/wp-content/uploads/2026/03/PMP-vs-PRINCE2-which-is-better-Learnerskart-Website.jpg",
  "project-planning-vs-project-scheduling-key-differences-learnerskart": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Planning-Vs-Project-Scheduling-Learnerskart-Website.jpg",
  "project-management-constraints-the-complete-guide-to-scope-time-cost-beyond": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Management-Constraints-Learnerskart-Website.jpg",
  "raci-matrix-a-practical-framework-to-eliminate-role-confusion-in-projects": "https://learnerskart.com/wp-content/uploads/2026/02/Raci-Matrix-Learnerskart-Website.jpg",
  "10-essential-soft-skills-to-become-a-successful-project-manager": "https://learnerskart.com/wp-content/uploads/2026/02/10-Essential-Soft-Skills-for-Project-Managers-Learnerskart-Website-1.jpg",
  "project-assessment-process-a-complete-guide-with-steps-framework": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Assessment-Process-Learnerskart-Website-1.jpg",
  "project-risk-management-probability-vs-impact-explained": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Risk-Management-Learnerskart-Website.jpg",
  "project-manager-vs-project-leader-key-differences-skills-mindset": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Manager-Vs-Project-Leader-Learnerskart-Website.jpg",
  "project-vs-program-vs-portfolio-vs-operations-roles-risks-success-measures": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Vs-Program-Vs-Portfolio-Vs-Operations-Learnerskart-Website.jpg",
  "project-manager-one-title-different-realities-across-industries": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Manager-One-Title-Different-Realities-Learnerskart-Website.jpg",
  "pmi-pmp-eligibility-criteria-2026-complete-guide": "https://learnerskart.com/wp-content/uploads/2026/02/PMI-PMP-Eligibility-Criteria-Learnerskart-Website.jpg",
  "predictive-vs-agile-vs-hybrid-how-to-choose-the-right-approach-for-your-project": "https://learnerskart.com/wp-content/uploads/2026/02/Waterfall-Agile-Hybrid-Project-Approach-Learnerskart-Website.jpg",
  "project-management-vs-portfolio-management-execution-vs-strategic-value": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Management-Vs-Portfolio-Management-Learnerskart-Website.jpg",
  "raci-vs-daci-role-clarity-vs-decision-making-which-framework-works-best": "https://learnerskart.com/wp-content/uploads/2026/02/RACI-vs-DACI-Framework-in-Project-Management-Website.jpg",
  "project-planning-vs-project-strategy-understanding-the-difference-that-drives-project-success": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Plan-Vs-Project-Strategy-Learnerskart-Website.jpg",
  "project-management-in-the-real-world-vs-the-textbook": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Management-Real-World-vs-Textbook-Learnerskart-Website.jpg",
  "directing-a-project-vs-monitoring-a-project-key-differences-explained": "https://learnerskart.com/wp-content/uploads/2026/02/Directing-a-project-vs-monitoring-a-project-Learnerskart-Website.jpg",
  "project-cost-management-roles-explained-estimation-engineer-vs-quantity-surveyor": "https://learnerskart.com/wp-content/uploads/2026/02/Project-Cost-Management-Roles-Learnerskart-Website.jpg",
  "pmp-exam-2026-major-changes-explained-learnerskart": "https://learnerskart.com/wp-content/uploads/2026/02/PMP-Exam-2026-Major-Changes-Learnerskart-Website.jpg",
  "benefits-of-pmp-certification-career-growth-salary-global-recognition": "https://learnerskart.com/wp-content/uploads/2026/01/Benefits-of-PMP-certification-Learnerskart-Website.jpg",
  "project-planning-in-project-management-a-complete-guide-for-successful-projects": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Planning-in-Project-Management-Learnerskart-Website.jpg",
  "cost-management-in-project-management-importance-process-and-best-practices": "https://learnerskart.com/wp-content/uploads/2026/01/Cost-Management-in-Project-Management-Learnerskart-Website.jpg",
  "complete-project-cycle-explained-all-project-phases-from-initiation-to-closure": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Cycle-Learnerskart-Website.jpg",
  "project-management-cheat-sheet-key-concepts-formulas-frameworks-explained": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Management-Cheet-Sheet-Learnerskart-Website.jpg",
  "top-10-critical-kpis-for-project-management-with-examples-benchmarks": "https://learnerskart.com/wp-content/uploads/2026/01/Top-10-Critical-KPIs-for-Project-Management-Learnerskart-Website.jpg",
  "how-to-manage-project-risks-and-maximize-rewards-a-practical-guide-for-project-managers": "https://learnerskart.com/wp-content/uploads/2026/01/How-to-Manage-Project-Risks-Learnerskart-Website.jpg",
  "how-to-plan-a-project-effectively-14-proven-steps-for-project-success": "https://learnerskart.com/wp-content/uploads/2026/01/How-to-Plan-a-Project-Effectively-Learnerskart-Website.jpg",
  "pmp-exam-2026-complete-guide-to-exam-pattern-syllabus-domains-question-types": "https://learnerskart.com/wp-content/uploads/2026/01/PMP-Exam-Pattern-2026-Learnerskart-Website.jpg",
  "project-risk-register-a-pmbok-aligned-template-for-proactive-risk-management": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Risk-Register-Learnerskart-Learnerskart.jpg",
  "how-to-write-a-project-management-resume-that-shows-real-impact-not-just-responsibilities": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Managers-Resume-Learnerskart-Website.jpg",
  "the-blueprint-of-project-management-from-planning-to-successful-delivery": "https://learnerskart.com/wp-content/uploads/2026/01/Blueprint-of-Project-Management-Learnerskart-Website.jpg",
  "project-status-report-complete-guide-with-real-world-example": "https://learnerskart.com/wp-content/uploads/2026/01/Project-Status-Report-Learnerskart-Website.jpg",
  "pmp-exam-prep-cheat-sheet-complete-guide-to-pass-pmi-pmp-on-first-attempt": "https://learnerskart.com/wp-content/uploads/2026/01/PMP-Exam-Prep-Cheat-Sheet-Learnerskart-Website.jpg",
  "the-power-of-communication-the-real-skill-behind-a-successful-project-leader": "https://learnerskart.com/wp-content/uploads/2026/01/Power-of-Communication-Learnerskart-Website.jpg",
  "raid-log-vs-risk-register-in-project-management-key-differences": "https://learnerskart.com/wp-content/uploads/2026/01/Raid-Log-Vs-Risk-Register-Learnerskart-Website.jpg",
  "project-management-in-disaster-management-planning-risk-and-recovery": "https://learnerskart.com/wp-content/uploads/2026/01/Disaster-Management-Learnerskart-Website.jpg",
  "pmi-pmp-application-guide-for-2026-expert-tips-to-avoid-rejection-learnerskart": "https://learnerskart.com/wp-content/uploads/2026/01/PMI-PMP-Application-Guide-Learnerskart-Website.jpg",
  "pmbok-guide-eighth-edition-key-features-changes-benefits-pmp-exam-impact": "https://learnerskart.com/wp-content/uploads/2025/12/PMBOK-8th-Edition-in-Project-Management-Learnerskart-Website.jpg",
  "types-of-project-management-explained-traditional-agile-hybrid-more": "https://learnerskart.com/wp-content/uploads/2025/12/Types-of-Project-Management-Learnerskart-Website.jpg",
  "scope-creep-in-project-management-definition-causes-examples-and-how-to-control-it": "https://learnerskart.com/wp-content/uploads/2025/12/Scope-Creep-Silent-Killer-of-Project-Success-Learnerskart-Website.jpg",
  "mvp-minimum-viable-product-in-project-management-a-complete-guide": "https://learnerskart.com/wp-content/uploads/2025/12/MVP-in-Project-Management-Learnerskart-Website.jpg",
  "kpis-in-project-management-how-to-measure-and-drive-project-success": "https://learnerskart.com/wp-content/uploads/2025/12/KPIs-in-Project-Management-Learnerskart-Website.jpg",
  "disaster-project-management-planning-response-and-recovery-explained": "https://learnerskart.com/wp-content/uploads/2025/12/Disaster-project-management-overview-Learnerskart-Website.jpg",
  "s-curve-in-project-management-a-complete-guide-for-project-managers": "https://learnerskart.com/wp-content/uploads/2025/12/S-Curve-in-Project-Management-Learnerskart-Website.jpg",
  "milestone-chart-in-project-management-a-complete-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Milestone-Chart-in-Project-Management-Learnerskart-Website.jpg",
  "the-perfect-kickoff-meeting-what-great-pms-do-differently-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Perfect-Kickoff-Meeting-Learnerskart-Website.jpg",
  "blueprint-for-pmp-success-your-roadmap-to-passing-the-exam": "https://learnerskart.com/wp-content/uploads/2025/12/Blueprint-for-PMP-Success-Learnerskart-Website.jpg",
  "is-pmi-membership-worth-it-top-reasons-to-get-a-pmi-membership-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/PMI-Membership-worth-Learnerskart-Website.jpg",
  "project-portfolio-management-dashboard-turning-data-into-strategic-decisions": "https://learnerskart.com/wp-content/uploads/2025/12/Project-Portfolio-Management-Dashboard-Learnerskart-Website-1.jpg",
  "how-to-fill-the-pmi-pmp-application-a-step-by-step-guide-with-examples": "https://learnerskart.com/wp-content/uploads/2025/12/Guide-to-PMI-PMP-Application-Learnerskart-Website.jpg",
  "project-charter-the-blueprint-for-project-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Project-Charter-Learnerskart-Website.jpg",
  "float-in-project-management-a-simple-guide-to-avoid-delays-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Float-in-Project-Management-Learnerskart-Website.jpg",
  "workfront-the-project-managers-secret-weapon-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Workfront-Project-Management-Learnerskart-Website.jpg",
  "what-employers-really-want-in-a-project-manager-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/Employers-want-in-Project-Manager-Learnerskart-Website.jpg",
  "top-25-pmp-formulas-uses-meanings-quick-tips-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/12/TOP-25-PMP-FORMULAS-Learnerskart-Website.jpg",
  "how-to-write-a-project-plan-a-complete-step-by-step-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Project-Plan-Writing-Guide-Learnerskart-Website.jpg",
  "the-ultimate-guide-to-project-management-charts-tools-uses-examples-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Project-Management-Learnerskart-Website.jpg",
  "10-soft-skills-that-get-you-hired-and-promoted-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/10-Soft-Skills-for-Project-Management-Learerskart-Website.jpg",
  "pmbok-7-vs-pmbok-8-comparison-whats-new-in-the-latest-pmi-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/PMBOK7-vs-PMBOK8-Learnerskart-Website.jpg",
  "degree-vs-skill-what-truly-drives-success-in-project-management": "https://learnerskart.com/wp-content/uploads/2025/11/Degree-Vs-Skill-in-Project-Management-Learnerskart-Website.jpg",
  "how-to-pass-the-pmp-certification-in-just-4-5-weeks-the-complete-fast-track-guide-for-working-professionals": "https://learnerskart.com/wp-content/uploads/2025/11/Pass-PMP-in-4-5-Week-Learnerskart-Website.jpg",
  "the-project-management-career-map-where-are-you-on-this-journey-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Project-Management-Career-Map-Learnerskart-Website.jpg",
  "the-ultimate-guide-to-risk-registers-identify-analyze-control-project-risks": "https://learnerskart.com/wp-content/uploads/2025/11/Risk-Registers-in-Project-Management-Learnerskart-Website.jpg",
  "what-is-the-critical-path-method-cpm-in-project-management-a-complete-step-by-step-guide": "https://learnerskart.com/wp-content/uploads/2025/11/CPM-in-Project-Management-Learnerskart-Website.jpg",
  "basecamp-in-project-management-a-complete-guide-for-modern-teams": "https://learnerskart.com/wp-content/uploads/2025/11/Basecamp-in-Project-Management-Learnerskart-Website.jpg",
  "statement-of-work-sow-in-project-management-the-blueprint-for-project-success": "https://learnerskart.com/wp-content/uploads/2025/11/Learnerskart-Website-SOW-in-Project-Management.jpg",
  "agile-vs-waterfall-project-management-which-approach-delivers-better-results": "https://learnerskart.com/wp-content/uploads/2025/11/Agile-Vs-Waterfall-Project-Management-Learnerskart-Website.jpg",
  "clarity-the-cornerstone-of-effective-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Clarity-in-Project-Management-Learnerskart-Website.jpg",
  "what-is-a-raid-log-in-project-management-a-complete-guide-with-examples": "https://learnerskart.com/wp-content/uploads/2025/11/Raid-Log-in-Project-Management-Learnerskart-Website.jpg",
  "pmbok-8th-edition-key-updates-and-expected-changes-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/PMBOK-8th-Edition-Expected-Changes-Learnerskart-Website.jpg",
  "why-pmp-is-the-game-changer-for-project-managers-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/PMP-is-Game-Changer-for-Project-manager-Learnerskart-Website.jpg",
  "outcome-over-output-rethinking-how-we-measure-project-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Project-Outcome-Over-Output-Learnerskart-Website.jpg",
  "project-managers-the-unsung-heroes-of-organised-chaos-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Project-Managers-Unsung-Heroes-Learnerskart-Website.jpg",
  "pmp-vs-prince2-which-project-management-certification-fits-your-career-path": "https://learnerskart.com/wp-content/uploads/2025/11/PMP-Vs-Prince2-Project-Management-Learnerskart-Website.jpg",
  "top-industries-where-project-managers-thrive-and-grow-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/11/Top-Industries-for-Project-Management-Learnerskart-Website.jpg",
  "the-hidden-cost-of-poor-project-leadership-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Hidden-cost-of-poor-project-management-Learnerskart-Website-Post.jpg",
  "project-manager-vs-product-manager-whats-the-real-difference-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Manager-Vs-Product-Manager-Learnerskart-Website.jpg",
  "project-manager-vs-program-manager-whats-the-real-difference-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Managers-Vs-Program-Manager-Learnerskart-Website.jpg",
  "a-lesson-ignored-today-becomes-a-risk-tomorrow-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Management-Risk-Tomorrow-Learnerskart-Website.jpg",
  "project-management-the-best-teacher-of-life-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Management_-Life-Lessons-Explained-Learnerskart-Website.jpg",
  "the-4-ps-of-project-management-people-process-product-project": "https://learnerskart.com/wp-content/uploads/2025/10/4-Ps-of-Project-Management-Learnerskart-Website.jpg",
  "the-project-schedule-turning-plans-into-action-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Schedule-Learnerskart-Website.jpg",
  "the-power-of-surrounding-yourself-with-the-right-project-team-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/The-Power-of-Project-Team-Learnerskart-Website.jpg",
  "10-unseen-project-manager-blind-spots-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Unseen-Project-Manager-Learnerskart-Website.jpg",
  "half-your-pm-success-is-how-you-communicate-and-treat-people-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/PM-Success-Learnerskart-Website.jpg",
  "7-habits-every-project-manager-should-master-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/7-Habits-for-Project-Managers-Learnerskart-Webiste.jpg",
  "leading-projects-in-2025-its-no-longer-about-tasks-its-about-transformation-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Leading-Project-Learnerskart-Website.jpg",
  "the-untold-story-of-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Untold-Story-of-Project-Management-Learnerskart-Website.jpg",
  "what-is-a-project-management-plan-pmp-a-complete-guide-by-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Project-Management-Plan-Learnerskart-Website.jpg",
  "the-psychology-of-project-management-why-people-matter-more-than-plans-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Psychology-of-Project-Management-Learnerskart-Website.jpg",
  "ai-augmented-project-management-opportunities-risks-and-best-practices-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/AI-Augmented-Project-Management-Learnerskart-Website.jpg",
  "the-biggest-challenge-for-project-managers-in-2025-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Challenges-for-Project-Managers-Learnerskart-Website.jpg",
  "doing-a-project-vs-being-the-project-whats-the-difference-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Being-the-Project-Manager-Learnerskart-Website.jpg",
  "the-top-10-project-leadership-skills-every-project-manager-must-master-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Top-10-Project-Management-Skills-Learnerskart-Website.jpg",
  "10-most-commonly-misunderstood-concepts-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Misunderstood-in-Project-Management-Learnerskart-Website.jpg",
  "top-10-essential-skills-for-ai-project-managers-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/10/Essential-Skills-for-AI-Project-Managers-Learnerskart-Website.jpg",
  "certification-vs-experience-what-truly-matters-for-project-management-career-growth": "https://learnerskart.com/wp-content/uploads/2025/10/Certification-or-Experience-Learnerskart-Website.jpg",
  "how-project-managers-stay-motivated-under-stress-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Project-managers-Motivation-Learnerskart-Website.jpg",
  "essential-skills-every-project-manager-must-master-soft-vs-hard-skills-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Essential-Project-Management-Skills-Guide-Learnerskart-website.jpg",
  "leadership-vs-management-whos-the-real-pilot-of-your-project-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Leadership-or-Management-Learnerskart-1-2.jpg",
  "problem-solving-teams-in-project-management-purpose-benefits-impact-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Problem-Solving-Team-Learnerskart-Website.jpg",
  "what-does-the-project-plan-cover-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Project-Plan-Cover-Learnerskart-Website.jpg",
  "how-ai-is-transforming-project-management-meetings-smarter-faster-more-actionable": "https://learnerskart.com/wp-content/uploads/2025/09/AI-Project-Management-Learnerskart-Website.jpg",
  "project-managers-mindset-transforming-fear-into-opportunity-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Project-Managers-Mindset-Learnerskart-1.jpg",
  "pmp-certification-how-it-transforms-your-project-management-career": "https://learnerskart.com/wp-content/uploads/2025/09/How-PMP-Transforms-your-career-Learnerskart-1.jpg",
  "the-dos-donts-of-great-project-managers-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Do-or-Dont-of-Great-Project-Managers-Learnerskart-1.jpg",
  "project-management-success-framework-10-pillars-every-professional-should-master": "https://learnerskart.com/wp-content/uploads/2025/09/Project-Management-Success-Framework-Learnreskart-1.jpg",
  "notion-project-management-tool-complete-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Notion-Project-Management-1.jpg",
  "10-costly-mistakes-that-can-sink-your-pmp-exam-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/10-Mistakes-that-can-sink-your-PMP-exam-Learnerskart-1.jpg",
  "pmbok-guide-8th-edition-expected-2026-key-highlights-and-insights": "https://learnerskart.com/wp-content/uploads/2025/09/PMBOK-8th-Edition-Expected-Date-Learnerskart.jpg",
  "wrike-project-management-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Wrike-Project-Management-Overview-1.jpg",
  "teamwork-the-real-engine-behind-every-projects-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Assembling-Teamwork-for-Success-Learnerskart-1.png",
  "pmp-vs-capm-which-certification-will-boost-your-career-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/PMP-Vs-CAPM-best-for-career-Learnerskart-1.jpg",
  "change-management-the-complete-guide-for-project-managers-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Change-Management-Learnerskart-1.jpg",
  "decision-drift-the-hidden-project-killer-learnerskart-project-management-training": "https://learnerskart.com/wp-content/uploads/2025/09/Decision-Drift_-A-Projects-Silent-Killer-Learnerskart-1.jpg",
  "what-is-taiga-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/What-is-Taiga-Project-Management-Learnerskart.jpg",
  "10-tricks-to-manage-projects-faster-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/10-Tricks-to-Manage-Project-Faster-Learnerskart-1.jpg",
  "project-management-vs-agile-project-management-key-differences-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Project-Management-Vs-Agile-Project-Management-Learnerskart-1.jpg",
  "top-10-project-management-knowledge-areas-why-risk-management-is-the-hardest-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/09/Top-10-Project-Management-Areas-Learnerskart.jpg",
  "sow-in-project-management-the-secret-weapon-of-successful-projects-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/SOW-in-Project-Management-Learnerskart.jpg",
  "redmine-project-management-the-future-of-open-source-tools-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Redmine-Project-Management-Learnerskart-1.jpg",
  "top-5-ai-powered-project-management-tools-in-2025-find-the-right-fit-for-your-team-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/5-AI-Powered-Project-Management-Tools-in-2025-Learnerskart-2.png",
  "top-5-pmp-exam-mistakes-to-avoid-pmp-preparation-guide-2025-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/PMP-Exam-Common-Pitfalls-Learnerskart.jpg",
  "5-ways-to-use-jira-for-effective-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Jira-Project-Management-Tool-Learnerskart-1.jpg",
  "construction-project-management-the-most-in-demand-career-skill-in-2025-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Construction-Project-Management-Learnerskart-1.jpg",
  "a-real-story-about-career-growth-we-all-need-to-hear-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Career-Growth-Story-Learnerskart-1-1.jpg",
  "gold-plating-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Gold-Plating-in-Project-Management-Learnerskart.jpg",
  "cost-performance-index-cpi-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/CPI-in-Project-Management-Learnerskart.jpg",
  "ai-automation-in-project-management-future-of-work-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/AI-Automation-in-Project-Management-Learnerskart-1.jpg",
  "raci-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/RACI-Model-in-Project-Management-1.jpg",
  "mocha-framework-in-project-management-roles-benefits-and-best-practices-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/MOCHA-in-Project-Management-Learnerskart.jpg",
  "fast-tracking-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Fast-Tracking-in-Project-Management-with-Learnerskart.png",
  "what-is-raid-in-project-management-a-complete-guide-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Raid-in-Project-Management-Learnerskart-2-1.png",
  "failed-the-pmp-exam-pass-on-your-next-attempt-with-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-13-2025-08_09_27-AM-1.png",
  "delivery-manager-vs-project-manager-5-key-differences-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Delivery-Manager-Vs-Project-Manager-Learnerskart.jpg",
  "what-is-the-critical-path-in-project-management-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Critical-Path-Learnerskart-1.png",
  "mastering-the-triple-constraint-the-secret-to-project-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Triple-Constraints-in-Project-Management-Learnerskart-3-1.png",
  "the-hidden-challenge-what-to-do-when-a-critical-project-resource-leaves-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-8-2025-10_02_22-AM-2-1.png",
  "does-google-have-a-project-management-tool-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Google-Workspace-for-Project-Management-Learnerskart.png",
  "can-we-compare-our-family-to-a-project-team-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/Project-Team-Learnerskart-1-1.jpg",
  "pmo-vs-project-manager-key-differences-explained-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/PMO-vs-Project-Manager-Learnerskart-1-1-1.jpg",
  "pmi-vs-prince2-vs-agile-vs-lean-six-sigma-vs-itil-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/PMI-vs-PRINCE2-vs-Agile-vs-Lean-Six-Sigma-vs-ITIL-Learnerskart.jpg",
  "do-certifications-like-pmp-still-matter-in-2025": "https://learnerskart.com/wp-content/uploads/2025/08/1000297111.jpg",
  "can-ai-replace-project-managers-heres-the-real-truth-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/08/AI-and-Project-Management-Learnerskart-PMP-1.jpg",
  "teamwork-the-key-to-project-success-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-31-2025-08_09_49-AM-1.jpg",
  "10-deadly-signs-your-project-is-heading-for-disaster-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/Project-Risk-Warning-Infographic-1.jpg",
  "agile-vs-waterfall-vs-hybrid-which-project-management-approach-is-best-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-29-2025-09_35_36-AM-3-1.jpg",
  "why-winging-it-fails-strategic-project-management-wins-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-28-2025-10_25_45-AM-1.jpg",
  "project-manager-vs-scrum-master-whats-the-difference-can-one-person-do-both": "https://learnerskart.com/wp-content/uploads/2025/07/Project-Manager-vs-Scrum-Master-Comparison-1.jpg",
  "top-10-habits-of-high-impact-project-managers-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/Top-10-Habits-of-Project-Managers-1.jpg",
  "pmbok-knowledge-areas-vs-process-groups-vs-processes-whats-the-difference-learnerskart": "https://learnerskart.com/wp-content/uploads/2025/07/PMBOK-Framework-Breakdown_-Infographic-Guide-1-1.jpg",
  "why-do-some-project-managers-succeed-faster-than-others": "https://learnerskart.com/wp-content/uploads/2025/07/Project-Managers-Succeed-Faster-Learnerskart.jpg",
  "driving-project-success-the-power-of-knowledge-vs-the-value-of-experience": "https://learnerskart.com/wp-content/uploads/2025/07/Knowledge-vs.-Experience-in-Project-Success-1-1.jpg",
  "pmbok-guide-8th-edition-draft-key-highlights-and-what-to-expect-learnerkart": "https://learnerskart.com/wp-content/uploads/2025/07/PMBOK-Guide-8th-Edition-Changes-1-1.jpg",
  "im-a-project-manager-not-responsible-for-the-entire-delivery-function": "https://learnerskart.com/wp-content/uploads/2025/07/ChatGPT-Image-Jul-19-2025-03_29_50-PM.jpg",
  "management-vs-leadership-in-project-management": "https://learnerskart.com/wp-content/uploads/2025/07/Management-Vs-Leadership-Learnerskart-1.jpg",
  "visualize-victory-your-pmp-certificate-awaits-are-you-ready-to-grab-the-opportunity": "https://learnerskart.com/wp-content/uploads/2025/07/image-4.jpg",
  "project-manager-vs-project-leader-why-the-difference-matters-more-than-ever": "https://learnerskart.com/wp-content/uploads/2025/07/Project-Manager-vs.-Project-Leader-Roles.png",
  "project-management-crash-course-a-10-minute-guide-for-beginners": "https://learnerskart.com/wp-content/uploads/2025/07/Project-Management-Explained-in-10-Minutes-1.jpg",
  "top-5-project-management-mistakes-and-how-to-avoid-them": "https://learnerskart.com/wp-content/uploads/2025/07/5-Project-Mistakes-1-Photoroom.png",
  "the-rise-of-hybrid-project-management": "https://learnerskart.com/wp-content/uploads/2025/07/Hybrid-PM-Learnerskart-2-Photoroom-1.png",
  "from-gantt-charts-to-growth-the-modern-pms-toolkit": "https://learnerskart.com/wp-content/uploads/2025/07/Gantt-to-Growth-PM-1.png",
  "epic-vs-feature-vs-user-story-understanding-the-agile-building-blocks": "https://learnerskart.com/wp-content/uploads/2025/05/unnamed-2.jpg",
  "dsdm-vs-scrum": "https://learnerskart.com/wp-content/uploads/2025/04/images-1-1.jpg",
  "agile-coach-vs-scrum-master-understanding-the-differences-and-synergies": "https://learnerskart.com/wp-content/uploads/2025/04/images-1.jpeg",
  "agile-testing-vs-traditional-testing-what-sets-them-apart": "https://learnerskart.com/wp-content/uploads/2025/04/WhatsApp-Image-2025-05-11-at-12.06.33-AM-1.jpeg"
};

function getBlogCover(b) {
  if (b.slug && exactBlogImages[b.slug]) return exactBlogImages[b.slug];
  if (b.image) {
    if (b.image.startsWith('/wp-content')) return `https://learnerskart.com${b.image}`;
    return b.image;
  }
  return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80';
}

const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, category } = req.query;

    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skipNum = (pageNum - 1) * limitNum;

    const total = await Blog.countDocuments(query);
    const rawBlogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const blogs = rawBlogs.map((doc, idx) => {
      const b = doc.toObject ? doc.toObject() : { ...doc };
      if (!b.image || b.image.includes('wp-content')) {
        b.image = getBlogCover(b, idx);
      }
      return b;
    });

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    let querySlug = req.params.slug;
    if (querySlug) {
      querySlug = decodeURIComponent(querySlug).trim().toLowerCase().replace(/\s+/g, '-');
      if (querySlug.includes('andbusiness')) {
        querySlug = querySlug.replace('andbusiness', 'and-business');
      }
      if (querySlug.includes('claritycommitment')) {
        querySlug = querySlug.replace('claritycommitment', 'clarity-commitment');
      }
    }
    const rawBlog = await Blog.findOne({ slug: querySlug });

    if (!rawBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const blog = rawBlog.toObject ? rawBlog.toObject() : { ...rawBlog };
    if (!blog.image || blog.image.includes('wp-content')) {
      blog.image = getBlogCover(blog, 0);
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Increment blog view count
// @route   POST /api/blogs/:id/view
// @access  Public
const incrementBlogView = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    blog.viewCount = (blog.viewCount || 0) + 1;
    await blog.save();
    res.status(200).json({ success: true, viewCount: blog.viewCount });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle like status for a blog post
// @route   POST /api/blogs/:id/like
// @access  Public
const toggleBlogLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { fingerprint, userId } = req.body;

    if (!fingerprint) {
      return res.status(400).json({ success: false, message: 'Fingerprint is required' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const criteria = {
      blogId,
      $or: [
        ...(userId ? [{ userId }] : []),
        { fingerprint }
      ]
    };

    const existingLike = await BlogLike.findOne(criteria);
    let isLiked = false;

    if (existingLike) {
      await BlogLike.deleteOne({ _id: existingLike._id });
      blog.likesCount = Math.max(0, (blog.likesCount || 0) - 1);
      isLiked = false;
    } else {
      await BlogLike.create({
        blogId,
        userId: userId || null,
        fingerprint
      });
      blog.likesCount = (blog.likesCount || 0) + 1;
      isLiked = true;
    }

    await blog.save();
    res.status(200).json({
      success: true,
      likesCount: blog.likesCount,
      isLiked
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    await blog.deleteOne();
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  incrementBlogView,
  toggleBlogLike,
};
