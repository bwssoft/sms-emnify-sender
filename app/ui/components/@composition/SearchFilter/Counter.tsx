import React from 'react';
import { ISearchFilterTriggerTypeWithCount } from './types/searchFilter.trigger.type';
import { useActiveFilterManager } from './hooks/useActiveFilterManager';

interface IQueryState {
  validate?: {
    date?: {
      gte?: string;
      lte?: string;
    };
  };
}

type ICounterProps <T> = ISearchFilterTriggerTypeWithCount<T> & {
  queryState: IQueryState;
}

const Counter = <T,> ({ queryState, excludePropsCount }: ICounterProps<T>) => {
  let amountFilters = useActiveFilterManager({ queryState, excludePropsCount });

  if (queryState?.validate?.date?.gte && queryState?.validate?.date?.lte) {
    amountFilters = amountFilters - 1
  }

  if (amountFilters <= 0) {
    return null;
  }

  return (
    <span className="absolute top-[-7px] right-[-7px] h-[18px] w-[18px] text-[9px] font-bold flex items-center justify-center text-white rounded-full bg-red-500 ring-2 ring-white">
      {amountFilters > 9 ? '9+' : amountFilters}
    </span>
  );
};

export default Counter;
