import { listCommandsfromComandPage } from "@/app/lib/actions";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Button } from "@/app/ui/button";
import CommandsList from "@/app/ui/commands-list";
import { Modal } from "@/app/ui/components/Modal";
import EndpointsSearchBar from "@/app/ui/endpoint-search-bar";
import Link from "next/link";
import React from "react";
import ModalDelete from "./components/ModalDelete";

const Command: React.FC = async ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        type?: string;
    };
}) => {
    const query = searchParams?.query || "";
    const type = searchParams?.type || undefined;

    const commandsEntity = await listCommandsfromComandPage(query, type);

    return (
        <>
            <div className="min-h-full">
                <div className="flex flex-col">
                    <EndpointsSearchBar
                        placeholder="Pesquise pelo comando."
                        fieldsForSearch={[
                            {
                                field: "name",
                                label: "Nome",
                            },
                            {
                                field: "description",
                                label: "Descrição",
                            },
                            {
                                field: "command",
                                label: "Comando",
                            },
                        ]}
                    />
                    <Breadcrumbs
                        root="/"
                        data={[
                            {
                                href: "/comamand",
                                name: "Comandos",
                            },
                        ]}
                    />
                    <div className="flex w-full items-center justify-end px-6">
                        <Link href={"/command/create"}>
                            <Button className="bg-indigo-500 hover:bg-indigo-400 transition-colors text-white rounded-md text-sm shadow-md p-2">
                                Cadastrar Comando
                            </Button>
                        </Link>
                    </div>
                    <main className="flex-1">
                        <CommandsList commands={commandsEntity} />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Command;
