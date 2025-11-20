import React from 'react';

interface SectionHeaderProps {
  title: string;
  className?: string;
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "", light = false }) => {
  return (
    <h2 
      className={`font-serif text-4xl md:text-5xl tracking-wide mb-8 ${light ? 'text-aredco-gold' : 'text-aredco-green'} ${className}`}
    >
      {title}
    </h2>
  );
};