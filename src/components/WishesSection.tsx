import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { submitToGoogleSheet } from '../googleSheets';
import { COUPLE_NAMES, getGuestFromUrl } from '../weddingConfig';
import { LotusOrnament } from './LotusOrnament';

const MAX_WISH = 500;

export const WishesSection: React.FC = () => {
  const [name, setName] = useState(() => getGuestFromUrl().displayName);
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!wish.trim()) {
      setError('Please write a few words for the couple');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await submitToGoogleSheet('wishes', {
        name: name.trim(),
        wish: wish.trim(),
        invitedAs: getGuestFromUrl().displayName,
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to send your wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white/80 text-[#1F3D2B] border border-[#B5294E]/40 rounded-xl px-5 py-4 font-sans focus:ring-1 focus:ring-[#B5294E] focus:border-[#B5294E] outline-none transition-all placeholder:text-stone-400';

  return (
    <section id="wishes" aria-label="Wishes for the couple" className="w-full py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LotusOrnament className="w-16 h-10" />
          <h2 className="text-6xl md:text-7xl font-display text-[#B5294E]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Send Your Wishes
          </h2>
          <p className="text-[11px] md:text-sm text-[#1F3D2B]/80 font-sans tracking-[0.2em] uppercase max-w-xl px-4 leading-relaxed">
            Leave a blessing or a few kind words for {COUPLE_NAMES}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(181,41,78,0.12)] border border-[#B5294E]/30 overflow-hidden">
            <div className="absolute inset-3 sm:inset-4 border-[1px] border-[#B5294E]/10 rounded-[30px] pointer-events-none"></div>

            {submitted ? (
              <div className="text-center py-10 relative z-10">
                <Heart className="w-8 h-8 text-[#B5294E] mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-5xl font-display text-[#B5294E] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>Thank you!</p>
                <p className="text-sm md:text-base font-sans text-[#1F3D2B]/80 tracking-widest uppercase">Your wishes mean the world to us.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div>
                  <label className="block text-[#B5294E] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Eg: Nimal Perera"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-[#B5294E] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Your Wish</label>
                  <textarea
                    required
                    rows={5}
                    maxLength={MAX_WISH}
                    className={`${inputClass} resize-none`}
                    placeholder="Wishing you a lifetime of love and happiness..."
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                  <p className="text-right text-[11px] text-[#1F3D2B]/60 mt-1">{wish.length}/{MAX_WISH}</p>
                </div>

                {error && <p className="text-red-600 text-sm font-sans text-center tracking-wide">{error}</p>}

                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center overflow-hidden rounded-full border border-[#B5294E] bg-transparent transition-all duration-300 hover:bg-[#B5294E] py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <span className="text-xs sm:text-sm font-sans text-[#B5294E] group-hover:text-white font-semibold uppercase tracking-[0.3em] transition-colors duration-300">
                    {isSubmitting ? 'Sending...' : 'Send Wishes'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
