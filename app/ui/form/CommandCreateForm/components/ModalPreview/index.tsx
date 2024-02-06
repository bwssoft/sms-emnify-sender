import { Modal } from "@/app/ui/components/Modal";
import React from "react";
import Badge from "@/app/ui/badge";
import { useModalPreview } from "./useModalPreview";
import { Spinner } from "@/app/ui/components/Spinner";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/ui/button";

const ModalPreview = () => {
    const {
        dispatch,
        state,
        formState,
        CommnadFormater,
        badgeClassName,
        onHandleSubmit,
        onPedingRequest,
    } = useModalPreview();

    const isReadOnly = state["CURRENT_COMMAND"]?.readonly || false;

    return (
        <Modal
            onClose={() =>
                dispatch({ payload: false, type: "MODAL_PREVIEW_COMMAND" })
            }
            open={state["MODAL_PREVIEW_COMMAND"]}
            position="center"
            className=" w-5/6 min-h-[38%] md:w-3/5 md:min-h-[50%]"
        >
            <div>
                <div className="overflow-y-auto">
                    <div className="font-semibold text-lg py-2">
                        {formState?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formState?.description}
                    </div>
                    <div className="p-2 mt-2 text-sm bg-slate-600 text-white rounded-md shadow-md">
                        <div className="flex w-full justify-end gap-1">
                            <div className="rounded-full w-2 h-2 bg-red-500" />
                            <div className="rounded-full w-2 h-2 bg-yellow-500" />
                            <div className="rounded-full w-2 h-2 bg-green-500" />
                        </div>

                        <div className="flex gap-[2px] items-center pl-2">
                            {formState?.command && CommnadFormater()}
                        </div>
                    </div>
                    <div className="flex flex-col mt-2">
                        {(formState?.variables?.length || 0) > 0 && (
                            <div className="font-semibold">
                                Variavéis do Comando
                            </div>
                        )}
                        <div className="flex flex-col gap-2 px-2 py-1">
                            {formState?.variables?.map((props, key) => (
                                <div
                                    key={key}
                                    className="flex items-center gap-1"
                                >
                                    <Badge className={badgeClassName}>
                                        {props.name}
                                    </Badge>
                                    <div className="w-10 h-[1px] bg-gray-500" />
                                    <Badge className={badgeClassName}>
                                        {props.description}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2 w-full justify-end">
                    <Button
                        type="button"
                        className={cn(
                            "bg-transparent hover:bg-indigo-600 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded-md",
                            onPedingRequest &&
                                "text-gray-500 bg-gray-100 border-gray-300 hover:bg-gray-100 cursor-default hover:border-gray-300 hover:text-gray-500"
                        )}
                        onClick={() =>
                            dispatch({
                                payload: false,
                                type: "MODAL_PREVIEW_COMMAND",
                            })
                        }
                    >
                        {isReadOnly ? "Fechar" : "Cancelar"}
                    </Button>
                    {!isReadOnly && (
                        <Button
                            disabled={onPedingRequest}
                            type="button"
                            className={cn(
                                "inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                            )}
                            onClick={onHandleSubmit}
                        >
                            Salvar
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ModalPreview;
