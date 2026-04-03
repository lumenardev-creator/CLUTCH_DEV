import React, { useRef, useState, useEffect } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    const totalFrames = 160;
    const images = [];
    let loadedCount = 0;
    let isMounted = true;
    
    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/hero/Pulsating_Color_Website_Background_Video_${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames && isMounted) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    let animationFrameId;
    let currentFrame = 0;
    let lastTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const render = (time) => {
      if (!isMounted) return;
      if (loadedCount === totalFrames && canvasRef.current) {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;
        
        if (delta >= interval) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
          }
          
          const img = images[currentFrame];
          const canvasRatio = canvas.width / canvas.height;
          const imgRatio = img.width / img.height;
          let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
          
          if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          }
          
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          
          currentFrame = (currentFrame + 1) % totalFrames;
          lastTime = time - (delta % interval);
        }
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);
    return () => {
      isMounted = false;
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-cover transition-opacity duration-1000 ${imagesLoaded ? "opacity-100" : "opacity-0"}`}
      />
      {!imagesLoaded && <div className="absolute inset-0 fallback-bg pointer-events-none" />}
    </>
  );
};
