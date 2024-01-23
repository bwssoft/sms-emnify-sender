import {
  fetchEndpointsFilteredByName,
  refreshMessageDatafromMessagePage,
} from "@/app/lib/actions";
import EndpointsInput from "@/app/ui/endpoint-input";
import { MessagePageForm } from "@/app/ui/form/message-page-form";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CpuChipIcon } from "@heroicons/react/24/outline";

export default async function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    type?: string;
    endpoint_id?: string;
  };
}) {
  const query = searchParams?.query || "";
  const type = searchParams?.type || undefined;
  const simcards = await fetchEndpointsFilteredByName(query, type);

  const refreshMessageBinded = refreshMessageDatafromMessagePage.bind(
    null,
    `/message?endpoint_id=${searchParams?.endpoint_id}`
  );

  return (
    <div className="grid grid-cols-3">
      <EndpointsInput simcards={simcards.slice(0, 9)} />

      {/*SEGUNDA COLUNA  */}
      {searchParams?.endpoint_id && (
        <div className="flex flex-col w-full justify-between col-span-2">
          <div className="border-b-2 border-gray-400 flex justify-between items-center px-6">
            <p className="text-sm font-semibold text-gray-900 py-3">
              {searchParams?.endpoint_id}
            </p>
            <div className="flex gap-3">
              {/* <BellIcon className="w-4 h-4" /> */}
              <form action={refreshMessageBinded}>
                <button type="submit">revalidar</button>
              </form>
              <EllipsisVerticalIcon className="w-4 h-4" />
            </div>
          </div>

          <MessagePageForm endpoint_id={searchParams?.endpoint_id} />
        </div>
      )}
      {!searchParams?.endpoint_id && (
        <div className="flex flex-col w-full justify-center items-center col-span-2">
          <div className="text-center flex flex-col items-center">
            <CpuChipIcon className="h-8 w-8 text-gray-700" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              Nenhum SIM CARD selecionado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Selecione um dispositivo para iniciar um novo chat
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
