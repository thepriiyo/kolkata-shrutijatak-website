import React from 'react';

const FluidFilter: React.FC = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
      <defs>
        <filter id="fluid-ripple">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.05"
            numOctaves="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.01 0.05; 0.015 0.07; 0.01 0.05"
              dur="10s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            id="displacement-map"
          >
            <animate
              attributeName="scale"
              values="0; 5; 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
};

export default FluidFilter;
