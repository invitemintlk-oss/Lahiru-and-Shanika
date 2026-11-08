import React from 'react';

interface LotusOrnamentProps {
  className?: string;
  /** Outer petal colour */
  petal?: string;
  /** Inner petal colour */
  inner?: string;
  /** Leaf colour */
  leaf?: string;
}

/** A simple red-and-white lotus motif used as a decorative divider. */
export const LotusOrnament: React.FC<LotusOrnamentProps> = ({
  className = 'w-16 h-10',
  petal = '#D9475E',
  inner = '#F8D3DC',
  leaf = '#6E9E7B',
}) => (
  <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
    {/* leaves */}
    <path d="M60 62 C40 62 18 58 4 50 C20 46 42 50 60 62 Z" fill={leaf} opacity="0.85" />
    <path d="M60 62 C80 62 102 58 116 50 C100 46 78 50 60 62 Z" fill={leaf} opacity="0.85" />
    {/* outer petals */}
    <path d="M60 60 C42 58 22 46 16 30 C34 30 52 42 60 60 Z" fill={petal} opacity="0.9" />
    <path d="M60 60 C78 58 98 46 104 30 C86 30 68 42 60 60 Z" fill={petal} opacity="0.9" />
    {/* middle petals */}
    <path d="M60 60 C46 52 36 34 38 16 C52 24 60 42 60 60 Z" fill={petal} />
    <path d="M60 60 C74 52 84 34 82 16 C68 24 60 42 60 60 Z" fill={petal} />
    {/* centre petal */}
    <path d="M60 60 C50 46 50 22 60 4 C70 22 70 46 60 60 Z" fill={inner} />
    <path d="M60 58 C55 46 55 28 60 14 C65 28 65 46 60 58 Z" fill={petal} opacity="0.35" />
  </svg>
);
