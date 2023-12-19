import {
  fetchEndpointMessagesById,
  sendMessagefromEndpointPage,
} from "@/app/lib/actions";
import clsx from "clsx";

const activity = [
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
];
export default async function Example({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const messages = await fetchEndpointMessagesById(params.id);
  const sendMessageBinded = sendMessagefromEndpointPage.bind(null, params.id);
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Interações
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Veja as mensagens recebidas e enviadas
        </p>
      </div>
      <div className="px-4 sm:px-0">
        <ul role="list" className="mt-6 space-y-6">
          {messages?.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={clsx(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                </div>
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        #{activityItem.id}
                      </span>{" "}
                      {messageStatusDescriptionMapped[
                        activityItem.status
                          .description as keyof typeof messageStatusDescriptionMapped
                      ].toLowerCase()}
                    </div>
                    <time
                      dateTime={activityItem.submit_date}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      {activityItem.submit_date}
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">
                    {activityItem.payload}
                  </p>
                </div>
              </>
            </li>
          ))}
        </ul>

        {/* New comment form */}
        <div className="sticky bottom-4 mt-6 flex gap-x-3 bg-white z-10 shadow-md">
          <form action={sendMessageBinded} className="relative flex-auto">
            <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="payload" className="sr-only">
                Add your message
              </label>
              <textarea
                rows={2}
                name="payload"
                id="payload"
                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Escreva sua menasgem..."
                defaultValue={""}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
              <button
                type="submit"
                className="rounded-md  px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-purple-600 bg-purple-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const messageStatusDescriptionMapped = {
  "DELIVERY ATTEMPT PENDING": "TENTATIVA DE ENTREGA PENDENTE",
  "IN PROGRESS": "EM ANDAMENTO",
  BUFFERED: "BUFFERADO",
  DELIVERED: "ENTREGUE",
  FAILED: "FRACASSADO",
  EXPIRED: "EXPIRADO",
  CANCELED: "CANCELADO",
};
