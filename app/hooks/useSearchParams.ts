'use client'

import { UseFormSetValue } from 'react-hook-form';
import { usePathname, useSearchParams as useSearch } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';


type IUseSearchParams<T extends object> = {
	paramsAllowed: Array<keyof T>;
	setValue: UseFormSetValue<T>;
};

export const useSearchParams = <T extends object>(params: IUseSearchParams<T>) => {
  const searchParams = useSearch();
	const pathname = usePathname();
	const { replace } = useRouter();

  const {
    paramsAllowed,
    setValue
  } = params;

  useEffect(() => {
		const params = searchParams.entries();
		// @ts-ignore
		for (const [key, value] of params) {
			if (paramsAllowed.includes(key)) {
				setValue(key, value);
			}
		}
	}, []);

  const resetParams = () => {
    replace(`${pathname}`);
  }

  const manageParams = (data: T = Object.assign({})) => {
		const params = new URLSearchParams(searchParams);
		Object.keys(data).forEach((key) => {
			const keyObject = key as keyof T;
			if (data[keyObject]) {
				params.set(key, String(data[keyObject]));
			} else {
				params.delete(key);
			}
		});
		replace(`${pathname}?${params.toString()}`);
	};

  const currentState = useMemo(() => {
    const params = searchParams.entries();
    const state = new Map<string, string>();
    // @ts-ignore
    for (const [key, value] of params) {
      if (paramsAllowed.includes(key)) {
        state.set(key, value);
      }
    }

    return Object(Object.fromEntries(state));
  }, [searchParams]);

  return {
    resetParams,
    manageParams,
    currentState
  }
};
