import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
} from "react";
import { Action, State, initialState, redcuer } from "./reducer";
import { findOneCommandformComandPage } from "@/app/lib/actions";
import { Command } from "@/app/lib/definitions";
import { WithId } from "mongodb";
import { CommandCreateFormData } from "../useCommandCreateForm";

export type ICommandFormContext = {
    state: State;
    dispatch: Dispatch<Action>;
};

export const CommandFormContext = createContext({} as ICommandFormContext);

export const CommandFormProvider: React.FC<{
    children: ReactNode;
    uuid?: string;
}> = ({ children, uuid }) => {
    const [state, dispatch] = useReducer(redcuer, initialState);

    const loadingCurrentCommand = async (id: string) => {
        try {
            dispatch({ type: "PENDING_COMMAND_REQUEST", payload: true });
            const currentCommand = (await findOneCommandformComandPage(
                id
            )) as WithId<Command>;
            dispatch({
                type: "CURRENT_COMMAND",
                payload: {
                    ...currentCommand,
                },
            });
        } finally {
            dispatch({ type: "PENDING_COMMAND_REQUEST", payload: false });
        }
    };

    useEffect(() => {
        if (uuid) {
            loadingCurrentCommand(uuid);
        }
    }, []);

    return (
        <CommandFormContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </CommandFormContext.Provider>
    );
};
