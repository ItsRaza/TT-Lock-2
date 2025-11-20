import { LockConfig } from './types';

// TTLock Configuration as requested
export const LOCK_MAC = "AA:BB:CC:DD:EE:FF";
export const LOCK_DATA = "PUT_LOCK_DATA_HERE";
export const AES_KEY = "PUT_AES_KEY_HERE";
export const PROTOCOL_VERSION = 3;

export const MOCK_LOCKS: LockConfig[] = [
  {
    name: "Front Door",
    color: "bg-cyan-500",
    macAddress: LOCK_MAC,
    lockData: LOCK_DATA,
    aesKey: AES_KEY,
    protocolVersion: PROTOCOL_VERSION,
  },
  {
    name: "Premier Door",
    color: "bg-orange-500",
    macAddress: "FF:EE:DD:CC:BB:AA", // Different MAC for simulation
    lockData: LOCK_DATA,
    aesKey: AES_KEY,
    protocolVersion: PROTOCOL_VERSION,
  },
  {
    name: "Door Keypad",
    color: "bg-green-500",
    macAddress: "11:22:33:44:55:66",
    lockData: LOCK_DATA,
    aesKey: AES_KEY,
    protocolVersion: PROTOCOL_VERSION,
  }
];

export const MOCK_USER = {
  username: "user28195957473418",
  fullName: "Tom Hazlett",
  email: "thazlett@hazeinc.com",
  membershipLevel: "1-Month 24/7 Access",
  expirationDate: "Jun 28, 2025",
  isActive: true,
  reviveRoomAccess: true,
};