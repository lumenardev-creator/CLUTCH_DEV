import React from 'react';

export const AnimatedBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: '#080810' }}
    >
      <div className="glow-orb glow-orb-blue" />
      <div className="glow-orb glow-orb-orange" />
      <div className="glow-orb glow-orb-purple" />
    </div>
  );
};
