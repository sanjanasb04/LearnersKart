import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ShieldCheck, Heart, Users, Target, Rocket, Lightbulb, Globe, Star } from 'lucide-react';
import StatsBar from '../components/home/StatsBar';
import AccreditationLogos from '../components/home/AccreditationLogos';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: 'Excellence',
      desc: 'We deliver the highest quality, industry-accredited professional certification training available.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Integrity',
      desc: 'Honest, transparent, and strictly compliant with global educational boards and bodies.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-accent" />,
      title: 'Innovation',
      desc: 'Continuously refining and evolving our learning simulators, video resources, and methodologies.',
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: 'Accessibility',
      desc: 'Accredited training accessible to everyone, everywhere, at highly affordable corporate-tier rates.',
    },
  ];

    const instructors = [
    {
      name: 'Senior Industry Master Trainer',
      role: 'Senior Project Management Expert',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'Dr. Kumar has trained over 10,000+ certification aspirants globally, specializing in hybrid PMP and Agile methodologies.',
      rating: 4.9,
    },
    {
      name: 'Master Black Belt Quality Specialist',
      role: 'Six Sigma Master Trainer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      bio: 'Rajan is an industry veteran with 20+ years driving operational excellence, quality control, and Lean Six Sigma programs.',
      rating: 4.8,
    },
    {
      name: 'Senior Business Analysis Specialist',
      role: 'Senior Business Analyst Trainer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      bio: 'Linda is a dedicated BABOK Guide specialist who helps senior business analysts qualify for ECBA and CBAP boards.',
      rating: 4.9,
    },
    {
      name: 'Certified Agile Lead Specialist',
      role: 'Agile & DevOps Coordinator',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      bio: 'Sarah leads interactive bootcamps covering PMI-ACP and Scaled Agile (SAFe) practices for agile scrum teams.',
      rating: 4.7,
    },
  ];

  const points = [
    { num: '1', title: 'Industry-Recognized Certifications', desc: 'Our syllabi are accredited by PMI, PeopleCert, IASSC, and other elite global institutions.' },
    { num: '2', title: 'Expert Mentors from Top Industries', desc: 'Acquire practical knowledge from trainers currently leading large-scale corporate teams.' },
    { num: '3', title: 'Flexible Learning Formats', desc: 'Switch seamlessly between interactive live classes, self-study, or localized classrooms.' },
    { num: '4', title: 'Dedicated Career Support', desc: 'Enjoy post-class resume guidance, exam application audits, and continuous mentorship.' },
    { num: '5', title: 'Global Delivery Capability', desc: 'Serving individual learners and enterprise cohorts across North America, Europe, Asia, and India.' },
    { num: '6', title: 'High Exam Pass Rate Guarantee', desc: 'We take pride in our 98.7% first-time pass rate, supported by our full-refund exam pass promise.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 select-none text-left">
      
      {/* SECTION A — HERO */}
      <section className="relative bg-gradient-to-br from-[#f0f5ff] via-[#f3f6ff] to-white py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-primary text-xs font-extrabold uppercase tracking-widest leading-none">Welcome to LearnersKart</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-textdark leading-tight">
                Unlock Endless Opportunities <br />
                <span className="text-primary">For Learning and Growth</span>
              </h1>
              <p className="text-xs sm:text-sm text-textmuted leading-relaxed max-w-2xl">
                LearnersKart is a premier global educational platform dedicated to empowering individuals and organizational teams with the high-impact skills required to succeed in today's rapidly evolving digital economy.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                We deliver elite, highly affordable Professional Certification Training across project management, quality control, business analysis, and agile frameworks. Led by accredited industry veterans, our bootcamps bridge the gap between academic theory and workplace execution, guaranteeing global certification and career advancement.
              </p>
              <div className="pt-2 flex gap-4">
                <Link to="/courses" className="bg-accent hover:bg-accent-dark text-white font-bold px-6 py-3 rounded-lg shadow-sm text-xs">
                  Explore Courses
                </Link>
                <Link to="/contact" className="bg-white text-textdark border border-slate-200 font-bold px-6 py-3 rounded-lg shadow-sm text-xs hover:bg-slate-50">
                  Contact Advisor
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <img
                src="/about-team.jpg"
                alt="About LearnersKart Team"
                className="w-full h-auto rounded-2xl shadow-md border border-slate-100 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — MISSION & VISION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-lightbg/30 border border-blue-50 p-8 sm:p-10 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="p-3.5 bg-primary text-white rounded-xl shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-textdark uppercase tracking-wider leading-none">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower individuals and corporate teams with world-class professional certification training that accelerates career development, bridges technical skill gaps, and drives overall organizational excellence.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-amber-50/15 border border-amber-100/30 p-8 sm:p-10 rounded-2xl flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="p-3.5 bg-accent text-white rounded-xl shadow-sm">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-textdark uppercase tracking-wider leading-none">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To be the most trusted, impactful, and accessible professional certification training partner globally, transforming careers and businesses one certification at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C — STATS BAR */}
      <StatsBar />

      {/* SECTION D — CORE VALUES */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Our DNA</span>
            <h2 className="text-3xl font-extrabold text-textdark mt-2">Our Core Values</h2>
            <p className="text-xs sm:text-sm text-textmuted mt-2 font-medium">
              We operate under a strict code of educational excellence and customer-centric support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4 hover:shadow-sm transition-shadow">
                <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100 inline-block">
                  {val.icon}
                </div>
                <h3 className="font-bold text-sm sm:text-base text-textdark leading-tight">{val.title}</h3>
                <p className="text-xs text-textmuted leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* SECTION E — WHY LEARNERSKART? */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 text-left sm:text-center">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest leading-none">The LearnersKart Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-textdark mt-2.5 leading-tight">
              Why LearnersKart?
            </h2>
            <p className="text-sm sm:text-base font-semibold text-primary mt-2">
              Practical learning. Expert guidance. Career-focused certification training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                icon: '🎓',
                title: 'Industry-Experienced Trainers',
                desc: 'Learn from experienced professionals who bring practical knowledge and real-world perspectives to every session.',
                bg: 'bg-blue-50/60 border-blue-100'
              },
              {
                num: '2',
                icon: '💻',
                title: 'Interactive & Flexible Learning',
                desc: 'Choose live instructor-led or self-paced learning options designed to fit your schedule and learning needs.',
                bg: 'bg-amber-50/60 border-amber-100'
              },
              {
                num: '3',
                icon: '📚',
                title: 'Complete Certification Preparation',
                desc: 'Get structured training, study materials, practice questions, mock exams, and resources to prepare with confidence.',
                bg: 'bg-emerald-50/60 border-emerald-100'
              },
              {
                num: '4',
                icon: '🌎',
                title: 'Learn from Anywhere',
                desc: 'Access high-quality online training and join professionals from across the globe without geographical limitations.',
                bg: 'bg-cyan-50/60 border-cyan-100'
              },
              {
                num: '5',
                icon: '🤝',
                title: 'Dedicated Learning Support',
                desc: 'From enrollment to exam preparation, our team is here to support you throughout your certification journey.',
                bg: 'bg-violet-50/60 border-violet-100'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-6 sm:p-7 rounded-2xl border bg-white hover:shadow-md transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-slate-50 rounded-xl shadow-xs border border-slate-100 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-xs font-black text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">0{item.num}</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-textdark mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* SECTION F — WHY CHOOSE US */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">The LearnersKart Advantage</span>
            <h2 className="text-3xl font-extrabold text-textdark mt-2">Why Trust Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((pt) => (
              <div key={pt.num} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-black text-sm flex items-center justify-center flex-shrink-0">
                  {pt.num}
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-bold text-sm sm:text-base text-textdark leading-tight">{pt.title}</h3>
                  <p className="text-xs text-textmuted leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G — ACCREDITATION LOGOS */}
      <AccreditationLogos />

      {/* SECTION H — CTA BANNER */}
      <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light/40 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Ready to Accelerate Your Career Trajectory?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed font-semibold">
            Gain access to accredited curricula, mock assessments, and corporate network portals. Start learning today.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/courses" className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-3.5 rounded-lg shadow-md text-xs uppercase tracking-wider">
              Explore All Courses
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/15 text-white border border-white/25 font-bold px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider">
              Contact Advisors
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
