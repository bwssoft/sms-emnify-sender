import { Input } from '@bwsoft/input';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SearchSectionType } from './useSearchSection';

type IFormProps = {
	register: UseFormRegister<SearchSectionType>;
	errors: FieldErrors<SearchSectionType>;
};

export const Form: React.FC<IFormProps> = ({ errors, register }) => {
	return (
		<div className="flex w-full flex-col mt-4 gap-4">
			<Input
				label="Name"
				placeholder="Nome do comando"
				error={errors.query?.message}
				{...register('query')}
			/>
		</div>
	);
};
