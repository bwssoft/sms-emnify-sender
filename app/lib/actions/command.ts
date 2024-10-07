'use server';

import { revalidatePath } from 'next/cache';
import { Command } from '../definitions';
import * as repository from '../repository';
import { cleanObject, IManageFunctionsQuery, manageQuery, queryHandler } from '@/app/utils/helperObject';

export async function createCommandfromCoomandPage(data: Command) {
	const response = await repository.createCommand(data);
	revalidatePath('/command');
	return response;
}

export async function findOneCommandformComandPage(id: string) {
	const response = await repository.findOneCommand(id);
	return response;
}

export async function deleteCommandfromComandPage(id: string) {
	const response = await repository.deleteCommand(id);
	revalidatePath('/command');
	return response;
}

export async function updateCommandfromCommandPage(data: Partial<Command>) {
	const response = await repository.updateCommand(data);
	revalidatePath('/command');
	return response;
}

export async function listCommandsfromComandPage(params: {
	quickFilter?: string;
	description?: string;
	name?: string;
} = {}) {
	const functionsQuery: IManageFunctionsQuery<typeof params, Command> = {
		name: (value) => {
			return {
				name: { $regex: value, $options: 'i' }
			}
		},
		description: (value) => {
			return {
				description: { $regex: value, $options: 'i' }
			}
		},
		quickFilter: (value) => {
			return {
				$or: [
					{ name: { $regex: value, $options: 'i' } },
					{ description: { $regex: value, $options: 'i' } }
				]
			}
		}
	}

	const formatedObject = cleanObject(params);
	const values = manageQuery(formatedObject);

	const queryState = queryHandler(values, functionsQuery);

	return await repository.listCommands(queryState);
}
