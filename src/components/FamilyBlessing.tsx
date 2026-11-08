import React from 'react';
import { WEDDING } from '../weddingConfig';

const IMAGE = '/couple-details.webp';

/**
 * Couple details page – the designed card (public/A.jpeg → couple-details.webp) is the whole page.
 * Phones: the image spans the full width at its natural height (nothing cropped, no gaps).
 * Wider screens: the image is shown full-size in the centre and a blurred copy of the same
 * image fills the sides, so the page background never shows through.
 */
export const FamilyBlessing: React.FC = () => {
  const alt = `The Happy Couple – ${WEDDING.groomName}, the groom, son of ${WEDDING.groomParents.join(' & ')}; ${WEDDING.brideName}, the bride, daughter of ${WEDDING.brideParents.join(' & ')}`;

  return (
    <section aria-label="The happy couple" id="families" className="relative w-full overflow-hidden bg-[#FBF3E6]">
      {/* Side fill for wide screens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-80"
        style={{ backgroundImage: `url('${IMAGE}')` }}
      />
      <img
        src={IMAGE}
        alt={alt}
        width={1536}
        height={2752}
        className="relative block w-full h-auto sm:w-auto sm:max-w-full sm:h-[min(100dvh,1400px)] sm:mx-auto"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};
