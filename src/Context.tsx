import React from 'react'
import { useBodyColor, IValue } from './useBodyColor'
import { cool } from './colors'

const context = React.createContext<IValue>({ color: { value: '#fff', set: () => null }, brightness: { value: 1, set: () => null } })

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const provider = useBodyColor(cool.color)
    return <context.Provider value={provider}>{children}</context.Provider>
}

export const useProvider = (): IValue => {
    return React.useContext(context)
}