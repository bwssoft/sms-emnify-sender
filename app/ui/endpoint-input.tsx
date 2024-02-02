"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Simcard } from "../lib/definitions";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EndpointsSearchBar from "./endpoint-search-bar";

export default function EndpointsInput({ simcards }: { simcards: Simcard[] }) {
    const [selected, setSelected] = useState<string>();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSelect = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("endpoint_id", term.endpoint_id);
        } else {
            params.delete("endpoint_id");
        }
        replace(`${pathname}?${params.toString()}`);

        if (term) {
            params.set("endpoint_name", term.endpoint_name);
        } else {
            params.set("endpoint_name", term);
        }
        replace(`${pathname}?${params.toString()}`);

        if (term) {
            params.set("endpoint_imei", term.endpoint_imei);
        } else {
            params.set("endpoint_imei", term);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleSelectName = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("endpoint_name", term);
        } else {
            params.delete("endpoint_name");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex min-h-[91vh] cols-span-1">
            <RadioGroup
                className={"w-full border-gray-200 border-r-[1px] cols-span-1"}
                value={selected}
                onChange={(e) => {
                    setSelected(e);
                }}
                name="device_id"
            >
                <EndpointsSearchBar
                    placeholder={"Pesquise por um simcard"}
                    fieldsForSearch={[
                        {
                            field: "endpoint_name",
                            label: "Nome",
                        },
                        {
                            field: "sim_iccid_with_luhn",
                            label: "Iccid",
                        },
                        {
                            field: "endpoint_imei",
                            label: "Imei",
                        },
                    ]}
                />
                {/* <div className="flex col-span-1 flex-col my-3 justify-start items-start gap-2 flex-grow ">
        <Button className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 ml-7  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <ChatBubbleLeftIcon className="w-4 h-4" />
          Iniciar chat
        </Button>
      </div> */}
                <RadioGroup.Label className="sr-only">
                    Endpoints selection
                </RadioGroup.Label>

                {simcards?.map((simcard, simcardId) => (
                    <RadioGroup.Option
                        key={simcard.emnify.endpoint_name}
                        value={simcard.emnify.endpoint_id}
                        onClick={() => {
                            handleSelect(simcard.emnify);
                        }}
                        className={({ checked }) =>
                            clsx(
                                checked
                                    ? "z-10 border-indigo-400 bg-indigo-100"
                                    : "border-gray-200",
                                "relative flex cursor-pointer flex-col  p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6 hover:bg-indigo-50"
                            )
                        }
                    >
                        {() => (
                            <>
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="flex items-center gap-2 pl-3">
                                        <div className="min-w-0 flex flex-col">
                                            <p className="text-sm font-semibold  text-gray-900">
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {simcard.emnify.endpoint_name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-[-1px]">
                                                {simcard.emnify.endpoint_imei}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 justify-end items-center gap-x-4">
                                    <ChevronRightIcon
                                        className="h-5 w-5 flex-none text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </RadioGroup>
        </div>
    );
}
