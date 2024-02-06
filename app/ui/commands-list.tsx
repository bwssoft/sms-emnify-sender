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
    console.log(commands);
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
                <div className="flex border-gray-50 border-b-gray-200 border-4 border-b px-6 py-3 bg-gray-50 justify-between">
                    <div className="flex w-full">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Comando
                        </h2>
                    </div>
                    <div className="flex w-full justify-center">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Ações
                        </h2>
                    </div>
                </div>
                <ul
                    role="list"
                    className=" divide-y divide-gray-100 border-t overflow-y-auto scroll-slim max-h-[calc(100vh-60vh)] border-4  border-transparent"
                >
                    {commands.map((data, key) => (
                        <li className="flex w-full px-6 items-center" key={key}>
                            <span className="flex w-full items-center truncate">
                                <a
                                    href={`/command/${data.uuid}`}
                                    className="group flex items-center justify-between py-4 group sm:px-6"
                                >
                                    <span className="truncate text-sm group-hover:text-gray-500 ransition-all font-medium leading-6">
                                        {data.name}
                                    </span>
                                </a>
                            </span>
                            <span className="flex w-full justify-center gap-2">
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
                                                onHandleDeleteCommand(data)
                                            }
                                            className="text-indigo-600 cursor-pointer hover:text-indigo-900 w-4 h-4"
                                        />
                                    </Tooltip>
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="mt-8 hidden sm:block overflow-y-auto scroll-slim border-4 border-white max-h-[calc(100vh-260px)]">
                <div className="inline-block min-w-full border-b border-gray-200 align-middle">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-separate border-spacing-0">
                                <th
                                    className="sticky top-0 border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    <span className="lg:pl-2">Comando</span>
                                </th>
                                <th
                                    className="sticky top-0 border-b border-gray-200 text-center bg-gray-50 px-6 py-3  text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Variaveis
                                </th>
                                <th
                                    className="hidden md:table-cell sticky top-0 border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Descrição
                                </th>
                                <th
                                    className="sticky top-0 border-b border-gray-200 text-center bg-gray-50 py-3 px-6 text-sm font-semibold text-gray-900"
                                    scope="col"
                                >
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {commands.map((data, key) => (
                                <tr key={key}>
                                    <td className="w-1/3 max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                                        <div className="flex items-center space-x-3 lg:pl-2">
                                            <span>{data.name}</span>
                                        </div>
                                    </td>
                                    <td className="w-1/5 hidden whitespace-nowrap px-6 py-3 text-sm text-gray-500 sm:table-cell">
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
                                                        <div>
                                                            <Badge>
                                                                {props.name}
                                                            </Badge>
                                                        </div>
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
