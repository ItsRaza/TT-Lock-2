import React, { useState } from 'react';
import { AppScreen, User } from '../types';
import { MOCK_LOCKS } from '../constants';
import { Layout } from '../components/Layout';
import { DoorButton } from '../components/DoorButton';
import { LogOut, UserCircle, Settings, Key, ShoppingCart, ExternalLink } from 'lucide-react';

interface DashboardScreenProps {
  user: User;
  setScreen: (screen: AppScreen) => void;
  setUser: (user: User | null) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, setScreen, setUser }) => {
  const [activeTab, setActiveTab] = useState<'access' | 'settings'>('access');

  const handleLogout = () => {
    setUser(null);
    setScreen(AppScreen.LOGIN);
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Door Access</h2>
            <p className="text-xs text-slate-500">{user.fullName}</p>
          </div>
          <div className="bg-black text-white p-2 rounded-md">
             {/* Mini Logo */}
             <div className="w-6 h-6 flex items-center justify-center border border-white">
                <span className="font-bold text-xs">&gt;</span>
             </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 no-scrollbar">
          {activeTab === 'access' ? (
            <div className="p-6 space-y-8">
              
              {/* Member Status Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Membership</p>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{user.membershipLevel}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.isActive ? 'ACTIVE' : 'EXPIRED'}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600 border-t pt-4">
                   <div className="flex justify-between">
                     <span>Expires:</span>
                     <span className="font-semibold">{user.expirationDate}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Revive Room:</span>
                     <span className="font-semibold">{user.reviveRoomAccess ? 'Authorized' : 'Not Included'}</span>
                   </div>
                </div>

                {!user.isActive && (
                   <button className="w-full mt-4 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium">
                     Renew Membership
                   </button>
                )}
              </div>

              {/* Door Access Grid */}
              <div>
                <h3 className="text-slate-800 font-bold mb-4 text-lg">Select Door</h3>
                <div className="grid grid-cols-2 gap-4">
                  {MOCK_LOCKS.map((lock) => (
                    <DoorButton 
                      key={lock.macAddress} 
                      lockConfig={lock} 
                      disabled={!user.isActive || (lock.name.includes('Premier') && !user.reviveRoomAccess)} 
                    />
                  ))}
                </div>
              </div>

              {/* Purchase Section */}
               <div>
                <h3 className="text-slate-800 font-bold mb-4 text-lg">Purchase Items</h3>
                <div className="grid grid-cols-2 gap-4">
                   <button className="aspect-square bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
                      <div className="bg-white/20 p-3 rounded-full mb-2">
                        <ShoppingCart className="w-6 h-6" />
                      </div>
                      <span className="font-bold">Pro Shop</span>
                   </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">User Profile</h2>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Full Name</label>
                  <div className="text-slate-800 text-lg border-b pb-1 border-slate-200">{user.fullName}</div>
                </div>
                <div className="group">
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Email</label>
                  <div className="text-slate-800 text-lg border-b pb-1 border-slate-200">{user.email}</div>
                </div>
                <div className="group">
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Username</label>
                  <div className="text-slate-800 text-lg border-b pb-1 border-slate-200">{user.username}</div>
                </div>
                 <div className="group">
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">DOB</label>
                  <div className="text-slate-800 text-lg border-b pb-1 border-slate-200">12/29/69</div>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <a 
                  href="https://www.martinathletictraining.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center w-full py-3 border border-blue-500 text-blue-500 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors"
                >
                  Update Membership <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full py-3 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  <LogOut className="w-4 h-4 ml-2" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Navigation */}
        <div className="bg-white border-t flex justify-around py-2 pb-safe">
           <button 
             onClick={() => setActiveTab('access')}
             className={`flex flex-col items-center p-2 ${activeTab === 'access' ? 'text-slate-900' : 'text-slate-400'}`}
           >
             <Key className="w-6 h-6 mb-1" strokeWidth={activeTab === 'access' ? 2.5 : 2} />
             <span className="text-[10px] font-medium">Access</span>
           </button>
           
           <button 
             className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600"
           >
             <div className="w-6 h-6 mb-1 rounded-full border-2 border-current border-dashed animate-spin-slow" />
             <span className="text-[10px] font-medium">Sync</span>
           </button>

           <button 
             onClick={() => setActiveTab('settings')}
             className={`flex flex-col items-center p-2 ${activeTab === 'settings' ? 'text-slate-900' : 'text-slate-400'}`}
           >
             <UserCircle className="w-6 h-6 mb-1" strokeWidth={activeTab === 'settings' ? 2.5 : 2} />
             <span className="text-[10px] font-medium">Profile</span>
           </button>
        </div>
      </div>
    </Layout>
  );
};
