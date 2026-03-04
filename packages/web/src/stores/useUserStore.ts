import type { TCreateUserOutputDTO } from "@likkida/shared";
import { create } from "zustand";

type TUserState = {
  user: TCreateUserOutputDTO | null;
}
type TUserAction = {
  setUser: (user: TCreateUserOutputDTO | null) => void;
  isAuthenticated: () => boolean
}
export const useUserStore = create<TUserState & TUserAction>((set, get) => ({
  user: null,
  isAuthenticated() { return !!get().user },
  setUser: (user) => { set({ user }) }
}))