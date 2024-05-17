import { create } from "zustand"

interface IOwnerStore {
  owner: string,
  setOwner: (id: string) => void
}

export const useOwnerStore = create<IOwnerStore>(
  (set) => ({
    owner: "",
    setOwner: (id) => set(state => ({ owner: id })),
  })
)
