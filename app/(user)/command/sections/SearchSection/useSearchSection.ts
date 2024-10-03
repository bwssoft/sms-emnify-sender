'use client';

import { cleanObject } from '@/app/utils/helperObject';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	quickFilter: z.string().optional(),
	description: z.string().optional(),
	name: z.string().optional(),
});

export type SearchSectionType = z.infer<typeof schema>;

export const useSearchSection = (props: {
  quickFilter?: string;
  description?: string;
  name?: string;
}) => {
	const paramsAllowed = ['quickFilter', 'description', 'name'];
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
	} = useForm<SearchSectionType>({
		resolver: zodResolver(schema),
		defaultValues: {
			quickFilter: '',
			description: '',
			name: '',
		},
	});

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		const params = searchParams.entries();
		// @ts-ignore
		for (const [key, value] of params) {
			if (paramsAllowed.includes(key)) {
				setValue(key as keyof SearchSectionType, value);
			}
		}
	}, []);

	const onHandleReset = () => {
		reset();
		replace(`${pathname}`);
	};

	const updateRequest = (data: SearchSectionType = {}) => {
		const params = new URLSearchParams(searchParams);
		Object.keys(data).forEach((key) => {
			const keyObject = key as keyof SearchSectionType;
			if (data[keyObject]) {
				params.set(key, data[keyObject]);
			} else {
				params.delete(key);
			}
		});
		replace(`${pathname}?${params.toString()}`);
	};

	const onHandleSubmit = handleSubmit((data) => {
		updateRequest(data);
	});

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
  }, [props]);

	return {
		register,
		onHandleReset,
		errors,
		onHandleSubmit,
		currentState,
	};
};
