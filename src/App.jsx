import React, { useState, useEffect } from 'react';
import './App.css';
import PixelCharacter from './components/PixelCharacter';
import CareControls from './components/CareControls';
import EmotionalFeedback from './components/EmotionalFeedback';
import InsightsTab from './components/InsightsTab';
import Settings from './components/Settings';
import ParticleSystem from './components/ParticleSystem';
import DeviceFrame from './components/DeviceFrame';
import CareTab from './components/CareTab';
import GrowthTab from './components/GrowthTab';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [actionState, setActionState] = useState('idle');
  const [actionTrigger, setActionTrigger] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Stats State
  const [stats, setStats] = useState({
    water: 0,
    play: 0,
    rest: 0,
    pet: 0
  });

  // Settings State
  const [settings, setSettings] = useState({
    theme: 'pastel',
    character: 'cat',
    cursor: 'hand'
  });

  // Apply theme and cursor globally
  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    document.body.setAttribute('data-cursor', settings.cursor);
  }, [settings.theme, settings.cursor]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAction = (type) => {
    setActionState(type);
    setActionTrigger(prev => prev + 1);

    // Update stats
    setStats(prev => {
      const newStats = { ...prev };
      if (type === 'water') newStats.water += 1;
      if (type === 'exercise') newStats.play += 1;
      if (type === 'rest') newStats.rest += 1;
      if (type === 'checkin') newStats.pet += 1;
      return newStats;
    });

    // Set emotional feedback text
    let message = '';
    switch (type) {
      case 'water': message = 'Mochi feels refreshed! 💧'; break;
      case 'exercise': message = 'That play session helped a lot! ⚽️'; break;
      case 'checkin': message = 'Thank you for taking care of me! 💕'; break;
      case 'rest': message = 'Zzz... so cozy... 🌙'; break;
      default: message = '';
    }
    setFeedbackMessage(message);

    // Return to idle state after animation
    setTimeout(() => {
      setActionState('idle');
    }, 2000);
  };

  // Determine the character's visual state based on stats
  const getCharacterState = () => {
    const hydration = 30 + (stats.water * 20) - (stats.play * 10);
    const energy = 100 - (stats.play * 15) + (stats.rest * 20) + (stats.water * 5);
    
    if (hydration < 20 || energy < 20) return 'sad';
    if (actionState === 'exercise') return 'energetic';
    return 'idle';
  };

  const getWellnessScore = () => {
    const happiness = Math.min(100, 50 + (stats.pet * 5) + (stats.play * 10) - (stats.rest * 2));
    if (happiness > 80) return "Super Happy ✨";
    if (happiness > 50) return "Doing Good 🌟";
    return "Needs Care 💭";
  };

  const animationClass = 
    actionState === 'water' ? 'anim-bounce' :
    actionState === 'exercise' ? 'anim-jump' :
    actionState === 'checkin' ? 'anim-bounce' :
    actionState === 'rest' ? 'anim-sleep' : 'anim-idle';

  return (
    <div className="app-container">
      <header className="top-bar">
        <h1 className="app-title">Mochi.exe</h1>
      </header>

      <main className="main-content">
        {activeTab === 'home' && (
          <DeviceFrame 
            bottomControls={<CareControls onAction={handleAction} stats={stats} />}
          >
            <div className="wellness-badge">{getWellnessScore()}</div>
            <EmotionalFeedback message={feedbackMessage} trigger={actionTrigger} isMini={false} />
            <PixelCharacter 
              type={settings.character} 
              state={getCharacterState()}
              actionState={actionState}
              animationClass={animationClass}
              isMini={false}
            />
            <ParticleSystem trigger={actionTrigger} type={actionState} isMini={false} />
          </DeviceFrame>
        )}

        {/* Content specific to the active tab */}
        {activeTab === 'care' && (
          <CareTab onAction={handleAction} />
        )}

        {activeTab === 'insights' && (
          <InsightsTab stats={stats} />
        )}

        {activeTab === 'growth' && (
          <GrowthTab stats={stats} />
        )}

        {activeTab === 'settings' && (
          <Settings settings={settings} updateSetting={updateSetting} />
        )}
      </main>

      <nav className="tabs-nav">
        <button 
          className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
          onClick={() => setActiveTab('care')}
        >
          Care
        </button>
        <button 
          className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
        <button 
          className={`tab-btn ${activeTab === 'growth' ? 'active' : ''}`}
          onClick={() => setActiveTab('growth')}
        >
          Growth
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
    </div>
  );
}

export default App;
