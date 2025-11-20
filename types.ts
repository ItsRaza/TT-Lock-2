export interface User {
  username: string;
  fullName: string;
  email: string;
  membershipLevel: string;
  expirationDate: string;
  isActive: boolean;
  reviveRoomAccess: boolean;
}

export enum LockState {
  LOCKED = 'LOCKED',
  UNLOCKING = 'UNLOCKING',
  UNLOCKED = 'UNLOCKED',
  ERROR = 'ERROR',
}

export interface LockConfig {
  macAddress: string;
  lockData: string;
  aesKey: string;
  name: string;
  color: string;
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
}
