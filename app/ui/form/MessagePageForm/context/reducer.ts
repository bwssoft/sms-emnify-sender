import { Command } from "@/app/lib/definitions"

export type State = {
  'CURRENT_COMMAND': Command
  'MODAL_HELPER_COMMAND': boolean
}

export type CurrentCommandStateAction = {
  type: 'CURRENT_COMMAND',
  payload: Command;
}

export type ModalHelperCommandStateAction = {
  type: 'MODAL_HELPER_COMMAND',
  payload: boolean;
}

export type Action = CurrentCommandStateAction | ModalHelperCommandStateAction;

export const redcuer = (state: State, action: Action) => {
  return { ...state, [action.type]: action.payload }
}

export const initialState: State = {
  CURRENT_COMMAND: {} as Command,
  MODAL_HELPER_COMMAND: false
}