import { create } from 'zustand'


type TOpttions = {
  color?: "danger" | "neutral" | "primary" | "warning" | "success"
  variant?: "solid" | "outlined" | "plain" | "soft",
  size?: "lg" | "md" | "sm",
  icon?: unknown | null
}
type TToastState = {
  open: boolean,
  message: string | null,
  options: TOpttions
}
type TToastActions = {
  show: (message: string, option?: TOpttions) => void
  hide: () => void
}
export const useToast = create<TToastState & TToastActions>((set) => ({
  open: false,
  message: null,
  options: {},
  icon: null,
  show: (message: string, options?: TOpttions) => {
    set({ open: true, message, options })
  },
  hide: () => {
    set({ open: false, message: null })
  }
}))

export function useDesfragmentedToast() {
  return ({
    openToast: useToast((state) => state.open),
    hideToast: useToast((state) => state.hide),
    showToast: useToast((state) => state.show),
    messageToast: useToast((state) => state.message),
    optionsToast: useToast((state) => state.options)
  })
}