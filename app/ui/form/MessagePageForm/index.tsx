'use client'

import { Command } from "@/app/lib/definitions";
import { Form } from "./ServerForm";
import { MessagePageFormContextProvider } from "./context/MessagePageFormContext";
import { Message } from "@/app/lib/emnify";

export const MessagePageForm = ({ endpoint_id, commands, messages }: { endpoint_id?: string, commands: Command[], messages: Message[] }) => {
    return (
        <MessagePageFormContextProvider>
            <Form endpoint_id={endpoint_id} commands={commands} messages={messages} />
        </MessagePageFormContextProvider>
    );
};
