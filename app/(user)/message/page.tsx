import EndpointsInput from "@/app/ui/endpoint-input";
import {
  fetchEndpointsFilteredByName,
  sendMessagefromMessagePage,
} from "@/app/lib/actions";
import EndpointsSearchBar from "@/app/ui/endpoint-search-bar";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { Button } from "@/app/ui/button";

export default async function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    type?: string;
  };
}) {
  const query = searchParams?.query || "";
  const type = searchParams?.type || undefined;
  const simcards = await fetchEndpointsFilteredByName(query, type);

  return (
    <div className="min-h-full">
      <div className="flex flex-col">
        <Breadcrumbs
          root="/"
          data={[
            {
              href: "/message",
              name: "Mensagem",
            },
          ]}
        />
        <form
          className="px-4 py-4 sm:px-6 lg:px-8"
          action={sendMessagefromMessagePage}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Dispositivos
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Escolha para qual dispositivo deseja enviar uma mensagem.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="col-span-full">
                  <EndpointsSearchBar placeholder="Pesquise pelo nome do dispositivo..." />
                  <EndpointsInput simcards={simcards.slice(0, 5)} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Mensagem
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Escreva uma ou mais mensanges para serem enviadas para os
                  dispositivos selecionados.
                </p>
              </div>

              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="col-span-full">
                  <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label htmlFor="payload" className="sr-only">
                      Mensagem
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
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Limpar
            </button>
            <Button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
