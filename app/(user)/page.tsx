import { Bars4Icon, CpuChipIcon } from "@heroicons/react/24/outline";
import data from "@/public/simcards/emnify_saitro_simcard_processed_with_client.json";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const links = [
  {
    name: "Messagens",
    href: "/message",
    description:
      "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
    icon: Bars4Icon,
  },
  {
    name: "Endpoints",
    href: "/endpoint",
    description:
      "Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.",
    icon: CpuChipIcon,
  },
];
export default function Example() {
  const _data = data.map((d) => ({ ...d, uuid: uuidv4() }));
  const dados = JSON.stringify(_data);

  // Escrever a string JSON em um arquivo
  fs.writeFile(
    "emnify_saitro_simcard_processed_with_client.json",
    dados,
    (err) => {
      if (err) {
        throw err;
      }
      console.log("Os dados JSON foram salvos.");
    }
  );
  return (
    <>
      <div className="min-h-full">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <section
            className="relative z-10 mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl py-8"
            aria-labelledby="contact-heading"
          >
            <h2 className="sr-only" id="contact-heading">
              Acesse
            </h2>
            <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {links.map((link) => (
                <div
                  key={link.name}
                  className="flex flex-col rounded-2xl bg-white shadow-xl"
                >
                  <div className="relative flex-1 px-6 pb-8 pt-16 md:px-8">
                    <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
                      <link.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900">
                      {link.name}
                    </h3>
                    <p className="mt-4 text-base text-slate-500">
                      {link.description}
                    </p>
                  </div>
                  <div className="rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
                    <a
                      href={link.href}
                      className="text-base font-medium text-indigo-700 hover:text-indigo-600"
                    >
                      Acesse
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
