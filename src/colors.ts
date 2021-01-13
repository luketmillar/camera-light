export interface IColorOption {
    color: string
    name: string
}

export const white = {
    color: '#E1E1E1',
    name: 'White'
}

export const cool = {
    color: '#DBF5F6',
    name: 'Cool'
}

export const warm = {
    color: '#FFF4EA',
    name: 'Warm'
}

const colors: IColorOption[] = [
    warm,
    cool,
    white
]


export default colors