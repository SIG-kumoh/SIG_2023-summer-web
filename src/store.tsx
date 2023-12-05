import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

export const usePageStore = create<any>(
    persist(
        (set) => ({
            cur: 0,
            setCur: (newCur:number) => set({cur: newCur}),
            isLoggedIn: false,
            username: "",
            authorization: "",
            authority: "",
            setIsLoggedIn: (newIsLoggedIn: boolean) => (
                set({isLoggedIn: newIsLoggedIn})
            ),
            setAuthorization: (newAuthorization: string) => (
                set({authorization: newAuthorization})
            ),
            setAuthority: (newAuthority: Array<any>) => {
                let temp = 'user'
                newAuthority.forEach(i => {
                    if (i.authorityName === 'ROLE_ADMIN') {
                        temp = 'admin'
                    }
                })
                if(newAuthority.length === 0) {
                    temp = ''
                }
                set({authority: temp})
            },
            setUsername:(newUsername: string) => (
                set({username: newUsername})
            )
        }),
        { name: "store.tsx", storage: createJSONStorage(() => sessionStorage)}
    )
)
