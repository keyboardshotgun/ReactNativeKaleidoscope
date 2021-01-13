import React, {createContext, useState} from 'react';

interface initType {
    state: { color: string, subColor: string },
    actions: {
        setColor : Function,
        setSubColor : Function
    }
}

const initData : initType = {
    state : { color : 'black' , subColor: 'red' },
    actions : {
        setColor : () => {},
        setSubColor : () => {}
    }
}

const ColorContext = createContext(initData);

const ColorProvider = ({ children }) => {
    const [color,setColor] =  useState(initData.state.color);
    const [subColor,setSubColor] =  useState(initData.state.subColor);
    const value = {
        state: { color, subColor },
        actions : { setColor, setSubColor }
    }
    return (
        <ColorContext.Provider value={value}>
            {...children}
        </ColorContext.Provider>
    )
}

const { Consumer : ColorConsumer } = ColorContext;
export { ColorProvider, ColorConsumer };
export default ColorContext;
