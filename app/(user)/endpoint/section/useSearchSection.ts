'use client';

import { useSearchParams } from '@/app/hooks/useSearchParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	query: z.string().optional(),
	type: z.string().optional(),
});

export type SearchSectionType = z.infer<typeof schema>;

export const useSearchSection = (props: {
	query?: string;
	type?: string;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<SearchSectionType>({
		resolver: zodResolver(schema),
		defaultValues: {
            query: "",
            type: "",
		},
	});

	const paramsAllowed: Array<keyof SearchSectionType> = [
		'query',
		'type',
	];
	const { manageParams, resetParams, currentState } =
		useSearchParams<SearchSectionType>({
			paramsAllowed,
			setValue,
		});

	const onHandleReset = () => {
		reset();
		resetParams();
	};

	const onHandleSubmit = handleSubmit((data) => {
		manageParams(data);
	});

	return {
		register,
		onHandleReset,
		errors,
		onHandleSubmit,
		currentState,
	};
};
