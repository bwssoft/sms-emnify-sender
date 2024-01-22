import {
  fetchEndpointMessagesById,
  fetchEndpointsFilteredByName,
  refreshMessageDatafromEndpointMessagePage,
  sendMessagefromEndpointPage,
} from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import EndpointsInput from "@/app/ui/endpoint-input";
import { BellIcon, ChatBubbleLeftIcon, EllipsisVerticalIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const activity = [
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 4,
    type: "commented",
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
];

export default async function Example({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    type?: string;
  },
  params: {
    id: string
  };
}) {
  const query = searchParams?.query || "";
  const type = searchParams?.type || undefined;
  const simcards = await fetchEndpointsFilteredByName(query, type);

  return (
    <form  className="grid grid-cols-3">
      <div className="col-span-3">
        <EndpointsInput simcards={simcards.slice(0, 9)} />
      </div>
    </form>
  );
}