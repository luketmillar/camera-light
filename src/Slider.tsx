import React from 'react'
import { useProvider } from './Context'

const getMouseValue = (ref: HTMLDivElement, e: MouseEvent): number => {
    const sliderRect = ref.getBoundingClientRect()
    const mouseX = e.clientX
    const value = (mouseX - sliderRect.left) / sliderRect.width
    if (value < 0) {
        return 0
    }
    if (value > 1) {
        return 1
    }
    return value
}

const useMouseHandler = () => {
    const ref = React.useRef<HTMLDivElement>(null)
    const [value, setValue] = React.useState(1)
    const isDraggingRef = React.useRef(false)

    const onMouseDown = React.useCallback((e: MouseEvent) => {
        if (!ref.current) {
            return
        }
        if (isDraggingRef.current) {
            return
        }
        isDraggingRef.current = true
        const value = getMouseValue(ref.current, e)
        setValue(value)
    }, [])

    const onMouseUp = React.useCallback((e: MouseEvent) => {
        if (!ref.current) {
            return
        }
        if (!isDraggingRef.current) {
            return
        }
        isDraggingRef.current = false
        const value = getMouseValue(ref.current, e)
        setValue(value)
    }, [])

    const onMouseMove = React.useCallback((e: MouseEvent) => {
        if (!ref.current) {
            return
        }
        if (!isDraggingRef.current) {
            return
        }
        const value = getMouseValue(ref.current, e)
        setValue(value)
    }, [])

    React.useEffect(() => {
        const node = ref.current
        node?.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('mousemove', onMouseMove)
        return () => {
            node?.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [onMouseMove, onMouseUp, onMouseDown])

    return { ref, value }
}

const barStyles = {
    position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, borderRadius: 5
} as const

const Slider = () => {
    const provider = useProvider()

    const mouseHandler = useMouseHandler()
    React.useEffect(() => {
        provider.brightness.set(mouseHandler.value)
    }, [provider.brightness, mouseHandler.value])

    const rightValue = (1 - provider.brightness.value) * 100

    return (
        <div ref={mouseHandler.ref} style={{ position: 'relative', height: 20, width: '100%' }}>
            <div style={{ ...barStyles, backgroundColor: '#ccc' }} />
            <div style={{ ...barStyles, backgroundColor: '#666', right: `${rightValue}%` }} />
        </div>
    )
}

export default Slider
