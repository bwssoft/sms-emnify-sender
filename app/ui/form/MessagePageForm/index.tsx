"use client";

import {
    fetchEndpointMessagesById,
    listCommandsfromComandPage,
    sendMessagefromMessagePage,
} from "@/app/lib/actions";
import { ITypeStatus, icon } from "../../icons";
import { Button } from "../../button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Message } from "@/app/lib/emnify";

import CommandMenu from "@/app/(user)/message/components/CommandMenu";
import CommandHelper from "@/app/(user)/message/components/CommandHelper";
import { MessagePageFormContextProvider } from "./context/MessagePageFormContext";
import FormInput from "./components/FormInput";
import { useMessagePageForm } from "./useMessagePageForm";
import FormContent from "./components/FormContent";
import { Command } from "@/app/lib/definitions";

export async function Form({
    endpoint_id,
    commands,
}: {
    endpoint_id?: string;
    commands: Array<Command>;
}) {
    // const { onHandleSubmit } = useMessagePageForm();
    if (!endpoint_id) return null;
    const messages = await fetchEndpointMessagesById(endpoint_id);
    const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
        endpoint_id,
        url: `/message?endpoint_id=${endpoint_id}`,
    });

    let lastRenderedDate = "";

    function compareDates(activityItem: Message, currentDate: string) {
        const shouldRenderDate = lastRenderedDate !== currentDate;

        if (shouldRenderDate) {
            lastRenderedDate = currentDate;
            return currentDate.split("-").reverse().join("-");
        } else if (lastRenderedDate === "") {
            return activityItem.submit_date
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-");
        }
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-3 relative pl-10 flex flex-col-reverse gap-5  overflow-auto max-h-[71vh] scrollbar-thin scrollbar-thumb-gray-300">
                {messages?.map((activityItem) => {
                    const currentDate = activityItem.submit_date.slice(0, 10);

                    return activityItem.status.description !==
                        "DELIVERY ATTEMPT PENDING" ? (
                        <>
                            <div
                                key={activityItem.id}
                                className="col-span-2 flex flex-col items-end justify-end"
                            >
                                <p className="flex flex-col items-center text-gray-600 w-full text-[11px]">
                                    {compareDates(activityItem, currentDate)}
                                </p>
                                <div
                                    key={activityItem.id}
                                    className="flex flex-col items-end pr-10 col-start-2 w-96"
                                >
                                    <section className="flex items-center justify-center gap-1.5">
                                        <div className="flex">
                                            {icon(
                                                activityItem.status
                                                    .description as ITypeStatus
                                            )}
                                        </div>
                                        <p
                                            className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word"
                                            style={{ wordBreak: "break-all" }}
                                        >
                                            {activityItem.payload}
                                        </p>
                                    </section>
                                    <p className="text-gray-500 text-[9px]">
                                        {activityItem.submit_date.slice(11, 16)}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div
                            key={activityItem.id}
                            className="col-span-3 flex flex-col"
                        >
                            <div className="flex flex-col items-start">
                                <p className="flex flex-col items-center pb-3 text-gray-600 w-full text-[11px]">
                                    {compareDates(activityItem, currentDate)}
                                </p>
                                <section className="flex items-center justify-start gap-1.5 w-96">
                                    <p
                                        className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word"
                                        style={{ wordBreak: "break-all" }}
                                    >
                                        {activityItem.payload}
                                    </p>
                                    <div className="flex">
                                        {icon(
                                            activityItem.status
                                                .description as ITypeStatus
                                        )}
                                    </div>
                                </section>
                                <p className="text-gray-500 text-[9px]">
                                    {activityItem.submit_date.slice(11, 16)}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="absolute z-0 right-0 left-0 bottom-0 w-full">
                    <CommandHelper />
                </div>
            </div>
            <div className="col-span-3">
                <FormContent commands={commands} action={sendMessageBinded} />
            </div>
        </div>
    );
}

export const MessagePageForm = ({
    endpoint_id,
    commands,
}: {
    endpoint_id?: string;
    commands: Array<Command>;
}) => {
    return (
        <MessagePageFormContextProvider>
            <Form commands={commands} endpoint_id={endpoint_id} />
        </MessagePageFormContextProvider>
    );
};
