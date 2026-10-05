import toast from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Users, BookOpen, Clock, Star, Calendar, CheckCircle2, Video, FileText, HelpCircle,
  Download, ArrowRight, Share2, Linkedin, Twitter, Facebook, Instagram, ShoppingCart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import Breadcrumb from '../components/ui/Breadcrumb';
import StarRating from '../components/ui/StarRating';
import Accordion from '../components/ui/Accordion';
import { initialCourses } from '../data/courses';

const allSchedulesData = {
  '4days': [
    { weekday: true, date: 'Jul 28 - Jul 31, 2026', month: 7 },
    { weekday: false, date: 'Aug 22-23 & 29-30, 2026', month: 8 },
    { weekday: true, date: 'Aug 25 - Aug 28, 2026', month: 8 },
    { weekday: false, date: 'Sep 19-20 & 26-27, 2026', month: 9 },
    { weekday: true, date: 'Sep 22 - Sep 25, 2026', month: 9 },
    { weekday: true, date: 'Oct 27 - Oct 30, 2026', month: 10 },
    { weekday: false, date: 'Oct 17-18 & 24-25, 2026', month: 10 },
    { weekday: true, date: 'Nov 24 - Nov 27, 2026', month: 11 },
    { weekday: false, date: 'Nov 21-22 & 28-29, 2026', month: 11 },
    { weekday: true, date: 'Dec 15 - Dec 18, 2026', month: 12 },
    { weekday: false, date: 'Dec 12-13 & 19-20, 2026', month: 12 }
  ],
  '3days': [
    { weekday: true, date: 'Jul 29 - Jul 31, 2026', month: 7 },
    { weekday: false, date: 'Aug 22-23 & 29, 2026', month: 8 },
    { weekday: true, date: 'Aug 26 - Aug 28, 2026', month: 8 },
    { weekday: false, date: 'Sep 19-20 & 26, 2026', month: 9 },
    { weekday: true, date: 'Sep 23 - Sep 25, 2026', month: 9 },
    { weekday: true, date: 'Oct 28 - Oct 30, 2026', month: 10 },
    { weekday: false, date: 'Oct 17-18 & 24, 2026', month: 10 },
    { weekday: true, date: 'Nov 25 - Nov 27, 2026', month: 11 },
    { weekday: false, date: 'Nov 21-22 & 28, 2026', month: 11 },
    { weekday: true, date: 'Dec 16 - Dec 18, 2026', month: 12 },
    { weekday: false, date: 'Dec 12-13 & 19, 2026', month: 12 }
  ],
  '2days': [
    { weekday: true, date: 'Jul 30 - Jul 31, 2026', month: 7 },
    { weekday: false, date: 'Jul 25 - Jul 26, 2026', month: 7 },
    { weekday: false, date: 'Aug 29 - Aug 30, 2026', month: 8 },
    { weekday: true, date: 'Aug 27 - Aug 28, 2026', month: 8 },
    { weekday: false, date: 'Sep 26 - Sep 27, 2026', month: 9 },
    { weekday: true, date: 'Sep 24 - Sep 25, 2026', month: 9 },
    { weekday: true, date: 'Oct 29 - Oct 30, 2026', month: 10 },
    { weekday: false, date: 'Oct 24 - Oct 25, 2026', month: 10 },
    { weekday: true, date: 'Nov 26 - Nov 27, 2026', month: 11 },
    { weekday: false, date: 'Nov 28 - Nov 29, 2026', month: 11 },
    { weekday: true, date: 'Dec 17 - Dec 18, 2026', month: 12 },
    { weekday: false, date: 'Dec 19 - Dec 20, 2026', month: 12 }
  ],
  '1day': [
    { weekday: true, date: 'Jul 31, 2026', month: 7 },
    { weekday: false, date: 'Jul 26, 2026', month: 7 },
    { weekday: false, date: 'Aug 30, 2026', month: 8 },
    { weekday: true, date: 'Aug 28, 2026', month: 8 },
    { weekday: false, date: 'Sep 27, 2026', month: 9 },
    { weekday: true, date: 'Sep 25, 2026', month: 9 },
    { weekday: true, date: 'Oct 30, 2026', month: 10 },
    { weekday: false, date: 'Oct 25, 2026', month: 10 },
    { weekday: true, date: 'Nov 27, 2026', month: 11 },
    { weekday: false, date: 'Nov 29, 2026', month: 11 },
    { weekday: true, date: 'Dec 18, 2026', month: 12 },
    { weekday: false, date: 'Dec 20, 2026', month: 12 }
  ],
  'dm': [
    { weekday: true, date: 'Jul 22 - Jul 31, 2026', month: 7 },
    { weekday: true, date: 'Aug 22 - Aug 31, 2026', month: 8 },
    { weekday: true, date: 'Sep 21 - Sep 30, 2026', month: 9 },
    { weekday: true, date: 'Oct 22 - Oct 31, 2026', month: 10 },
    { weekday: true, date: 'Nov 21 - Nov 30, 2026', month: 11 },
    { weekday: true, date: 'Dec 11 - Dec 29, 2026', month: 12 }
  ]
};

  // Exact Pricing Matrix from PDF document (India & Foreign)
  const coursePricingMatrix = {
    // 1. PMP
    pmp: {
      selfPaced: { inrStd: 6999, inrSpc: 4999, usdStd: 399, usdSpc: 199, duration: '1 Year' },
      liveOnline: { inrStd: 14999, inrSpc: 11999, usdStd: 899, usdSpc: 699, duration: '32 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1499, usdSpc: 1199, duration: '32 hours' },
      classroom: { isContact: true, duration: '32 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 2. CAPM
    capm: {
      selfPaced: { inrStd: 6999, inrSpc: 4999, usdStd: 299, usdSpc: 199, duration: '1 Year' },
      liveOnline: { inrStd: 14999, inrSpc: 11999, usdStd: 799, usdSpc: 599, duration: '24 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1299, usdSpc: 999, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 3. PRINCE2 Foundation
    prince2f: {
      selfPaced: { inrStd: 8999, inrSpc: 6999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 16999, inrSpc: 13999, usdStd: 999, usdSpc: 799, duration: '16 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1599, usdSpc: 1299, duration: '16 hours' },
      classroom: { isContact: true, duration: '16 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 4. PRINCE2 Practitioner
    prince2p: {
      selfPaced: { inrStd: 8999, inrSpc: 6999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 16999, inrSpc: 13999, usdStd: 999, usdSpc: 799, duration: '16 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1599, usdSpc: 1299, duration: '16 hours' },
      classroom: { isContact: true, duration: '16 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 5. PRINCE2 Combo
    prince2combo: {
      selfPaced: { inrStd: 12999, inrSpc: 9999, usdStd: 699, usdSpc: 499, duration: '1 Year' },
      liveOnline: { inrStd: 24999, inrSpc: 21999, usdStd: 1799, usdSpc: 1499, duration: '32 hours' },
      trainingExam: { inrStd: 89999, inrSpc: 83999, usdStd: 2899, usdSpc: 2499, duration: '32 hours' },
      classroom: { isContact: true, duration: '32 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 6. PgMP
    pgmp: {
      selfPaced: { inrStd: 9999, inrSpc: 7999, usdStd: 699, usdSpc: 499, duration: '1 Year' },
      liveOnline: { inrStd: 35999, inrSpc: 32999, usdStd: 1799, usdSpc: 1499, duration: '24 hours' },
      trainingExam: { inrStd: 89999, inrSpc: 85999, usdStd: 2899, usdSpc: 2499, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 7. PMI-RMP
    rmp: {
      selfPaced: { inrStd: 8999, inrSpc: 6999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 24999, inrSpc: 22999, usdStd: 999, usdSpc: 799, duration: '24 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1599, usdSpc: 1299, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 8. LSS Combo
    lsscombo: {
      selfPaced: { inrStd: 12999, inrSpc: 9999, usdStd: 699, usdSpc: 499, duration: '1 Year' },
      liveOnline: { inrStd: 24999, inrSpc: 21999, usdStd: 1799, usdSpc: 1499, duration: '32 hours' },
      trainingExam: { inrStd: 89999, inrSpc: 85999, usdStd: 2899, usdSpc: 2499, duration: '32 hours' },
      classroom: { isContact: true, duration: '32 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 9. LSS Yellow Belt
    lssyb: {
      selfPaced: { inrStd: 7999, inrSpc: 5999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 16999, inrSpc: 13999, usdStd: 899, usdSpc: 699, duration: '08 hours' },
      trainingExam: { inrStd: 39999, inrSpc: 35999, usdStd: 1399, usdSpc: 1199, duration: '08 hours' },
      classroom: { isContact: true, duration: '08 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 10. LSS Green Belt
    lssgb: {
      selfPaced: { inrStd: 9999, inrSpc: 7999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 19999, inrSpc: 17999, usdStd: 999, usdSpc: 799, duration: '24 hours' },
      trainingExam: { inrStd: 47999, inrSpc: 44999, usdStd: 1599, usdSpc: 1299, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 11. LSS Black Belt
    lssbb: {
      selfPaced: { inrStd: 12999, inrSpc: 9999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 22999, inrSpc: 19999, usdStd: 999, usdSpc: 799, duration: '24 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1799, usdSpc: 1499, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 12. CCBA
    ccba: {
      selfPaced: { inrStd: 9999, inrSpc: 7999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 19999, inrSpc: 17999, usdStd: 999, usdSpc: 799, duration: '24 hours' },
      trainingExam: { inrStd: 39999, inrSpc: 34999, usdStd: 1599, usdSpc: 1299, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 13. ECBA
    ecba: {
      selfPaced: { inrStd: 7999, inrSpc: 5999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 16999, inrSpc: 13999, usdStd: 899, usdSpc: 699, duration: '21 hours' },
      trainingExam: { inrStd: 52999, inrSpc: 49999, usdStd: 1399, usdSpc: 1199, duration: '21 hours' },
      classroom: { isContact: true, duration: '21 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 14. CBAP
    cbap: {
      selfPaced: { inrStd: 12999, inrSpc: 9999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 22999, inrSpc: 19999, usdStd: 999, usdSpc: 799, duration: '32 hours' },
      trainingExam: { inrStd: 66999, inrSpc: 62999, usdStd: 1799, usdSpc: 1499, duration: '32 hours' },
      classroom: { isContact: true, duration: '32 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 15. PMI-ACP
    acp: {
      selfPaced: { inrStd: 8999, inrSpc: 6999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 19999, inrSpc: 17999, usdStd: 999, usdSpc: 799, duration: '24 hours' },
      trainingExam: { inrStd: 54999, inrSpc: 51999, usdStd: 1599, usdSpc: 1399, duration: '24 hours' },
      classroom: { isContact: true, duration: '24 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 17. PMI-CPMAI
    cpmai: {
      selfPaced: { inrStd: 14999, inrSpc: 9999, usdStd: 449, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 19999, inrSpc: 14999, usdStd: 699, usdSpc: 499, duration: '21 hours' },
      trainingExam: { inrStd: 29999, inrSpc: 24999, usdStd: 999, usdSpc: 799, duration: '21 hours' },
      classroom: { isContact: true, duration: '21 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    },
    // 16. Digital Marketing
    dm: {
      selfPaced: { inrStd: 8999, inrSpc: 6999, usdStd: 499, usdSpc: 299, duration: '1 Year' },
      liveOnline: { inrStd: 24999, inrSpc: 19999, usdStd: 1199, usdSpc: 899, duration: '40 hours' },
      trainingExam: { inrStd: 34999, inrSpc: 30999, usdStd: 1399, usdSpc: 1199, duration: '40 hours' },
      classroom: { isContact: true, duration: '40 hours' },
      corporate: { isContact: true, duration: 'Custom' }
    }
  };

  const slugAliasMap = {
    'cpmai': 'pmi-cpmai-certification-training',
  'pmi-cpmai': 'pmi-cpmai-certification-training',
  'course_cpmai': 'pmi-cpmai-certification-training',
  'rmp': 'risk-management-professional-certification-training',
  'pmi-rmp': 'risk-management-professional-certification-training',
  'course_rmp': 'risk-management-professional-certification-training',
  'pgmp': 'program-management-professional-certification-training',
  'pmi-pgmp': 'program-management-professional-certification-training',
  'course_pgmp': 'program-management-professional-certification-training',
  'pmp': 'project-management-professional-pmp',
  'pmp-international': 'project-management-professional-pmp',
  'course_pmp': 'project-management-professional-pmp',
  'capm': 'capm-certification-training',
  'course_capm': 'capm-certification-training',
  'prince2-foundation': 'prince2-foundation-certification-training',
  'prince2f': 'prince2-foundation-certification-training',
  'course_prince2_foundation': 'prince2-foundation-certification-training',
  'prince2-practitioner': 'prince2-practitioner-training',
  'prince2p': 'prince2-practitioner-training',
  'course_prince2_practitioner': 'prince2-practitioner-training',
  'prince2-combo': 'prince2-foundation-and-practitioner-training',
  'prince2combo': 'prince2-foundation-and-practitioner-training',
  'prince2-foundation-and-practitioner': 'prince2-foundation-and-practitioner-training',
  'course_prince2_combo': 'prince2-foundation-and-practitioner-training',
  'lss-combo': 'lssgb-lssbb-combo-certification-training',
  'lsscombo': 'lssgb-lssbb-combo-certification-training',
  'lssgb-lssbb': 'lssgb-lssbb-combo-certification-training',
  'course_lss_combo': 'lssgb-lssbb-combo-certification-training',
  'lssyb': 'lean-six-sigma-yellow-belt-certification-training',
  'yellow-belt': 'lean-six-sigma-yellow-belt-certification-training',
  'course_lssyb': 'lean-six-sigma-yellow-belt-certification-training',
  'lssgb': 'lean-six-sigma-green-belt-certification-training',
  'green-belt': 'lean-six-sigma-green-belt-certification-training',
  'course_lssgb': 'lean-six-sigma-green-belt-certification-training',
  'lssbb': 'lean-six-sigma-black-belt-certification-training',
  'black-belt': 'lean-six-sigma-black-belt-certification-training',
  'course_lssbb': 'lean-six-sigma-black-belt-certification-training',
  'cbap': 'cbap-training',
  'course_cbap': 'cbap-training',
  'ccba': 'ccba-certification-training',
  'course_ccba': 'ccba-certification-training',
  'ecba': 'ecba-certification-training',
  'course_ecba': 'ecba-certification-training',
  'acp': 'pmi-acp',
  'pmi-acp': 'pmi-acp',
  'course_acp': 'pmi-acp',
  'dm': 'digital-marketing-training',
  'digital-marketing': 'digital-marketing-training',
  'course_dm': 'digital-marketing-training',
};

const getCourseInstructorHighlightImage = (c) => {
  if (!c) return '/instructor_images/instructor_1.jpg';
  const s = (c.slug || '').toLowerCase();
  const t = (c.title || '').toLowerCase();
  const id = (c._id || c.id || '').toLowerCase();

  // 1. PMP (Instructor 1)
  if (s.includes('cpmai') || id.includes('cpmai') || t.includes('cpmai')) return '/instructor_images/instructor_cpmai.png';
    if (s.includes('pmp') || id.includes('pmp') || t.includes('project management professional')) return '/instructor_images/instructor_1.jpg';
  // 2. CAPM (Instructor 2)
  if (s.includes('capm') || id.includes('capm')) return '/instructor_images/instructor_2.jpg';
  // 3. PRINCE2 Foundation (Instructor 3)
  if (s.includes('prince2-foundation-certification') || id.includes('prince2_foundation') || (t.includes('prince2') && t.includes('foundation') && !t.includes('practitioner'))) return '/instructor_images/instructor_3.jpg';
  // 4. PRINCE2 Practitioner (Instructor 4)
  if (s.includes('prince2-practitioner-training') || id.includes('prince2_practitioner') || (t.includes('prince2') && t.includes('practitioner') && !t.includes('foundation'))) return '/instructor_images/instructor_4.jpg';
  // 5. PRINCE2 Combo (Instructor 1)
  if (s.includes('prince2-foundation-and-practitioner') || id.includes('prince2_combo') || s.includes('prince2-combo')) return '/instructor_images/instructor_1.jpg';
  // 6. PgMP (Instructor 2)
  if (s.includes('pgmp') || id.includes('pgmp')) return '/instructor_images/instructor_2.jpg';
  // 7. PMI-RMP (Instructor 3)
  if (s.includes('rmp') || id.includes('rmp')) return '/instructor_images/instructor_3.jpg';
  // 8. LSS Combo (Instructor 4)
  if (s.includes('lssgb-lssbb') || id.includes('lss_combo') || s.includes('lss-combo')) return '/instructor_images/instructor_4.jpg';
  // 9. LSSYB (Instructor 1)
  if (s.includes('yellow-belt') || id.includes('lssyb') || s.includes('lssyb')) return '/instructor_images/instructor_1.jpg';
  // 10. LSSGB (Instructor 2)
  if (s.includes('green-belt') || id.includes('lssgb') || s.includes('lssgb')) return '/instructor_images/instructor_2.jpg';
  // 11. LSSBB (Instructor 3)
  if (s.includes('black-belt') || id.includes('lssbb') || s.includes('lssbb')) return '/instructor_images/instructor_3.jpg';
  // 12. CCBA (Instructor 4)
  if (s.includes('ccba') || id.includes('ccba')) return '/instructor_images/instructor_4.jpg';
  // 13. ECBA (Instructor 1)
  if (s.includes('ecba') || id.includes('ecba')) return '/instructor_images/instructor_1.jpg';
  // 14. CBAP (Instructor 2)
  if (s.includes('cbap') || id.includes('cbap')) return '/instructor_images/instructor_2.jpg';
  // 15. PMI-ACP (Instructor 3)
  if (s.includes('acp') || id.includes('acp')) return '/instructor_images/instructor_3.jpg';
  // 16. Digital Marketing (Instructor 4)
  if (s.includes('digital-marketing') || id.includes('dm') || s.includes('dm')) return '/instructor_images/instructor_4.jpg';

  return '/instructor_images/instructor_1.jpg';
};

const getCourseCertDemoImage = (c) => {
  const getPath = () => {
    if (!c) return '/pmp-certificate-demo.jpg';
    const s = (c.slug || '').toLowerCase();
    const t = (c.title || '').toLowerCase();
    const id = (c._id || c.id || '').toLowerCase();

    // 1. CPMAI
    if (s.includes('cpmai') || id.includes('cpmai') || t.includes('cpmai')) return '/cert_images/cpmai-cert-demo.jpg';
    // 2. CAPM
    if (s.includes('capm') || id.includes('capm') || t.includes('capm')) return '/cert_images/capm-cert-demo.jpg';
    // 3. PMP
    if (s.includes('pmp-certification-training') || s === 'pmp' || (s.includes('pmp') && !s.includes('acp') && !s.includes('rmp') && !s.includes('cpmai') && !s.includes('pgmp'))) return '/pmp-certificate-demo.jpg';
    // 4. PRINCE2 Combo
    if (s.includes('prince2-foundation-and-practitioner') || t.includes('foundation and practitioner') || s.includes('prince2-combo')) return '/cert_images/prince2combo-cert-demo.jpg';
    // 5. PRINCE2 Foundation
    if (s.includes('prince2-foundation') || (t.includes('prince2') && t.includes('foundation'))) return '/cert_images/prince2f-cert-demo.jpg';
    // 6. PRINCE2 Practitioner
    if (s.includes('prince2-practitioner') || (t.includes('prince2') && t.includes('practitioner'))) return '/cert_images/prince2p-cert-demo.jpg';
    // 7. PgMP
    if (s.includes('pgmp') || t.includes('program management') || id.includes('pgmp')) return '/cert_images/pgmp-cert-demo.jpg';
    // 8. PMI-RMP
    if (s.includes('rmp') || t.includes('risk management') || id.includes('rmp')) return '/cert_images/rmp-cert-demo.jpg';
    // 9. LSS Combo
    if (s.includes('lssgb-lssbb') || t.includes('green and black belt combo') || (t.includes('lssgb') && t.includes('lssbb'))) return '/cert_images/lsscombo-cert-demo.jpg';
    // 10. LSS Yellow Belt
    if (s.includes('yellow-belt') || s.includes('lssyb') || t.includes('yellow belt')) return '/cert_images/lssyb-cert-demo.jpg';
    // 11. LSS Green Belt
    if (s.includes('green-belt') || s.includes('lssgb') || t.includes('green belt')) return '/cert_images/lssgb-cert-demo.jpg';
    // 12. LSS Black Belt
    if (s.includes('black-belt') || s.includes('lssbb') || t.includes('black belt')) return '/cert_images/lssbb-cert-demo.jpg';
    // 13. CBAP
    if (s.includes('cbap') || t.includes('cbap') || id.includes('cbap')) return '/cert_images/cbap-cert-demo.jpg';
    // 14. CCBA
    if (s.includes('ccba') || t.includes('ccba') || id.includes('ccba')) return '/cert_images/ccba-cert-demo.jpg';
    // 15. ECBA
    if (s.includes('ecba') || t.includes('ecba') || id.includes('ecba')) return '/cert_images/ecba-cert-demo.jpg';
    // 16. PMI-ACP
    if (s.includes('acp') || t.includes('agile certified practitioner') || id.includes('acp')) return '/cert_images/acp-cert-demo.jpg';
    // 17. Digital Marketing
    if (s.includes('digital-marketing') || s.includes('dm') || t.includes('digital marketing')) return '/cert_images/dm-cert-demo.jpg';

    return '/pmp-certificate-demo.jpg';
  };
  return `${getPath()}?v=20260920v5`;
};

const getCourseJourneyImage = (c) => {
  if (!c) return null;
  const s = (c.slug || '').toLowerCase();
  const t = (c.title || '').toLowerCase();

  if (s.includes('cbap') || t.includes('cbap')) return '/journey_images/cbap-journey.jpg';
  if (s.includes('ccba') || t.includes('ccba')) return '/journey_images/ccba-journey.jpg';
  if (s.includes('ecba') || t.includes('ecba')) return '/journey_images/ecba-journey.jpg';
  if (s.includes('prince2-foundation-and-practitioner') || t.includes('foundation and practitioner') || s.includes('prince2-combo')) return '/journey_images/prince2combo-journey.jpg';
  if (s.includes('prince2-foundation') || t.includes('prince2 foundation')) return '/journey_images/prince2f-journey.jpg';
  if (s.includes('prince2-practitioner') || t.includes('prince2 practitioner')) return '/journey_images/prince2p-journey.jpg';
  if (s.includes('lssgb-lssbb') || t.includes('green and black belt combo') || (t.includes('lssgb') && t.includes('lssbb'))) return '/journey_images/lsscombo-journey.jpg';
  if (s.includes('black-belt') || s.includes('lssbb') || t.includes('black belt')) return '/journey_images/lssbb-journey.jpg';
  if (s.includes('green-belt') || s.includes('lssgb') || t.includes('green belt')) return '/journey_images/lssgb-journey.jpg';
  if (s.includes('yellow-belt') || s.includes('lssyb') || t.includes('yellow belt')) return '/journey_images/lssyb-journey.jpg';
  if (s.includes('pgmp') || t.includes('program management') || t.includes('pgmp')) return '/journey_images/pgmp-journey.jpg';
  if (s.includes('acp') || t.includes('agile certified practitioner') || t.includes('pmi-acp')) return '/journey_images/acp-journey.jpg';
  if (s.includes('rmp') || t.includes('risk management') || t.includes('pmi-rmp')) return '/journey_images/rmp-journey.jpg';

  return null;
};

const getCoursePricingKey = (c) => {
    if (!c) return 'pmp';
    const t = (c.title || '').toLowerCase();
    const s = (c.slug || '').toLowerCase();
    
    if (s.includes('cpmai') || t.includes('cpmai')) return 'cpmai';
    if (s.includes('pmp') || t.includes('pmp')) return 'pmp';
    if (s.includes('capm') || t.includes('capm')) return 'capm';
    if (s.includes('prince2-foundation-and-practitioner') || t.includes('foundation and practitioner')) return 'prince2combo';
    if (s.includes('prince2-foundation') || t.includes('prince2 foundation')) return 'prince2f';
    if (s.includes('prince2-practitioner') || t.includes('prince2 practitioner')) return 'prince2p';
    if (s.includes('pgmp') || t.includes('program management')) return 'pgmp';
    if (s.includes('risk') || t.includes('risk management') || s.includes('rmp')) return 'rmp';
    if (s.includes('lssgb-lssbb') || t.includes('green and black belt combo')) return 'lsscombo';
    if (s.includes('yellow-belt') || t.includes('yellow belt')) return 'lssyb';
    if (s.includes('green-belt') || t.includes('green belt')) return 'lssgb';
    if (s.includes('black-belt') || t.includes('black belt')) return 'lssbb';
    if (s.includes('ccba') || t.includes('ccba')) return 'ccba';
    if (s.includes('ecba') || t.includes('ecba')) return 'ecba';
    if (s.includes('cbap') || t.includes('cbap')) return 'cbap';
    if (s.includes('acp') || t.includes('acp')) return 'acp';
    if (s.includes('digital-marketing') || t.includes('digital marketing')) return 'dm';

    return 'pmp';
  };



  const getReviewAvatar = (name, customAvatar) => {
    if (customAvatar && customAvatar.length > 5 && !customAvatar.includes('photo-1535713875002-d1d0cf377fde')) {
      return customAvatar;
    }
    
    const nameLower = (name || '').toLowerCase().trim();
    const femaleKeywords = [
      'sanjna', 'sanjana', 'priya', 'ananya', 'sneha', 'kavita', 'deepika', 
      'dorotha', 'ethel', 'linda', 'sarah', 'emily', 'jennifer', 'jessica', 
      'anita', 'sunita', 'pooja', 'sharma', 'stewart', 'phillips', 'vance', 'jenkins', 'nair', 'deshmukh'
    ];

    const isFemale = femaleKeywords.some(kw => nameLower.includes(kw));

    const femaleAvatars = [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80'
    ];

    const maleAvatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80'
    ];

    let charCodeSum = 0;
    for (let i = 0; i < nameLower.length; i++) {
      charCodeSum += nameLower.charCodeAt(i);
    }

    if (isFemale) {
      return femaleAvatars[charCodeSum % femaleAvatars.length];
    } else {
      return maleAvatars[charCodeSum % maleAvatars.length];
    }
  };


const getCourseCoverPoster = (c) => {
  if (!c) return 'https://learnerskart.com/course_images/pmp-v6.jpg';
  const slug = (c.slug || c._id || '').toLowerCase();
  const title = (c.title || '').toLowerCase();

  if (slug.includes('pmp') || title.includes('pmp')) return 'https://learnerskart.com/course_images/pmp-v6.jpg';
  if (slug.includes('capm') || title.includes('capm')) return 'https://learnerskart.com/course_images/capm-v9.jpg';
  if (slug.includes('prince2') && slug.includes('combo')) return 'https://learnerskart.com/course_images/prince2-combo-v3.jpg';
  if (slug.includes('prince2') && slug.includes('foundation')) return 'https://learnerskart.com/course_images/prince2-foundation-v4.jpg';
  if (slug.includes('prince2')) return 'https://learnerskart.com/course_images/prince2-practitioner-v4.jpg';
  if (slug.includes('pgmp') || title.includes('pgmp')) return 'https://learnerskart.com/course_images/pgmp-v3.jpg';
  if (slug.includes('rmp') || title.includes('risk')) return 'https://learnerskart.com/course_images/rmp-v3.jpg';
  if (slug.includes('lss') && slug.includes('combo')) return 'https://learnerskart.com/course_images/lssgb_lssbb-v3.jpg';
  if (slug.includes('yellow') || slug.includes('lssyb')) return 'https://learnerskart.com/course_images/lssyb-v3.jpg';
  if (slug.includes('green') || slug.includes('lssgb')) return 'https://learnerskart.com/course_images/lssgb-v3.jpg';
  if (slug.includes('black') || slug.includes('lssbb')) return 'https://learnerskart.com/course_images/lssbb-v3.jpg';
  if (slug.includes('ccba') || title.includes('ccba')) return 'https://learnerskart.com/course_images/ccba-v3.jpg';
  if (slug.includes('ecba') || title.includes('ecba')) return 'https://learnerskart.com/course_images/ecba-v3.jpg';
  if (slug.includes('cbap') || title.includes('cbap')) return 'https://learnerskart.com/course_images/cbap-v3.jpg';
  if (slug.includes('acp') || title.includes('agile')) return 'https://learnerskart.com/course_images/pmi_acp-v3.jpg';
  if (slug.includes('digital') || title.includes('digital')) return 'https://learnerskart.com/course_images/digital-marketing-v2.jpg';

  if (c.thumbnail) {
    return c.thumbnail.startsWith('http') ? c.thumbnail : 'https://learnerskart.com' + (c.thumbnail.startsWith('/') ? '' : '/') + c.thumbnail;
  }
  return 'https://learnerskart.com/course_images/pmp-v6.jpg';
};


const CourseDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cartItems, formatPrice, getCalculatedPricing, selectedCountry } = useCart();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const hideNav = window.location.search.includes('hideNav=true');
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const elementId = tabName === 'FAQ' ? 'faq' : tabName === 'Key Features' ? 'key-features' : tabName.toLowerCase();
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 150; // offset to clear sticky tabs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'key-features', 'curriculum', 'prerequisites', 'schedule', 'faq', 'testimonials'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const tabName = sectionId === 'faq' ? 'FAQ' : sectionId === 'key-features' ? 'Key Features' : sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            setActiveTab(tabName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [selectedMode, setSelectedMode] = useState('Live Online');
  const [selectedBatch, setSelectedBatch] = useState('');
  
  const isPmp = course && (course.title.toLowerCase().includes('pmp') || course.title.toLowerCase().includes('project management professional') || slug === 'pmp-international');
  
  const [scheduleTypeFilter, setScheduleTypeFilter] = useState('All'); // 'All', 'Weekday', 'Weekend'
  const [scheduleMonthFilter, setScheduleMonthFilter] = useState('All'); // 'All', '7', '8', '9', '10', '11', '12'
  const [scheduleTrainingMode, setScheduleTrainingMode] = useState('Live Online');
  const [schedules, setSchedules] = useState([]);

  const getCourseDurationAndType = () => {
    if (!course) return { days: 4, type: '4days' };
    const s = course.slug || '';
    if (s.includes('capm')) return { days: 3, type: '3days' };
    if (s.includes('prince2-foundation')) return { days: 2, type: '2days' };
    if (s.includes('prince2-practitioner')) return { days: 2, type: '2days' };
    if (s.includes('prince2') || s.includes('f-p')) return { days: 4, type: '4days' };
    if (s.includes('pgmp')) return { days: 3, type: '3days' };
    if (s.includes('rmp')) return { days: 3, type: '3days' };
    if (s.includes('lssgb-lssbb') || s.includes('black-belt-combo')) return { days: 4, type: '4days' };
    if (s.includes('yellow-belt') || s.includes('lssyb')) return { days: 1, type: '1day' };
    if (s.includes('green-belt') || s.includes('lssgb')) return { days: 3, type: '3days' };
    if (s.includes('black-belt') || s.includes('lssbb')) return { days: 3, type: '3days' };
    if (s.includes('ccba')) return { days: 3, type: '3days' };
    if (s.includes('ecba')) return { days: 3, type: '3days' };
    if (s.includes('cbap')) return { days: 4, type: '4days' };
    if (s.includes('pmi-acp')) return { days: 3, type: '3days' };
    if (s.includes('digital-marketing')) return { days: 10, type: 'dm' };
    return { days: 4, type: '4days' };
  };

  const getCalculatedDetailPrice = () => {
    if (!course) return null;
    const pKey = getCoursePricingKey(course);
    const pData = coursePricingMatrix[pKey] || coursePricingMatrix.pmp;
    const isIndia = selectedCountry.code === 'IN';

    if (selectedMode === 'Classroom' || selectedMode === 'Corporate') {
      return null; // Indicates "Contact us page"
    }

    let targetMode = pData.liveOnline;
    if (selectedMode === 'Self Study') targetMode = pData.selfPaced;
    if (selectedMode === 'E-Learning') targetMode = pData.trainingExam;

    if (targetMode.isContact) return null;

    return isIndia ? targetMode.inrSpc : targetMode.usdSpc;
  };

  const getCalculatedDetailOriginalPrice = () => {
    if (!course) return null;
    const pKey = getCoursePricingKey(course);
    const pData = coursePricingMatrix[pKey] || coursePricingMatrix.pmp;
    const isIndia = selectedCountry.code === 'IN';

    let targetMode = pData.liveOnline;
    if (selectedMode === 'Self Study') targetMode = pData.selfPaced;
    if (selectedMode === 'E-Learning') targetMode = pData.trainingExam;

    if (targetMode.isContact) return null;

    return isIndia ? targetMode.inrStd : targetMode.usdStd;
  };

  // Review Form States
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([]);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: '', isError: false });

  // Upcoming Schedule Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Training Solutions Carousel State
  const [trainingSolutionIndex, setTrainingSolutionIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrainingSolutionIndex(prev => (prev + 1) % 5); // 5 solutions
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  const getScheduleCards = () => {
    if (!course) return [];
    const isP = course.title.toLowerCase().includes('pmp') || course.title.toLowerCase().includes('project management professional');
    const pduText = course.pdus ? `${course.pdus} PDUs Certificate` : "Professional Certificate of Completion";
    
    return [
      {
        type: "elearning",
        badge: "E-Learning / Self-Study",
        title: "1 Year E-Learning Course",
        highlightType: null,
        points: [
          { text: pduText, icon: "check" },
          { text: "1 Year LMS E-Learning Access", icon: "check" },
          { text: "Mock Simulation Tests included", icon: "check" }
        ]
      },
      {
        type: "live",
        badge: "Live Online Interactive Training",
        title: "Active Cohorts",
        highlightType: "popular",
        points: isPmp ? [
          { text: "Batch-1: Jul 28-31, 2026 (weekday batch)", icon: "calendar" },
          { text: "Batch-2: Aug 22-23 & 29-30, 2026 (weekend batch)", icon: "calendar" },
          { text: "Time: 9AM-5PM", icon: "clock" }
        ] : [
          { text: "Batch-1: July 19-22, 2026", icon: "calendar" },
          { text: "Batch-2: July 23-24 & 30-31, 2026", icon: "calendar" },
          { text: "Time: 9AM-5PM (Weekend/Weekday)", icon: "clock" }
        ]
      },
      {
        type: "exam_prep",
        badge: "Training + Exam Preparation",
        title: "Flexible Learning Options",
        highlightType: "value",
        points: [
          { text: pduText, icon: "check" },
          { text: "30-days Guided Study Plan", icon: "check" },
          { text: isP ? "PMP Exam + Membership Included" : `${courseShortTitle} Prep Kits`, icon: "check" },
          { text: "Pre-Post Exam Application Support", icon: "check" }
        ]
      },
      {
        type: "classroom",
        badge: "Physical Classroom Training",
        title: "Active Classroom Cohorts",
        highlightType: null,
        points: isPmp ? [
          { text: "Batch-1: Jul 28-31, 2026 (weekday batch)", icon: "calendar" },
          { text: "Batch-2: Aug 22-23 & 29-30, 2026 (weekend batch)", icon: "calendar" },
          { text: "Time: 9AM-5PM", icon: "clock" }
        ] : [
          { text: "Batch-1: July 19-22, 2026", icon: "calendar" },
          { text: "Batch-2: July 23-24 & 30-31, 2026", icon: "calendar" },
          { text: "Time: 9AM-5PM (Physical Location)", icon: "clock" }
        ]
      },
      {
        type: "corporate",
        badge: "Corporate / Group Training",
        title: "Flexible Training - Anytime",
        highlightType: null,
        points: [
          { text: pduText, icon: "check" },
          { text: "Customized Enterprise Curriculum", icon: "check" },
          { text: "Get Significant Group Discount", icon: "check" },
          { text: "Pre-Post Exam Team Support", icon: "check" }
        ]
      }
    ];
  };

  const handlePrevSchedule = () => {
    setCarouselIndex((prev) => (prev === 0 ? getScheduleCards().length - 1 : prev - 1));
  };

  const handleNextSchedule = () => {
    setCarouselIndex((prev) => (prev === getScheduleCards().length - 1 ? 0 : prev + 1));
  };

  const renderScheduleCard = (card) => {
    if (!card) return null;
    
    const isPopular = card.highlightType === 'popular';
    const isValue = card.highlightType === 'value';
    const isHighlighted = isPopular || isValue;
    
    return (
      <div 
        className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 text-left h-full min-h-[360px] ${
          isPopular 
            ? 'border-2 border-primary shadow-xl bg-white z-10 hover:shadow-2xl'
            : isValue
              ? 'border-2 border-amber-400 shadow-xl bg-white z-10 hover:shadow-2xl'
              : 'border border-slate-100 bg-white shadow-sm hover:shadow-md'
        }`}
      >
        {isPopular && (
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
            🔥 RECOMMENDED
          </span>
        )}
        {isValue && (
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
            ⭐ BEST VALUE
          </span>
        )}

        <div className="space-y-3">
          <div className={`text-center py-2 rounded-lg border ${
            isPopular 
              ? 'bg-primary/5 border-primary/20 text-primary' 
              : isValue 
                ? 'bg-amber-500/5 border-amber-500/20 text-amber-600'
                : 'bg-slate-100/60 border-slate-200/50 text-slate-600'
          }`}>
            <p className="font-extrabold text-[10px] uppercase tracking-wider px-1 leading-normal">
              {card.badge}
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="font-black text-xs text-textdark uppercase tracking-wide">
              {card.title}
            </p>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
              {card.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  {pt.icon === "calendar" && <span className="text-slate-400 mt-0.5 text-[11px]">📅</span>}
                  {pt.icon === "clock" && <span className="text-slate-400 mt-0.5 text-[11px]">⏳</span>}
                  {pt.icon === "check" && (
                    isPopular 
                      ? <span className="text-primary font-bold mt-0.5">✓</span> 
                      : isValue
                        ? <span className="text-amber-500 font-bold mt-0.5">✓</span>
                        : <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  )}
                  <span>{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          onClick={(e) => {
            if (card.type === 'classroom' || card.type === 'corporate') {
              e.preventDefault();
              navigate('/contact');
            } else {
              handleEnrollNow(e);
            }
          }}
          className={`mt-6 w-full font-extrabold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99] ${
            isPopular
              ? 'bg-primary hover:bg-primary-dark text-white'
              : isValue
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-slate-800 hover:bg-slate-900 text-white'
          }`}
        >
          <span>Enroll Now</span>
          <span>&rarr;</span>
        </button>
      </div>
    );
  };

  // Tab definitions
  const tabs = ['Overview', 'Key Features', 'Curriculum', 'Prerequisites', 'Schedule', 'FAQ', 'Testimonials'];

  const faqsSeed = [
    { question: "Is the exam fee included in this training course?", answer: "No, the exam fee is paid directly to the certifying body (e.g. PMI, Scrum.org). However, we offer full guidelines and assistance for your exam application." },
    { question: "How long will I have access to the materials?", answer: "You will get lifetime access to all recorded sessions, templates, cheat-sheets, and practice mock tests." },
    { question: "Do you offer a refund policy?", answer: "Yes, we offer a 100% money-back guarantee if you are not satisfied with the training. Please contact our support team for terms." }
  ];

  const pmpFaqs = [
    { question: "What is the PMP certification?", answer: "It’s a globally recognized certification from the Project Management Institute (PMI) that validates your competence in leading and directing projects." },
    { question: "Why is PMP certification important?", answer: "PMP certification demonstrates your project management expertise to employers globally, increases your earning potential, and qualifies you for senior leadership roles across industries." },
    { question: "Who is the PMP certification for?", answer: "It is designed for project managers, program managers, team leads, coordinators, and practitioners seeking to validate their leadership capabilities." },
    { question: "Is the PMP certification recognized globally?", answer: "Yes, it is recognized as the global gold standard in project management certification, accepted across almost all countries and industries." },
    { question: "How long is the PMP certification valid?", answer: "The PMP certification is valid for three years. To maintain it, you must earn 60 Professional Development Units (PDUs) during each three-year cycle." }
  ];

    const pmpTestimonials = [
    { name: "Jennifer M. Sheedy", role: "Manager", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80", text: "The blended learning approach was very effective. The combination of online modules and in-person sessions worked well." },
    { name: "Michael R. Scott", role: "Senior PM", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80", text: "Exceptional PMP exam prep! Passed on my first attempt with Above Target scores in all domains." },
    { name: "Priya Sharma", role: "Product Lead", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80", text: "The mock exam simulations and 30-day study plan were a game-changer. Highly recommended for working pros!" },
    { name: "David Miller", role: "Director", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80", text: "LearnersKart's structured curriculum and 24/7 post-training support gave our entire team complete confidence." }
  ];

  const allCourseSyllabuses = {
    cpmai: [
      {
        title: "Domain I: Support Responsible and Trustworthy AI Efforts (15% Weightage)",
        items: [
          "Oversee Privacy and Security Plan (PII protocols, encryption, access controls, GDPR/CCPA compliance, secure data handling)",
          "Manage AI/ML Transparency & Explainability (model selection criteria, data sources & preprocessing, audit trails, interpretability tools)",
          "Conduct Bias Checks (training data representation, fairness testing across populations, bias detection metrics, mitigation techniques)",
          "Monitor Regulatory & Policy Compliance (evolving AI regulations, sector-specific compliance, legal & governance reporting)",
          "Manage Accountability Documentation & Audit Trail (model development decisions, version control, go/no-go decision points, chain of custody)"
        ]
      },
      {
        title: "Domain II: Identify Business Needs and Solutions (26% Weightage)",
        items: [
          "Identify Problem to be Solved (stakeholder interviews, automation opportunities, target personas, problem statement validation)",
          "Evaluate Initial AI Feasibility (technical viability, data availability & quality, computational resources, organizational readiness)",
          "Conduct Risk Assessments (failure modes, cybersecurity vulnerabilities, ethical implications, business continuity risks, mitigation strategies)",
          "Develop AI Project Scope Statement & ROI (boundaries, deliverables, performance metrics, TCO calculation, cost-benefit analysis)",
          "Manage Adoption & Integration Risks (change management requirements, user adoption barriers, workflow integration, end-user training)",
          "Draft AI Solution & Define Success Criteria (high-level architecture, data flow, AI model types, KPIs, technical benchmarks)"
        ]
      },
      {
        title: "Domain III: Identify Data Needs (26% Weightage)",
        items: [
          "Define Required Data (data types & formats, volume requirements, sampling strategies, temporal granularity, quality standards)",
          "Identify Data SMEs & Data Sources (domain experts, data stewards, internal databases, data warehouses, external third-party data, legacy archives)",
          "Coordinate AI Workspace & Infrastructure (computing resources, secure development environments, data storage & backup, version control)",
          "Gather Required Data & Check Privacy (data extraction, migration pipelines, ongoing feeds, data completeness, usage licensing & access)",
          "Oversee Data Evaluation & Readiness (accuracy, completeness, distributions, freshness, modeling compatibility, exploratory analysis, leadership reporting)"
        ]
      },
      {
        title: "Domain IV: Manage AI Model Development and Evaluation (16% Weightage)",
        items: [
          "Oversee AI/ML Model Technique Selection (algorithm evaluation, supervised/unsupervised/reinforcement learning, complexity vs interpretability)",
          "Oversee AI/ML Model QA/QC & Training (testing protocols, quality assurance, configuration management, performance monitoring, hyperparameter tuning)",
          "Manage Data Transformation for Data Preparation (cleaning, preprocessing, feature engineering, normalization, synthetic data generation, reproducibility)",
          "Verify Data Quality & Model Readiness for Go/No-Go Decision (final quality assessments, model performance against criteria, robustness, generalization, infrastructure readiness)"
        ]
      },
      {
        title: "Domain V: Operationalize AI Solution (17% Weightage)",
        items: [
          "Manage Creation & Execution of AI Deployment Plan (deployment strategy, timeline, infrastructure allocation, IT integration, rollback procedures)",
          "Manage AI Solution Deployment & Model Governance (technical deployment, system functionality validation, access control, post-deployment testing, lifecycle procedures, drift detection)",
          "Oversee AI Solution Metrics & Lessons Learned (monitoring dashboards, KPI tracking, performance degradation analysis, reporting, project outcome documentation)",
          "Manage AI Solution Transition & Contingency Plan (operational support transition, knowledge transfer, ongoing maintenance, incident response, disaster recovery)"
        ]
      },
      {
        title: "PMI-CPMAI Exam Preparation & Overview (120 Questions • 160 Mins)",
        items: [
          "PMI-CPMAI Exam Format Overview (120 multiple-choice questions, 100 scored, 20 unscored, 160 minutes duration)",
          "CPMAI 6-Phase Methodology Comprehensive Review",
          "Scenario-Based Practice Questions & Domain Domain-wise Drills",
          "Exam Application Guidance & Pearson VUE / Online Proctored Scheduling"
        ]
      }
    ],
    pmp: [
      {
        title: "1. Introduction to PMP Certification",
        items: [
          "About PMI and PMP®",
          "PMP® exam structure and eligibility criteria",
          "PMBOK® Guide overview",
          "Agile Practice Guide overview",
          "PMP® Exam application process and requirements"
        ]
      },
      {
        title: "2. Project Management Framework",
        items: [
          "Projects, Programs, Portfolios, and Operations",
          "Project lifecycle stages and development approaches",
          "Project phases, gate reviews, and key deliverables",
          "Organizational influences, culture, and structures",
          "Role of the Project Manager & Core Competencies"
        ]
      },
      {
        title: "3. People (Leadership – 33% of the exam)",
        items: [
          "Manage conflict and lead a high-performing team",
          "Support team performance and empower team members",
          "Ensure team members and stakeholders are adequately trained",
          "Build a team, remove impediments, obstacles, and blockers",
          "Negotiate project agreements and collaborate with stakeholders",
          "Build shared understanding and define team ground rules",
          "Mentor relevant stakeholders and promote performance through EQ"
        ]
      },
      {
        title: "4. Process (Technical Project Management – 41% of the exam)",
        items: [
          "Execute project with the urgency required to deliver business value",
          "Manage communications, risks, and actively engage stakeholders",
          "Plan and manage budget, resources, and project schedule",
          "Plan and manage quality of products and deliverables",
          "Plan and manage scope, project integration, and changes",
          "Plan and manage procurement and project artifacts",
          "Determine appropriate project methodology, methods, and practices",
          "Establish project governance structure and manage project issues",
          "Ensure knowledge transfer for project continuity",
          "Plan and manage project/phase closure or transitions"
        ]
      },
      {
        title: "5. Business Environment (Strategic & Business – 26% of the exam)",
        items: [
          "Plan and manage project compliance (safety, security, regulatory)",
          "Evaluate and deliver project benefits and value",
          "Evaluate and address external business environment changes for impact on scope",
          "Support organizational change and continuous business improvement"
        ]
      },
      {
        title: "6. Agile and Hybrid Project Management",
        items: [
          "Agile principles, values, and Scrum/Kanban frameworks",
          "User stories, backlog refinement, and iteration planning",
          "Daily stand-ups, iteration reviews, and retrospectives",
          "Agile metrics (velocity, burn-down/burn-up charts)",
          "Hybrid models: combining predictive planning with agile execution"
        ]
      },
      {
        title: "7. Practice Tests & Exam Strategy",
        items: [
          "CCRS reporting and application audit readiness",
          "Full-length PMP simulation exam walk-throughs",
          "Time management tips and exam day preparation strategy",
          "Question-solving tips (eliminating wrong answers, situational reasoning)"
        ]
      }
    ],
    capm: [
      {
        title: "1. Project Management Fundamentals & Core Concepts (36%)",
        items: [
          "Define project, project management, program, and portfolio",
          "Understand the role and influence of project managers",
          "Project lifecycle phases and developmental approaches",
          "Understand predictive, agile, and hybrid project cycles",
          "Project management governance and PMO structures"
        ]
      },
      {
        title: "2. Predictive Plan-Based Methodologies (17%)",
        items: [
          "Explain when to use plan-based developmental approaches",
          "Define scope, schedule, and cost baselines",
          "Understand the project change control process",
          "Elicit and manage plan-based project documentation",
          "Identify and schedule project milestones"
        ]
      },
      {
        title: "3. Agile Frameworks & Methodologies (20%)",
        items: [
          "Agile manifesto principles and core agile values",
          "Understand Scrum roles (Product Owner, Scrum Master, Developers)",
          "Manage iteration planning, stand-ups, reviews, and retrospectives",
          "Utilize Kanban boards and sprint backlogs for work tracking",
          "Agile estimation techniques (T-shirt sizing, Story Points)"
        ]
      },
      {
        title: "4. Business Analysis Frameworks (27%)",
        items: [
          "Define the role of a business analyst on a project",
          "Stakeholder elicitation methods and requirements gathering",
          "Define, trace, and validate project requirements",
          "Understand the product backlog and refinement processes",
          "Validation and testing of final project deliverables"
        ]
      }
    ],
    cbap: [
      {
        title: "1. Business Analysis Planning & Monitoring",
        items: [
          "Plan business analysis approach (predictive vs adaptive)",
          "Plan stakeholder engagement and communication",
          "Plan business analysis governance and decision-making",
          "Plan business analysis information management and repository",
          "Identify opportunities for business analysis process improvement"
        ]
      },
      {
        title: "2. Elicitation and Collaboration",
        items: [
          "Prepare for elicitation (scope, techniques, logistics)",
          "Conduct elicitation activities (interviews, workshops, surveys)",
          "Confirm elicitation results against source documents",
          "Communicate business analysis information to stakeholders",
          "Manage stakeholder collaboration and active participation"
        ]
      },
      {
        title: "3. Requirements Life Cycle Management",
        items: [
          "Trace requirements (relationships, dependencies, impact)",
          "Maintain requirements for reuse and ongoing reference",
          "Prioritize requirements based on value, risk, and dependencies",
          "Assess requirements changes (scope, cost, effort, benefits)",
          "Approve requirements for implementation and development"
        ]
      },
      {
        title: "4. Strategy Analysis",
        items: [
          "Analyze current state (capabilities, pain points, processes)",
          "Define future state (goals, objectives, business value)",
          "Assess risks and uncertainties of proposed changes",
          "Define change strategy and transition state requirements"
        ]
      },
      {
        title: "5. Requirements Analysis & Design Definition",
        items: [
          "Specify and model requirements (matrices, diagrams, use cases)",
          "Verify requirements for quality and standards alignment",
          "Validate requirements against business objectives",
          "Define requirements architecture and structural relationships",
          "Define design options and evaluate potential value"
        ]
      },
      {
        title: "6. Solution Evaluation",
        items: [
          "Measure solution performance metrics and business value",
          "Analyze solution performance limitations",
          "Assess enterprise limitations impacting solution adoption",
          "Recommend actions to increase solution value"
        ]
      }
    ],
    prince2_foundation: [
      {
        title: "1. Introduction to PRINCE2 & Core Principles",
        items: [
          "Overview of projects in controlled environments",
          "Principle 1: Continued business justification",
          "Principle 2: Learn from experience",
          "Principle 3: Defined roles and responsibilities",
          "Principle 4: Manage by stages & Principle 5: Manage by exception",
          "Principle 6: Focus on products & Principle 7: Tailoring"
        ]
      },
      {
        title: "2. The 7 PRINCE2 Themes",
        items: [
          "Business Case theme (why the project is justified)",
          "Organization theme (roles, structures, sponsor)",
          "Quality theme (assessing deliverables against criteria)",
          "Plans theme (levels, scheduling, resource estimation)",
          "Risk & Change themes (mitigation, configuration control)",
          "Progress theme (monitoring, thresholds, exceptions)"
        ]
      },
      {
        title: "3. The 7 PRINCE2 Processes",
        items: [
          "Starting up a project (pre-project justification)",
          "Initiating a project (defining project plan and controls)",
          "Directing a project (board oversight and authorizations)",
          "Controlling a stage (day-to-day management by project manager)",
          "Managing product delivery (work packages, quality review)",
          "Managing a stage boundary (preparing for next stage authorization)",
          "Closing a project (handover, benefits review, evaluation)"
        ]
      },
      {
        title: "4. Tailoring & Foundation Exam Strategy",
        items: [
          "Adapting PRINCE2 to different project scale and complexity",
          "Applying PRINCE2 inside Agile environments",
          "Foundation exam structure, time limits, and question analysis",
          "Full-length PRINCE2 Foundation practice test"
        ]
      }
    ],
    prince2_practitioner: [
      {
        title: "1. Scenario-Based Themes Application",
        items: [
          "Applying and tailoring Business Case and Organization in scenarios",
          "Quality assurance and product description validation",
          "Developing project, stage, and team plans under scenario constraints",
          "Applying risk response strategies and configuration management",
          "Progress tracking, tolerance settings, and exception reports"
        ]
      },
      {
        title: "2. Scenario-Based Processes Management",
        items: [
          "Directing a project (Board actions, approvals, exceptions)",
          "Controlling stages (managing issues, change requests, team outputs)",
          "Managing stage boundaries (assessing stage performance, planning next)",
          "Closing a project (evaluating benefits, handover procedures)"
        ]
      },
      {
        title: "3. Product-Based Planning & Tailoring Guides",
        items: [
          "Developing product breakdown structures (PBS)",
          "Creating product flow diagrams and product descriptions",
          "Tailoring PRINCE2 to program levels, commercial environments, and agile"
        ]
      },
      {
        title: "4. Practitioner Exam Case Studies",
        items: [
          "Understanding the Practitioner objective testing format",
          "Analyzing exam scenarios, questions, and matching criteria",
          "Full-length Practitioner mock exam walk-through and explanation"
        ]
      }
    ],
    prince2_combo: [
      {
        title: "1. PRINCE2® Foundation level Principles and Themes",
        items: [
          "Understanding the 7 PRINCE2 principles (business justification, learn from experience)",
          "Understanding the 7 themes (Business Case, Organization, Quality, Plans, Risk, Change, Progress)",
          "Standard roles, responsibilities, and delegation limits"
        ]
      },
      {
        title: "2. PRINCE2® Foundation level Processes",
        items: [
          "Starting up a project, initiating a project, directing a project",
          "Controlling stages, managing product delivery, stage boundaries, and project closure"
        ]
      },
      {
        title: "3. Advanced Practitioner level Themes and Processes Application",
        items: [
          "Applying themes to specific project scenario cases",
          "Creating and updating product-based planning documents (PBS, product flow)",
          "Tailoring controls, risk management plans, and quality metrics"
        ]
      },
      {
        title: "4. Objective Test Exam Strategies",
        items: [
          "Answering Practitioner level scenario-based questions",
          "Mock exams and situational scenario reviews"
        ]
      }
    ],
    pgmp: [
      {
        title: "1. Program Life Cycle Management",
        items: [
          "Program definition, initiation, planning, execution, monitoring, and closure",
          "Component projects transition and program-level integration",
          "Defining program activity schedules and component linkages"
        ]
      },
      {
        title: "2. Strategic Program Alignment & Benefits Management",
        items: [
          "Aligning program goals to business unit strategy",
          "Benefits identification, analysis, benefits planning, and transition",
          "Sustaining benefits post-program closure"
        ]
      },
      {
        title: "3. Program Stakeholder Engagement & Governance",
        items: [
          "Mapping stakeholder interests and communications planning",
          "Establish program board structures and decision-making framework"
        ]
      }
    ],
    rmp: [
      {
        title: "1. Risk Strategy and Planning",
        items: [
          "Define risk thresholds, tolerance limits, and risk management plan",
          "Identifying stakeholder risk attitudes and alignment strategies"
        ]
      },
      {
        title: "2. Risk Identification & Qualitative Analysis",
        items: [
          "Uncovering risks via Delphi, SWOT, and brainstorming",
          "Qualitative risk assessments and probability-impact mapping"
        ]
      },
      {
        title: "3. Quantitative Risk Analysis & Response Planning",
        items: [
          "Monte Carlo simulation, Decision Trees, and EMV modeling",
          "Designing risk responses: mitigate, avoid, transfer, accept, exploit"
        ]
      },
      {
        title: "4. Risk Monitoring & Register Governance",
        items: [
          "Tracking risk metrics, audits, and closing out expired risks"
        ]
      }
    ],
    lssgb_lssbb_combo: [
      {
        title: "1. Green Belt DMAIC Methodology Foundations",
        items: [
          "Project charters, SIPOC, VOC, and process mapping",
          "Measurement analysis, baseline performance, and basic stats",
          "Root cause analysis, FMEA, hypothesis testing"
        ]
      },
      {
        title: "2. Black Belt Advanced Analysis & Design of Experiments (DOE)",
        items: [
          "ANOVA, advanced multiple regression, non-parametric testing",
          "Full and fractional factorial designs, Response Surface Methodologies"
        ]
      },
      {
        title: "3. Lean Enterprise Integration",
        items: [
          "Value Stream Mapping (VSM), Kaizen events, SMED, Kanban deployment"
        ]
      },
      {
        title: "4. Governance, SPC, and Mentoring",
        items: [
          "Statistical Process Control (SPC) chart selection and rules",
          "Change management, project financial validation, mentoring Green Belts"
        ]
      }
    ],
    lssyb: [
      {
        title: "1. Six Sigma Foundations & Lean Introduction",
        items: [
          "History of Six Sigma, DMAIC cycle overview, Yellow Belt responsibilities",
          "Lean concepts: 8 wastes, Kaizen, 5S system"
        ]
      },
      {
        title: "2. Define & Measure Phases (Yellow Belt level)",
        items: [
          "Project charters, SIPOC process mapping, voice of the customer",
          "Data collection principles and basic process measures"
        ]
      },
      {
        title: "3. Analyze, Improve & Control Phases",
        items: [
          "Root cause tools (5 Whys, fishbone diagrams)",
          "Brainstorming solutions, standardization, and mistake proofing basics"
        ]
      }
    ],
    lssgb: [
      {
        title: "1. Define Phase",
        items: [
          "Project Charter, business case, VOC, CTQs, SIPOC, process mapping"
        ]
      },
      {
        title: "2. Measure Phase",
        items: [
          "Process statistics, Measurement System Analysis (MSA), Gage R&R, process capability"
        ]
      },
      {
        title: "3. Analyze Phase",
        items: [
          "Root cause analysis, FMEA, multi-vari charts, simple hypothesis testing"
        ]
      },
      {
        title: "4. Improve & Control Phase",
        items: [
          "Solution selection, pilot testing, Poka-Yoke, Control Plans, SPC charts"
        ]
      }
    ],
    lssbb: [
      {
        title: "1. Enterprise Deployment & DMAIC",
        items: [
          "Organizational roadblocks, change management, financial benefit calculation"
        ]
      },
      {
        title: "2. Advanced Measure & Analyze Phases",
        items: [
          "Attribute MSA, advanced capability, ANOVA, multiple regression, non-parametrics"
        ]
      },
      {
        title: "3. Design of Experiments (DOE)",
        items: [
          "Full and fractional factorials, center points, blocking, response surface"
        ]
      },
      {
        title: "4. Lean Enterprise & Control",
        items: [
          "Value Stream Mapping, TPM, SPC control limits, control plan institutionalization"
        ]
      }
    ],
    ccba: [
      {
        title: "1. Business Analysis Planning, Monitoring & Elicitation",
        items: [
          "Approach selection, stakeholder mapping, elicitation preparation and confirmation"
        ]
      },
      {
        title: "2. Requirements Life Cycle Management & Strategy Analysis",
        items: [
          "Requirements traceability, prioritization, strategizing current vs future states"
        ]
      },
      {
        title: "3. Requirements Analysis and Design Definition (RADD)",
        items: [
          "Specify and model requirements, verify/validate requirements, design options"
        ]
      },
      {
        title: "4. Solution Evaluation & CCBA Prep",
        items: [
          "Evaluate solution performance and limitations, exam strategies"
        ]
      }
    ],
    ecba: [
      {
        title: "1. Business Analysis Knowledge & Key Concepts",
        items: [
          "Defining BA role, BABOK Guide v3 outline, core terms and concepts"
        ]
      },
      {
        title: "2. Elicitation, Collaboration & Requirements Lifecycle",
        items: [
          "Basic elicitation (workshops, interviews), requirements tracing basics"
        ]
      },
      {
        title: "3. Requirements Analysis",
        items: [
          "Modeling requirements, specifying requirements, verification checks"
        ]
      },
      {
        title: "4. Foundational BA Techniques",
        items: [
          "Brainstorming, document analysis, process modeling, user stories"
        ]
      }
    ],
    pmi_acp: [
      {
        title: "1. Agile Principles and Mindset",
        items: [
          "Agile manifesto values, principles, and agile mindset",
          "Lean software development, Kaizen, and Scrum frameworks",
          "Kanban systems, WIP limits, and cumulative flow diagrams",
          "Agile servant leadership and team empowerment"
        ]
      },
      {
        title: "2. Value-Driven Delivery & Stakeholder Engagement",
        items: [
          "Define positive value, value stream mapping, and MVP",
          "Agile prioritization (MoSCoW, Kano, relative prioritization)",
          "Build collaborative environments and active stakeholder involvement",
          "Agile communication (information radiators, daily stand-ups)"
        ]
      },
      {
        title: "3. Team Performance & Adaptive Planning",
        items: [
          "High-performance team models (Tuckman stages)",
          "Co-located vs. distributed agile teams",
          "Release and iteration planning, user story mapping",
          "Agile estimation (Planning Poker, Wideband Delphi, Story Points)"
        ]
      },
      {
        title: "4. Problem Detection & Continuous Improvement",
        items: [
          "Identify agile risks, issues, and bottlenecks",
          "Continuous integration, refactoring, and test-driven development (TDD)",
          "Retrospectives, feedback loops, and systemic improvement",
          "PMI-ACP mock exam walkthrough and strategy"
        ]
      }
    ],
    itil: [
      {
        title: "1. Service Management & Value Co-Creation",
        items: [
          "Service management key concepts: Service, Utility, and Warranty",
          "Value co-creation, Service relationship models (Provider, Consumer)",
          "Outcome, Output, Cost, and Risk concepts"
        ]
      },
      {
        title: "2. The Four Dimensions of Service Management",
        items: [
          "Dimension 1: Organizations and People",
          "Dimension 2: Information and Technology",
          "Dimension 3: Partners and Suppliers",
          "Dimension 4: Value Streams and Processes"
        ]
      },
      {
        title: "3. The ITIL Service Value System (SVS) & Guiding Principles",
        items: [
          "Structure of the SVS (Input, Opportunity, Demand, Value)",
          "The 7 ITIL Guiding Principles: Focus on value, Start where you are",
          "Progress iteratively with feedback, Collaborate and promote visibility",
          "Think and work holistically, Keep it simple and practical, Optimize and automate"
        ]
      },
      {
        title: "4. The Service Value Chain & Management Practices",
        items: [
          "Service value chain activities: Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support",
          "ITIL Management Practices: Incident Management, Problem Management, Change Control",
          "Service Desk, Service Level Management, Service Request Management, Continual Improvement"
        ]
      }
    ],
    digital_marketing: [
      {
        title: "1. Search Engine Optimization (SEO) & Keyword Strategy",
        items: [
          "On-page, off-page, and technical SEO configurations",
          "Keyword planning, competitor analysis, search intent mapping",
          "Local SEO and backlink profile building"
        ]
      },
      {
        title: "2. Pay-Per-Click (PPC) Advertising & Google Ads",
        items: [
          "Google search campaigns, display ads, quality score optimization",
          "Bidding models (CPC, CPA, CPM) and budget allocations",
          "Ad copywriting, conversion tracking integration"
        ]
      },
      {
        title: "3. Social Media Marketing & Email Campaigns",
        items: [
          "Facebook, Instagram, LinkedIn ad manager strategies",
          "Audience retargeting and custom lookup audiences",
          "Email list segmentations, automated email workflows, newsletter campaigns"
        ]
      },
      {
        title: "4. Web Analytics & Conversion Rate Optimization (CRO)",
        items: [
          "Google Analytics 4 setup, event tracking, custom dashboards",
          "A/B testing methodologies for high-converting landing pages",
          "Heatmaps, user flow analysis, pixel tracking integrations"
        ]
      }
    ]
  };

  const getCourseInclusions = (c) => {
    if (!c) return [];
    const s = c.slug || '';
    if (s.includes('cpmai')) {
      return [
        { icon: "🏆", label: "21 PDUs Cert" },
        { icon: "🤖", label: "CPMAI Framework" },
        { icon: "📊", label: "Practice Tests" },
        { icon: "📘", label: "AI Study Guide" }
      ];
    }
    if (s.includes('pmp')) {
      return [
        { icon: "🏆", label: "35 PDUs Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('capm')) {
      return [
        { icon: "🏆", label: "23 Contact Hours" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('cbap')) {
      return [
        { icon: "🏆", label: "35 Contact Hours" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('prince2-foundation')) {
      return [
        { icon: "🏆", label: "32 PDUs Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('prince2-practitioner')) {
      return [
        { icon: "🏆", label: "Accredited Training" },
        { icon: "📝", label: "Scenario Guide" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('prince2-combo')) {
      return [
        { icon: "🏆", label: "Accredited Training" },
        { icon: "📝", label: "Combo Guide" },
        { icon: "📊", label: "Practice Tests" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('pgmp')) {
      return [
        { icon: "🏆", label: "21 PDUs Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('rmp')) {
      return [
        { icon: "🏆", label: "30 PDUs Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('lssgb-lssbb-combo')) {
      return [
        { icon: "🏆", label: "LSS Combo Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Statistical Tools" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('lssyb')) {
      return [
        { icon: "🏆", label: "Yellow Belt Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('lssgb')) {
      return [
        { icon: "🏆", label: "Green Belt Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('lssbb')) {
      return [
        { icon: "🏆", label: "Black Belt Cert" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('ccba')) {
      return [
        { icon: "🏆", label: "21 Contact Hours" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('ecba')) {
      return [
        { icon: "🏆", label: "21 Contact Hours" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('pmi-acp')) {
      return [
        { icon: "🏆", label: "21 Contact Hours" },
        { icon: "📝", label: "Simulation Test" },
        { icon: "📊", label: "Practice Test" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    if (s.includes('digital-marketing')) {
      return [
        { icon: "🏆", label: "DM Cert" },
        { icon: "📝", label: "Practical Projects" },
        { icon: "📊", label: "Marketing Toolkits" },
        { icon: "📘", label: "Free E-Guide" }
      ];
    }
    return [
      { icon: "🏆", label: "Accredited Cert" },
      { icon: "📝", label: "Simulation Test" },
      { icon: "📊", label: "Practice Test" },
      { icon: "📘", label: "Free E-Guide" }
    ];
  };


  const getCourseHighlights = (c) => {
    if (!c) return [];
    const titleLower = c.title.toLowerCase();
    const catLower = c.category.toLowerCase();
    
    if (titleLower.includes('pmp') || titleLower.includes('project management professional')) {
      return [
        "Achieve PMP in First Try | 30days Study Plan",
        "35 PDUs | Free Simulation Test | Free Practice Test",
        "Free PMP Exam focused E-Guide (PMBOK Latest Version)",
        "Confirmed training: no cancel, no delay",
        "PMP exam application / Post exam support",
        "Flexible Training Schedules"
      ];
    }
    
    if (titleLower.includes('capm')) {
      return [
        "Master CAPM® Core Concepts | 30 Days Study Plan",
        "23 Contact Hours Certificate for board application",
        "Free Mock Tests & Practice Quizzes",
        "E-Guide aligned with latest PMBOK standard",
        "Confirmed Training schedule: no cancellation",
        "Pre and Post Exam application support"
      ];
    }

    if (catLower.includes('project management') || titleLower.includes('prince2')) {
      return [
        "Clear Certification Prep on First Attempt",
        "Professional PDUs / Contact Hours Certificate",
        "Free Simulation Assessments & Case Studies",
        "Official aligned Exam Prep E-Guides",
        "Confirmed Class: No delays, no cancellations",
        "Pre and Post Exam application support"
      ];
    }

    if (catLower.includes('quality') || titleLower.includes('six sigma')) {
      return [
        "Excel in Lean Six Sigma Certification Prep",
        "Accredited Coursework aligned with Industry standards",
        "Interactive Case Studies & Analytical Toolkits",
        "Guaranteed Pass Study Plan & Simulator Tests",
        "Confirmed Class schedule: no cancellation",
        "24/7 Support and Post-Training advisory"
      ];
    }

    if (catLower.includes('business') || titleLower.includes('cbap') || titleLower.includes('ccba') || titleLower.includes('ecba')) {
      return [
        "Clear IIBA® Certification (ECBA™/CCBA®/CBAP®) Prep",
        "Required PDUs / Contact Hours Certificate",
        "Mock Simulators, Quizzes & Case Studies",
        "Personalized feedback & exam strategy sessions",
        "Confirmed Class schedule: no cancellation",
        "Pre and Post Exam application assistance"
      ];
    }

    return [
      "Clear Certification Exam on First Attempt",
      "Industry Accredited Courseware & PDUs Certificate",
      "Mock Simulators, Chapter Quizzes & Case Studies",
      "Personalized feedback & exam strategy sessions",
      "Confirmed Class schedule: no cancellation",
      "24/7 Lifetime Support and advisory"
    ];
  };

  
  const getCoursePrerequisites = (c) => {
    if (!c) return null;
    const title = c.title.toLowerCase();
    const cat = c.category.toLowerCase();
    const courseShortTitle = c.title.replace(' Certification Training', '').replace(' Certification', '').replace(' Training', '');
    
    if (title.includes('pmp') || title.includes('project management professional')) {
      return {
        title: 'Prerequisites for PMP Certification',
        paths: [
          { name: 'Path A: Four-Year Degree Holder', icon: '🎓', reqs: ['36 months of experience leading projects', '35 hours of project management education/training or CAPM® Certification'] },
          { name: 'Path B: High School / Associate\'s Degree', icon: '📄', reqs: ['60 months of experience leading projects', '35 hours of project management education/training or CAPM® Certification'] }
        ]
      };
    }
    if (title.includes('capm')) {
      return {
        title: 'Prerequisites for CAPM Certification',
        paths: [
          { name: 'Standard Eligibility', icon: '🎓', reqs: ['Secondary degree (high school diploma, associate’s degree or the global equivalent)', '23 hours of project management education completed by the time you sit for the exam'] }
        ]
      };
    }
    if (title.includes('six sigma') || cat.includes('quality')) {
      return {
        title: 'Prerequisites for Six Sigma Certification',
        paths: [
          { name: 'General Requirements', icon: '🎓', reqs: ['No strict prerequisites for Yellow or Green Belt.', 'Black Belt typically requires a Green Belt certification or equivalent project experience.', 'Completion of our accredited training program.'] }
        ]
      };
    }
    if (title.includes('prince2')) {
      return {
        title: 'Prerequisites for PRINCE2 Certification',
        paths: [
          { name: 'Foundation', icon: '🎓', reqs: ['No formal prerequisites, though some project management experience is beneficial.'] },
          { name: 'Practitioner', icon: '📄', reqs: ['Must hold PRINCE2 Foundation, PMP, CAPM, or an IPMA certification.'] }
        ]
      };
    }
    return {
      title: 'Prerequisites for ' + courseShortTitle + ' Certification',
      paths: [
        { name: 'General Eligibility', icon: '🎓', reqs: ['No strict prerequisites required.', 'Basic understanding of industry concepts is recommended.'] }
      ]
    };
  };

  const getCourseCareerPaths = (c) => {
    if (!c) return [];
    const title = c.title.toLowerCase();
    const cat = c.category.toLowerCase();
    
    if (title.includes('pmp') || title.includes('capm') || cat.includes('project management')) {
      return [
        { role: 'Project Manager', icon: '📊', color: 'blue' },
        { role: 'Program Manager', icon: '📋', color: 'violet' },
        { role: 'Project Coordinator', icon: '👥', color: 'amber' },
        { role: 'Project Director', icon: '🎯', color: 'rose' },
        { role: 'Business Analyst', icon: '💼', color: 'emerald' },
        { role: 'Project Consultant', icon: '🔍', color: 'cyan' }
      ];
    }
    if (title.includes('six sigma') || cat.includes('quality')) {
      return [
        { role: 'Quality Assurance Manager', icon: '📊', color: 'blue' },
        { role: 'Process Improvement Specialist', icon: '📈', color: 'emerald' },
        { role: 'Lean Six Sigma Consultant', icon: '🔍', color: 'violet' },
        { role: 'Operations Manager', icon: '⚙️', color: 'amber' },
        { role: 'Quality Engineer', icon: '🛠️', color: 'rose' },
        { role: 'Continuous Improvement Lead', icon: '🚀', color: 'cyan' }
      ];
    }
    if (title.includes('business analysis') || cat.includes('business')) {
      return [
        { role: 'Business Analyst', icon: '📊', color: 'blue' },
        { role: 'Data Analyst', icon: '📈', color: 'emerald' },
        { role: 'Systems Analyst', icon: '💻', color: 'violet' },
        { role: 'Product Owner', icon: '👑', color: 'amber' },
        { role: 'Requirements Manager', icon: '📋', color: 'rose' },
        { role: 'Business Consultant', icon: '🤝', color: 'cyan' }
      ];
    }
    return [
      { role: 'Industry Specialist', icon: '🌟', color: 'blue' },
      { role: 'Team Lead', icon: '👥', color: 'violet' },
      { role: 'Manager', icon: '💼', color: 'emerald' },
      { role: 'Consultant', icon: '🔍', color: 'amber' }
    ];
  };


      const getTrainingSolutionsCards = (c) => {
    if (!c) return [];
    const pKey = getCoursePricingKey(c);
    const pData = coursePricingMatrix[pKey] || coursePricingMatrix.pmp;
    const isIndia = selectedCountry.code === 'IN';
    const cTitle = c.title || 'Course';

    const getPriceDisplay = (modeData) => {
      if (!modeData || modeData.isContact) {
        return { isContact: true, priceText: 'Contact us page', stdPriceText: '' };
      }
      const spc = isIndia ? modeData.inrSpc : modeData.usdSpc;
      const std = isIndia ? modeData.inrStd : modeData.usdStd;
      return {
        isContact: false,
        priceText: formatPrice(spc),
        stdPriceText: formatPrice(std)
      };
    };

    const sp = getPriceDisplay(pData.selfPaced);
    const lo = getPriceDisplay(pData.liveOnline);
    const te = getPriceDisplay(pData.trainingExam);
    const cl = getPriceDisplay(pData.classroom);
    const co = getPriceDisplay(pData.corporate);

    return [
      {
        title: 'Self-Paced (E-Learning)',
        icon: '📖',
        gradient: 'from-amber-500 to-yellow-500',
        bg: 'from-amber-50 to-amber-50/30',
        border: 'border-amber-100',
        priceInfo: sp,
        duration: pData.selfPaced.duration || '1 Year',
        actionType: 'enroll',
        modeName: 'Self Study',
        items: [
          '1 Year 24/7 unlimited access to HD learning portal',
          `${cTitle} downloadable slides, summaries & templates`,
          'Self-paced progress tracking & analytics',
          'Chapter-end knowledge assessments & quizzes',
          `Full-length ${cTitle} practice exam simulators`,
          `Accredited Certificate of Completion`,
          'Multi-device support (Desktop, Tablet, Mobile)',
          'Learn at your own speed with zero deadlines',
          '100% Money-Back Guarantee',
          'Free updates to latest syllabus & guidelines'
        ]
      },
      {
        title: 'Live Online Interactive',
        icon: '💻',
        gradient: 'from-blue-500 to-primary',
        bg: 'from-blue-50 to-blue-50/30',
        border: 'border-blue-100',
        priceInfo: lo,
        duration: pData.liveOnline.duration || 'Bootcamp',
        actionType: 'enroll',
        modeName: 'Live Online',
        items: [
          `${pData.liveOnline.duration || 'Interactive'} ${cTitle} Live Virtual Bootcamp`,
          `Certified ${cTitle} Master Instructor with 15+ Yrs Exp`,
          `Official ${cTitle} Study Guide & Exam Blueprint E-Book`,
          'Interactive scenario workshops & case studies',
          `30-Day Pass Strategy — Ace ${cTitle} on 1st Attempt`,
          `Official Contact Hours / PDUs Certificate`,
          '100% Money-Back Guarantee',
          'HD Video Class Recordings for lifetime revision',
          'Pre & Post Exam Application Guidance',
          '24/7 Dedicated Student Mentor Support'
        ]
      },
      {
        title: 'Training + Exam Prep',
        icon: '📊',
        gradient: 'from-violet-500 to-purple-500',
        bg: 'from-violet-50 to-violet-50/30',
        border: 'border-violet-100',
        priceInfo: te,
        duration: pData.trainingExam.duration || 'Comprehensive',
        actionType: 'enroll',
        modeName: 'E-Learning',
        items: [
          'All-in-one Hybrid Bootcamp & Exam Guarantee Bundle',
          `Focused 1-on-1 strategy to pass ${cTitle} on 1st try`,
          `Official ${cTitle} Exam Prep Toolkit & Flashcards`,
          `Official Contact Hours / PDUs Certificate`,
          'Unlimited mock test simulation attempts with diagnostics',
          '1-on-1 personalized doubt-clearing sessions with trainer',
          '100% Money-Back Guarantee',
          `${cTitle} Exam Application Audit & Writeup Review`,
          'Domain-by-domain weak area remediation',
          'Continuous dedicated mentor support until certified'
        ]
      },
      {
        title: 'Physical Classroom',
        icon: '🏛️',
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'from-emerald-50 to-emerald-50/30',
        border: 'border-emerald-100',
        priceInfo: cl,
        duration: pData.classroom.duration || 'In-Person',
        actionType: 'contact',
        modeName: 'Classroom',
        items: [
          `${pData.classroom.duration || 'In-Person'} Face-to-Face ${cTitle} Classroom Workshop`,
          'Interactive hands-on team exercises & breakout sessions',
          `Senior Master ${cTitle} Instructor conducting live class`,
          `Printed physical course binder & digital study kit`,
          'Real-world industry case study simulations',
          `30-Day Step-by-Step Study Roadmap`,
          `Official Contact Hours / PDUs Certificate`,
          '100% Money-Back Guarantee',
          'Pre & Post Exam Personal Consultation',
          'Networking with peer industry professionals'
        ]
      },
      {
        title: 'Corporate / Group Training',
        icon: '🏢',
        gradient: 'from-rose-500 to-pink-500',
        bg: 'from-rose-50 to-rose-50/30',
        border: 'border-rose-100',
        priceInfo: co,
        duration: 'Custom',
        actionType: 'contact',
        modeName: 'Corporate',
        items: [
          `Tailored Enterprise Curriculum for ${cTitle}`,
          'Senior Industry Master Instructor assigned to team',
          'Customized case studies aligned with your industry domain',
          'Hands-on team projects & live workflow exercises',
          `Enterprise ${cTitle} Team Competency Blueprint`,
          `Official Contact Hours / PDUs Certificates for all attendees`,
          '100% Money-Back Guarantee',
          'Flexible schedule options (Weekdays, Weekends, Onsite)',
          'Attractive corporate volume pricing discounts',
          'Dedicated enterprise dashboard & progress reports'
        ]
      }
    ];
  };

  const getDetailedKeyFeatures = (c) => {
    if (!c) return [];
    const titleLower = (c.title || '').toLowerCase();
    const catLower = (c.category || '').toLowerCase();
    
    // 1. PMP
    if (titleLower.includes('pmp') || titleLower.includes('project management professional')) {
      return [
        "32 Hours of PMP Exam Prep Training by PMI Authorized Instructors",
        "Certified PMP Master Trainer with 15+ Yrs Leadership Experience",
        "Latest PMBOK® Guide 7th Edition & Process Groups Practice Guide",
        "35 Contact Hours / PDUs Official Certificate for PMI Application",
        "30-Day Step-by-Step Pass Strategy on 1st Attempt",
        "Full-Length Exam Simulators, Situational Questions & Domain Quizzes",
        "100% Money-Back Guarantee",
        "Confirmed Training Schedules (No Delay / No Cancellation)",
        "Pre & Post Exam PMI Application Audit Assistance",
        "24/7 Dedicated Mentor Support and Advisory"
      ];
    }
    
    // 2. PRINCE2
    if (titleLower.includes('prince2') || titleLower.includes('prince')) {
      return [
        "Official PeopleCert / AXELOS Accredited PRINCE2 Training",
        "Senior Certified PRINCE2 Practitioner Trainer with 12+ Yrs Experience",
        "Official Managing Successful Projects with PRINCE2 7th Ed E-Guide",
        "16 to 32 Contact Hours / CPD Certificate",
        "PeopleCert Official Exam Voucher & Online Proctoring Guidance",
        "7 Principles, 7 Themes & 7 Processes Practical Diagram Blueprints",
        "100% Money-Back Guarantee",
        "Confirmed Training Dates & Timetables",
        "Pre & Post Exam Registration & Booking Support",
        "24/7 Expert Mentor Advisory"
      ];
    }

    // 3. Lean Six Sigma / Quality
    if (catLower.includes('quality') || titleLower.includes('six sigma') || titleLower.includes('lean') || titleLower.includes('lss')) {
      return [
        "Accredited IASSC / ASQ Aligned DMAIC Quality Training",
        "Master Black Belt Certified Trainer with 20+ Yrs Industry Experience",
        "Minitab & Excel Statistical Analysis Toolkits & Template Libraries",
        "Real-World Industry Quality Case Studies & Process Mapping",
        "30 to 35 PDUs & Practical Quality Project Completion Certificate",
        "Chapter-wise Assessments & Full-length IASSC Mock Exams",
        "100% Money-Back Guarantee",
        "Confirmed Class Schedule (No Cancellation)",
        "Project Submission Guidance & Mentorship",
        "24/7 Technical Advisory & Lifetime Support"
      ];
    }

    // 4. Business Analysis (CBAP, CCBA, ECBA)
    if (catLower.includes('business') || titleLower.includes('cbap') || titleLower.includes('ccba') || titleLower.includes('ecba')) {
      return [
        "Official IIBA® BABOK® Guide v3 Aligned Business Analysis Prep",
        "Certified CBAP Specialist Trainer with 15+ Yrs Industry Practice",
        "IIBA Endorsed 21 to 35 Professional Development (PD) Hours Certificate",
        "Requirements Elicitation, Stakeholders Analysis & Traceability Toolkits",
        "Free Chapter Simulation Quizzes & Full-length IIBA Mock Exams",
        "Ace IIBA Certification on 1st Attempt Study Plan",
        "100% Money-Back Guarantee",
        "Confirmed Batch Dates & Guaranteed Schedules",
        "IIBA Exam Application Review & Audit Guidance",
        "24/7 Personal Mentor Assistance"
      ];
    }

    // 5. CAPM
    if (titleLower.includes('capm') || titleLower.includes('certified associate')) {
      return [
        "23 Contact Hours Official Certificate to Qualify for PMI CAPM Exam",
        "PMBOK Guide & Business Analysis Framework Coverage for CAPM ECO",
        "Certified PMP/CAPM Instructor with 12+ Yrs Experience",
        "Fundamental Predictive, Agile & Business Analysis Practice Sets",
        "30-Day Step-by-Step CAPM Exam Pass Plan",
        "100% Money-Back Guarantee",
        "Guaranteed Class Dates & Timetables",
        "PMI Membership & CAPM Exam Application Guidance",
        "24/7 Continuous Student Support",
        "Lifetime Access to Course Materials & Updates"
      ];
    }

    // 6. Agile / PMI-ACP
    if (catLower.includes('agile') || titleLower.includes('acp') || titleLower.includes('scrum')) {
      return [
        "21 Contact Hours / PDUs Official Certificate for PMI-ACP Eligibility",
        "Comprehensive Coverage of Scrum, Kanban, Lean, XP & SAFe Frameworks",
        "Certified Agile Practitioner Instructor with 15+ Yrs Practice",
        "User Story Mapping, Sprint Velocity & Backlog Prioritization Worksheets",
        "Full-length PMI-ACP Mock Exams & Situational Scenario Assessments",
        "100% Money-Back Guarantee",
        "Guaranteed Class Schedules & No Cancellation Policy",
        "PMI-ACP Application Audit & Experience Writeup Assistance",
        "24/7 Lifetime Agile Advisory Support",
        "Agile Team Leadership & Retrospective Toolkits"
      ];
    }

    // 7. Program & Risk (PgMP, PfMP, PMI-RMP)
    if (titleLower.includes('pgmp') || titleLower.includes('pfmp') || titleLower.includes('risk') || titleLower.includes('rmp')) {
      return [
        "Advanced Program Strategy & Portfolio Governance Alignment",
        "30 to 45 PDUs Senior Credential Certificate",
        "PMI Senior Credential Certified Executive Trainer",
        "Program Stakeholder Engagement & Risk Response Strategies",
        "PgMP Application Experience Summaries & Panel Review Guidance",
        "100% Money-Back Guarantee",
        "Guaranteed Executive Class Dates",
        "24/7 Senior Executive Advisory",
        "Full Simulation Mock Panel Assessments",
        "Strategic Benefit Realization Frameworks"
      ];
    }

    // Fallback General
    return [
      "Live Instructor-Led Interactive Training",
      "Certified Expert Instructors with 10+ Yrs experience",
      "Exam focused Study Guides & E-Guides",
      "Chapter review assessments & practice mock exams",
      "Guaranteed success study plan & exam strategies",
      "PDUs / Contact Hours accredited certificate",
      "100% Money-Back Guarantee",
      "Confirmed class schedule: no delay, no cancellation",
      "Full exam application assistance & guidelines",
      "24/7 Lifetime Support and advisory"
    ];
  };
  // Scroll to top on page load / slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetail = async () => {
      setLoading(true);
      let foundCourse = null;
      let targetSlug = (slug || '').toLowerCase().trim();
      if (slugAliasMap[targetSlug]) {
        targetSlug = slugAliasMap[targetSlug];
      }

      try {
        const res = await api.get(`/courses/${targetSlug}`, { withCredentials: false });
        if (res.data && res.data.success && res.data.course) {
          foundCourse = res.data.course;
        }
      } catch (error) {
        console.warn('API fetch failed, falling back to static course data for:', slug);
      }

      if (!foundCourse) {
        foundCourse = initialCourses.find(
          c => c.slug.toLowerCase() === targetSlug ||
               c.id?.toLowerCase() === targetSlug ||
               c._id?.toLowerCase() === targetSlug ||
               targetSlug.includes(c.id?.toLowerCase() || '___') ||
               (c.slug && c.slug.toLowerCase().includes(targetSlug))
        );
      }

      if (foundCourse) {
        setCourse(foundCourse);
        setReviewsList([
          {
            name: 'John Doe',
            role: 'Senior Project Manager',
            rating: 5,
            date: '12 Jan 2026',
            comment: 'Absolutely phenomenal course! The live sessions were interactive and the mock exams prep was exactly like the real board exam.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
          },
          {
            name: 'Sanjna Sharma',
            role: 'Lead Business Analyst',
            rating: 5,
            date: '08 Jan 2026',
            comment: 'Very comprehensive curriculum. The instructor was engaging and explained complex hybrid agile frameworks extremely well.',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
          },
          {
            name: 'Rajesh Verma',
            role: 'Quality Assurance Lead',
            rating: 5,
            date: '24 Dec 2025',
            comment: 'Cleared my certification on the 1st attempt! The study guide, situational practice tests, and 24/7 mentor support made all the difference.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
          },
          {
            name: 'Ananya Deshmukh',
            role: 'Scrum Master & Agile Coach',
            rating: 5,
            date: '18 Dec 2025',
            comment: 'The training materials and practice simulators were top-notch. Loved the practical case studies and real-world domain breakdown.',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
          },
          {
            name: 'Tomas M. Melendez',
            role: 'Operations Manager',
            rating: 5,
            date: '02 Dec 2025',
            comment: 'Exceptional training quality and seamless LMS portal access. Highly recommended for working professionals looking to upskill.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80'
          },
          {
            name: 'Kavita Nair',
            role: 'Program Management Specialist',
            rating: 5,
            date: '15 Nov 2025',
            comment: 'LearnersKart provided unmatched guidance throughout my exam application and preparation. The 30-day pass strategy really works!',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
          }
        ]);
      }
      setLoading(false);
    };

    if (slug) {
      fetchCourseDetail();
    }
  }, [slug]);

  const parseBatchStartDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    try {
      const yearMatch = dateStr.match(/\b(202\d)\b/);
      const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();
      
      const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      const words = dateStr.toLowerCase().split(/[\s,\-\&]+/);
      let monthIndex = -1;
      let day = 1;
      
      for (let word of words) {
        const mIdx = monthNames.findIndex(m => word.startsWith(m));
        if (mIdx !== -1) {
          monthIndex = mIdx;
          break;
        }
      }
      
      if (monthIndex === -1) return new Date(0);
      
      const dayMatch = dateStr.match(/\b\d+\b/);
      if (dayMatch) {
        day = parseInt(dayMatch[0]);
      }
      
      return new Date(year, monthIndex, day);
    } catch (e) {
      console.error('Error parsing batch date:', e);
      return new Date(0);
    }
  };

  // Generate upcoming batch dates dynamically using database schedules
  const getBatchDates = () => {
    if (schedules.length === 0) {
      return ['Flexible Schedule'];
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureList = schedules.filter(batch => {
      const batchStart = parseBatchStartDate(batch.date);
      return batchStart >= today;
    });

    const activeList = futureList.length > 0 ? futureList : schedules;
    
    // Sort so weekday batch is Batch-1, weekend batch is Batch-2
    const sortedList = [...activeList].sort((a, b) => {
      if (a.weekday && !b.weekday) return -1;
      if (!a.weekday && b.weekday) return 1;
      return 0;
    });

    const dates = [];
    sortedList.forEach(item => {
      const label = `${item.date} (${item.weekday ? 'weekday batch' : 'weekend batch'})`;
      dates.push(label);
    });

    return dates;
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!course) return;
      try {
        const res = await api.get(`/schedules?courseId=${course._id}`);
        if (res.data.success) {
          setSchedules(res.data.schedules);
        }
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
      }
    };
    fetchSchedules();
  }, [course]);

  useEffect(() => {
    if (schedules.length > 0) {
      setSelectedBatch(getBatchDates()[0]);
    }
  }, [schedules]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center py-20 px-6">
        <HelpCircle className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="font-extrabold text-2xl text-textdark">Course Not Found</h2>
        <p className="text-sm text-textmuted mt-2">The course you are looking for does not exist or has been moved.</p>
        <Link to="/courses" className="bg-primary text-white font-bold px-6 py-3 rounded-lg mt-6 shadow">
          Browse All Courses
        </Link>
      </div>
    );
  }

  const isCapm = course && (course.slug?.includes('capm') || course.title?.toLowerCase().includes('capm'));
  const isPrince2Practitioner = course && (course.slug?.includes('practitioner') || course.title?.toLowerCase().includes('practitioner'));
  const isPrince2 = course && (course.slug?.includes('prince2') || course.title?.toLowerCase().includes('prince2'));
  const isCbap = course && (course.slug?.includes('cbap') || course.slug?.includes('ccba') || course.slug?.includes('ecba') || course.title?.toLowerCase().includes('cbap') || course.title?.toLowerCase().includes('business analysis'));
  const isPmiAcp = course && (course.slug?.includes('pmi-acp') || course.slug?.includes('pmi_acp') || course.slug?.includes('acp') || course.title?.toLowerCase().includes('acp') || course.title?.toLowerCase().includes('agile certified practitioner'));
  const isSixSigma = course && (course.slug?.includes('six-sigma') || course.slug?.includes('six_sigma') || course.slug?.includes('lss') || course.slug?.includes('belt') || course.title?.toLowerCase().includes('six sigma') || course.title?.toLowerCase().includes('green belt') || course.title?.toLowerCase().includes('black belt') || course.title?.toLowerCase().includes('yellow belt') || course.category?.toLowerCase().includes('quality'));
  const isPgmp = course && (course.slug?.includes('pgmp') || course.slug?.includes('program-management') || course.title?.toLowerCase().includes('pgmp') || course.title?.toLowerCase().includes('program management'));
  const courseShortTitle = course ? course.title.replace(' Certification Training', '').replace(' Certification', '').replace(' Training', '') : '';
  const coursePdusText = course && course.pdus ? `${course.pdus} PDUs` : 'Completion certificate';

  const getSyllabusForCourse = () => {
    if (!course) return null;
    const s = course.slug || '';
    if (s.includes('cpmai')) return allCourseSyllabuses.cpmai;
    if (s.includes('pmp') || s.includes('project-management-professional')) return allCourseSyllabuses.pmp;
    if (s.includes('capm')) return allCourseSyllabuses.capm;
    if (s.includes('cbap')) return allCourseSyllabuses.cbap;
    if (s.includes('ccba')) return allCourseSyllabuses.cbap;
    if (s.includes('ecba')) return allCourseSyllabuses.cbap;
    if (s.includes('prince2-foundation')) return allCourseSyllabuses.prince2_foundation;
    if (s.includes('prince2-practitioner')) return allCourseSyllabuses.prince2_practitioner;
    if (s.includes('prince2')) return allCourseSyllabuses.prince2_foundation;
    if (s.includes('pmi-acp')) return allCourseSyllabuses.pmi_acp;
    if (s.includes('lssgb-lssbb-combo')) return allCourseSyllabuses.lssgb_lssbb_combo;
    if (s.includes('yellow-belt')) return allCourseSyllabuses.lssyb;
    if (s.includes('lssyb')) return allCourseSyllabuses.lssyb;
    if (s.includes('green-belt')) return allCourseSyllabuses.lssgb;
    if (s.includes('lssgb')) return allCourseSyllabuses.lssgb;
    if (s.includes('black-belt')) return allCourseSyllabuses.lssbb;
    if (s.includes('lssbb')) return allCourseSyllabuses.lssbb;
    if (s.includes('digital-marketing')) return allCourseSyllabuses.digital_marketing;
    if (s.includes('itil')) return allCourseSyllabuses.itil;
    return null;
  };
  const currentSyllabus = getSyllabusForCourse();

  const discountPercent = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) 
    : 0;

  const isAlreadyInCart = cartItems.some(item => item._id === course._id);

  // Enroll Now adds course to cart and redirects directly to Checkout page with login check
    const handleEnrollNow = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (course) {
      // Always add to cart first so it persists in localStorage before any redirect
      addToCart(course, selectedMode || cohortMode || 'Live Online', selectedBatch || 'Live Batch');
    }

    if (!user) {
      try {
        localStorage.setItem('lk_login_notice', 'Please log in to enroll in a course.');
      } catch(e) {}
      navigate('/login?redirect=checkout');
      return;
    }

    const checkoutUrl = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
      ? 'http://localhost:5173/checkout'
      : 'https://learnerskart.com/checkout';

    if (typeof window !== 'undefined' && window.top && window.top !== window) {
      // Message parent and redirect parent window to Checkout Page
      const payload = {
        type: 'LK_REDIRECT_CHECKOUT',
        courseId: course?._id,
        slug: course?.slug || slug,
        courseTitle: course?.title,
        price: getCalculatedDetailPrice()
      };
      window.top.postMessage(payload, '*');
      window.top.location.href = checkoutUrl;
      return;
    }

    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    handleEnrollNow(e);
  };

  // Submit Review Form
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview = {
      name: user?.name || 'Anonymous Learner',
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      comment: reviewComment
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setReviewComment('');
    setReviewRating(5);
  };


  // Share Course links
  const shareText = encodeURIComponent(`Check out this certification training on LearnersKart: ${course.title}`);
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="min-h-screen bg-slate-50 select-none text-left">
      
      {/* 1. HERO BANNER */}
      <div className="bg-primary text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-light/40 via-transparent to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm self-start inline-block mb-6 text-xs font-semibold">
            <Breadcrumb 
              items={[
                { label: 'Courses', url: '/courses' },
                { label: course.category, url: `/courses?category=${encodeURIComponent(course.category)}` },
                { label: course.title }
              ]} 
              light={true} 
            />
          </div>

          {/* Breadcrumb & Title Header */}
          <div className="space-y-4 text-left">
            {/* Badges */}
            <div className="flex gap-2">
              <span className="bg-accent text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm">
                {course.category}
              </span>
              <span className="bg-white/15 border border-white/20 text-blue-100 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
                {course.level}
              </span>
            </div>

            {/* Title (Course Name) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {course.title}
            </h1>
          </div>

          {/* Horizontal Banner Widget */}
          <div className="bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-150/45 p-8 mt-8 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Banner: left (Crisp Instructor / Professional Portrait) */}
              <div className="lg:col-span-5 rounded-2xl relative bg-slate-50 border border-slate-200/80 shadow-sm overflow-hidden flex items-center justify-center h-[340px] w-full">
                <img
                  src={getCourseInstructorHighlightImage(course)}
                  alt={course.title || "Expert Instructor"}
                  className="w-full h-full object-contain bg-white object-center rounded-2xl p-1"
                />
              </div>

              {/* Right Column: KEY HIGHLIGHTS */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-base">✨</span>
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">Key Highlights</h3>
                </div>

                {/* 2-column grid of highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(getDetailedKeyFeatures(course) || []).map((fText, i) => {
                    const highlightMeta = [
                      { icon: '⏱️', color: 'bg-blue-500' },
                      { icon: '👨‍🏫', color: 'bg-violet-500' },
                      { icon: '📖', color: 'bg-emerald-500' },
                      { icon: '🧪', color: 'bg-orange-500' },
                      { icon: '🎯', color: 'bg-rose-500' },
                      { icon: '🏅', color: 'bg-amber-500' },
                      { icon: '💰', color: 'bg-green-500' },
                      { icon: '🗓️', color: 'bg-cyan-500' },
                      { icon: '✅', color: 'bg-teal-500' },
                      { icon: '📝', color: 'bg-indigo-500' }
                    ];
                    const meta = highlightMeta[i % highlightMeta.length];
                    return (
                      <div key={i} className="flex items-center gap-2.5 bg-slate-50/80 border border-slate-100 rounded-xl p-2.5 hover:bg-white hover:shadow-sm transition-all group">
                        <div className={`w-7 h-7 ${meta.color} rounded-lg flex items-center justify-center text-xs flex-shrink-0 shadow-sm text-white`}>
                          {meta.icon}
                        </div>
                        <span className="text-[11px] leading-tight font-bold text-slate-700">{fText}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PAGE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ~70% (8 cols) when Overview is active on desktop, 12 cols otherwise */}
          <div className={`${activeTab === 'Overview' ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-8 transition-all duration-300`}>
            
            {/* Mobile-only cropped cover image shown on top of the block */}
            {activeTab === 'Overview' && (
              <div className="block lg:hidden h-[220px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img
                  src={getCourseCoverPoster(course)}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '78% center' }}
                />
              </div>
            )}

            {/* Confirmed Quality Badges — Premium Cards inside Left Column */}
            {activeTab === 'Overview' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-primary rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    📅
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">Confirmed Classes</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">Always on, no delays</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">100% Guaranteed</span>
                </div>

                {/* Card 2 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-purple-400 rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-violet-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    🎓
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">Pro Instructors</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">15+ Yrs Industry Lead</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">PMI® Certified</span>
                </div>

                {/* Card 3 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    📈
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">High Pass Rate</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">Proven exam success</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">98% Pass Rate</span>
                </div>

                {/* Card 4 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    💼
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">Hands-On Practice</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">Real-world scenarios</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Case Studies</span>
                </div>

                {/* Card 5 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    🛠️
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">Career Curriculum</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">Industry-relevant skills</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">Job-Ready</span>
                </div>

                {/* Card 6 */}
                <div className="group relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-t-2xl" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-cyan-50 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    ⏰
                  </div>
                  <p className="font-black text-sm text-textdark leading-tight">Flexible Learning</p>
                  <p className="text-[11px] text-textmuted mt-1 font-semibold">Adapts to your schedule</p>
                  <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Live + Self-Paced</span>
                </div>
              </div>
            )}

            {/* Premium Sticky Tabs Navigation */}
            <div className={`bg-white border border-slate-100 shadow-md rounded-2xl px-2 py-2 flex overflow-x-auto ${hideNav ? 'relative' : 'sticky top-[73px] z-20'}`}>
              {[
                { name: 'Overview', icon: '📋' },
                { name: 'Key Features', icon: '⭐' },
                { name: 'Curriculum', icon: '📚' },
                { name: 'Prerequisites', icon: '✅' },
                { name: 'Schedule', icon: '📅' },
                { name: 'FAQ', icon: '❓' },
                { name: 'Testimonials', icon: '💬' },
              ].map(({ name, icon }) => (
                <button
                  key={name}
                  onClick={() => handleTabClick(name)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    activeTab === name
                      ? 'bg-primary text-white shadow-md scale-[1.02]'
                      : 'text-slate-500 hover:text-primary hover:bg-primary/8'
                  }`}
                >
                  <span className="text-base leading-none">{icon}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            {/* 1. OVERVIEW SECTION */}
            <div id="overview" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">📋</div>
                  <div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">{course.title} — Overview</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">{course.category} Certification</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {course.description || course.shortDescription || `LearnersKart's ${course.title} is designed to fast-track your career with a structured, practical, and exam-oriented approach. Guided by expert instructors, our training ensures you're fully prepared to clear your certification on the first attempt.`}
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: '🏆', label: course.pdus ? `${course.pdus} PDUs` : 'PDUs', sub: 'Contact Hours' },
                    { icon: '📖', label: course.lessons ? (Array.isArray(course.lessons) ? `${course.lessons.length} Lessons` : `${course.lessons} Lessons`) : 'Expert', sub: 'Curriculum' },
                    { icon: '✅', label: '98% Pass', sub: 'Rate Achieved' },
                    { icon: '🛡️', label: '100%', sub: 'Money-Back' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-primary/5 to-blue-50/30 border border-primary/10 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <p className="font-black text-primary text-base">{stat.label}</p>
                      <p className="text-[11px] text-textmuted font-semibold">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ~30-32% (4 cols) Sticky Sidebar (Course Cover Image + Price + Training Modes + Enroll Now/Cart) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            {/* Course Cover Poster Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white p-2">
              <img
                src={getCourseCoverPoster(course)}
                alt={course?.title || "Course Cover"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://learnerskart.com/course_images/pmp-v6.jpg';
                }}
                className="w-full h-auto object-contain rounded-xl drop-shadow-sm"
              />
            </div>

            {/* Pricing & Modes Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 text-left">
              {/* Price */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Price
                </label>
                {getCalculatedDetailPrice() === null ? (
                  <span className="text-2xl font-black text-slate-500 uppercase tracking-wide">Contact Advisor</span>
                ) : course.isFree || course.price === 0 ? (
                  <span className="text-3xl font-black text-emerald-600 tracking-wide uppercase">Free</span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">{formatPrice(getCalculatedDetailPrice())}</span>
                    {getCalculatedDetailOriginalPrice() && (
                      <span className="text-sm text-slate-400 line-through">{formatPrice(getCalculatedDetailOriginalPrice())}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Training Modes Selector Dropdown */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                  Training Modes
                </label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-primary transition-all text-slate-800"
                >
                  <option value="Live Online">Live Online</option>
                  <option value="Classroom">Classroom</option>
                  <option value="E-Learning">Training + Exam</option>
                  <option value="Self Study">Self Study</option>
                </select>
              </div>

              {/* Purchase Buttons: Enroll Now & Cart */}
              <div className="space-y-2 pt-1">
                {getCalculatedDetailPrice() === null ? (
                  <Link
                    to="/contact"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-xs flex items-center justify-center gap-1.5 uppercase cursor-pointer tracking-wider"
                  >
                    Contact Advisor
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleEnrollNow}
                      className="flex-1 bg-accent hover:bg-accent-dark text-white font-extrabold py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-xs flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
                    >
                      Enroll Now
                    </button>

                    {!course.isFree && course.price > 0 && (
                      <button
                        onClick={handleAddToCart}
                        disabled={isAlreadyInCart}
                        className={`px-4 py-3 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                          isAlreadyInCart
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                            : 'bg-white text-primary border-primary/35 hover:bg-primary hover:text-white hover:border-primary shadow-sm'
                        }`}
                      >
                        <ShoppingCart size={13} />
                        {isAlreadyInCart ? 'Added' : 'Cart'}
                      </button>
                    )}
                  </div>
                )}

                {/* Guarantee badge */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-100 py-1.5 rounded-lg">
                  <span>🛡️ 100% Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════
            FULL-WIDTH REST OF PAGE CONTENT
            ═══════════════════════════════════════════════════════ */}
        <div className="space-y-10">

          {/* ═══════════════════════════════════════════════════════
              3. TRAINING SOLUTIONS (Course Specific)
          ═══════════════════════════════════════════════════════ */}
            <div id="training-solutions" className="scroll-mt-36">
              <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/50 border border-blue-100/80 shadow-md rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-[0.03]"></div>
                <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-xl">🎓</div>
                  <div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">Training Solutions for {course.title || courseShortTitle}</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">Choose the learning format that best fits your goals and schedule</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {getTrainingSolutionsCards(course).map((sol, si) => (
                    <div key={si} className={`relative overflow-hidden border ${sol.border} rounded-2xl bg-gradient-to-br ${sol.bg} hover:shadow-md transition-all h-full flex flex-col justify-between`}>
                      <div>
                        <div className={`h-1.5 w-full bg-gradient-to-r ${sol.gradient}`} />
                        <div className="p-4">
                          <div className="flex flex-col items-center gap-1 mb-3 text-center">
                            <span className="text-3xl">{sol.icon}</span>
                            <h3 className="font-black text-[13px] text-textdark leading-tight">{sol.title}</h3>
                            <span className="text-[10px] font-bold text-slate-400">{sol.duration}</span>
                          </div>

                          {/* Pricing Tag */}
                          <div className="my-3 py-2 px-3 bg-white/90 border border-slate-200/60 rounded-xl text-center shadow-xs">
                            {sol.priceInfo.isContact ? (
                              <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                                Contact us page
                              </span>
                            ) : (
                              <div>
                                <div className="flex items-center justify-center gap-1.5">
                                  <span className="text-base font-black text-primary">{sol.priceInfo.priceText}</span>
                                  {sol.priceInfo.stdPriceText && (
                                    <span className="text-[10px] text-slate-400 line-through">{sol.priceInfo.stdPriceText}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <ul className="space-y-1.5 mb-4">
                            {sol.items.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-1.5 text-[10px] font-semibold text-slate-600 leading-snug">
                                <span className="text-emerald-500 font-black flex-shrink-0 mt-0.5">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <div className="p-4 pt-0">
                        {sol.actionType === 'contact' || sol.priceInfo.isContact ? (
                          <Link
                            to="/contact"
                            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl shadow-xs transition-all text-[11px] flex items-center justify-center gap-1 uppercase tracking-wider block text-center"
                          >
                            Contact us page
                          </Link>
                        ) : (
                          <button
                            onClick={(e) => {
                              setSelectedMode(sol.modeName);
                              handleEnrollNow(e);
                            }}
                            className="w-full bg-accent hover:bg-accent-dark text-white font-extrabold py-2.5 rounded-xl shadow-xs transition-all text-[11px] flex items-center justify-center gap-1 uppercase tracking-wider cursor-pointer"
                          >
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                4. UPCOMING SCHEDULES
            ═══════════════════════════════════════════════════════ */}
            <div id="schedule" className="scroll-mt-36 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-100 shadow-sm rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-xl">📅</div>
                  <div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">Upcoming Schedules</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">Filter and choose a batch to register.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select value={scheduleTrainingMode} onChange={(e) => setScheduleTrainingMode(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-primary transition-all">
                    <option value="Live Online">Live Online</option>
                    <option value="Training + Exam">Training + Exam</option>
                    <option value="Self Study">Self Study</option>
                  </select>
                  <select value={scheduleTypeFilter} onChange={(e) => setScheduleTypeFilter(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-primary transition-all">
                    <option value="All">All Schedule Types</option>
                    <option value="Weekday">Weekday</option>
                    <option value="Weekend">Weekend</option>
                  </select>
                  <select value={scheduleMonthFilter} onChange={(e) => setScheduleMonthFilter(e.target.value)} className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-primary transition-all">
                    <option value="All">All Months</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </div>
              {(() => {
                const info = getCourseDurationAndType();
                const fullList = allSchedulesData[info.type] || [];
                const filteredList = fullList.filter(item => {
                  if (scheduleTypeFilter === 'Weekday' && !item.weekday) return false;
                  if (scheduleTypeFilter === 'Weekend' && item.weekday) return false;
                  if (scheduleMonthFilter !== 'All' && String(item.month) !== scheduleMonthFilter) return false;
                  return true;
                });
                return filteredList.length === 0 ? (
                  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-10 text-center text-textmuted text-sm font-semibold">No upcoming schedules found matching selected criteria.</div>
                ) : (
                  <div className="space-y-3">
                    {filteredList.map((item, idx) => {
                      const cohortMode = scheduleTrainingMode === 'Training + Exam' ? 'E-Learning' : scheduleTrainingMode;
                      const countryCode = selectedCountry?.code || 'IN';
                      const basePricingVal = getCalculatedPricing(course, cohortMode, countryCode, false) || course.price;
                      return (
                        <div key={idx} className="bg-white border border-slate-100 shadow-sm rounded-xl p-3 md:px-5 md:py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-primary/20 hover:shadow-md transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/8 rounded-xl flex flex-col items-center justify-center border border-primary/10 flex-shrink-0 text-center p-1">
                              <span className="text-primary font-black text-xs leading-tight">{item.date?.split(' ').slice(0,2).join(' ')}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-textdark">{item.date}</h4>
                              <p className="text-[10px] md:text-xs text-textmuted font-semibold flex items-center gap-1 mt-0.5"><span>🔔</span><span>{item.weekday ? `${info.days} Days | 09:00 AM – 05:00 PM` : `8 Days | 4 Hours`}</span></p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 md:gap-6 mr-auto md:mr-0 md:ml-auto md:pr-4 mt-2 md:mt-0">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 ${
                              item.weekday
                                ? 'bg-blue-50 text-blue-600 border-blue-300 shadow-sm'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-300 shadow-sm'
                            }`}>
                              {item.weekday ? '📅 Weekday' : '🗓️ Weekend'}
                            </span>
                            <div className="flex flex-col text-left md:text-right">
                              <span className="text-[9px] text-textmuted font-bold uppercase">{scheduleTrainingMode}</span>
                              <span className="text-sm font-black text-slate-800">{selectedCountry?.symbol || '₹'}{basePricingVal.toLocaleString()}</span>
                            </div>
                          </div>
                          <button onClick={() => { if (!user) { navigate('/login'); return; } const label = item.date + ' (' + (item.weekday ? 'weekday batch' : 'weekend batch') + ')'; addToCart(course, cohortMode, label); localStorage.setItem('lk_batch_' + course._id, label); localStorage.setItem('lk_mode_' + course._id, cohortMode); navigate('/checkout'); }} className="bg-accent hover:bg-accent-dark text-white font-extrabold text-[11px] px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer mt-2 md:mt-0">Enroll Now</button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              <div className="bg-gradient-to-r from-[#0B1A40] to-primary/95 rounded-3xl p-6 sm:p-8 shadow-xl mb-12 border border-blue-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
                <div className="overflow-x-auto pb-4 relative z-10">
                  <div className="grid grid-cols-5 gap-6 min-w-[950px] items-stretch pt-6">
                    {getScheduleCards().map((card, idx) => (<React.Fragment key={idx}>{renderScheduleCard(card)}</React.Fragment>))}
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                5. INDIVIDUAL & CORPORATE BENEFITS
            ═══════════════════════════════════════════════════════ */}
            <div id="benefits" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="text-center mb-7">
                  <h2 className="font-black text-xl text-textdark uppercase tracking-wide">Customized Benefits for Individuals and Corporate</h2>
                  <p className="text-sm text-textmuted font-semibold mt-1">Tailored programs for every learning journey</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden rounded-2xl border border-blue-100">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-primary" />
                    <div className="p-6 bg-gradient-to-br from-blue-50/50 to-white">
                      <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">👤</div><div><h3 className="font-black text-base text-textdark">Individual Benefits</h3><p className="text-xs text-blue-500 font-bold mt-0.5">Gain valuable Expert-Led Live Sessions</p></div></div>
                      <ul className="space-y-3 mb-5">
                        {['Career Growth & Promotion','Higher Salary Potential','Flexible Learning Options','Enhanced Skill Set','Global Recognition','Exam Preparation Support'].map((b,i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"><div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><span className="text-blue-600 font-black text-[10px]">✓</span></div>{b}</li>
                        ))}
                      </ul>
                      <a href="/contact" className="block w-full text-center bg-primary text-white font-extrabold py-3 rounded-xl text-sm hover:bg-primary-dark transition-all shadow-sm hover:shadow-md">Contact Course Advisor →</a>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-orange-100">
                    <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-500" />
                    <div className="p-6 bg-gradient-to-br from-orange-50/50 to-white">
                      <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">🏢</div><div><h3 className="font-black text-base text-textdark">Corporate Benefits</h3><p className="text-xs text-orange-500 font-bold mt-0.5">Personalized Corporate Training</p></div></div>
                      <ul className="space-y-3 mb-5">
                        {['Stronger Project Delivery','Customized Training Solutions','Scalable Learning for Teams','Employee Retention & Engagement','Compliance & Quality Standards','Measurable ROI'].map((b,i) => (
                          <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"><div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0"><span className="text-orange-500 font-black text-[10px]">✓</span></div>{b}</li>
                        ))}
                      </ul>
                      <a href="/contact" className="block w-full text-center bg-gradient-to-r from-orange-400 to-rose-500 text-white font-extrabold py-3 rounded-xl text-sm hover:opacity-90 transition-all shadow-sm hover:shadow-md">Skill Up Your Teams →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                        {/* ═══════════════════════════════════════════════════════
                    6. CERTIFICATION JOURNEY
                ═══════════════════════════════════════════════════════ */}
            <div id="success-path" className="scroll-mt-36">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80" style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e40af 100%)'}}>
                {/* Header */}
                <div className="text-center pt-8 pb-4 px-6">
                  <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Step-by-Step Roadmap</span>
                  <h2 className="font-black text-2xl text-white">
                    {courseShortTitle} Certification <span className="text-amber-400">Journey</span>
                  </h2>
                  <p className="text-blue-200 text-sm font-semibold mt-2">Follow these steps to earn your {courseShortTitle} certification</p>
                </div>

                {/* Journey Flowchart or Custom Diagram Image */}
                <div className="p-4 sm:p-6">
                  {getCourseJourneyImage(course) ? (
                    <div className="w-full overflow-hidden rounded-xl bg-slate-950 p-2 sm:p-4 border border-slate-800">
                      <img
                        src={getCourseJourneyImage(course)}
                        alt={`${course.title} Certification Journey`}
                        className="w-full h-auto object-contain rounded-lg max-h-[650px] mx-auto shadow-xl"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="p-2 sm:p-4">
                      {/* ROW 1 — left to right: 4 steps */}
                      <div className="flex items-stretch justify-between gap-3 mb-3">
                        {[
                          { step: 1, icon: '🎓', label: `Enroll ${courseShortTitle} Exam Prep Training` },
                          { step: 2, icon: '📚', label: `Complete ${courseShortTitle} Exam Focused Training` },
                          { step: 3, icon: '🏅', label: coursePdusText },
                          { step: 4, icon: '📅', label: '30-Day Study Plan' },
                        ].map((s, i, arr) => (
                          <div key={i} className="flex items-center flex-1 min-w-0">
                            <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center min-h-[110px] flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-all">
                              <span className="text-3xl">{s.icon}</span>
                              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Step {s.step}</span>
                              <p className="text-sm font-bold text-white leading-snug">{s.label}</p>
                            </div>
                            {i < arr.length - 1 && (
                              <div className="text-amber-400 font-black text-2xl px-2 flex-shrink-0 drop-shadow-lg">→</div>
                            )}
                          </div>
                        ))}
                        <div className="flex-shrink-0 pl-2 text-amber-400 font-black text-2xl self-center drop-shadow-lg">↓</div>
                      </div>

                      {/* ROW 2 — right to left: 3 steps */}
                      <div className="flex items-stretch justify-between gap-3 mb-3">
                        <div className="flex-shrink-0 pr-2 text-amber-400 font-black text-2xl self-center drop-shadow-lg">↓</div>
                        {[
                          { step: 5, icon: '💡', label: `Learn Tips & Tricks to Clear ${courseShortTitle} in 1st Try` },
                          { step: 6, icon: '📋', label: 'Review Prerequisites and Eligibility' },
                          { step: 7, icon: '🧪', label: 'Simulation Test | Practice Test | Real World Case Studies' },
                        ].map((s, i, arr) => (
                          <div key={i} className="flex items-center flex-1 min-w-0">
                            <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center min-h-[110px] flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-all">
                              <span className="text-3xl">{s.icon}</span>
                              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Step {s.step}</span>
                              <p className="text-sm font-bold text-white leading-snug">{s.label}</p>
                            </div>
                            {i < arr.length - 1 && (
                              <div className="text-amber-400 font-black text-2xl px-2 flex-shrink-0 drop-shadow-lg">←</div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* ROW 3 — left to right: 4 steps */}
                      <div className="flex items-stretch justify-between gap-3">
                        <div className="flex-shrink-0 pr-2 opacity-0 text-2xl self-center">→</div>
                        {[
                          { step: 8, icon: '📝', label: 'Prepare Exam Application with Assistance' },
                          { step: 9, icon: '🎯', label: `Attend ${courseShortTitle} Exam` },
                          { step: 10, icon: '🏆', label: `Get the ${courseShortTitle} Certificate`, highlight: true },
                        ].map((s, i, arr) => (
                          <div key={i} className="flex items-center flex-1 min-w-0">
                            <div className={`flex-1 rounded-2xl p-4 text-center min-h-[110px] flex flex-col items-center justify-center gap-2 transition-all ${
                              s.highlight
                                ? 'bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-amber-300 shadow-xl shadow-amber-500/30'
                                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                            }`}>
                              <span className="text-3xl">{s.icon}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${s.highlight ? 'text-amber-900' : 'text-amber-400'}`}>Step {s.step}</span>
                              <p className={`text-sm font-bold leading-snug ${s.highlight ? 'text-slate-900' : 'text-white'}`}>{s.label}</p>
                            </div>
                            {i < arr.length - 1 && (
                              <div className="text-amber-400 font-black text-2xl px-2 flex-shrink-0 drop-shadow-lg">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                7. TARGETED PROFESSIONALS & CAREER PATHS
            ═══════════════════════════════════════════════════════ */}
            <div id="career-paths" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-xl">🛤️</div>
                  <div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">{courseShortTitle} Certification: Targeted Professionals & Career Paths</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">Professionals Seeking Career Advancement & Individuals in Various Industries</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {getCourseCareerPaths(course).map((r, i) => {
                    const cm = { blue: 'bg-blue-50 border-blue-100 text-blue-600', violet: 'bg-violet-50 border-violet-100 text-violet-600', emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600', rose: 'bg-rose-50 border-rose-100 text-rose-600', amber: 'bg-amber-50 border-amber-100 text-amber-600', cyan: 'bg-cyan-50 border-cyan-100 text-cyan-600' };
                    const cls = cm[r.color] || cm['blue'];
                    return (
                      <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${cls.split(' ')[0]}/60 to-white border ${cls.split(' ')[1]} hover:shadow-md transition-all text-center`}>
                        <span className="text-3xl">{r.icon}</span>
                        <p className={`font-black text-sm ${cls.split(' ')[2]}`}>{r.role}</p>
                      </div>
                    );
                  })}
                </div>
  
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                8. PREREQUISITES
            ═══════════════════════════════════════════════════════ */}
            <div id="prerequisites" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-xl">📜</div>
                  <div>
                    
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">{getCoursePrerequisites(course)?.title}</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">Education and Experience Requirements</p>
  
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 font-medium mb-5">Review the eligibility requirements based on your educational background:</p>
                <div className="space-y-4">
                  {getCoursePrerequisites(course)?.paths.map((p, i) => {
                    const colors = [
                      { bg: 'from-blue-50', border: 'border-primary', text: 'text-primary' },
                      { bg: 'from-orange-50', border: 'border-accent', text: 'text-accent' }
                    ];
                    const cls = colors[i % colors.length];
                    return (
                      <div key={i} className={`bg-gradient-to-r ${cls.bg} to-white border-l-4 ${cls.border} rounded-r-2xl p-5`}>
                        <div className="flex items-center gap-2 mb-3"><span className="text-xl">{p.icon}</span><p className="font-black text-base text-textdark">{p.name}</p></div>
                        <ul className="space-y-2">
                          {p.reqs.map((req, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className={`${cls.text} mt-0.5`}>✓</span><span>{req}</span></li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
  
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                9. VISUALIZE THE VICTORY
            ═══════════════════════════════════════════════════════ */}
            <div id="victory" className="scroll-mt-36">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-primary rounded-2xl p-6 sm:p-10 text-white">
                {/* Background glow */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <span className="text-5xl">🏅</span>
                    <h2 className="font-black text-2xl sm:text-3xl mt-3 uppercase tracking-wide">Visualize the Victory</h2>
                    <p className="text-blue-200 text-sm font-semibold mt-1">Your {courseShortTitle} Certificate Awaits</p>
                  </div>

                  {/* Two column — stats + certificate */}
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left — stats + CTA */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: '98%', label: 'Pass Rate', icon: '🎯' },
                          { value: course.pdus ? `${course.pdus} PDUs` : 'PDUs', label: 'Contact Hours', icon: '📋' },
                          { value: '30 Days', label: 'Study Plan', icon: '📅' },
                          { value: '24/7', label: 'Support', icon: '💬' },
                        ].map((s, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex flex-col items-center gap-1">
                            <span className="text-xl">{s.icon}</span>
                            <p className="font-black text-xl text-white">{s.value}</p>
                            <p className="text-blue-200 text-xs font-semibold">{s.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-blue-100 text-sm font-medium leading-relaxed">
                        Join thousands of certified {courseShortTitle} professionals who have accelerated their careers with LearnersKart. Your certification journey starts here.
                      </p>
                      <button
                        onClick={handleEnrollNow}
                        className="bg-accent hover:bg-accent-dark text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all uppercase tracking-wider cursor-pointer w-full lg:w-auto"
                      >
                        Start Your Journey Today →
                      </button>
                    </div>

                    {/* Right — Authentic Certificate Preview with Exact In-Place Course Name Replacement */}
                    <div className="flex-1 w-full max-w-md lg:max-w-none">
                      <div className="relative group">
                        {/* Glow ring behind certificate */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-primary/30 rounded-2xl blur-xl scale-105 group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Certificate frame with exact 4:3 landscape ratio matching PMI PMP certificate */}
                        <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-2xl shadow-black/40 border border-white/20 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden select-none">
                          <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-slate-950/5 flex items-center justify-center">
                            {/* Base Certificate Template Image */}
                            <img
                              src={getCourseCertDemoImage(course) || "/pmp-certificate-demo.jpg"}
                              alt={`${course.title || courseShortTitle} Accredited Demo Certificate`}
                              className="w-full h-full object-cover object-center rounded-xl block"
                              loading="lazy"
                            />
                          </div>
                        </div>

                        {/* Caption badge */}
                        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-accent hover:bg-accent-dark text-white text-[10px] sm:text-[11px] font-black px-5 py-1.5 rounded-full shadow-xl uppercase tracking-widest whitespace-nowrap z-30">
                          🏆 Your {courseShortTitle} Certificate Awaits
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                10. WHY LEARNERSKART — Premium Cards
            ═══════════════════════════════════════════════════════ */}
            <div id="why-us" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="text-center mb-7">
                  <h2 className="font-black text-xl text-textdark uppercase tracking-wide">Why LearnersKart for Your Next Professional Certification?</h2>
                  <p className="text-sm text-textmuted font-semibold mt-1">Trusted by thousands of professionals worldwide</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: '✅', title: 'Guaranteed Classes', desc: 'Classes never cancelled or delayed. Always run on time.', color: 'emerald' },
                    { icon: '🏆', title: 'Quality & Consistency', desc: 'Highest standards maintained across every training session.', color: 'blue' },
                    { icon: '🧠', title: 'Structured Learning', desc: 'Step-by-step curriculum aligned with industry certifications.', color: 'violet' },
                    { icon: '🎓', title: 'Recognized Credentials', desc: 'Certificates accepted by top employers worldwide.', color: 'amber' },
                    { icon: '🌍', title: 'Global Recognition', desc: 'Train from anywhere — globally recognized and respected.', color: 'cyan' },
                    { icon: '👨‍🏫', title: 'Expert Instructors', desc: '15+ years industry experience with real-world insight.', color: 'rose' },
                    { icon: '🗓️', title: 'Flexible Options', desc: 'Live Online, Classroom, Self-Study & Corporate modes.', color: 'teal' },
                    { icon: '🏢', title: 'Corporate Training', desc: "Customized programs tailored for your team's unique needs.", color: 'orange' },
                  ].map((w, i) => {
                    const cm = { emerald:'bg-emerald-50 border-emerald-100 text-emerald-600', blue:'bg-blue-50 border-blue-100 text-blue-600', violet:'bg-violet-50 border-violet-100 text-violet-600', amber:'bg-amber-50 border-amber-100 text-amber-600', cyan:'bg-cyan-50 border-cyan-100 text-cyan-600', rose:'bg-rose-50 border-rose-100 text-rose-600', teal:'bg-teal-50 border-teal-100 text-teal-600', orange:'bg-orange-50 border-orange-100 text-orange-600' };
                    const [bg, border, text] = cm[w.color].split(' ');
                    return (
                      <div key={i} className={`group relative p-5 rounded-2xl border ${border} bg-gradient-to-br ${bg}/60 to-white hover:shadow-md hover:-translate-y-0.5 transition-all`}>
                        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>{w.icon}</div>
                        <h3 className="font-black text-sm text-textdark mb-1">{w.title}</h3>
                        <p className="text-xs text-slate-500 font-semibold leading-relaxed">{w.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                11. FAQ SECTION
            ═══════════════════════════════════════════════════════ */}
            <div id="faq" className="scroll-mt-36">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center text-xl">❓</div>
                  <div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">Frequently Asked Questions on PMP Course</h2>
                    <p className="text-xs text-textmuted font-semibold mt-0.5">Find answers to the most common queries about this training program.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {(isPmp ? pmpFaqs : (course.faqs && course.faqs.length > 0 ? course.faqs : faqsSeed)).map((faq, i) => (
                    <Accordion key={i} title={faq.question} defaultOpen={i === 0} className="border-slate-100 text-xs sm:text-sm">
                      <p className="leading-relaxed text-slate-600 font-semibold">{faq.answer}</p>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                12. COURSE CURRICULUM
            ═══════════════════════════════════════════════════════ */}
            <div id="curriculum" className="scroll-mt-36">
              {currentSyllabus ? (
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">📚</div>
                      <div>
                        <h2 className="font-black text-lg text-textdark uppercase tracking-wide">Course Curriculum</h2>
                        <p className="text-xs text-textmuted font-semibold mt-0.5">{currentSyllabus.length} Modules • {course.duration || '32 Hrs'} Total</p>
                      </div>
                    </div>
                    <a
                      href={
                        (course?.slug?.toLowerCase().includes('cpmai') || course?.slug?.toLowerCase().includes('pmi-cpmai'))
                          ? '/pmi-cpmai-syllabus.pdf'
                          : (course?.slug?.toLowerCase().includes('pmp') || course?.slug?.toLowerCase().includes('project-management-professional'))
                          ? '/pmp-syllabus.pdf'
                          : '/pmi-cpmai-syllabus.pdf'
                      }
                      download={
                        (course?.slug?.toLowerCase().includes('cpmai') || course?.slug?.toLowerCase().includes('pmi-cpmai'))
                          ? 'PMI_CPMAI_Syllabus.pdf'
                          : (course?.slug?.toLowerCase().includes('pmp') || course?.slug?.toLowerCase().includes('project-management-professional'))
                          ? 'PMP_Syllabus.pdf'
                          : 'Course_Syllabus.pdf'
                      }
                      className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all self-start sm:self-center"
                    >
                      📥 Download Syllabus
                    </a>
                  </div>
                  <div className="space-y-3">
                    {currentSyllabus.map((module, idx) => (
                      <Accordion key={idx} title={module.title} defaultOpen={idx === 0} className="border-slate-100">
                        <div className="text-sm leading-relaxed py-2 pl-1 space-y-3 text-left">
                          <p className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Key Modules & Topics Covered:</p>
                          <ul className="grid grid-cols-1 gap-2 text-slate-600 font-semibold pl-2">
                            {module.items.map((item, itemIdx) => (<li key={itemIdx} className="flex items-start gap-2"><span className="text-primary mt-0.5 shrink-0">✓</span><span>{item}</span></li>))}
                          </ul>
                        </div>
                      </Accordion>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-6 mt-6">
                    <h4 className="font-extrabold text-sm sm:text-base text-textdark uppercase tracking-wider mb-4">Course Inclusions</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {getCourseInclusions(course).map((inc, incIdx) => (
                        <div key={incIdx} className="bg-gradient-to-br from-primary/5 to-blue-50/30 border border-primary/10 p-4 rounded-xl flex flex-col items-center justify-center hover:shadow-sm transition-all">
                          <span className="text-2xl">{inc.icon}</span>
                          <p className="font-bold text-xs text-textdark mt-1.5">{inc.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-8 text-left">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">📚</div>
                    <h2 className="font-black text-lg text-textdark uppercase tracking-wide">Course Curriculum</h2>
                  </div>
                  {course.lessons && course.lessons.length > 0 ? course.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 text-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-primary/10 text-primary w-7 h-7 rounded-md text-xs font-black flex items-center justify-center">{idx + 1}</span>
                        <span className="font-semibold text-textdark">{lesson.title}</span>
                      </div>
                      <span className="text-slate-400 font-bold text-xs">{lesson.duration}</span>
                    </div>
                  )) : (<p className="text-sm text-textmuted font-semibold">No syllabus mapped yet. Please contact support for details.</p>)}
                </div>
              )}
            </div>

          </div>
        </div>






      {/* 5. TESTIMONIALS SECTION */}
      <div id="testimonials" className="scroll-mt-36 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-textdark uppercase tracking-tight">
              What Our <span className="text-primary">Learners Say</span>
            </h2>
            <p className="text-xs text-textmuted mt-1.5 font-semibold">
              Real feedback and success stories from certified professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {(isPmp ? pmpTestimonials : reviewsList).map((rev, i) => (
              <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between text-xs sm:text-sm hover:shadow-md transition-all">
                <p className="text-slate-600 italic leading-relaxed font-semibold">
                  "{rev.text || rev.comment}"
                </p>
                <div className="flex items-center gap-3 mt-4 border-t border-slate-100 pt-3">
                  <img 
                    src={getReviewAvatar(rev.name, rev.avatar)} 
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-white"
                  />
                  <div>
                    <h5 className="font-bold text-textdark text-xs">{rev.name}</h5>
                    <p className="text-[10px] text-accent font-semibold">{rev.role || "Verified Student"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CourseDetailPage;
