import { LockConfig } from '../types';

/**
 * This service simulates the TTLock SDK native module behavior.
 * Since we are in a web environment without direct native BLE access to TTLock hardware,
 * we mock the latency and success/failure states.
 */
export const MockTTLockService = {
  connect: (macAddress: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log(`[MockTTLock] Connecting to ${macAddress}...`);
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          console.log(`[MockTTLock] Connected to ${macAddress}`);
          resolve();
        } else {
          console.error(`[MockTTLock] Connection failed`);
          reject(new Error("BLE Connection Timeout"));
        }
      }, 1500); // Simulate 1.5s connection time
    });
  },

  unlock: (lockConfig: LockConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log(`[MockTTLock] Unlocking ${lockConfig.name} using Key: ${lockConfig.aesKey.substring(0, 5)}...`);
      setTimeout(() => {
        console.log(`[MockTTLock] ${lockConfig.name} Unlocked!`);
        resolve();
      }, 1000); // Simulate 1s unlock operation
    });
  },

  lock: (lockConfig: LockConfig): Promise<void> => {
    return new Promise((resolve) => {
      console.log(`[MockTTLock] Locking ${lockConfig.name}...`);
      setTimeout(() => {
        console.log(`[MockTTLock] ${lockConfig.name} Locked`);
        resolve();
      }, 800);
    });
  }
};
