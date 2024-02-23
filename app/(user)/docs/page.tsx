"use client";

import {
    ChatBubbleLeftRightIcon,
    CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function Docs() {
    return (
        <div className="p-4 w-full h-full bg-[#fffafa]">
            <div className="flex flex-col border-4 border-transparent scroll-slim overflow-y-auto md:flex-row md:flex-wrap items-start md:justify-center w-full h-full gap-4 mb-5 px-2 pb-20">
                {/* Tutorial de envio de mensagens */}
                <div className="flex flex-col w-full md:max-w-[40%] max-h-full md:max-h-[25rem] h-full md:overflow-y-auto scroll-slim rounded-2xl bg-white shadow-xl">
                    <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
                        <div className="inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                            <ChatBubbleLeftRightIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium text-slate-900">
                            Envio de mensagens
                        </h3>
                        <p className="mt-4 text-base text-slate-500">
                            Documento PDF contendo instruções para realizar
                            envio de mensagens Emnify
                        </p>
                    </div>
                    <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
                        <a
                            href="/docs/tutorial-envio-de-mensagens-emnify-bws-app.pdf"
                            download
                            className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                        >
                            Baixar arquivo
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>

                {/* Tutorial de endpoints */}
                <div className="flex flex-col w-full md:max-w-[40%] max-h-full md:max-h-[25rem] h-full md:overflow-y-auto scroll-slim rounded-2xl bg-white shadow-xl">
                    <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
                        <div className="inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                            <CpuChipIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium text-slate-900">
                            Endpoints
                        </h3>
                        <p className="mt-4 text-base text-slate-500">
                            Documento PDF contendo instruções sobre como
                            utilizar a tela de endpoints
                        </p>
                    </div>
                    <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
                        <a
                            href="/docs/tutorial-tela-de-endpoints-emnify-bws-app.pdf"
                            download
                            className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                        >
                            Baixar arquivo
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>

                {/* Tutorial de mudanca de senha */}
                <div className="flex flex-col w-full md:max-w-[40%] max-h-full md:max-h-[25rem] h-full md:overflow-y-auto scroll-slim rounded-2xl bg-white shadow-xl">
                    <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
                        <div className="inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                            <CpuChipIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium text-slate-900">
                            Alteração de senha
                        </h3>
                        <p className="mt-4 text-base text-slate-500">
                            Documento PDF contendo instruções sobre como
                            alterar a sua senha
                        </p>
                    </div>
                    <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
                        <a
                            href="/docs/tutorial-mudança-de-senha-emnify-bws-app.pdf"
                            download
                            className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                        >
                            Baixar arquivo
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>

                {/* Tutorial de registro de comandos */}
                <div className="flex flex-col w-full md:max-w-[40%] max-h-full md:max-h-[25rem] h-full md:overflow-y-auto scroll-slim rounded-2xl bg-white shadow-xl">
                    <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
                        <div className="inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                            <CpuChipIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium text-slate-900">
                            Comandos
                        </h3>
                        <p className="mt-4 text-base text-slate-500">
                            Documento PDF contendo instruções sobre como
                            realizar registro de comandos
                        </p>
                    </div>
                    <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
                        <a
                            href="/docs/tutorial-tela-de-comando-emnify-bws-app.pdf"
                            download
                            className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                        >
                            Baixar arquivo
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
