import React from 'react';

const CozyHomePanel = ({ mood, affirmation }) => {
  // Determine lighting based on mood
  const getLightingOverlay = () => {
    if (mood === 'sad') return 'bg-blue-900/40';
    if (mood === 'tired') return 'bg-indigo-900/60';
    return 'bg-orange-300/10'; // Bright and warm for happy
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-pastelPink w-full flex flex-col md:flex-row gap-6 items-center">
      
      {/* Pixel Art Room Preview */}
      <div className="relative w-full md:w-64 h-40 bg-[#fdfbf7] rounded-2xl border-4 border-gray-100 overflow-hidden shrink-0 flex items-end">
        
        {/* Dynamic Lighting */}
        <div className={`absolute inset-0 z-20 pointer-events-none transition-colors duration-1000 ${getLightingOverlay()}`}></div>

        {/* Wallpaper & Floor */}
        <div className="absolute inset-0 bg-[#f4e1e1] border-b-[30px] border-[#dcd0c0]"></div>

        {/* Window */}
        <div className="absolute top-4 left-6 w-16 h-16 bg-blue-200 border-4 border-white flex flex-wrap">
           <div className="w-1/2 h-1/2 border-r-2 border-b-2 border-white/50"></div>
           <div className="w-1/2 h-1/2 border-b-2 border-white/50"></div>
           <div className="w-1/2 h-1/2 border-r-2 border-white/50"></div>
           <div className="w-1/2 h-1/2"></div>
        </div>

        {/* Plant */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center">
          <div className="w-6 h-8 bg-green-500 rounded-t-full shadow-[inset_-2px_0_0_rgba(0,0,0,0.2)]"></div>
          <div className="w-8 h-6 bg-orange-400 rounded-b-lg border-t-4 border-orange-500 shadow-[inset_-2px_0_0_rgba(0,0,0,0.2)]"></div>
        </div>

        {/* Lamp */}
        <div className="absolute bottom-8 left-4 flex flex-col items-center">
          <div className={`w-8 h-6 bg-yellow-100 rounded-t-full ${mood === 'tired' ? 'opacity-30' : 'shadow-[0_0_15px_rgba(255,255,0,0.8)]'}`}></div>
          <div className="w-1 h-12 bg-gray-400"></div>
          <div className="w-6 h-2 bg-gray-500 rounded-t-sm"></div>
        </div>

        {/* Bed */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-pastelPurple rounded-t-xl border-b-4 border-purple-300 flex items-end px-2">
          {/* Pillow */}
          <div className="w-10 h-6 bg-white rounded-lg mb-2 shadow-sm"></div>
        </div>

        {/* Tiny Mochi on Bed */}
        <div className="absolute bottom-8 left-1/2 translate-x-[-10px] w-8 h-6 bg-[#fdfbf7] rounded-t-xl shadow-sm flex items-center justify-center z-10">
          {mood === 'tired' ? (
            <span className="text-[6px] font-pixel text-gray-500 absolute -top-3">z</span>
          ) : (
            <div className="w-1 h-1 bg-black rounded-full mx-0.5"></div>
          )}
        </div>

      </div>

      {/* Text Message */}
      <div className="flex-1 w-full bg-pastelCream rounded-2xl p-5 border-2 border-pastelPink/50 relative">
        {/* Speech tail */}
        <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-pastelCream border-l-2 border-b-2 border-pastelPink/50 rotate-45"></div>
        
        <p className="font-sans text-gray-700 text-lg font-medium leading-relaxed">
          {affirmation}
        </p>
      </div>

    </div>
  );
};

export default CozyHomePanel;
