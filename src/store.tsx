import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

interface Page {
    cur: number,
    setCur: (newCur: number) => void
}

export const usePageStore = create<any>(
    persist(
        (set) => ({
        cur: 0,
        setCur: (newCur:number) => set({cur: newCur}),
        }),
        { name: "store.tsx",
        storage: createJSONStorage(() => sessionStorage)}
    )
)