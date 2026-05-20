import React from 'react';
import './InsightsTab.css';

const InsightsTab = ({ stats }) => {
  // Calculate derived values based on counts
  const happiness = Math.min(100, 50 + (stats.pet * 5) + (stats.play * 10) - (stats.rest * 2));
  const energy = Math.min(100, 100 - (stats.play * 15) + (stats.rest * 20) + (stats.water * 5));
  const hydration = Math.min(100, 30 + (stats.water * 20) - (stats.play * 10));

  return (
    <div className="stats-container glass-panel">
      <h2>Mochi's Status</h2>
      
      <div className="stat-bars">
        <div className="stat-row">
          <label>Happiness</label>
          <div className="progress-bar">
            <div className="progress-fill fill-happiness" style={{ width: `${Math.max(0, happiness)}%` }}></div>
          </div>
          <span>{Math.max(0, happiness)}%</span>
        </div>
        
        <div className="stat-row">
          <label>Energy</label>
          <div className="progress-bar">
            <div className="progress-fill fill-energy" style={{ width: `${Math.max(0, energy)}%` }}></div>
          </div>
          <span>{Math.max(0, energy)}%</span>
        </div>
        
        <div className="stat-row">
          <label>Hydration</label>
          <div className="progress-bar">
            <div className="progress-fill fill-hydration" style={{ width: `${Math.max(0, hydration)}%` }}></div>
          </div>
          <span>{Math.max(0, hydration)}%</span>
        </div>
      </div>

      <div className="action-logs">
        <h3>Action Log</h3>
        <ul>
          <li>💧 Water given: <strong>{stats.water}</strong> times</li>
          <li>⚽️ Play sessions: <strong>{stats.play}</strong> times</li>
          <li>✋ Petting: <strong>{stats.pet}</strong> times</li>
          <li>🌙 Rested: <strong>{stats.rest}</strong> times</li>
        </ul>
      </div>
    </div>
  );
};

export default InsightsTab;
