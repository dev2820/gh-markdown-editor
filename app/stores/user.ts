import { create } from 'zustand';

type UserState = {
  name: string | null;
  email: string | null;
  profileUrl: string | null;
  setUser: (user: {
    name: string | null;
    email: string | null;
    profileUrl: string | null;
  }) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  name: null,
  email: null,
  profileUrl: null,
  setUser: ({ name, email, profileUrl }) =>
    set({
      name,
      email,
      profileUrl,
    }),
  clearUser: () =>
    set({
      name: null,
      email: null,
      profileUrl: null,
    }),
}));
