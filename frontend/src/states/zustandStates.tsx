import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

//created a global state to save user info
type State = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accessToken: string
}

type Action = {
    updateId: (id: State['id']) => void
    updateFirstName: (firstName: State['firstName']) => void
    updateLastName: (lastName: State['lastName']) => void
    updateEmail: (email: State['email']) => void
    updatePassword: (password: State['password']) => void
    updateAccessToken: (accessToken: State['accessToken']) => void
    clearAll: ()=> void
}

export const userInfo = create<State&Action>()(
    persist(
    (set) => (
    {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accessToken: "",
        updateId: (id) => set(() => ({ id: id})),
        updateFirstName: (firstName) => set(() => ({ firstName: firstName})),
        updateLastName: (lastName) => set(() => ({ lastName: lastName})),
        updateEmail: (email) => set(() => ({ email: email})),
        updatePassword: (password) => set(() => ({ password: password})),
        updateAccessToken: (accessToken) => set(() => ({accessToken: accessToken})),
        clearAll: () => set({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            accessToken: ""
        })
    }),
    {
        name: "userInfo",
        storage: createJSONStorage(()=> localStorage),
        partialize: (state) => ({
            id: state.id,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            accessToken: state.accessToken
        }) as State & Action,
    })
)