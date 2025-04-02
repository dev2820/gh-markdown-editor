import { create } from 'zustand';

type UserState = {
  user: {
    login: string | null;
    name: string | null;
    email: string | null;
    profileUrl: string | null;
  };
};
type UserAction = {
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
};

const defaultUser = {
  login: null,
  name: null,
  email: null,
  profileUrl: null,
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user: user }),
  clearUser: () => set({ user: defaultUser }),
}));
