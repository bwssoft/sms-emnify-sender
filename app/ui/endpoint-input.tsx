"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { BellIcon, ChatBubbleLeftIcon, ChevronRightIcon, EllipsisVerticalIcon  } from "@heroicons/react/24/outline";
import { Simcard } from "../lib/definitions";
import { ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/solid'
import { Button } from "./button";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { XCircleIcon, NoSymbolIcon, ClockIcon, Square3Stack3DIcon, PaperAirplaneIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { sendMessagefromEndpointPage } from "../lib/actions";

export default function EndpointsInput({ simcards }: { simcards: Simcard[] }) {
  const [selected, setSelected] = useState<Simcard>();
  const [messageSend, setMessageSend] = useState('');
  const [typeStatus, setTypeStatus] = useState('IN PROGRESS')

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  

  const icon = () => {
    switch(typeStatus) {
      case 'CANCELED':
        return <XCircleIcon width={17} className=" text-red-800"/>
      break;
      case 'FAILED':
        return <NoSymbolIcon width={17} className=" text-gray-800" />
      break;
      case 'BUFFERED':
        return <Square3Stack3DIcon width={17} className=" text-orange-800" />
      break;
      case 'DELIVERED':
        return <PaperAirplaneIcon width={17} className="text-green-800"/>
      break;
      case 'DELIVERY ATTEMPT PENDING':
        return <ExclamationTriangleIcon  width={17} className="text-indigo-800" />
      break;
      case 'IN PROGRESS':
        return <ClockIcon width={17} className="text-yellow-800" />
      case 'EXPIRED':
        return <ExclamationCircleIcon width={17} className="text-purple-800" />
      break;
    }
  } 

  console.log(searchParams.get("query")?.toString())
  console.log(messageSend)

  return (
    <div className="flex min-h-[91vh]">
      <RadioGroup className={'w-fit border-gray-200 border-r-[1px]'} value={selected} onChange={(e) => {setSelected(e), handleSearch(e.emnify?.endpoint_id)}} name="device_id">
      <div className="flex col-span-1 flex-col mt-3 justify-start items-start gap-2 flex-grow ">
        <Button className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 ml-7  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <ChatBubbleLeftIcon className="w-4 h-4" />
          Iniciar chat
        </Button>
      </div>
        <RadioGroup.Label className="sr-only">
          Endpoints selection
        </RadioGroup.Label>

        {simcards?.map((simcard, simcardId) => (
          <RadioGroup.Option
            key={simcard.emnify.endpoint_name}
            value={simcard.emnify.endpoint_id}
            className={({ checked }) =>
              clsx(
                checked
                  ? "z-10 border-indigo-400 bg-indigo-100"
                  : "border-gray-200",
                "relative flex cursor-pointer flex-col  p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6 hover:bg-indigo-50"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex items-center gap-2 pl-3">
                    <div className="bg-gray-300 p-2 rounded-full">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <p className="text-sm font-semibold  text-gray-900">
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {simcard.emnify.endpoint_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-[-1px]">
                        {simcard.emnify.endpoint_imei}
                      </p>
                    </div>
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
      {/*SEGUNDA COLUNA  */}
      <div className="flex flex-col w-full justify-between col-span-2">
        <div className="border-b-2 border-gray-400 flex justify-between items-center px-6">
          <p className="text-sm font-semibold text-gray-900 py-3">{selected?.toString()}</p>
          <div className="flex gap-3">
            <BellIcon className="w-4 h-4" />
            <EllipsisVerticalIcon className="w-4 h-4" />
          </div>
        </div>
        
          <form className="grid grid-cols-3 px-10" >
          <div className="col-start-2 col-span-2 my-3 flex gap-2 items-center mr-12">
            <div className="flex flex-col justify-between items-end pb-2">
              {typeStatus && icon()}
            </div>
            <p className="text-[12px] text-gray-700 px-2 py-2 border bg-gray-200 rounded-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, aut itaque! Animi magnam saepe libero debitis, dolorem totam. Aliquam molestias non recusandae corrupti reiciendis minima dolorem cum adipisci id suscipit.</p>
          </div>
            <div className=" col-span-3 flex gap-4 w-full items-end  flex-grow mb-3">
                <div className="flex overflow-hidden w-full rounded-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <textarea
                    rows={1}
                    name="payload"
                    id="payload"
                    className=" w-full text- resize-none border-0 bg-transparent py-2 pl-5 h-fit leading-[1.5em] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Escreva sua mensagem..."
                    onChange={(e) => setMessageSend(e.target.value)}
                  />

                </div>
                <Button
                  type="submit"
                  className="rounded-full mb-1 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </Button>

            </div>
          </form>
      </div>
    </div>
  );
}
