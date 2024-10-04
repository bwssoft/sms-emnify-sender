'use client';

import { useSearchParams } from '@/app/hooks/useSearchParams';
import { zodResolver } from '@hookform/resolvers/zod';
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
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<SearchSectionType>({
		resolver: zodResolver(schema),
		defaultValues: {
			quickFilter: '',
			description: '',
			name: '',
		},
	});

	const paramsAllowed: Array<keyof SearchSectionType> = [
		'quickFilter',
		'description',
		'name',
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
