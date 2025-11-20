import React, { useRef } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { ContentPage } from './components/ContentPage';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLearnMore = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* 
        Cinematic Section (Scroll Locked Animation) 
        This occupies the top part of the DOM flow but is very tall (500vh)
      */}
      <CinematicIntro onLearnMore={handleLearnMore} />

      {/* 
        Standard Content Section 
        Users arrive here after the cinematic scroll finishes or they click the CTA 
      */}
      <ContentPage ref={contentRef} />
    </div>
  );
};

export default App;