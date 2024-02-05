"use client";

import { sendMessagefromMessagePage } from "@/app/lib/actions";
import FormContent from "./components/FormContent";
import { Command } from "@/app/lib/definitions";
import CommandHelper from "../../components/CommandHelper";
import ChatMessage from "./components/ChatMessage";
import { Message } from "@/app/lib/emnify";
import { Fragment, useEffect, useMemo, useState } from "react";
import { reverseArray } from "@/app/utils/reverseArray";
import { format, getDay, subDays, toDate } from "date-fns";
import { ptBR } from "date-fns/locale";

type DateToRenderMessageIndex = {
    [key: string]: number; // example: { '05-04-2023': 5 }
};

export function Form(props: {
    endpoint_id?: string;
    commands: Array<Command>;
    messages: Array<Message>;
}) {
    const [datesToRenderMessageIndexes, setDatesToRenderMessageIndexes] =
        useState<DateToRenderMessageIndex>({});

    const reversedArray = useMemo(
        () => reverseArray(props.messages),
        [props.messages]
    );

    useEffect(() => {
        const uniqueDates = Array.from(
            new Set(
                reversedArray.map((message) => message.submit_date.slice(0, 10))
            )
        );

        let dates: DateToRenderMessageIndex = {};

        for (const date of uniqueDates) {
            dates[date] = reversedArray.findLastIndex((message) =>
                message.submit_date.startsWith(date)
            );
        }

        setDatesToRenderMessageIndexes(dates);
    }, [reversedArray]);

    if (!props?.endpoint_id) return null;

    const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
        endpoint_id: props.endpoint_id,
        url: `/message?endpoint_id=${props.endpoint_id}`,
    });

    const onRenderViewDate = (date: string) => {
        const currentDay = getDay(new Date());
        const yesterday = getDay(subDays(new Date(), 1));

        const currentSendAt = getDay(toDate(date));

        if (currentDay === currentSendAt) {
            return "Hoje";
        }

        if (yesterday === currentSendAt) {
            return "Ontem";
        }

        return format(toDate(date), "dd-MM-yyyy", { locale: ptBR });
    };

    return (
        <div className="cols-span-4">
            <div className="relative pl-2 flex flex-col overflow-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300">
                {reversedArray.map((message, index) => (
                    <Fragment key={`${message.id}${message.payload}`}>
                        {Object.values(datesToRenderMessageIndexes).includes(
                            index
                        ) && (
                                <p
                                    className="w-fit p-2 my-2 flex flex-col rounded-md items-center text-gray-600 bg-gray-100 self-center justify-center text-[11px] sticky top-1"
                                    style={{ zIndex: 20 + index }}
                                >
                                    {onRenderViewDate(message.submit_date)}
                                </p>
                            )}

                        <ChatMessage content={message} />
                    </Fragment>
                ))}

                <div className="absolute z-0 right-0 left-0 bottom-0 w-full">
                    <CommandHelper />
                </div>
            </div>

            <div>
                <FormContent
                    commands={props.commands}
                    action={sendMessageBinded}
                />
            </div>
        </div>
    );
}
