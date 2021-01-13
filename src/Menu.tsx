import React from 'react'
import colors from './colors'
import { useProvider } from './Context'
import Slider from './Slider'

const selectedStyle = {
    fontWeight: 700
}

const Menu = () => {
    const provider = useProvider()
    return (
        <div>
            <>{colors.map((c, i) => <button key={i} style={provider.color.value === c.color ? selectedStyle : undefined} onClick={() => provider.color.set(c.color)}>{c.name}</button>)}</>
            <div style={{ height: 10 }} />
            <Slider />
        </div>
    )
}

export default Menu
