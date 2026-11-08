import React from 'react';
import { motion } from 'motion/react';
import { WEDDING } from '../weddingConfig';

/** Couple details page – the designed card (public/A.jpeg → couple-details.webp) holds all the details. */
export const FamilyBlessing: React.FC = () => {
  const alt = `The Happy Couple – ${WEDDING.groomName}, the groom, son of ${WEDDING.groomParents.join(' & ')}; ${WEDDING.brideName}, the bride, daughter of ${WEDDING.brideParents.join(' & ')}`;

  return (
    <section aria-label="The happy couple" id="families" className="relative w-full py-16 sm:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-[#B5294E]/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex justify-center">
        <motion.figure
          className="w-full max-w-[520px]"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <div className="rounded-[28px] p-[5px] bg-gradient-to-b from-[#D4AF37]/70 via-[#F4E3B5] to-[#D4AF37]/70 shadow-[0_25px_60px_rgba(181,41,78,0.22)]">
            <img
              src="/couple-details.webp"
              alt={alt}
              width={1536}
              height={2752}
              className="block w-full h-auto rounded-[24px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
};
