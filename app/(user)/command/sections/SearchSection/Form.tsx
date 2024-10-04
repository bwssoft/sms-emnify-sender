import { Input } from '@bwsoft/input';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SearchSectionType } from './useSearchSection';

type IFormProps = {
  register: UseFormRegister<SearchSectionType>;
  errors: FieldErrors<SearchSectionType>;
}


export const Form: React.FC<IFormProps> = ({ errors, register }) => {
	return (
		<div className="flex w-full flex-col mt-4 gap-4">
			<Input.Root>
				<Input.Label>Name</Input.Label>
				<Input.Field placeholder="Nome do comando" {...register('name')} />
				<Input.Error show={errors.name?.message !== undefined}>
					{errors.quickFilter?.message}
				</Input.Error>
			</Input.Root>
			<Input.Root>
				<Input.Label>Descrição</Input.Label>
				<Input.Field placeholder="Descrição" {...register('description')} />
				<Input.Error show={errors.description?.message !== undefined}>
					{errors.quickFilter?.message}
				</Input.Error>
			</Input.Root>
		</div>
	);
};
