import React from "react";
import { fetchEndpointMessagesById, sendMessagefromMessagePage } from "@/app/lib/actions";
import { ITypeStatus, icon } from "../icons";
import { Button } from "../button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Message } from "@/app/lib/emnify";

export async function MessagePageForm({ endpoint_id }: { endpoint_id?: string }) {
  if (!endpoint_id) return null;

  const messages = await fetchEndpointMessagesById(endpoint_id);

  const sendMessageBinded = sendMessagefromMessagePage.bind(null, {
    endpoint_id,
    url: `/message?endpoint_id=${endpoint_id}`,
  });

  let lastRenderedDate = '';

  function compareDates(activityItem: Message, currentDate: string) {
    const shouldRenderDate = lastRenderedDate !== currentDate;

    if (shouldRenderDate) {
      lastRenderedDate = currentDate;
      return currentDate.split('-').reverse().join('-')
    } else if (lastRenderedDate === '') {
      return activityItem.submit_date.slice(0, 10).split('-').reverse().join('-')
    }
  }

  return (
    <div className="grid grid-cols-3 pl-10">
      <div className="col-span-3 flex flex-col-reverse gap-5  overflow-auto max-h-[71vh] scrollbar-thin scrollbar-thumb-gray-300">

        {messages?.map((activityItem) => {
          const currentDate = activityItem.submit_date.slice(0, 10);

          return (
            activityItem.status.description !== "DELIVERY ATTEMPT PENDING" ?
              <>
                <div key={activityItem.id} className="col-span-2 flex flex-col items-end justify-end">
                  <p className="flex flex-col items-center text-gray-600 w-full text-[11px]">{compareDates(activityItem, currentDate)}</p>
                  <div key={activityItem.id} className="flex flex-col items-end pr-10 col-start-2 w-96">
                    <section className="flex items-center justify-center gap-1.5">
                      <div className="flex" >
                        {icon(activityItem.status.description as ITypeStatus)}
                      </div>
                      <p className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word" style={{ wordBreak: 'break-all' }}>
                        {activityItem.payload}
                      </p>
                    </section>
                    <p className="text-gray-500 text-[9px]">
                      {activityItem.submit_date.slice(11, 16)}
                    </p>
                  </div>
                </div>
              </>
              :
              <div key={activityItem.id} className="col-span-3 flex flex-col w-[26rem]">
                <div className="flex flex-col items-start pr-10 ">
                  <p className="flex flex-col items-end pb-2 text-gray-600 w-full text-[11px]">{compareDates(activityItem, currentDate)}</p>
                  <section className="flex items-center justify-center gap-1.5">
                    <p className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word" style={{ wordBreak: 'break-all' }}>
                      {activityItem.payload}
                    </p>
                    <div className="flex" >
                      {icon(activityItem.status.description as ITypeStatus)}
                    </div>
                  </section>
                  <p className="text-gray-500 text-[9px]">
                    {activityItem.submit_date.slice(11, 16)}
                  </p>
                </div>
              </div>
          );
        })}
      </div>

      <form
        className="col-span-3 flex gap-4 w-full items-end flex-grow mb-3 pr-10"
        action={sendMessageBinded}
      >
        <div className="flex overflow-hidden w-full mt-2 rounded-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <textarea
            rows={1}
            name="payload"
            id="payload"
            className="w-full text- resize-none border-0 bg-transparent py-2 pl-5 h-fit leading-[1.5em] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Escreva sua mensagem..."
          />
        </div>

        <Button
          type="submit"
          className="rounded-full mb-1 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PaperAirplaneIcon className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
