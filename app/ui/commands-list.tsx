"use client";

import React, { useState } from "react";
import { Command } from "../lib/definitions";
import clsx from "clsx";
import {
    ChevronRightIcon,
    EyeIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Badge from "./badge";
import { Tooltip } from "@radix-ui/themes";
import { Modal } from "./components/Modal";
import ModalDelete from "../(user)/command/components/ModalDelete";

// import { Container } from './styles';

export type ICommandsListType = {
    commands: Array<Command>;
};

const CommandsList: React.FC<ICommandsListType> = ({ commands }) => {
    const [curretCommand, setCurrentCommand] = useState<Command>();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const onCloseModal = () => {
        setOpenDeleteModal(false);
    };

    const onHandleDeleteCommand = (data: Command) => {
        setCurrentCommand(data);
        setOpenDeleteModal(true);
    };

    return (
        <>
            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                    <h2 className="text-sm font-medium text-gray-900">Nome</h2>
                </div>
                <ul
                    role="list"
                    className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
                >
                    {commands.map((data) => (
                        <li key={data.uuid}>
                            <a
                                href="#"
                                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                            >
                                <span className="flex items-center space-x-3 truncate">
                                    <span className="truncate text-sm font-medium leading-6">
                                        {data.name}
                                    </span>
                                </span>
                                <ChevronRightIcon
                                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="mt-8 hidden sm:block">
                <div className="inline-block min-w-full border-b border-gray-200 align-middle">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-t border-gray-200">
                                <th
                                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    <span className="lg:pl-2">Comando</span>
                                </th>
                                <th
                                    className="border-b border-gray-200 text-center bg-gray-50 px-6 py-3  text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Variaveis
                                </th>
                                <th
                                    className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Descrição
                                </th>
                                <th
                                    className="border-b border-gray-200 text-center bg-gray-50 py-3 px-6 text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {commands.map((data) => (
                                <tr key={data.uuid}>
                                    <td className="w-1/3 max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                                        <div className="flex items-center space-x-3 lg:pl-2">
                                            <span>{data.name}</span>
                                        </div>
                                    </td>
                                    <td className="w-1/5 hidden whitespace-nowrap px-6 py-3 text-sm text-gray-500 md:table-cell">
                                        <span className="flex w-full gap-1 justify-center items-center">
                                            {data.variables?.map(
                                                (props, key) => (
                                                    <Tooltip
                                                        key={key}
                                                        content={
                                                            props.description ||
                                                            ""
                                                        }
                                                    >
                                                        <Badge>
                                                            {props.name}
                                                        </Badge>
                                                    </Tooltip>
                                                )
                                            )}
                                        </span>
                                    </td>
                                    <td className="hidden whitespace-nowrap truncate text-ellipsis max-w-[320px] px-6 py-3 text-sm text-gray-500 md:table-cell">
                                        {data.description}
                                    </td>
                                    <td className="flex justify-center items-center gap-1 whitespace-nowrap px-6 py-3 text-center text-sm font-medium">
                                        <Link
                                            href={`/command/${data.uuid}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <Tooltip content="Visualizar">
                                                <EyeIcon className="w-4 h-4" />
                                            </Tooltip>
                                        </Link>
                                        <div>
                                            <Tooltip content="Deletar">
                                                <TrashIcon
                                                    onClick={() =>
                                                        onHandleDeleteCommand(
                                                            data
                                                        )
                                                    }
                                                    className="text-indigo-600 cursor-pointer hover:text-indigo-900 w-4 h-4"
                                                />
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalDelete
                onClose={onCloseModal}
                isOpen={openDeleteModal}
                {...curretCommand}
            />
        </>
    );
};

export default CommandsList;
