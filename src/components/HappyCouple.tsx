import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const HappyCouple: React.FC = () => {
  return (
    <section
      className="w-full py-16 md:py-24 bg-[#064e3b] relative overflow-hidden flex items-center justify-center min-h-[100dvh]"
      style={{
        backgroundImage: 'url("/ChatGPT Image Aug 4, 2026, 01_53_49 AM.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="container px-4 md:px-8 mx-auto relative z-10 flex flex-col items-center h-full justify-between max-w-4xl py-12">
      </div>
    </section>
  );
};
