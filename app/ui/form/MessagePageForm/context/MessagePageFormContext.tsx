import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
} from "react";
import { Action, State, initialState, reducer } from "./reducer";

export type IMessagePageFormContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

export const MessagePageFormContext = createContext(
    {} as IMessagePageFormContextType
);

export const MessagePageFormContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state["CURRENT_COMMAND"]._id) {
            dispatch({ type: "MODAL_HELPER_COMMAND", payload: true });
        }
    }, [state["CURRENT_COMMAND"]]);

    return (
        <MessagePageFormContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </MessagePageFormContext.Provider>
    );
};
