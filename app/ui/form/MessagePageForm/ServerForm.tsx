import {
    fetchEndpointMessagesById,
    sendMessagefromMessagePage,
} from "@/app/lib/actions";
import FormContent from "./components/FormContent";
import { Command } from "@/app/lib/definitions";
import CommandHelper from "../../components/CommandHelper";
import ChatMessage from "./components/ChatMessage";
import { Message } from "@/app/lib/emnify";

export async function Form(props: {
    endpoint_id?: string;
    commands: Array<Command>;
    messages: Array<Message>;
}) {
    if (!props?.endpoint_id) return null;

    const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
        endpoint_id: props.endpoint_id,
        url: `/message?endpoint_id=${props.endpoint_id}`,
    });

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-3 relative pl-10 flex flex-col-reverse gap-5  overflow-auto max-h-[71vh] scrollbar-thin scrollbar-thumb-gray-300">
                {props.messages.map((message) => (
                    <ChatMessage content={message} key={`${message.udh}${message.id}`} />
                ))}
                <div className="absolute z-0 right-0 left-0 bottom-0 w-full">
                    <CommandHelper />
                </div>
            </div>
            <div className="col-span-3">
                <FormContent commands={props.commands} action={sendMessageBinded} />
            </div>
        </div>
    );
}
