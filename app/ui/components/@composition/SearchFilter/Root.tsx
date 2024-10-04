import React from 'react';
import { IChildrenType } from './types/base.types';
import { SearchFilterProvider } from './context/SearchFilterContext';

export const Root: React.FC<IChildrenType> = ({ children }) => {
  return (
    <SearchFilterProvider>
      {children}
    </SearchFilterProvider>
  )
}