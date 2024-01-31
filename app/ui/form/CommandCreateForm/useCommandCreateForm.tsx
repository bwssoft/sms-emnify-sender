import { z } from "zod";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { CommandFormContext } from "./context";

const schema = z.object({
    _id: z.string().optional(),
    readonly: z.boolean().default(false).optional(),
    name: z.string().min(1, "Informe o nome do comando"),
    variables: z
        .array(
            z.object({
                name: z.string().min(1, "Informe o nome da variavel"),
                description: z.string().optional(),
            })
        )
        .optional(),
    description: z.string().optional(),
    command: z.string().min(1, "Informe o comando"),
    uuid: z.string().default(uuid()),
});

export type CommandCreateFormData = z.infer<typeof schema>;

export const useCommandCreateForm = () => {
    const { dispatch, state } = useContext(CommandFormContext);

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        watch,
        getValues,
    } = useForm<CommandCreateFormData>({
        resolver: zodResolver(schema),
        values: state["CURRENT_COMMAND"],
    });

    useEffect(() => {
        console.log(state["CURRENT_COMMAND"]);
    }, [state["CURRENT_COMMAND"]]);

    const onHandleSubmit = handleSubmit(async (data) => {
        dispatch({ payload: data, type: "CURRENT_COMMAND" });
        dispatch({ payload: true, type: "MODAL_PREVIEW_COMMAND" });
    });

    return {
        control,
        register,
        errors,
        watch,
        onHandleSubmit,
        getValues,
        state,
        dispatch,
    };
};
