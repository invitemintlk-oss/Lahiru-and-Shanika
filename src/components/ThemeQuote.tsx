import React from 'react';
import { motion } from 'motion/react';
import { LotusOrnament } from './LotusOrnament';
import { COUPLE_NAMES, WEDDING } from '../weddingConfig';

const sinhalaFont = { fontFamily: "'Noto Serif Sinhala', serif" };

/** Wedding theme verse on its own page. */
export const ThemeQuote: React.FC = () => {
  return (
    <section aria-label="Our wedding theme" id="theme" className="relative w-full py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-[#B5294E]/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex justify-center">
        <motion.figure
          className="w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="relative bg-white/70 backdrop-blur-md px-6 py-14 sm:px-12 sm:py-16 rounded-t-[120px] rounded-b-[40px] border border-[#B5294E]/40 shadow-[0_20px_50px_rgba(181,41,78,0.12)] overflow-hidden">
            <div className="absolute inset-4 border-[1px] border-[#B5294E]/20 rounded-t-[100px] rounded-b-[25px] pointer-events-none"></div>

            <svg viewBox="0 0 24 32" className="w-6 h-8 mx-auto mb-4 text-[#B5294E]" aria-hidden="true">
              <path d="M10 0h4v9h10v4H14v19h-4V13H0V9h10z" fill="currentColor" />
            </svg>

            <h2 className="text-5xl md:text-6xl font-display text-[#B5294E] mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Theme
            </h2>

            <blockquote
              className="relative text-[#1F3D2B] text-lg sm:text-xl md:text-2xl leading-[2] sm:leading-[2.1] px-2"
              style={sinhalaFont}
              lang="si"
            >
              “{WEDDING.themeVerse}”
            </blockquote>

            <figcaption className="mt-6 text-[#B5294E] text-sm sm:text-base tracking-wide" style={sinhalaFont} lang="si">
              — {WEDDING.themeReference}
            </figcaption>

            <div className="flex justify-center mt-10">
              <LotusOrnament className="w-16 h-10" />
            </div>
            <p className="mt-2 font-display text-3xl md:text-4xl text-[#B5294E]" style={{ fontFamily: "'Great Vibes', cursive" }}>
              {COUPLE_NAMES}
            </p>
          </div>
        </motion.figure>
      </div>
    </section>
  );
};
