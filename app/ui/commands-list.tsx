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
		<React.Fragment>
			<div className="mt-10 sm:hidden">
				<div className="flex border-gray-50 border-b-gray-200 border-4 border-b px-6 py-3 bg-gray-50 justify-between">
					<div className="flex w-full">
						<h2 className="text-sm font-semibold text-gray-900">Comando</h2>
					</div>
					<div className="flex w-full justify-center">
						<h2 className="text-sm font-semibold text-gray-900">Ações</h2>
					</div>
				</div>
				<ul
					role="list"
					className=" divide-y divide-gray-100 border-t overflow-y-auto scroll-slim max-h-[calc(100vh-60vh)] border-4  border-transparent"
				>
					{commands.map((data, key) => (
						<li className="flex w-full px-6 items-center" key={key}>
							<span className="flex w-full items-center truncate">
								<a
									href={`/command/${data.uuid}`}
									className="group flex items-center justify-between py-4 group sm:px-6"
								>
									<span className="truncate text-sm group-hover:text-gray-500 ransition-all font-medium leading-6">
										{data.name}
									</span>
								</a>
							</span>
							<span className="flex w-full justify-center gap-2">
								<Link
									href={`/command/${data.uuid}`}
									className="text-indigo-600 hover:text-indigo-900"
								>
									<Tooltip content="Visualizar">
										<EyeIcon className="w-4 h-4" />
									</Tooltip>
								</Link>
								<div>
									<Tooltip content="Deletar">
										<TrashIcon
											onClick={() => onHandleDeleteCommand(data)}
											className="text-indigo-600 cursor-pointer hover:text-indigo-900 w-4 h-4"
										/>
									</Tooltip>
								</div>
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className="hidden sm:flex flex-col w-full h-full max-w-full max-h-[calc(100vh-260px)] overflow-hidden">
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
		</React.Fragment>
	);
};

export default CommandsList;
