import React from 'react';
import insteadofdashboardImage from '@/assets/insteadofdashboard.png';

const InteractiveDashboard = () => {
  return (
    <div className="relative">
      <img 
        src={insteadofdashboardImage} 
        alt="Maninfini Smart Factory Dashboard - Advanced real-time monitoring and control system"
        className="w-full h-auto object-contain"
        style={{ maxHeight: '3000px', minHeight: '800px' }}
      />
    </div>
  );
};

export default InteractiveDashboard; 