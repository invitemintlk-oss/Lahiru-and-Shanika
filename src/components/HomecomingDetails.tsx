import React from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarHeart, PartyPopper, type LucideIcon } from 'lucide-react';
import { LotusOrnament } from './LotusOrnament';
import { WEDDING } from '../weddingConfig';

interface EventCardProps {
  title: string;
  weekday: string;
  dateLong: string;
  timeLabel: string;
  time: string;
  venue: string;
  mapUrl: string;
  delay?: number;
  icon?: LucideIcon;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  weekday,
  dateLong,
  timeLabel,
  time,
  venue,
  mapUrl,
  delay = 0.2,
  icon: Icon = CalendarHeart,
}) => (
    <motion.div
      className="relative w-full max-w-lg lg:flex-1 bg-white/70 backdrop-blur-md rounded-t-[140px] rounded-b-[40px] border border-[#B5294E]/40 shadow-[0_20px_50px_rgba(181,41,78,0.12)] p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay }}
    >
      {/* Decorative Inner Border */}
      <div className="absolute inset-4 border-[1px] border-[#B5294E]/20 rounded-t-[125px] rounded-b-[25px] pointer-events-none"></div>

      <LotusOrnament className="w-16 h-10 mb-4 mt-4" />

      <h3 className="text-3xl md:text-4xl font-display text-[#B5294E] mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>{title}</h3>

      <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#B5294E] mb-4 opacity-90" strokeWidth={1} />

      <div className="space-y-2 mb-10">
        <p className="text-[11px] md:text-xs text-[#1F3D2B]/70 tracking-[0.3em] uppercase">{weekday}</p>
        <p className="text-lg md:text-2xl font-serif text-[#B5294E] tracking-widest uppercase">
          {dateLong}
        </p>
      </div>

      <div className="w-full max-w-sm mx-auto space-y-6 mb-12 flex-1">
        <div className="flex items-center justify-between text-[#1F3D2B] border-b border-[#B5294E]/20 pb-4">
          <span className="font-sans text-sm md:text-base tracking-widest uppercase opacity-90">{timeLabel}</span>
          <span className="font-serif text-[#B5294E] text-lg md:text-xl">{time}</span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 mt-auto">
        <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#B5294E] mb-2 opacity-90" strokeWidth={1} />
        <p className="text-lg md:text-xl font-serif text-[#1F3D2B] tracking-wide mb-2">{venue}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-6 py-2 md:px-8 md:py-2.5 mt-2 bg-transparent border border-[#B5294E]/50 hover:bg-[#B5294E]/10 hover:border-[#B5294E] rounded-full text-[#B5294E] transition-all duration-300 group"
        >
          <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">Live Location</span>
        </a>
      </div>
    </motion.div>
);

export const HomecomingDetails: React.FC = () => {
  return (
    <section id="details" className="w-full py-24 relative overflow-hidden">

      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-[#B5294E]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-display text-[#B5294E]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Celebration
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#B5294E]/70"></div>
            <p className="text-[10px] md:text-xs text-[#1F3D2B]/90 font-sans tracking-[0.4em] uppercase">
              Join us in celebration
            </p>
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#B5294E]/70"></div>
          </div>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-12 lg:gap-10">
          <EventCard
            title="Holy Matrimony"
            weekday={WEDDING.weekday}
            dateLong={WEDDING.dateLong}
            timeLabel="Ceremony"
            time={WEDDING.time}
            venue={WEDDING.venue}
            mapUrl={WEDDING.mapUrl}
          />
          <EventCard
            title="Wedding Party"
            weekday={WEDDING.party.weekday}
            dateLong={WEDDING.party.dateLong}
            timeLabel="Starts at"
            time={WEDDING.party.time}
            venue={WEDDING.party.venue}
            mapUrl={WEDDING.party.mapUrl}
            delay={0.4}
            icon={PartyPopper}
          />
        </div>
      </div>
    </section>
  );
};
