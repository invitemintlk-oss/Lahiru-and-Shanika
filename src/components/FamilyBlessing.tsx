import React from 'react';
import { motion } from 'motion/react';
import { LotusOrnament } from './LotusOrnament';

export const FamilyBlessing: React.FC = () => {
  return (
    <section aria-label="Our families" id="families" className="relative w-full py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-[#B5294E]/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center">
        {/* Couple portrait in a lotus-arch frame */}
        <motion.figure
          className="relative mb-14 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[32px] bg-gradient-to-b from-[#F4B6C6]/60 to-transparent blur-xl pointer-events-none" />
          <div className="relative w-[260px] h-[370px] sm:w-[320px] sm:h-[455px] md:w-[360px] md:h-[515px] rounded-t-[999px] rounded-b-[32px] p-[6px] bg-gradient-to-b from-[#B5294E]/70 via-[#F4B6C6] to-[#6E9E7B]/70 shadow-[0_25px_60px_rgba(181,41,78,0.25)]">
            <div className="w-full h-full rounded-t-[999px] rounded-b-[26px] overflow-hidden border-4 border-white/90 bg-[#FFF8F0]">
              <img
                src="/r-couple.webp"
                alt="Tashini and Ishan"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="relative -mt-6 z-10 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 border border-[#B5294E]/30 shadow-md">
            <LotusOrnament className="w-12 h-7" />
          </div>
          <figcaption className="mt-4 font-display text-4xl md:text-5xl text-[#B5294E]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Tashini &amp; Ishan
          </figcaption>
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
              With the blessings of the Noble Triple Gem<br />and our beloved parents
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
              <div className="space-y-3">
                <p className="text-[#B5294E] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs">The Bride</p>
                <p className="font-display text-[#1F3D2B] text-5xl md:text-6xl" style={{ fontFamily: "'Great Vibes', cursive" }}>Tashini</p>
                <p className="text-[#1F3D2B]/70 font-serif italic text-sm">Beloved daughter of</p>
                <p className="text-[#1F3D2B]/90 font-serif text-base md:text-lg leading-relaxed">
                  Mr. Pradeep Liyanage<br />&amp; Mrs. Anusha Dilrukshi
                </p>
              </div>

              <div className="flex md:hidden items-center justify-center space-x-3">
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B5294E]/60"></div>
                <span className="text-[#B5294E] font-serif italic text-2xl">&amp;</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B5294E]/60"></div>
              </div>

              <div className="space-y-3 md:border-l md:border-[#B5294E]/20">
                <p className="text-[#B5294E] font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs">The Groom</p>
                <p className="font-display text-[#1F3D2B] text-5xl md:text-6xl" style={{ fontFamily: "'Great Vibes', cursive" }}>Ishan</p>
                <p className="text-[#1F3D2B]/70 font-serif italic text-sm">Beloved son of</p>
                <p className="text-[#1F3D2B]/90 font-serif text-base md:text-lg leading-relaxed">
                  Mr. Sudath Halpege<br />&amp; Mrs. K. Rathnayaka
                </p>
              </div>
            </div>

            <p className="text-[#1F3D2B]/80 font-serif text-sm md:text-base leading-[2] tracking-wide mt-12 px-2 sm:px-8">
              request the pleasure of your company at the marriage of their children
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
