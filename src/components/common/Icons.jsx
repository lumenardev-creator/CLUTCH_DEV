import React from 'react';

export const LogoIcon = ({ className }) => (
  <img src="/logo/CLUTCH DARK BG.png" alt="Clutch Logo" className={`h-14 w-auto object-contain group-hover:scale-110 transition-transform ${className || ''}`} />
);

export const GradCapIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export const RulerIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0L21.3 15.3z" />
    <path d="M14.5 12.5 10 8l-2 2 4.5 4.5" />
    <path d="M11.5 15.5 9 13l-2 2 2.5 2.5" />
    <path d="M17.5 9.5 15 7l-2 2 2.5 2.5" />
  </svg>
);

export const WeightIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    <path d="M12 19V3" />
  </svg>
);
