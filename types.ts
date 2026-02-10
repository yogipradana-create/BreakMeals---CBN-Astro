
export enum BreakType {
  ISTIRAHAT = 'Istirahat'
}

export interface UserProfile {
  id: string;
  name: string;
  department: string;
}

export interface BreakRecord {
  id: string;
  userId: string;
  userName: string;
  type: BreakType;
  startTime: number;
  tlCode: string; 
  tlEmail: string; 
  endTime?: number;
  duration?: number; // in minutes
  status: 'active' | 'completed';
}

export interface AppState {
  user: UserProfile | null;
  activeBreak: BreakRecord | null;
  history: BreakRecord[];
}
