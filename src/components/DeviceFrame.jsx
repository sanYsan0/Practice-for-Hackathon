import React from 'react';
import './DeviceFrame.css';

const DeviceFrame = ({ children, bottomControls }) => {
  return (
    <div className="device-container">
      <div className="device-shell">
        <div className="device-screen-bezel">
          <div className="device-screen">
            {children}
          </div>
        </div>
        
        {bottomControls && (
          <div className="device-physical-buttons">
            {bottomControls}
          </div>
        )}

        <div className="device-branding">Mochi</div>
      </div>
    </div>
  );
};

export default DeviceFrame;
