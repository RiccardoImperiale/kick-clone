import { create } from 'zustand'

interface SidebarState {
    isOpen: boolean
    toggleIsOpen: () => void
    setIsOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(set => ({
    isOpen: true,
    toggleIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
}))
