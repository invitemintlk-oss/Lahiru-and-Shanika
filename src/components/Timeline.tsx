import React from 'react';
import { motion } from 'motion/react';
import { Users, Church, PenLine } from 'lucide-react';
import { LotusOrnament } from './LotusOrnament';

const events = [
  { time: '8:30 AM', title: 'Guests Arrival', icon: Users, desc: 'Welcoming our loved ones' },
  { time: '9:00 AM', title: 'Holy Matrimony', icon: Church, desc: 'Wedding ceremony at Holy Cross Church' },
  { time: 'After the Mass', title: 'Signing of the Register', icon: PenLine, desc: 'Signing of the marriage register and blessings' },
];

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" aria-label="Wedding timeline" className="w-full py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-[#B5294E]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container max-w-3xl px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LotusOrnament className="w-16 h-10" />
          <h2 className="text-6xl md:text-7xl font-display text-[#B5294E]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Wedding Timeline
          </h2>
          <p className="text-[10px] md:text-xs text-[#1F3D2B]/80 font-sans tracking-[0.4em] uppercase">The flow of our day</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#B5294E]/40 to-transparent" />

          <div className="space-y-14 md:space-y-20">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex items-center gap-6 md:gap-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-3xl font-serif text-[#B5294E] italic">{event.time}</span>
                </div>

                <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white border border-[#B5294E]/60 flex items-center justify-center shadow-[0_0_20px_rgba(181,41,78,0.18)]">
                  <event.icon className="w-5 h-5 text-[#B5294E]" strokeWidth={1.5} />
                </div>

                <div className={`flex-1 text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="md:hidden block text-2xl font-serif text-[#B5294E] italic mb-1">{event.time}</span>
                  <h4 className="text-xl md:text-2xl font-serif text-[#1F3D2B] mb-1">{event.title}</h4>
                  <p className="text-[#1F3D2B]/70 text-sm leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
