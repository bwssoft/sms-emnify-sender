'use client'

import {
    sendMessagefromMessagePage,
} from "@/app/lib/actions";
import FormContent from "./components/FormContent";
import { Command } from "@/app/lib/definitions";
import CommandHelper from "../../components/CommandHelper";
import ChatMessage from "./components/ChatMessage";
import { Message } from "@/app/lib/emnify";
import { useState } from "react";

export function Form(props: {
    endpoint_id?: string;
    commands: Array<Command>;
    messages: Array<Message>;
}) {
    const [lastRenderedDate, setLastRenderedDate] = useState<string>('')

    if (!props?.endpoint_id) return null;

    const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
        endpoint_id: props.endpoint_id,
        url: `/message?endpoint_id=${props.endpoint_id}`,
    });

    function compareDates(message: Message) {
        const currentDate = message.submit_date.slice(0, 10);
        const shouldRenderDate = lastRenderedDate !== currentDate;

        if (!shouldRenderDate) return null

        if (lastRenderedDate === "") {
            setLastRenderedDate(currentDate);

            return currentDate
                .split("-")
                .reverse()
                .join("-");
        }

        setLastRenderedDate(currentDate);
        return currentDate.split("-").reverse().join("-");
    }

    return (
        <div className="cols-span-4">
            <div className="relative pl-2 flex flex-col-reverse overflow-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300">

                {props.messages.map((message, index) => (
                    <>
                        {compareDates(message) !== null && (
                            <p key={`${message.udh}${message.id}`} className="flex flex-col items-center text-gray-600 w-full text-[11px] sticky top-0" style={{ zIndex: 100 + index }}>{compareDates(message)}</p>
                        )}

                        <ChatMessage
                            key={`${message.udh}${message.id}`}
                            content={message}
                        />
                    </>
                ))}
                <div className="absolute z-0 right-0 left-0 bottom-0 w-full">
                    <CommandHelper />
                </div>
            </div>

            <div>
                <FormContent commands={props.commands} action={sendMessageBinded} />
            </div>
        </div>
    );
}
