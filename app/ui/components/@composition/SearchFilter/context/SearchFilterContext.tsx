import { createContext, useState } from "react";
import { ISearchFilterContextType, ISearchFilterProviderType } from "../types/searchFilter.context.types";

export const SearchFilterContext = createContext({} as ISearchFilterContextType);

export const SearchFilterProvider: React.FC<ISearchFilterProviderType> = ({ children }) => {

  const [modalFilters, setModalFilters] = useState<boolean>(false);

  const onHandleModalFilter = (value?: boolean) => {
    if(value !== undefined) {
      setModalFilters(value);
      return;
    }

    setModalFilters((oldState) => !oldState);
  }

  return (
    <SearchFilterContext.Provider
      value={{
        modalFilters,
        onHandleModalFilter,
      }}
    >
      {children}
    </SearchFilterContext.Provider>
  )
} 