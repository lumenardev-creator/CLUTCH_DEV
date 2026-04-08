import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

const FRAME_COUNT = 40;
const getFrameSrc = (index) =>
  `/dribbling/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

// Module-level cache so frames are only loaded once across remounts
const imageCache = {};

export const DribblingScrollSequence = ({ children }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    let remaining = FRAME_COUNT;
    const preloaded = Object.keys(imageCache).length;
    if (preloaded >= FRAME_COUNT) {
      setLoaded(true);
      return;
    }

    for (let i = 1; i <= FRAME_COUNT; i++) {
      if (imageCache[i]) {
        remaining--;
        if (remaining === 0) setLoaded(true);
        continue;
      }
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = img.onerror = () => {
        imageCache[i] = img;
        remaining--;
        if (remaining === 0) setLoaded(true);
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (!imgRef.current) return;
      const progress = Math.max(0, Math.min(1, latest));
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1)) + 1;
      
      const nextSrc = getFrameSrc(frameIndex);
      if (imgRef.current.src !== window.location.origin + nextSrc) {
        // Double check standard URL parsing discrepancy
        if (!imgRef.current.src.endsWith(nextSrc)) {
          imgRef.current.src = nextSrc;
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Sticky background canvas */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none z-0 bg-black">
        <div className="relative w-full h-full">
          {/* Show first frame immediately while loading */}
          <img
            ref={imgRef}
            src={getFrameSrc(1)}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover mix-blend-screen transition-none"
            style={{ opacity: loaded ? 0.6 : 0.2 }}
          />
          {/* Gradient vignettes to blend into page */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/55" />
        </div>
      </div>

      {/* Content wrapper pushed over background */}
      <div className="-mt-[100vh] relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
