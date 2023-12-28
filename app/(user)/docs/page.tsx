"use client";

import {
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function Docs() {
  return (
    <div className="p-4 w-full h-full bg-white">
      <div className="flex flex-row w-full h-full justify-evenly">
        <div className="flex flex-col rounded-2xl bg-white shadow-xl">
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
              Documento PDF contendo instruções para realizar envio de mensagens
              Emnify
            </p>
          </div>
          <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
            <a
              href="/docs/tutorial-envio-mensagens-emnify-bws-app.pdf"
              download
              className="text-base font-medium text-indigo-700 hover:text-indigo-600"
            >
              Baixar arquivo
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-white shadow-xl">
          <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
            <div className="inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
              <CpuChipIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-medium text-slate-900">Endpoints</h3>
            <p className="mt-4 text-base text-slate-500">
              Documento PDF contendo instruções sobre como utilizar a tela de
              endpoints
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
      </div>
    </div>
  );
}
