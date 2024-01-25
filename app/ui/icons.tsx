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
      return <XCircleIcon width={14} className=" text-red-800" title="Cancelado" />;
    case "FAILED":
      return <NoSymbolIcon width={14} className=" text-gray-800" title="Falhou"/>;
    case "BUFFERED":
      return <Square3Stack3DIcon width={14} className=" text-orange-800" title="Aguardando processamento"/>;
    case "DELIVERED":
      return <PaperAirplaneIcon width={14} className="text-green-800" title="Entregue" />;
    case "DELIVERY ATTEMPT PENDING":
      return <ExclamationTriangleIcon width={14} className="text-indigo-800" title="Tentativa de entrega pendente" />;
    case "IN PROGRESS":
      return <ClockIcon width={14} className="text-yellow-800" title="Em progresso" />;
    case "EXPIRED":
      return <ExclamationCircleIcon width={14} className="text-purple-800" title="Expirado" />;
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
