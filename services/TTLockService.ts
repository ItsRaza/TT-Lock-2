import { LockConfig } from '../types';

/**
 * Service to handle TTLock BLE operations.
 * 
 * INSTRUCTION FOR REACT NATIVE USAGE:
 * 1. Install the library: npm install react-native-ttlock
 * 2. Link native dependencies if required (iOS Pods).
 * 3. Uncomment the import below and the real implementation calls.
 * 4. Remove the 'STUB' code used for the web simulation.
 */

// import TtLock from 'react-native-ttlock';

// --- STUB START: For Web Simulation Only ---
const TtLock = {
  controlLock: (action: number, lockData: string, mac: string, success: (data: any) => void, fail: (code: number, msg: string) => void) => {
    console.log(`[BLE Stub] Action: ${action}, MAC: ${mac}, Data: ${lockData.substring(0, 10)}...`);
    setTimeout(() => {
      // Simulate varied success based on probability
      if (Math.random() > 0.1) {
        success({ success: true, timestamp: Date.now() });
      } else {
        fail(500, "BLE Connection Timeout Stub");
      }
    }, 1500);
  }
};
// --- STUB END ---

export const TTLockService = {
  /**
   * Simulates connecting to the lock.
   * In standard TTLock SDK, connection is often handled automatically during control operations,
   * but this method can be used for initial discovery or RSSI checks.
   */
  connect: (macAddress: string): Promise<void> => {
    return new Promise((resolve) => {
      console.log(`[TTLockService] Connecting to ${macAddress}...`);
      // Real implementation might involve TtLock.scan() or checking connection state
      setTimeout(() => {
        console.log(`[TTLockService] Connected to ${macAddress}`);
        resolve();
      }, 500);
    });
  },

  /**
   * Unlocks the specified door.
   * Uses Control Action 3 (Unlock).
   */
  unlock: (lockConfig: LockConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log(`[TTLockService] Requesting Unlock for ${lockConfig.name}...`);
      
      TtLock.controlLock(3, lockConfig.lockData, lockConfig.macAddress, 
        (data) => {
          console.log(`[TTLockService] Unlock Successful:`, data);
          resolve();
        },
        (errorCode, errorMsg) => {
          console.error(`[TTLockService] Unlock Failed:`, errorMsg);
          reject(new Error(errorMsg));
        }
      );
    });
  },

  /**
   * Locks the specified door.
   * Uses Control Action 1 (Lock).
   */
  lock: (lockConfig: LockConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      console.log(`[TTLockService] Requesting Lock for ${lockConfig.name}...`);

      TtLock.controlLock(1, lockConfig.lockData, lockConfig.macAddress, 
        (data) => {
          console.log(`[TTLockService] Lock Successful:`, data);
          resolve();
        },
        (errorCode, errorMsg) => {
          console.error(`[TTLockService] Lock Failed:`, errorMsg);
          reject(new Error(errorMsg));
        }
      );
    });
  }
};