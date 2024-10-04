'use client';

import React, { useState } from 'react';
import { Command } from '../lib/definitions';
import clsx from 'clsx';
import {
	ChevronRightIcon,
	EyeIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Tooltip } from '@radix-ui/themes';
import { Modal } from './components/Modal';
import ModalDelete from '../(user)/command/components/ModalDelete';
import { Badge } from './components/Badge';
import { Table } from '@bwsoft/table';
import { ContextMenu } from '@bwsoft/context-menu';
import { usePathname, useRouter } from 'next/navigation';
// import { Container } from './styles';

export type ICommandsListType = {
	commands: Array<Command>;
};

const CommandsList: React.FC<ICommandsListType> = ({ commands }) => {
	const [curretCommand, setCurrentCommand] = useState<Command>();
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const pathname = usePathname();
	const { replace } = useRouter();

	const onCloseModal = () => {
		setOpenDeleteModal(false);
	};

	const onHandleDeleteCommand = (data: Command) => {
		setCurrentCommand(data);
		setOpenDeleteModal(true);
	};

	return (
		// <div className="hidden sm:block overflow-y-auto scroll-slim border-4 border-white max-h-[calc(100vh-260px)]">
		<div className="flex flex-col w-full h-full max-w-full max-h-[calc(100vh-260px)]  overflow-hidden">
			<div className="flex flex-col h-full max-h-full gap-4 px-4 overflow-hidden">
				<Table
					rows={commands}
					columns={[
						{
							column: 'name',
							label: 'Nome',
						},
						{
							column: 'variables',
							label: 'Variáveis',
							render: (row) => (
								<span className="flex gap-1">
									{row.variables?.map((props, key) => (
										<Tooltip key={key} content={props.description || ''}>
											<div>
												<Badge size="sm" label={props.name}></Badge>
											</div>
										</Tooltip>
									))}
								</span>
							),
						},
						{
							column: 'description',
							label: 'Dercrição',
							render: (row) => <span>{row.description}</span>,
						},
					]}
					onTableRowClick={(row) => {
						replace(`${pathname}/${row.uuid}`);
					}}
					onSelectable={(data) => {
						if (data.length !== 0) {
							setCurrentCommand(data[0]);
						}
					}}
					rightClickContent={[
						{
							label: 'Visualizar',
							icon: <EyeIcon className="w-4 h-4 text-indigo-400" />,
							action: () => {
								if (curretCommand) {
									replace(`${pathname}/${curretCommand?.uuid}`);
								}
							},
						},
						{
							label: 'Deletar',
							icon: <TrashIcon className="w-4 h-4 text-indigo-400" />,
							action: () => {
								if (curretCommand) {
									onHandleDeleteCommand(curretCommand);
								}
							},
						},
					]}
				/>
				<ModalDelete
					onClose={onCloseModal}
					isOpen={openDeleteModal}
					{...curretCommand}
				/>
			</div>
		</div>
	);
};

export default CommandsList;
