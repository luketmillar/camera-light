import React from 'react'
import Color from 'color'

export interface IValue {
    color: { value: string, set: (value: string) => void }
    brightness: { value: number, set: (value: number) => void }
}

export const useBodyColor = (initialValue: string = "#fff"): IValue => {
    const [color, setColor] = React.useState(initialValue)
    const [brightness, setBrightness] = React.useState(1)
    const onChange = React.useCallback((change: string) => {
        setColor(change)
    }, [])

    React.useEffect(() => {
        const clippedBrightness = 100 * ((brightness * 0.3) + 0.5)
        const desaturation = 1 - ((brightness * 0.5))
        document.body.style.backgroundColor = Color(color).lightness(clippedBrightness).desaturate(desaturation).hex()
    }, [color, brightness])

    const value = React.useMemo(() => ({ color: { value: color, set: onChange }, brightness: { value: brightness, set: setBrightness } }), [color, brightness, onChange])
    return value
}
