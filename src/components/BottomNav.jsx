import React from 'react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'care', label: 'Care', icon: '💖' },
    { id: 'insights', label: 'Insights', icon: '📊' },
    { id: 'growth', label: 'Growth', icon: '🌱' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-pastelPink shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                  isActive ? 'text-pastelPinkDark' : 'text-gray-400 hover:text-pastelPink'
                }`}
              >
                <span className={`text-xl transition-transform ${isActive ? 'scale-125 -translate-y-1' : ''}`}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
