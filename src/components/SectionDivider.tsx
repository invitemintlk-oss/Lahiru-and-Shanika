import React from 'react';
import { LotusOrnament } from './LotusOrnament';

/**
 * A clear page break between invitation sections:
 * a solid ivory band framed by rose lines, with a lotus in the middle.
 */
export const SectionDivider: React.FC = () => (
  <div role="separator" aria-hidden="true" className="relative w-full">
    <div className="h-[2px] w-full bg-gradient-to-r from-[#6E9E7B]/60 via-[#B5294E] to-[#6E9E7B]/60" />
    <div className="relative flex items-center justify-center gap-3 sm:gap-5 py-4 bg-[#FFF8F0]/95 shadow-[0_6px_18px_rgba(181,41,78,0.10)]">
      <span className="h-px flex-1 max-w-[140px] sm:max-w-[260px] bg-gradient-to-r from-transparent to-[#B5294E]/70" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#B5294E]/70" />
      <LotusOrnament className="w-14 h-9 sm:w-16 sm:h-10" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#B5294E]/70" />
      <span className="h-px flex-1 max-w-[140px] sm:max-w-[260px] bg-gradient-to-l from-transparent to-[#B5294E]/70" />
    </div>
    <div className="h-[2px] w-full bg-gradient-to-r from-[#6E9E7B]/60 via-[#B5294E] to-[#6E9E7B]/60" />
  </div>
);
