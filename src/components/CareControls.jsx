import React from 'react';
import './CareControls.css';

const CareControls = ({ onAction, stats }) => {
  const controls = [
    { id: 'water', label: 'Water', icon: '💧', colorClass: 'btn-water', count: stats.water },
    { id: 'exercise', label: 'Play', icon: '⚽️', colorClass: 'btn-exercise', count: stats.play },
    { id: 'checkin', label: 'Pet', icon: '✋', colorClass: 'btn-checkin', count: stats.pet },
    { id: 'rest', label: 'Rest', icon: '🌙', colorClass: 'btn-rest', count: stats.rest },
  ];

  return (
    <div className="care-controls">
      {controls.map(control => (
        <button 
          key={control.id}
          className={`care-btn ${control.colorClass}`}
          onClick={() => onAction(control.id)}
        >
          <div className="btn-icon-wrapper">
            <span className="btn-icon">{control.icon}</span>
          </div>
          <span className="btn-label">{control.label}</span>
          {control.count > 0 && <div className="btn-count">{control.count}</div>}
        </button>
      ))}
    </div>
  );
};

export default CareControls;
