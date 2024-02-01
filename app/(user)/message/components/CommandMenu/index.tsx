"use client";

import { CommandLineIcon } from "@heroicons/react/20/solid";
import { Popover } from "@radix-ui/themes";
import { Arrow } from "@radix-ui/react-popover";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Badge from "@/app/ui/badge";
import { Command } from "@/app/lib/definitions";
import { useMessagePageForm } from "@/app/ui/form/MessagePageForm/useMessagePageForm";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ICommandMenuType = {
    commands?: Array<Command>;
};

const CommandMenu: React.FC<ICommandMenuType> = ({ commands = [] }) => {
    const badgeClassName =
        "bg-slate-800 text-[8px] font-medium border-slate-900 text-white";

    const { onHandleClickCommand } = useMessagePageForm();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("query_command", term);
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Popover.Root>
            <Popover.Trigger>
                <CommandLineIcon className="w-4 h-4 cursor-pointer text-indigo-500" />
            </Popover.Trigger>
            <Popover.Content side="top" align="center">
                <div className="flex w-[320px] h-full overflow-hidden">
                    <div className="w-full overflow-hidden">
                        <div className="flex rounded-md mb-4 shadow-md">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                <MagnifyingGlassIcon className="w-4 h-4 stroke-gray-500" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Filtrar por nome"
                                onChange={(event) =>
                                    handleSearch(event.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 max-h-[214px] overflow-y-auto mt-2 bg-gray-200 rounded-md shadow-md py-3 border-4 p-1 scroll-slim">
                            {commands.map((props, key) => (
                                <Popover.Close
                                    key={key}
                                    onClick={() => onHandleClickCommand(props)}
                                >
                                    <div className="w-full bg-white px-2 py-1 shadow-md cursor-pointer hover:bg-gray-50 rounded-md h-[88px]">
                                        <div className="text-xs font-semibold">
                                            {props.name}
                                        </div>
                                        <div className="text-gray-400 text-[11px]">
                                            {props.description}
                                        </div>
                                        <div className="bg-slate-600 rounded-md p-1 py-2">
                                            <div className="flex w-full justify-end gap-1 pr-1">
                                                <div className="rounded-full w-1 h-1 bg-red-500" />
                                                <div className="rounded-full w-1 h-1 bg-yellow-500" />
                                                <div className="rounded-full w-1 h-1 bg-green-500" />
                                            </div>
                                            <div className="flex gap-[1.2px] items-center mt-1 px-2 font-medium text-white text-[11px]">
                                                <span>IP1#</span>
                                                <Badge
                                                    className={badgeClassName}
                                                >
                                                    IP
                                                </Badge>
                                                <span>#</span>
                                                <Badge
                                                    className={badgeClassName}
                                                >
                                                    PORT
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Close>
                            ))}
                        </div>
                    </div>
                </div>
                <Arrow className="fill-white mb-[1px]" />
            </Popover.Content>
        </Popover.Root>
    );
};

export default CommandMenu;
