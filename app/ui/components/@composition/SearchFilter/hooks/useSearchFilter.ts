import React from "react"
import { SearchFilterContext } from "../context/SearchFilterContext"

export const useSearchFilter = () => {
  return React.useContext(SearchFilterContext)
}