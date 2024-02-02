"use client";

import React from "react";
import FormInput from "../FormInput";
import { Button } from "@/app/ui/button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMessagePageForm } from "../../useMessagePageForm";
import { Command } from "@/app/lib/definitions";
import CommandMenu from "@/app/ui/components/CommandMenu";

export type IFormContentType = {
    action: (formData: FormData) => Promise<void>;
    commands: Array<Command>;
};

const FormContent: React.FC<IFormContentType> = ({ action, commands }) => {
    const { onHandleSubmit } = useMessagePageForm();

    return (
        <form
            className=" pl-10 flex gap-4 z-[999] overflow-hidden w-full items-end flex-grow mb-3 pr-10"
            action={action}
            onSubmit={onHandleSubmit}
        >
            <div className="flex relative w-full mt-2 rounded-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                    <CommandMenu commands={commands} />
                </div>
                <FormInput />
            </div>
            <Button
                type="submit"
                className="rounded-full mb-1 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PaperAirplaneIcon className="w-4 h-4" />
            </Button>
        </form>
    );
};

export default FormContent;
