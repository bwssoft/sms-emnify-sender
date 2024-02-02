"use client";

import Badge from "@/app/ui/badge";
import { useMessagePageForm } from "@/app/ui/form/MessagePageForm/useMessagePageForm";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fascinate_Inline } from "next/font/google";
import React from "react";

const CommandHelper: React.FC = () => {
    const { showModal, onCloseModal, currentCommand } = useMessagePageForm();

    const badgeClassName = "bg-slate-800 border-slate-900 text-white";
    return (
        <Transition
            enter="ease-out duration-300 z-10"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-300 z-10"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
            className={"z-[99]"}
            show={showModal()}
        >
            <div className="w-full h-full bg-[#f2f2fc] p-3">
                <div className="flex w-full justify-end">
                    <XMarkIcon
                        onClick={onCloseModal}
                        className="w-5 cursor-pointer h-5"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-lg font-semibold">
                        {currentCommand.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                        {currentCommand.description}
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    {currentCommand.variables?.map((props, key) => (
                        <div key={key} className="flex items-center gap-1">
                            <Badge className={badgeClassName}>
                                {props.name}
                            </Badge>
                            {props.description && (
                                <>
                                    <div className="w-10 h-[1px] bg-gray-500" />
                                    <Badge className={badgeClassName}>
                                        {props.description}
                                    </Badge>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Transition>
    );
};

export default CommandHelper;
