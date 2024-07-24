import { create } from 'zustand'

type TSubmitDisabler = {
  isDisable: boolean
  setIsDisable: (arg: boolean) => void
}

export const useGlobalSubmitDisabler = create<TSubmitDisabler>((set) => ({
  isDisable: false,
  setIsDisable: (arg) => set(() => ({ isDisable: arg })),
}))
