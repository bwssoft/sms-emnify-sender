import { IChildrenType } from "./base.types"

export type ISearchFilterContextType = {
  modalFilters: boolean
  onHandleModalFilter: (value?: boolean) => void
}

export type ISearchFilterProviderType = IChildrenType