import React, { useState } from 'react';
import { Lock, Unlock, Bluetooth, Loader2 } from 'lucide-react';
import { LockConfig, LockState } from '../types';
import { TTLockService } from '../services/TTLockService';
import toast from 'react-hot-toast';

interface DoorButtonProps {
  lockConfig: LockConfig;
  disabled?: boolean;
}

export const DoorButton: React.FC<DoorButtonProps> = ({ lockConfig, disabled }) => {
  const [status, setStatus] = useState<LockState>(LockState.LOCKED);

  const handlePress = async () => {
    if (disabled || status === LockState.UNLOCKING) return;

    setStatus(LockState.UNLOCKING);
    const loadingToast = toast.loading(`Connecting to ${lockConfig.name}...`);

    try {
      // 1. Connect Operation
      await TTLockService.connect(lockConfig.macAddress);
      
      toast.loading(`Unlocking ${lockConfig.name}...`, { id: loadingToast });
      
      // 2. Unlock Operation
      await TTLockService.unlock(lockConfig);
      
      setStatus(LockState.UNLOCKED);
      toast.success(`${lockConfig.name} Unlocked!`, { id: loadingToast });

      // 3. Auto-lock (Simulating Lock Operation)
      setTimeout(async () => {
        try {
           // Calling the Lock operation as requested
           await TTLockService.lock(lockConfig);
           setStatus(LockState.LOCKED);
           toast(`${lockConfig.name} re-locked`, { icon: '🔒' });
        } catch (e) {
           console.error("Auto-lock failed", e);
           setStatus(LockState.LOCKED); // Reset state anyway
        }
      }, 5000);

    } catch (error) {
      console.error(error);
      setStatus(LockState.ERROR);
      toast.error("Failed to communicate with lock.", { id: loadingToast });
      
      setTimeout(() => setStatus(LockState.LOCKED), 2000);
    }
  };

  return (
    <button
      onClick={handlePress}
      disabled={disabled}
      className={`
        relative w-full aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-3
        text-white shadow-lg transition-all duration-200 active:scale-95
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : lockConfig.color}
        ${status === LockState.UNLOCKING ? 'opacity-90' : ''}
      `}
    >
      <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
        {status === LockState.UNLOCKING ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : status === LockState.UNLOCKED ? (
          <Unlock className="w-8 h-8" />
        ) : (
          <Bluetooth className="w-8 h-8" />
        )}
      </div>
      
      <div className="text-center">
        <h3 className="font-bold text-lg leading-tight">{lockConfig.name}</h3>
        <p className="text-xs opacity-80 mt-1 font-medium">
          {status === LockState.UNLOCKING ? 'Connecting...' : 
           status === LockState.UNLOCKED ? 'Unlocked' : 'Tap to Unlock'}
        </p>
      </div>

      {status === LockState.UNLOCKED && (
        <div className="absolute inset-0 rounded-2xl border-4 border-green-400 animate-pulse pointer-events-none" />
      )}
    </button>
  );
};