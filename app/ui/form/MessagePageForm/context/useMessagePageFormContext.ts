import React from "react"
import { MessagePageFormContext } from "./MessagePageFormContext"

export const useMessagePageFormContext = () => {
  return React.useContext(MessagePageFormContext);
}