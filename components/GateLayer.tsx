
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface GateLayerProps {
  /** Progress of this specific gate (0 to 1) */
  progress: MotionValue<number>;
  /** The content to be split (Top Layer) */
  frontContent: React.ReactNode;
  /** The content revealed behind (Bottom Layer) */
  backContent: React.ReactNode | null;
  /** Z-index for stacking context */
  zIndex: number;
}

export const GateLayer: React.FC<GateLayerProps> = ({ progress, frontContent, backContent, zIndex }) => {
  // Map progress to x-axis translation. 
  // 0 progress = centered (closed). 1 progress = fully pushed out (open).
  const xLeft = useTransform(progress, [0, 1], ["0%", "-100%"]);
  const xRight = useTransform(progress, [0, 1], ["0%", "100%"]);
  
  // Opacity fade out slightly as it opens for smoothness
  const opacity = useTransform(progress, [0, 0.8], [1, 0]);
  
  // Scale effect for the back content to create depth
  const scaleBack = useTransform(progress, [0, 1], [0.95, 1]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex }}>
      {/* The Content BEHIND the gate */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: scaleBack }}
      >
        {backContent}
      </motion.div>

      {/* The LEFT Gate */}
      <motion.div 
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden z-10"
        style={{ x: xLeft, opacity }}
      >
        <div className="absolute top-0 left-0 w-[200%] h-full">
            {frontContent}
        </div>
      </motion.div>

      {/* The RIGHT Gate */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-10"
        style={{ x: xRight, opacity }}
      >
        <div className="absolute top-0 right-0 w-[200%] h-full">
            {frontContent}
        </div>
      </motion.div>
    </div>
  );
};
