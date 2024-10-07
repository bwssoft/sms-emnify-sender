"use client";
import { Fragment, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import {
    Bars4Icon,
    BookOpenIcon,
    CpuChipIcon,
    XMarkIcon,
    UserIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { userLogout } from "../lib/actions";
import Image from "next/image";
import Logo from "../ui/Icons/Logo.svg";

type SidebarProps = {
    isOpen: boolean;
    onClose(): void;
};

export function SideBar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const isOptionInCurrentPathname = useCallback(
        (href: string) => {
            if (href === "/" && pathname !== "/") {
                return false;
            }
            if (href === "/message" && pathname !== "/message") {
                return false;
            }
            return pathname.includes(href);
        },
        [pathname]
    );

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={onClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={onClose}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>

                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={clsx(
                                                        isOptionInCurrentPathname(
                                                            item.href
                                                        )
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                        "group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5"
                                                    )}
                                                    aria-current={
                                                        isOptionInCurrentPathname(
                                                            item.href
                                                        )
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    <item.icon
                                                        className={clsx(
                                                            isOptionInCurrentPathname(
                                                                item.href
                                                            )
                                                                ? "text-gray-500"
                                                                : "text-gray-400 group-hover:text-gray-500",
                                                            "mr-3 h-6 w-6 flex-shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div
                            className="w-14 flex-shrink-0"
                            aria-hidden="true"
                        />
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
                <div className="flex flex-shrink-0 items-center px-6">
                    <Image
                        src={"/Logo.svg"}
                        alt="Logotipo"
                        width={154}
                        height={42}
                    />
                </div>

                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-5 flex h-0 flex-1 flex-col justify-between overflow-y-auto pt-1">
                    <nav className="mt-6 px-3">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        isOptionInCurrentPathname(item.href)
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                                    )}
                                    aria-current={
                                        isOptionInCurrentPathname(item.href)
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    <item.icon
                                        className={clsx(
                                            isOptionInCurrentPathname(item.href)
                                                ? "text-gray-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 h-6 w-6 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <form action={userLogout}>
                        <button
                            type="submit"
                            className="flex items-center justify-start px-3"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

const navigation = [
	// { name: "Home", href: "/", icon: HomeIcon },
	{ name: 'SIMCard', href: '/endpoint', icon: CpuChipIcon },
	{
		name: 'Mensagem',
		href: '/message',
		icon: Bars4Icon,
	},
	{
		name: 'Documentação',
		href: '/docs',
		icon: BookOpenIcon,
	},
	{
		name: 'Meu usuário',
		href: '/profile',
		icon: UserIcon,
	},
	{
		name: 'Comandos',
		href: '/command',
		icon: CommandLineIcon,
	},
];
