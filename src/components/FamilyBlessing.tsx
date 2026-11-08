import React from 'react';
import { motion } from 'motion/react';
import { LotusOrnament } from './LotusOrnament';
import { COUPLE_NAMES, WEDDING } from '../weddingConfig';

const scriptFont = { fontFamily: "'Great Vibes', cursive" };

export const FamilyBlessing: React.FC = () => {
  return (
    <section aria-label="Our families" id="families" className="relative w-full py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-[#B5294E]/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center">
        {/* Theme verse */}
        <motion.figure
          className="relative w-full max-w-2xl mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="relative bg-white/70 backdrop-blur-md px-6 py-12 sm:px-12 rounded-t-[120px] rounded-b-[40px] border border-[#B5294E]/40 shadow-[0_20px_50px_rgba(181,41,78,0.12)] overflow-hidden">
            <div className="absolute inset-4 border-[1px] border-[#B5294E]/20 rounded-t-[100px] rounded-b-[25px] pointer-events-none"></div>

            <svg viewBox="0 0 24 32" className="w-6 h-8 mx-auto mb-6 text-[#B5294E]" aria-hidden="true">
              <path d="M10 0h4v9h10v4H14v19h-4V13H0V9h10z" fill="currentColor" />
            </svg>

            <blockquote
              className="relative text-[#1F3D2B] text-lg sm:text-xl md:text-2xl leading-[2] sm:leading-[2.1] px-2"
              style={{ fontFamily: "'Noto Serif Sinhala', serif" }}
              lang="si"
            >
              “{WEDDING.themeVerse}”
            </blockquote>

            <figcaption
              className="mt-6 text-[#B5294E] text-sm sm:text-base tracking-wide"
              style={{ fontFamily: "'Noto Serif Sinhala', serif" }}
              lang="si"
            >
              — {WEDDING.themeReference}
            </figcaption>
          </div>
        </motion.figure>

        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative bg-white/70 backdrop-blur-md px-6 py-12 sm:p-14 md:p-16 rounded-t-[120px] rounded-b-[40px] shadow-[0_20px_50px_rgba(181,41,78,0.12)] border border-[#B5294E]/40 text-center overflow-hidden">
            <div className="absolute inset-4 sm:inset-6 border-[1px] border-[#B5294E]/20 rounded-t-[100px] rounded-b-[25px] pointer-events-none"></div>

            <div className="flex justify-center mb-6">
              <LotusOrnament className="w-20 h-12" />
            </div>

            <p className="text-[#1F3D2B]/70 font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs mb-10 leading-relaxed">
              By the grace of God Almighty<br />and with the blessings of our beloved parents
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
              <div className="space-y-3">
                <p className="text-[#B5294E] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs">The Groom</p>
                <p className="font-display text-[#1F3D2B] text-5xl md:text-6xl" style={scriptFont}>{WEDDING.groomName}</p>
                <p className="text-[#1F3D2B]/80 font-serif text-sm md:text-base">{WEDDING.groomFullName}</p>
                <p className="text-[#1F3D2B]/70 font-serif italic text-sm pt-2">Beloved son of</p>
                <p className="text-[#1F3D2B]/90 font-serif text-base md:text-lg leading-relaxed">
                  {WEDDING.groomParents[0]}<br />&amp; {WEDDING.groomParents[1]}
                </p>
              </div>

              <div className="flex md:hidden items-center justify-center space-x-3">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B5294E]/60"></div>
                <span className="text-[#B5294E] font-serif italic text-2xl">&amp;</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B5294E]/60"></div>
              </div>

              <div className="space-y-3 md:border-l md:border-[#B5294E]/20">
                <p className="text-[#B5294E] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs">The Bride</p>
                <p className="font-display text-[#1F3D2B] text-5xl md:text-6xl" style={scriptFont}>{WEDDING.brideName}</p>
                <p className="text-[#1F3D2B]/80 font-serif text-sm md:text-base">{WEDDING.brideFullName}</p>
                <p className="text-[#1F3D2B]/70 font-serif italic text-sm pt-2">Beloved daughter of</p>
                <p className="text-[#1F3D2B]/90 font-serif text-base md:text-lg leading-relaxed">
                  {WEDDING.brideParents[0]}<br />&amp; {WEDDING.brideParents[1]}
                </p>
              </div>
            </div>

            <p className="text-[#1F3D2B]/80 font-serif text-sm md:text-base leading-[2] tracking-wide mt-12 px-2 sm:px-8">
              request the pleasure of your company at the Holy Matrimony of their children
            </p>
            <p className="mt-4 font-display text-4xl md:text-5xl text-[#B5294E]" style={scriptFont}>
              {COUPLE_NAMES}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
