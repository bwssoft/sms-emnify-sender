import {
  listCommandsfromComandPage,
  refreshMessageDatafromMessagePage,
} from "@/app/lib/actions";
import { MessagePageForm } from "@/app/ui/form/MessagePageForm";
import { ArrowPathIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default async function MessageEndpoint({

  params
}: {

  params: {
    id: string,
  }
}) {
  const query_command = "";
  const refreshMessageBinded = refreshMessageDatafromMessagePage.bind(
    null,
    `/message?endpoint_id=${params.id}`
  );

  const commands = await listCommandsfromComandPage(query_command, "name");

  return (
    <div className="flex flex-col w-full justify-between col-span-2">
      <div className="border-b-2 border-gray-200 flex justify-between items-center px-6 py-2.5">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Endpoint ID: {params.id}
          </p>
        </div>
        <div className="flex gap-3">
          <form action={refreshMessageBinded}>
            <button type="submit">
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          </form>
          <EllipsisVerticalIcon className="w-4 h-4" />
        </div>
      </div>

      <MessagePageForm
        commands={commands}
        endpoint_id={params.id}
      />
    </div>
  );
}
