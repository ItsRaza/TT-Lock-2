import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AppScreen, User } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [user, setUser] = useState<User | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.SPLASH:
        return <SplashScreen setScreen={setCurrentScreen} />;
      case AppScreen.LOGIN:
        return <LoginScreen setScreen={setCurrentScreen} setUser={setUser} />;
      case AppScreen.DASHBOARD:
        return user ? (
          <DashboardScreen user={user} setScreen={setCurrentScreen} setUser={setUser} />
        ) : (
          <LoginScreen setScreen={setCurrentScreen} setUser={setUser} />
        );
      default:
        return <SplashScreen setScreen={setCurrentScreen} />;
    }
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      {renderScreen()}
    </>
  );
};

export default App;
