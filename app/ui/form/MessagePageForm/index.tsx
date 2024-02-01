"use client";

import {
    fetchEndpointMessagesById,
    listCommandsfromComandPage,
    sendMessagefromMessagePage,
} from "@/app/lib/actions";
import { ITypeStatus, icon } from "../../icons";
import { Button } from "../../button";
import {
    CommandLineIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import CommandMenu from "@/app/(user)/message/components/CommandMenu";
import Badge from "../../badge";
import CommandHelper from "@/app/(user)/message/components/CommandHelper";
import { MessagePageFormContextProvider } from "./context/MessagePageFormContext";
import { useMessagePageForm } from "./useMessagePageForm";
import FormInput from "./components/FormInput";

export async function Form({ endpoint_id }: { endpoint_id?: string }) {
    // const { register } = useMessagePageForm();

    if (!endpoint_id) return null;
    const messages = await fetchEndpointMessagesById(endpoint_id);
    const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
        endpoint_id,
        url: `/message?endpoint_id=${endpoint_id}`,
    });

    // const commands = await listCommandsfromComandPage(undefined, "name");

    return (
        <div className="grid grid-cols-3">
            <div className="col-start-2 pl-10 col-span-3 flex flex-col-reverse gap-5 items-end overflow-auto max-h-[71vh] scrollbar-thin scrollbar-thumb-gray-300">
                {messages?.map((activityItem, activityItemIdx) => (
                    <div
                        key={activityItem.id}
                        className="flex flex-col items-end pr-10 "
                    >
                        <section className="flex items-center justify-center gap-1.5">
                            <div className="flex">
                                {/* <p>{endpoint_id}</p> */}
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
                ))}
            </div>
            <div className="col-span-3 overflow-hidden">
                <CommandHelper />
            </div>
            <form
                className="col-span-3 pl-10 flex gap-4 w-full items-end flex-grow mb-3 pr-10"
                action={sendMessageBinded}
            >
                <div className="flex relative z-[999] overflow-hidden w-full mt-2 rounded-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                        <CommandMenu
                            commands={[
                                {
                                    command: "IP1#[IP]#[PORT]",
                                    name: "Configuração do IP1",
                                    uuid: "065f9aab-a746-4fc3-9328-281cb37279dc",
                                    description:
                                        "Comando de configuração do IP1",
                                    readonly: false,
                                    variables: [
                                        {
                                            name: "IP",
                                            description:
                                                "Endereço IPv4 do servidor",
                                        },
                                        {
                                            name: "PORT",
                                            description:
                                                "Porta do endreço IPv4",
                                        },
                                    ],
                                },
                                {
                                    command: "IP2#[IP]#[PORT]",
                                    name: "Configuração do IP2",
                                    uuid: "065f9aab-a746-4fc3-9328-281cb37279dc",
                                    description:
                                        "Comando de configuração do IP2",
                                    readonly: false,
                                    variables: [
                                        {
                                            name: "IP",
                                            description:
                                                "Endereço IPv4 do servidor",
                                        },
                                        {
                                            name: "PORT",
                                            description:
                                                "Porta do endreço IPv4",
                                        },
                                    ],
                                },
                            ]}
                        />
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
        </div>
    );
}

export const MessagePageForm = ({ endpoint_id }: { endpoint_id?: string }) => {
    return (
        <MessagePageFormContextProvider>
            <Form endpoint_id={endpoint_id} />
        </MessagePageFormContextProvider>
    );
};
