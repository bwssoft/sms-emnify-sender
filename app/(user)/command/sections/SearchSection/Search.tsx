'use client';

import { Input } from '@bwsoft/input';
import React from 'react';
import { useSearchSection } from './useSearchSection';
import { Button } from '@bwsoft/button';
import { SearchFilter } from '@bwsoft/search-filter';
import Link from 'next/link';
import { Form } from './Form';

const SearchSection: React.FC<{
	quickFilter?: string;
	description?: string;
	name?: string;
}> = (props) => {
	const { onHandleSubmit, onHandleReset, currentState, errors, register } =
		useSearchSection(props);

	return (
		<form onSubmit={onHandleSubmit}>
			<div className="flex w-full justify-between p-4 items-end">
				<div className="flex md:w-full max-w-[400px] items-end gap-4">
					<div className="hidden md:flex w-full  gap-4 items-end">
						<Input.Root>
							<Input.Label>Name</Input.Label>
							<Input.Field
								placeholder="Nome do comando..."
								className="w-full min-w-[255px] max-w-[255px]"
								{...register('quickFilter')}
							/>
							<Input.Error show={errors.quickFilter?.message !== undefined}>
								{errors.quickFilter?.message}
							</Input.Error>
						</Input.Root>
						<Button type="submit" className="w-fit">
							Buscar
						</Button>
					</div>
					<SearchFilter
						filterEnabled
						queryState={currentState}
						onReset={onHandleReset}
						onConfirm={onHandleSubmit}
					>
						<Form errors={errors} register={register} />
					</SearchFilter>
				</div>
				<div className="w-fit">
					<Link href={'/command/create'}>
						<Button className="bg-indigo-500 w-fit hover:bg-indigo-400 transition-colors text-white rounded-md text-sm shadow-md p-2">
							Cadastrar Comando
						</Button>
					</Link>
				</div>
			</div>
		</form>
	);
};

export default SearchSection;
