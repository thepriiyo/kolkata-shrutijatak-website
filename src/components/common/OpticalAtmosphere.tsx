import React from 'react';
import { useAtmosphere } from '../../hooks/useAtmosphere';
import { usePerformance } from '../../hooks/usePerformance';
import './OpticalAtmosphere.css';

const OpticalAtmosphere: React.FC = () => {
  const prahar = useAtmosphere();
  const tier = usePerformance();

  return (
    <div className={`optical-atmosphere prahar-${prahar}`} data-tier={tier}>
      <div className="lens-flare lens-1"></div>
      {tier === 'high' && (
        <>
          <div className="lens-flare lens-2"></div>
          <div className="lens-flare lens-3"></div>
        </>
      )}
      <div className="vignette-overlay"></div>
    </div>
  );
};

export default OpticalAtmosphere;
