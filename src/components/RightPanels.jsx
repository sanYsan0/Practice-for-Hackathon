import React from 'react';

const RightPanels = ({ stats, mood, changeMood }) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Mood Panel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-pastelPink">
        <h2 className="font-pixel text-[12px] text-gray-500 mb-4 uppercase tracking-wider">Current Mood</h2>
        <div className="flex justify-around">
          <MoodButton icon="🌧️" label="sad" currentMood={mood} onClick={() => changeMood('sad')} />
          <MoodButton icon="✨" label="happy" currentMood={mood} onClick={() => changeMood('happy')} />
          <MoodButton icon="💤" label="tired" currentMood={mood} onClick={() => changeMood('tired')} />
        </div>
      </div>

      {/* 2. Growth Panel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-pastelPurple">
        <h2 className="font-pixel text-[12px] text-gray-500 mb-4 uppercase tracking-wider flex justify-between">
          <span>Growth</span>
          <span className="text-pastelPurple font-bold">LVL 3</span>
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-semibold text-gray-600">
            <span>XP</span>
            <span>45 / 100</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div className="h-full bg-gradient-to-r from-pastelPurple to-purple-300 w-[45%] transition-all duration-1000 ease-out"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Today Panel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-100">
          <h2 className="font-pixel text-[12px] text-gray-500 mb-4 uppercase tracking-wider">Today</h2>
          <div className="flex flex-col gap-3">
            <ChecklistItem label="Drink Water" isDone={stats.water > 0} />
            <ChecklistItem label="Play" isDone={stats.play > 0} />
            <ChecklistItem label="Check-in" isDone={stats.pet > 0} />
            <ChecklistItem label="Sleep 7h" isDone={stats.sleep > 0} />
          </div>
        </div>

        {/* 4. Menu Panel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-100">
          <h2 className="font-pixel text-[12px] text-gray-500 mb-4 uppercase tracking-wider">Menu</h2>
          <div className="flex flex-col gap-2">
            <MenuLink icon="📝" label="Mood Check-in" />
            <MenuLink icon="🌬️" label="Breathe" />
            <MenuLink icon="🛌" label="Log Sleep" />
            <MenuLink icon="💖" label="Self-Care" />
          </div>
        </div>
      </div>

    </div>
  );
};

const MoodButton = ({ icon, label, currentMood, onClick }) => {
  const isActive = currentMood === label;
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
        isActive ? 'bg-pastelCream shadow-sm border-2 border-pastelPink scale-110' : 'hover:bg-gray-50 border-2 border-transparent grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-xs font-semibold capitalize text-gray-600">{label}</div>
    </button>
  );
};

const ChecklistItem = ({ label, isDone }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isDone ? 'bg-green-400 border-green-400' : 'border-gray-300'}`}>
        {isDone && <span className="text-white text-xs">✓</span>}
      </div>
      <span className={`text-sm font-semibold transition-colors ${isDone ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{label}</span>
    </div>
  );
};

const MenuLink = ({ icon, label }) => {
  return (
    <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-pastelCream transition-colors text-left w-full">
      <span className="text-lg bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">{icon}</span>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );
};

export default RightPanels;
