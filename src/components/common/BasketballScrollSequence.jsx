import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

const FRAME_COUNT = 30;
const getFrameSrc = (index) =>
  `/basketball/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

// Module-level cache so frames are only loaded once across remounts
const imageCache = {};

export const BasketballScrollSequence = ({ children }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload all frames into cache
  useEffect(() => {
    let remaining = FRAME_COUNT;
    const alreadyCached = Object.keys(imageCache).length === FRAME_COUNT;
    if (alreadyCached) { setLoaded(true); return; }

    for (let i = 1; i <= FRAME_COUNT; i++) {
      if (imageCache[i]) { remaining--; if (remaining === 0) setLoaded(true); continue; }
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = img.onerror = () => {
        imageCache[i] = img;
        remaining--;
        if (remaining === 0) setLoaded(true);
      };
    }
  }, []);

  // Drive frame by scroll
  useEffect(() => {
    return scrollYProgress.on('change', (progress) => {
      const index = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(progress * (FRAME_COUNT - 1) + 1))
      );
      if (imgRef.current) {
        imgRef.current.src = getFrameSrc(index);
      }
    });
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/55" />
        </div>
      </div>

      {/* Content pulls up over sticky background */}
      <div className="relative z-10 w-full -mt-[100vh]">
        {children}
      </div>
    </div>
  );
};
