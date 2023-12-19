"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { Endpoint } from "../lib/emnify";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function EndpointsInput({
  endpoints,
}: {
  endpoints: Endpoint[];
}) {
  const [selected, setSelected] = useState<Endpoint>();

  return (
    <RadioGroup value={selected} onChange={setSelected} name="device_id">
      <RadioGroup.Label className="sr-only">
        Endpoints selection
      </RadioGroup.Label>

      {endpoints?.map((endpoint, endpointId) => (
        <RadioGroup.Option
          key={endpoint.name}
          value={endpoint.id}
          className={({ checked }) =>
            clsx(
              endpointId === 0 ? "rounded-tl-md rounded-tr-md" : "",
              endpointId === endpoints.length - 1
                ? "rounded-bl-md rounded-br-md"
                : "",
              checked
                ? "z-10 border-indigo-400 bg-indigo-100"
                : "border-gray-200",
              "relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6"
            )
          }
        >
          {({ active, checked }) => (
            <>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {endpoint.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {endpoint.imei}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 justify-end items-center gap-x-4">
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
