import {
  XCircleIcon,
  NoSymbolIcon,
  ClockIcon,
  Square3Stack3DIcon,
  PaperAirplaneIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const icon = (typeStatus: ITypeStatus) => {
  switch (typeStatus) {
    case "CANCELED":
      return <XCircleIcon width={17} className=" text-red-800" />;
    case "FAILED":
      return <NoSymbolIcon width={17} className=" text-gray-800" />;
    case "BUFFERED":
      return <Square3Stack3DIcon width={17} className=" text-orange-800" />;
    case "DELIVERED":
      return <PaperAirplaneIcon width={17} className="text-green-800" />;
    case "DELIVERY ATTEMPT PENDING":
      return <ExclamationTriangleIcon width={17} className="text-indigo-800" />;
    case "IN PROGRESS":
      return <ClockIcon width={17} className="text-yellow-800" />;
    case "EXPIRED":
      return <ExclamationCircleIcon width={17} className="text-purple-800" />;
  }
};

export type ITypeStatus =
  | "CANCELED"
  | "FAILED"
  | "BUFFERED"
  | "DELIVERED"
  | "DELIVERY ATTEMPT PENDING"
  | "IN PROGRESS"
  | "EXPIRED";
