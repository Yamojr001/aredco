
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { IMAGES, CONTENT } from '../constants';
import { GateLayer } from './GateLayer';

// Cast motion components to any to avoid "Property 'initial' does not exist" errors
const MotionDiv = motion.div as any;
const MotionP = motion.p as any;
const MotionImg = motion.img as any;

interface CinematicIntroProps {
  onLearnMore: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onLearnMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Total height is 500vh (5 sections to scroll through)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for that "slow luxury" feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 30, restDelta: 0.001 });

  // Create specific progress ranges for each "gate" opening
  const gate1Progress = useTransform(smoothProgress, [0.0, 0.20], [0, 1]);
  const gate2Progress = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);
  const gate3Progress = useTransform(smoothProgress, [0.50, 0.70], [0, 1]);
  const gate4Progress = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  
  const buttonOpacity = useTransform(smoothProgress, [0.95, 1], [0, 1]);
  const buttonPointerEvents = useTransform(smoothProgress, (val: number) => val > 0.95 ? 'auto' : 'none');

  // --- Layers Content ---

  // 1. Hero Layer (The Front Door) - Solid Green, Logo Fades In
  const HeroLayer = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-aredco-green text-aredco-gold relative z-50">
      <MotionDiv 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        className="text-center px-4 flex flex-col items-center relative z-10"
      >
        <div className="w-48 md:w-64 lg:w-80 mb-4 flex items-center justify-center">
            <MotionImg 
                src={IMAGES.logo}
                alt={CONTENT.brand}
                className="w-full h-auto object-contain drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            />
        </div>
        <MotionP 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.5 }}
            className="font-bonheur text-3xl md:text-3xl text-aredco-cream/90"
        >
          {CONTENT.tagline}
        </MotionP>
      </MotionDiv>
      
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-12 z-10"
      >
        <div className="bg-white rounded-full p-3 shadow-lg animate-bounce">
            <ArrowDown size={24} className="text-aredco-green" strokeWidth={1.5} />
        </div>
      </MotionDiv>
    </div>
  );

  // 2. Aerial Wide (Regency 1)
  const AerialWideLayer = (
    <div className="relative w-full h-full bg-black">
      <img src={IMAGES.regency1} alt="Regency Wide Aerial" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );

  // 3. Aerial Close (Regency 2)
  const AerialCloseLayer = (
    <div className="relative w-full h-full bg-black">
      <img src={IMAGES.regency2} alt="Regency Close Aerial" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );

  // 4. Ground View (Regency 3)
  const GroundLayer = (
    <div className="relative w-full h-full bg-black">
      <img src={IMAGES.regency3} alt="Regency Villa" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );

  // 5. Video Layer (Regency 4 / Video)
  const VideoLayer = (
    <div className="relative w-full h-full bg-black">
        <video 
            autoPlay 
            muted 
            loop 
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
            <source src={IMAGES.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        
        <MotionDiv 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ opacity: buttonOpacity, pointerEvents: buttonPointerEvents }}
        >
            <button 
                onClick={onLearnMore}
                className="group relative px-16 py-5 overflow-hidden bg-aredco-green border border-aredco-gold text-white font-sans tracking-[0.2em] uppercase hover:bg-aredco-gold hover:text-aredco-green hover:border-transparent transition-all duration-500 ease-out shadow-2xl"
            >
                <span className="relative z-10 font-medium">Learn More</span>
            </button>
        </MotionDiv>
    </div>
  );

  return (
    <div ref={containerRef} className="h-[500vh] relative bg-aredco-charcoal">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Layer 4: Video (Base) */}
        <div className="absolute inset-0 z-0">
            {VideoLayer}
        </div>

        {/* Layer 3: Ground View (Splits to reveal Video) */}
        <GateLayer 
            progress={gate4Progress}
            frontContent={GroundLayer}
            backContent={null} 
            zIndex={10}
        />

        {/* Layer 2: Aerial Close (Splits to reveal Ground) */}
        <GateLayer 
            progress={gate3Progress}
            frontContent={AerialCloseLayer}
            backContent={null}
            zIndex={20}
        />

        {/* Layer 1: Aerial Wide (Splits to reveal Close) */}
        <GateLayer 
            progress={gate2Progress}
            frontContent={AerialWideLayer}
            backContent={null}
            zIndex={30}
        />

        {/* Layer 0: Hero (Splits to reveal Wide) */}
        <GateLayer 
            progress={gate1Progress}
            frontContent={HeroLayer}
            backContent={null}
            zIndex={40}
        />
        
      </div>
    </div>
  );
};
