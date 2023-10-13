import {create} from 'zus  tand'
import {createJSONStorage, persist} from "zustand/middleware";

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