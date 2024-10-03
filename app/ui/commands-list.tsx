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
import { Table } from './components/Table';
import { Badge } from './components/Badge';

// import { Container } from './styles';

export type ICommandsListType = {
	commands: Array<Command>;
};

const CommandsList: React.FC<ICommandsListType> = ({ commands }) => {
	const [curretCommand, setCurrentCommand] = useState<Command>();
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const onCloseModal = () => {
		setOpenDeleteModal(false);
	};

	const onHandleDeleteCommand = (data: Command) => {
		setCurrentCommand(data);
		setOpenDeleteModal(true);
	};

	return (
		<>
			{/* Projects list (only on smallest breakpoint) */}
			<div className="sm:hidden">
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

			{/* Projects table (small breakpoint and up) */}
			<div className="hidden sm:block overflow-y-auto scroll-slim border-4 border-white max-h-[calc(100vh-260px)]">
				<div className="inline-block min-w-full border-b border-gray-200 align-middle">
					<Table
						rows={commands}
						columns={[
							{
								column: 'name',
								label: 'Nome',
								render: (row) => <span>{row.name}</span>,
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
							{
								column: 'command',
								label: 'Ações',
								render: (row) => (
									<div className="flex gap-4">
										<Link
											href={`/command/${row.uuid}`}
											className="text-indigo-600 hover:text-indigo-900"
										>
											<Tooltip content="Visualizar">
												<EyeIcon className="w-4 h-4" />
											</Tooltip>
										</Link>
										<div>
											<Tooltip content="Deletar">
												<TrashIcon
													onClick={() => onHandleDeleteCommand(row)}
													className="text-indigo-600 cursor-pointer hover:text-indigo-900 w-4 h-4"
												/>
											</Tooltip>
										</div>
									</div>
								),
							},
						]}
						isLoading={false}
					/>
				</div>
			</div>
			<ModalDelete
				onClose={onCloseModal}
				isOpen={openDeleteModal}
				{...curretCommand}
			/>
		</>
	);
};

export default CommandsList;
