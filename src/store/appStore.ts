import { create } from 'zustand';

interface AppState {
  isCrisisMode: boolean;
  toggleCrisisMode: () => void;
  setCrisisMode: (value: boolean) => void;
  
  // SOS Dialog state
  isSOSDialogOpen: boolean;
  openSOSDialog: () => void;
  closeSOSDialog: () => void;
  
  // Location
  currentLocation: string;
  setLocation: (location: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isCrisisMode: false,
  toggleCrisisMode: () => set((state) => ({ isCrisisMode: !state.isCrisisMode })),
  setCrisisMode: (value) => set({ isCrisisMode: value }),
  
  isSOSDialogOpen: false,
  openSOSDialog: () => set({ isSOSDialogOpen: true }),
  closeSOSDialog: () => set({ isSOSDialogOpen: false }),
  
  currentLocation: 'Mumbai, IN',
  setLocation: (location) => set({ currentLocation: location }),
}));
