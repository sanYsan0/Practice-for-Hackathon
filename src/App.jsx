import React, { useState, useEffect } from 'react';
import DeviceFrame from './components/DeviceFrame';
import RightPanels from './components/RightPanels';
import CozyHomePanel from './components/CozyHomePanel';
import BottomNav from './components/BottomNav';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [stats, setStats] = useState({
    water: 0,
    play: 0,
    rest: 0,
    pet: 0,
    sleep: 0,
  });

  const [mood, setMood] = useState('happy'); // 'happy', 'sad', 'tired'
  const [affirmation, setAffirmation] = useState("Mochi is relaxing. You're doing great today!");

  const handleAction = (actionId) => {
    setStats(prev => {
      const newStats = { ...prev };
      if (actionId === 'hydrate') newStats.water += 1;
      if (actionId === 'play') newStats.play += 1;
      if (actionId === 'comfort') newStats.pet += 1;
      if (actionId === 'sleep') newStats.sleep += 1;
      return newStats;
    });

    if (actionId === 'hydrate') setAffirmation("Glug glug! Mochi feels refreshed! 💧");
    if (actionId === 'play') setAffirmation("Yay! Mochi loves playing! ⚽");
    if (actionId === 'comfort') setAffirmation("Mochi purrs happily... 💖");
    if (actionId === 'sleep') setAffirmation("Zzz... Mochi is resting. 🌙");

    setTimeout(() => {
      setAffirmation("Mochi is relaxing. You're doing great today!");
    }, 4000);
  };

  const changeMood = (newMood) => {
    setMood(newMood);
    if(newMood === 'happy') setAffirmation("You're feeling good! Mochi is happy too!");
    if(newMood === 'sad') setAffirmation("It's okay to feel sad. Mochi is here for you.");
    if(newMood === 'tired') setAffirmation("Make sure to rest. Mochi will keep watch.");
  };

  return (
    <div className="min-h-screen bg-pastelCream flex flex-col font-sans text-gray-800 pb-20 selection:bg-pastelPink">
      
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <h1 className="font-pixel text-xl tracking-wider text-pastelPinkDark drop-shadow-sm">MOCHI.EXE</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 gap-6 pb-6">
        
        {/* Top Section: Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tamagotchi Device (spans 5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <DeviceFrame stats={stats} mood={mood} onAction={handleAction} />
          </div>

          {/* Right Column: Tracking Panels (spans 7 cols on lg) */}
          <div className="lg:col-span-7">
            <RightPanels stats={stats} mood={mood} changeMood={changeMood} />
          </div>

        </div>

        {/* Bottom Section: Cozy Home Panel */}
        <div className="mt-4">
          <CozyHomePanel mood={mood} affirmation={affirmation} />
        </div>

      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}

export default App;
