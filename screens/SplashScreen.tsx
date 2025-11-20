import React, { useEffect } from 'react';
import { AppScreen } from '../types';

interface SplashScreenProps {
  setScreen: (screen: AppScreen) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ setScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(AppScreen.LOGIN);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-white relative">
      {/* Background Image Overlay Simulation */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }}
      />
      
      <div className="z-10 flex flex-col items-center animate-fade-in-up">
        <div className="w-32 h-32 bg-black border-2 border-white rounded-xl flex items-center justify-center mb-6 shadow-2xl">
            {/* Simple Logo Representation */}
            <div className="text-center">
                <h1 className="text-xs font-bold tracking-widest mb-1">MARTIN</h1>
                <p className="text-[0.5rem] uppercase tracking-wider mb-2">Athletic Training</p>
                <div className="text-4xl font-black text-white leading-none mb-2">&gt;</div>
                <p className="text-[0.4rem] font-mono">EST. 2022</p>
            </div>
        </div>
        <h2 className="text-2xl font-bold tracking-wider">MAT GYM ACCESS</h2>
        <p className="text-sm text-gray-300 mt-2">24/7 Member Entry</p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
         <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
