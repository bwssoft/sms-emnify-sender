import React, { ReactNode, useState } from "react";
import { useCommandCreateForm } from "../../useCommandCreateForm";
import { Tooltip } from "@radix-ui/themes";
import Badge from "@/app/ui/badge";
import {
    createCommandfromCoomandPage,
    updateCommandfromCommandPage,
} from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const submitFunctions = {
    updated: updateCommandfromCommandPage,
    create: createCommandfromCoomandPage,
};

type IKeysSubmitFunctionsType = keyof typeof submitFunctions;

export const useModalPreview = () => {
    const { state, dispatch } = useCommandCreateForm();
    const [onPedingRequest, setOnPendingRequest] = useState<boolean>(false);
    const router = useRouter();
    const formState = state["CURRENT_COMMAND"];
    const isUpadte = formState?.uuid !== undefined;
    const badgeClassName = "bg-slate-800 border-slate-900 text-white";

    const CommnadFormater = () => {
        const command = formState?.command;
        const variables = formState?.variables;
        const commandSteps = command?.split(/\[(\w+)\]/g);

        return (
            <React.Fragment>
                {commandSteps?.map((step, key) => {
                    const variable = variables?.find(
                        (props) => props.name === step
                    );
                    if (variable) {
                        return (
                            <Tooltip
                                key={key}
                                className="z-[99]"
                                content={variable.description || ""}
                            >
                                <span>
                                    <Badge className={badgeClassName}>
                                        {variable.name}
                                    </Badge>
                                </span>
                            </Tooltip>
                        );
                    }

                    return <span key={key}>{step}</span>;
                })}
            </React.Fragment>
        );
    };

    const onHandleSubmit = async () => {
        try {
            setOnPendingRequest(true);

            if (!formState) {
                return;
            }

            const typeAction: IKeysSubmitFunctionsType = isUpadte
                ? "updated"
                : "create";

            await submitFunctions[typeAction](formState);

            router.push("/command", { scroll: false });
            toast.success(
                `Comando ${isUpadte ? "atualizado" : "criado"} com sucesso!`
            );
        } catch (error) {
            toast.error(
                `Ocorreu um erro ao ${
                    isUpadte ? "atualizar" : "criar"
                } o comando`
            );
        } finally {
            setOnPendingRequest(false);
            dispatch({ type: "MODAL_PREVIEW_COMMAND", payload: false });
        }
    };

    return {
        state,
        dispatch,
        formState,
        CommnadFormater,
        badgeClassName,
        onHandleSubmit,
        onPedingRequest,
    };
};
