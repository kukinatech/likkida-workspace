import { create } from "zustand";

type TNavigatorState = {
  open: boolean;
}
type TNavigatorAction = {
  toogle: () => void
}
export const useNavigatorBarStore = create<TNavigatorState & TNavigatorAction>((set, get) => ({
  open: false,
  toogle: () => set(state => ({ open: !state.open }))
}))