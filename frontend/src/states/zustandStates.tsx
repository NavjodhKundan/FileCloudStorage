import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

//created a global state to save user info
type State = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accessToken: string,
    storageLimit: number,
    storageUsed: number,
}

type Action = {
    updateId: (id: State['id']) => void
    updateFirstName: (firstName: State['firstName']) => void
    updateLastName: (lastName: State['lastName']) => void
    updateEmail: (email: State['email']) => void
    updatePassword: (password: State['password']) => void
    updateAccessToken: (accessToken: State['accessToken']) => void
    clearAll: ()=> void
    updateStorageLimit: (storageLimit: State['storageLimit']) => void
    updateStorageUsed: (storageUsed: State['storageUsed']) => void
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
        storageLimit: 0,
        storageUsed: 0,
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
            accessToken: "",
            storageUsed: 0,
            storageLimit: 0.
        }),
        updateStorageLimit: (storageLimit) => set(() => ({storageLimit: storageLimit})),
        updateStorageUsed: (storageUsed) => set(() => ({storageUsed: storageUsed})),
    }),
    {
        name: "userInfo",
        storage: createJSONStorage(()=> localStorage),
        partialize: (state) => ({
            id: state.id,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            accessToken: state.accessToken,
            storageLimit: state.storageLimit,
            storageUsed: state.storageUsed
        })
    })
)