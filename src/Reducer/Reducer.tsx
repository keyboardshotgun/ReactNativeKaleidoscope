// 사용하지 않음
import React, {useContext} from "react";
export const initialState = { count: 0 };
export const Context = React.createContext() ;

type ActionType = {
    type : string
}
type StateType = {
    count : number;
}

export const reducer = (state : StateType , action: ActionType) => {
    switch (action.type) {
        case "reset":
            return initialState;
        case "up":
            return { count: state.count + 1 };
        case "down":
            return { count: state.count - 1 };
        default:
            return state;
    }
};
