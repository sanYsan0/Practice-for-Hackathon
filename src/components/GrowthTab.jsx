import React from 'react';
import './GrowthTab.css';

const GrowthTab = ({ stats }) => {
  // A simple placeholder for growth logic.
  // Using total interactions as 'XP'
  const totalXp = stats.water + stats.play + stats.pet + stats.rest;
  const level = Math.floor(totalXp / 10) + 1;
  const xpForNextLevel = (level * 10);
  const progress = (totalXp % 10) / 10 * 100;

  return (
    <div className="growth-tab-container glass-panel">
      <h2>Growth & Level</h2>
      
      <div className="level-badge-container">
        <div className="level-badge">
          <span>Lv</span>
          <strong>{level}</strong>
        </div>
        <h3>Mochi is growing!</h3>
        <p>Take care of Mochi to level up.</p>
      </div>

      <div className="xp-bar-container">
        <div className="xp-header">
          <span>XP</span>
          <span>{totalXp} / {xpForNextLevel}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill fill-xp" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="milestones">
        <h3>Next Milestones</h3>
        <ul>
          <li className={level >= 2 ? 'unlocked' : 'locked'}>
            <span className="milestone-icon">{level >= 2 ? '✅' : '🔒'}</span>
            Level 2: New Hat
          </li>
          <li className={level >= 5 ? 'unlocked' : 'locked'}>
            <span className="milestone-icon">{level >= 5 ? '✅' : '🔒'}</span>
            Level 5: New Background
          </li>
          <li className={level >= 10 ? 'unlocked' : 'locked'}>
            <span className="milestone-icon">{level >= 10 ? '✅' : '🔒'}</span>
            Level 10: Final Evolution
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GrowthTab;
