import React from 'react';

const FluidFilter: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0.01, pointerEvents: 'none' }}>
      <defs>
        <filter id="fluid-ripple" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.04"
            numOctaves="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.012 0.04; 0.015 0.06; 0.012 0.04"
              dur="6s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="25"
            id="displacement-map"
          >
            <animate
              attributeName="scale"
              values="15; 35; 15"
              dur="10s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
};

export default FluidFilter;
