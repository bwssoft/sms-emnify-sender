import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { Simcard } from "../lib/definitions";

export function EndpointsList({ simcards }: { simcards: Simcard[] }) {
  return (
    <>
      {/* Projects list (only on smallest breakpoint) */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-sm font-medium text-gray-900">Endpoints</h2>
        </div>
        <ul
          role="list"
          className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          {simcards.map((simcard) => (
            <li key={simcard?.uuid ?? "1"}>
              <a
                href="#"
                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
              >
                <span className="flex items-center space-x-3 truncate">
                  <span
                    className={clsx(
                      "bg-indigo-500",
                      "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-medium leading-6">
                    {simcard.emnify.endpoint_name}{" "}
                    <span className="truncate font-normal text-gray-500">
                      {simcard.emnify.endpoint_imei}
                    </span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className="mt-8 hidden sm:block">
        <div className="inline-block min-w-full border-b border-gray-200 align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  <span className="lg:pl-2">Endpoint</span>
                </th>
                <th
                  className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  ICCID
                </th>
                {/* <th
                  className="hidden border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:table-cell"
                  scope="col"
                >
                  Atualizado às
                </th> */}
                <th
                  className="border-b border-gray-200 bg-gray-50 py-3 pr-6 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {simcards.map((simcard) => (
                <tr key={simcard?.uuid ?? "1"}>
                  <td className="w-full max-w-0 whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <div
                        className={clsx(
                          "bg-indigo-500",
                          "h-2.5 w-2.5 flex-shrink-0 rounded-full"
                        )}
                        aria-hidden="true"
                      />
                      <Link
                        href={`/endpoint/${simcard.emnify.endpoint_id}/info`}
                        className="truncate hover:text-gray-600"
                      >
                        <span>
                          {simcard.emnify.endpoint_name}{" "}
                          <span className="font-normal text-gray-500">
                            {simcard.emnify.endpoint_imei}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                    {simcard.emnify?.sim_iccid}
                  </td>
                  {/* <td className="hidden whitespace-nowrap px-6 py-3 text-right text-sm text-gray-500 md:table-cell">
                    {simcard.last_updated}
                  </td> */}
                  <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium">
                    <Link
                      href={`/endpoint/${simcard.emnify.endpoint_id}/message`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Visualizar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
