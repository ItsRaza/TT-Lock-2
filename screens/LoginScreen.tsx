import React, { useState } from 'react';
import { AppScreen, User } from '../types';
import { MOCK_USER } from '../constants';
import { Layout } from '../components/Layout';
import { User as UserIcon, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginScreenProps {
  setScreen: (screen: AppScreen) => void;
  setUser: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ setScreen, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      if (username && password) {
        setUser(MOCK_USER);
        setScreen(AppScreen.DASHBOARD);
        toast.success('Welcome back, Tom!');
      } else {
        toast.error('Please enter valid credentials');
      }
    }, 1500);
  };

  return (
    <Layout className="bg-slate-900">
      <div className="relative h-full flex flex-col">
         {/* Header / Banner */}
         <div className="h-1/3 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
            <div className="absolute bottom-8 left-6">
              <h1 className="text-3xl font-bold text-white mb-1">Login</h1>
              <p className="text-slate-300 text-sm">Access your 24/7 MAT Membership</p>
            </div>
         </div>

         {/* Form Section */}
         <div className="flex-1 px-6 pt-4 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-slate-400 text-xs uppercase font-semibold tracking-wider ml-1">Username or Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 text-xs uppercase font-semibold tracking-wider ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Enter your password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-slate-500"/> : <Eye className="h-5 w-5 text-slate-500"/>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-slate-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Log In'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
               <p className="text-xs text-slate-500">
                 By logging in, you agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
               </p>
            </div>
         </div>
      </div>
    </Layout>
  );
};
