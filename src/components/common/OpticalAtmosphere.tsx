import React from 'react';
import { useAtmosphere } from '../../hooks/useAtmosphere';
import './OpticalAtmosphere.css';

const OpticalAtmosphere: React.FC = () => {
  const prahar = useAtmosphere();

  return (
    <div className={`optical-atmosphere prahar-${prahar}`}>
      <div className="lens-flare lens-1"></div>
      <div className="lens-flare lens-2"></div>
      <div className="lens-flare lens-3"></div>
      <div className="vignette-overlay"></div>
    </div>
  );
};

export default OpticalAtmosphere;
