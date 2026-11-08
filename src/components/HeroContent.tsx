import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING, getGuestFromUrl } from '../weddingConfig';

export const HeroContent: React.FC = () => {
  const guestNameString = getGuestFromUrl().displayName;
  const dateText = WEDDING.dateHero;

  return (
    <section aria-label="Hero" className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/y-hero.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* soft ivory wash in the centre so the names stay crisp */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,250,242,0.35)_0%,rgba(255,250,242,0)_60%)]" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4">
        
        {guestNameString && (
          <motion.div 
            className="flex flex-col items-center justify-center mb-6 sm:mb-8 bg-white/60 px-8 py-4 rounded-2xl backdrop-blur-sm border border-[#B5294E]/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 font-sans text-[#1F3D2B]/90 text-center">
              We cordially invite
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#B5294E] text-center break-words max-w-[80vw]">
              {guestNameString}
            </p>
            <p className="text-[11px] sm:text-xs mt-2 font-serif italic text-[#1F3D2B]/80 text-center">
              to celebrate our special day with us
            </p>
          </motion.div>
        )}

        {/* We're Getting Married pill */}
        <motion.div 
          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-[40px] border border-[#B5294E]/30 bg-white/40 backdrop-blur-sm mb-12 sm:mb-20 mt-16 sm:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-sans text-[#1F3D2B] font-medium">
            We're Getting Married!
          </span>
        </motion.div>

        {/* Names */}
        <motion.div 
          className="flex flex-col items-center gap-2 sm:gap-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display text-[#1F3D2B] leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {WEDDING.groomName}
          </h1>
          
          <div className="my-1 sm:my-3 text-[#1F3D2B] opacity-90">
             <span className="text-4xl sm:text-5xl font-serif italic">&amp;</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display text-[#1F3D2B] leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {WEDDING.brideName}
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl font-sans tracking-[0.1em] sm:tracking-[0.15em] text-[#1F3D2B] uppercase mt-12 sm:mt-16">
            {dateText}
          </p>
        </motion.div>

      </div>

      {/* Swipe up */}
      <motion.div 
        className="absolute bottom-8 inset-x-0 z-10 flex justify-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center text-center animate-bounce">
          <p className="text-[11px] sm:text-xs font-sans tracking-widest text-[#1F3D2B] mb-2 opacity-90">Swipe up for more</p>
          <ChevronDown className="h-6 w-6 text-[#1F3D2B] opacity-90" />
        </div>
      </motion.div>
      
    </section>
  );
};
