import { Spinner } from "@/app/ui/components/Spinner";
import React from "react";

const LoadingCommand: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-2">
            <div className="font-semibold text-lg text-indigo-600">
                Carregando dados de Comando...
            </div>
            <Spinner className="w-8 h-8 text-gray-300" />
        </div>
    );
};

export default LoadingCommand;
