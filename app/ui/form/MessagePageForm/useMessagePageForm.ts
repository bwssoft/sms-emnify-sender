'use client'

import { useCallback, useEffect } from "react";
import { useMessagePageFormContext } from "./context/useMessagePageFormContext"
import { Command } from "@/app/lib/definitions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z.object({
  payload: z.string().optional()
})

export type IMessagePageFormData = z.infer<typeof schema>; 

export const useMessagePageForm = () => {

  const { dispatch, state } = useMessagePageFormContext();

  const {
    register,
    setValue,
    resetField,
    watch,
    getValues
  } = useForm<IMessagePageFormData>({
    resolver: zodResolver(schema),
    values: {
      payload: state['CURRENT_COMMAND'].command
    }
  })

  const onHandleClickCommand = (command: Command) => {
    dispatch({ type: 'CURRENT_COMMAND', payload: command });
    dispatch({ type: 'MODAL_HELPER_COMMAND', payload: true }); 
    setValue('payload', command.command);
  }

  useEffect(() =>{
    if(!watch('payload')) {
      onCloseModal();
    }
  },[watch('payload')])

  const showModal = useCallback(() => state['MODAL_HELPER_COMMAND'], [state['MODAL_HELPER_COMMAND']]);

  const onCloseModal = () => {
    dispatch({ type: 'MODAL_HELPER_COMMAND', payload: false })
  }

  const onHandleSubmit = () => {
    resetField('payload');
    onCloseModal();
  }

  const currentCommand = state['CURRENT_COMMAND'];

  return { 
    onHandleClickCommand,
    showModal,
    onCloseModal,
    currentCommand,
    register,
    onHandleSubmit
  }
}