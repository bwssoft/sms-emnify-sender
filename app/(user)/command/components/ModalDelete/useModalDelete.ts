import { deleteCommandfromComandPage } from "@/app/lib/actions";
import { useState } from "react"
import toast from "react-hot-toast";

type IUseModalDeleteType = {
  onClose: () => void;
}

export const useModalDelete = ({ onClose }: IUseModalDeleteType) => {
  const [onPendingRequest, setOnPendingRequest] = useState<boolean>(false);

  const onHandleDelete = async (uuid: string) => {
    try {
      setOnPendingRequest(true);

      await deleteCommandfromComandPage(uuid);

      toast.success("Comando deletado com sucesso")
    }
    catch {
      toast.success("Ocorreu um erro ao deletar o comando")
    }
    finally {
      setOnPendingRequest(false);
      onClose();
    }
  }

  return {
    onHandleDelete,
    onPendingRequest
  }
}