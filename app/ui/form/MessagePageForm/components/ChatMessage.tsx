'use client'

import { Message } from "@/app/lib/emnify";
import { ITypeStatus, icon } from "@/app/ui/icons";

type ChatMessageProps = {
  content: Message
  date: string
  index: number
}

export default function ChatMessage({ content, date, index }: ChatMessageProps) {
  return content.status.description !==
    "DELIVERY ATTEMPT PENDING" ? (
    <>
      <div
        key={content.id}
        className="w-full flex flex-col items-end justify-end"
      >
        <p className="flex flex-col items-center text-gray-600 w-full text-[11px] sticky top-0" style={{ zIndex: 100 + index }}>{date}</p>
        <div
          key={content.id}
          className="flex flex-col items-end pr-10 col-start-2 w-96"
        >
          <section className="flex items-center justify-center gap-1.5">
            <div className="flex">
              {icon(
                content.status
                  .description as ITypeStatus
              )}
            </div>
            <p
              className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word"
              style={{ wordBreak: "break-all" }}
            >
              {content.payload}
            </p>
          </section>
          <p className="text-gray-500 text-[9px]">
            {content.submit_date.slice(11, 16)}
          </p>
        </div>
      </div>
    </>
  ) : (
    <div
      key={content.id}
      className="col-span-3 flex flex-col"
    >
      <div className="flex flex-col items-start">
        <p className="flex flex-col items-center pb-3 text-gray-600 w-full text-[11px] sticky top-0" style={{ zIndex: 100 + index }}>{date}</p>
        <section className="flex items-center justify-start gap-1.5 w-96">
          <p
            className="text-[12px] text-gray-700 px-3 py-2 border bg-gray-200 rounded-lg whitespace-break-spaces overflow-wrap:break-word"
            style={{ wordBreak: "break-all" }}
          >
            {content.payload}
          </p>
          <div className="flex">
            {icon(
              content.status
                .description as ITypeStatus
            )}
          </div>
        </section>
        <p className="text-gray-500 text-[9px]">
          {content.submit_date.slice(11, 16)}
        </p>
      </div>
    </div>
  );
}