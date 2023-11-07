import {create} from 'zustand'
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

export const loginStore = create<any>(
    persist(
        (set) => ({
                isLoggedIn: false,
                nickname: "test1",
                setIsLoggedIn: (newIsLoggedIn:boolean) => (
                    set({isLoggedIn: newIsLoggedIn})
                ),
            }),
        { name: "store.tsx", storage: createJSONStorage(() => sessionStorage)})
)
