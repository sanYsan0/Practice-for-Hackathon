import React from 'react';
import './Settings.css';

const Settings = ({ settings, updateSetting }) => {
  return (
    <div className="settings-container glass-panel">
      <h2>Settings</h2>
      
      <div className="setting-group">
        <label>Theme</label>
        <select 
          value={settings.theme} 
          onChange={(e) => updateSetting('theme', e.target.value)}
        >
          <option value="pastel">Pastel (Default)</option>
          <option value="mint">Mint Breeze</option>
          <option value="retro">Retro Gameboy</option>
          <option value="night">Night Mode</option>
        </select>
      </div>

      <div className="setting-group">
        <label>Companion</label>
        <select 
          value={settings.character} 
          onChange={(e) => updateSetting('character', e.target.value)}
        >
          <option value="cat">Pixel Cat</option>
          <option value="slime">Pixel Slime</option>
          <option value="dino">Pixel Dino</option>
        </select>
      </div>

      <div className="setting-group">
        <label>Cursor Shape</label>
        <select 
          value={settings.cursor} 
          onChange={(e) => updateSetting('cursor', e.target.value)}
        >
          <option value="hand">Cute Hand</option>
          <option value="pixel">Pixel Crosshair</option>
          <option value="magic">Magic Wand</option>
          <option value="default">Default OS Cursor</option>
        </select>
      </div>
      
    </div>
  );
};

export default Settings;
