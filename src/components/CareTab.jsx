import React from 'react';
import './CareTab.css';

const CareTab = ({ onAction }) => {
  const actions = [
    { id: 'water', label: 'Give Water', description: 'Keeps Mochi hydrated and healthy.', icon: '💧', time: '+5 Energy' },
    { id: 'exercise', label: 'Go for a Walk', description: 'Increases happiness but drains energy.', icon: '⚽️', time: '+10 Happiness' },
    { id: 'checkin', label: 'Pet Mochi', description: 'A quick interaction to show love.', icon: '✋', time: '+5 Happiness' },
    { id: 'rest', label: 'Rest', description: 'Helps Mochi recover energy.', icon: '🌙', time: '+20 Energy' },
  ];

  return (
    <div className="care-tab-container glass-panel">
      <h2>Care Actions</h2>
      <p className="care-subtitle">Take good care of your companion to keep them happy!</p>
      
      <div className="care-list">
        {actions.map(action => (
          <div key={action.id} className="care-card" onClick={() => onAction(action.id)}>
            <div className="care-card-icon">{action.icon}</div>
            <div className="care-card-content">
              <h3>{action.label}</h3>
              <p>{action.description}</p>
            </div>
            <div className="care-card-badge">{action.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareTab;
