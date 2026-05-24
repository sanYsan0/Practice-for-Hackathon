import React from 'react';
import PixelCharacter from './PixelCharacter';

const DeviceFrame = ({ stats, mood, onAction }) => {
  // Determine wellness status
  const totalActions = stats.water + stats.play + stats.pet + stats.sleep;
  let statusText = "NEEDS CARE";
  if (totalActions > 5) statusText = "DOING GOOD";
  if (totalActions > 15) statusText = "SUPER HAPPY";
  if (mood === 'sad') statusText = "NEEDS COMFORT";

  return (
    <div className="relative flex flex-col items-center">
      {/* Device Shell */}
      <div className="w-80 h-[480px] bg-gradient-to-br from-pastelPink to-pastelPinkDark rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-2xl border-4 border-white flex flex-col items-center pt-8 pb-6 px-4 relative overflow-hidden">
        
        {/* Device inner shadow / highlight for plastic look */}
        <div className="absolute inset-0 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),inset_10px_10px_20px_rgba(255,255,255,0.6)] pointer-events-none"></div>

        {/* Brand */}
        <div className="font-pixel text-[10px] text-white/70 mb-4 tracking-widest uppercase">MOCHI</div>

        {/* Screen Bezel */}
        <div className="w-full h-56 bg-gray-800 rounded-3xl p-3 shadow-[inset_0_5px_15px_rgba(0,0,0,0.6)] relative z-10">
          
          {/* LCD Screen */}
          <div className="w-full h-full bg-crtGreen rounded-xl relative overflow-hidden flex flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
            
            {/* Retro CRT Scanlines Effect */}
            <div className="crt-effect absolute inset-0 z-20"></div>

            {/* Top Status Bar */}
            <div className="flex justify-between items-center p-2 text-[8px] font-pixel text-gray-800/80 z-10 border-b border-gray-800/10">
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{stats.water + stats.play + stats.pet}</span>
              </div>
              <div>{statusText}</div>
              <div className="flex items-center gap-1">
                <span>🕒</span>
              </div>
            </div>

            {/* Character Area */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <PixelCharacter mood={mood} />
            </div>

            {/* Bottom Screen Decor */}
            <div className="flex justify-between items-center p-2 text-[10px] opacity-60 z-10">
              <span>🌱</span>
              <span>{mood === 'happy' ? '✨' : mood === 'sad' ? '🌧️' : '💤'}</span>
            </div>
          </div>
        </div>

        {/* Physical Buttons */}
        <div className="mt-8 flex justify-center gap-4 z-10 w-full px-6">
          <DeviceButton icon="💧" label="Hydrate" onClick={() => onAction('hydrate')} />
          <DeviceButton icon="⚽" label="Play" onClick={() => onAction('play')} />
          <DeviceButton icon="🖐️" label="Comfort" onClick={() => onAction('comfort')} />
          <DeviceButton icon="🌙" label="Sleep" onClick={() => onAction('sleep')} />
        </div>

        {/* Speaker dots */}
        <div className="mt-auto flex gap-1 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/10"></div>
        </div>

      </div>
    </div>
  );
};

const DeviceButton = ({ icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 group outline-none"
      title={label}
    >
      <div className="w-10 h-10 rounded-full bg-white/40 border-2 border-white/80 shadow-[0_4px_0_rgba(0,0,0,0.1)] flex items-center justify-center text-lg transform transition-all group-active:translate-y-1 group-active:shadow-none hover:bg-white/60">
        {icon}
      </div>
      {/* Hidden label, visually clean, but accessible via title */}
    </button>
  );
};

export default DeviceFrame;
