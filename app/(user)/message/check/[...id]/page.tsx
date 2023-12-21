import {
  getMessagefromEndpoint,
  refreshMessageDatafromEndpoint,
} from "@/app/lib/actions";
import clsx from "clsx";

export default async function Example({
  params,
}: {
  params: {
    id: string[];
  };
}) {
  const message = await getMessagefromEndpoint(params.id[0], params.id[1]);
  const refreshMessageBinded = refreshMessageDatafromEndpoint.bind(null, {
    device_id: params.id[0],
    sms_id: params.id[1],
  });
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Dados da mensagem
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Segue abaixo dados da mensagem enviada
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span
                className={clsx(
                  statusStyles[
                    message?.status.description as keyof typeof statusStyles
                  ],
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                )}
              >
                {message?.status.description}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              ICCID
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message?.iccid}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Endpoint ID
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message?.endpoint_id}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Data de submissão
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message?.submit_date}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Data da entrega
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message?.delivery_date}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Data de expiração
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {message?.expiry_date}
            </dd>
          </div>
        </dl>
      </div>
      <form
        className="mt-6 flex items-center justify-end gap-x-6"
        action={refreshMessageBinded}
      >
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Revalidar
        </button>
      </form>
    </div>
  );
}

const statusStyles = {
  DELIVERED: "bg-green-100 text-green-800",
  "IN PROGRESS": "bg-yellow-100 text-yellow-800",
  "DELIVERY ATTEMPT PENDING": "bg-indigo-100 text-indigo-800",
  FAILED: "bg-gray-100 text-gray-800",
  BUFFERED: "bg-orange-100 text-orange-800",
  CANCELED: "bg-red-100 text-red-800",
  EXPIRED: "bg-purple-100 text-purple-800",
};
