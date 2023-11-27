import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

export const usePageStore = create<any>(
    persist(
        (set) => ({
            cur: 0,
            setCur: (newCur:number) => set({cur: newCur}),
        }),
        { name: "store.tsx", storage: createJSONStorage(() => sessionStorage)}
    )
)

export const loginStore = create<any>(
    persist(
        (set) => ({
                isLoggedIn: false,
                nickname: "",
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
        setNickname: (newNickname:string) => (
                    set({nickname: newNickname})
                )
            }),
        { name: "store.tsx", storage: createJSONStorage(() => sessionStorage)})
)
