import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import CommandCreateForm from "@/app/ui/form/CommandCreateForm";
import React from "react";

// import { Container } from './styles';

const CommandCreate: React.FC = () => {
    return (
        <>
            <div className="min-h-full">
                <div className="flex flex-col">
                    <Breadcrumbs
                        root="/"
                        data={[
                            {
                                href: "/command",
                                name: "Comandos",
                            },
                            {
                                href: "/command/create",
                                name: "Criar Comando",
                            },
                        ]}
                    />
                    <main className="flex-1 px-6 py-2">
                        <CommandCreateForm />
                    </main>
                </div>
            </div>
        </>
    );
};

export default CommandCreate;
