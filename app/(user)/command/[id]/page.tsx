import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import CommandCreateForm from "@/app/ui/form/CommandCreateForm";
import React from "react";

export type ICommandUpdateType = {
    params: {
        id: string;
    };
};

const CommandUpdate: React.FC<ICommandUpdateType> = async ({ params }) => {
    return (
        <div className="h-full">
            <div className="flex h-full flex-col">
                <Breadcrumbs
                    root="/"
                    data={[
                        {
                            href: "/command",
                            name: "Comandos",
                        },
                        {
                            href: `/command/${params.id}`,
                            name: "Comando",
                        },
                    ]}
                />
                <main className="flex-1 h-full px-6 py-2">
                    <CommandCreateForm uuid={params.id} />
                </main>
            </div>
        </div>
    );
};

export default CommandUpdate;
