"use server";

import { revalidatePath } from 'next/cache';
import { Command } from '../definitions';
import * as repository from '../repository';

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
  const response = await repository.updateCommand(data)
  revalidatePath('/command');
  return response;
}

export async function listCommandsfromComandPage(value?: string, type?: string) {
  return await repository.listCommands({ type, value });
}
