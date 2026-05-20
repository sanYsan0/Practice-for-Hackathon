import React from 'react';
import './Companion.css';
import ParticleSystem from './ParticleSystem';

const Companion = ({ actionState, actionTrigger, actionType }) => {
  // Determine facial expression and animation class based on state
  let face = '(・ω・)';
  let animationClass = 'idle';

  if (actionState === 'water') {
    face = '(≧◡≦)';
    animationClass = 'anim-bounce';
  } else if (actionState === 'exercise') {
    face = '٩(๑･ิᴗ･ิ)۶';
    animationClass = 'anim-jump';
  } else if (actionState === 'checkin') {
    face = '(✿ ♡‿♡)';
    animationClass = 'anim-bounce';
  } else if (actionState === 'rest') {
    face = '(ᴗ˳ᴗ)';
    animationClass = 'anim-sleep';
  }

  return (
    <div className="companion-wrapper">
      <div className={`companion-character ${animationClass}`}>
        <div className="companion-body">
          <div className="companion-face">{face}</div>
        </div>
      </div>
      <ParticleSystem trigger={actionTrigger} type={actionType} />
      <div className="companion-shadow"></div>
    </div>
  );
};

export default Companion;
