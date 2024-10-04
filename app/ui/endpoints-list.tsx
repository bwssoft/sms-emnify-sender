'use client';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { Simcard } from '../lib/definitions';
import { Table } from '@bwsoft/table';
import { Tooltip } from '@radix-ui/themes';
import { EyeIcon } from '@heroicons/react/24/outline';

export function EndpointsList({ simcards }: { simcards: Simcard[] }) {
	return (
		<>
			{/* Projects list (only on smallest breakpoint) */}
			<div className=" sm:hidden">
				<div className="px-4 sm:px-6">
					<h2 className="text-sm font-medium text-gray-900">Endpoints</h2>
				</div>
				<ul
					role="list"
					className="mt-3 divide-y divide-gray-100 border-t border-gray-200"
				>
					{simcards.map((simcard) => (
						<li key={simcard?.uuid ?? '1'}>
							<a
								href="#"
								className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
							>
								<span className="flex items-center space-x-3 truncate">
									<span
										className={clsx(
											'bg-indigo-500',
											'h-2.5 w-2.5 flex-shrink-0 rounded-full',
										)}
										aria-hidden="true"
									/>
									<span className="truncate text-sm font-medium leading-6">
										{simcard.emnify.endpoint_name}{' '}
										<span className="truncate font-normal text-gray-500">
											{simcard.emnify.endpoint_imei}
										</span>
									</span>
								</span>
								<ChevronRightIcon
									className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
								/>
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Projects table (small breakpoint and up) */}
			<div className="flex flex-col w-full h-full max-w-full max-h-[calc(100vh-360px)] overflow-hidden">
				<div className="flex flex-col h-full max-h-full gap-4 px-4 overflow-hidden">
					<Table
						rows={simcards}
						columns={[
							{
								column: 'emnify',
								label: 'Nome',
								render: (row) => <span>{row.emnify.endpoint_name}</span>,
							},
							{
								column: 'emnify',
								label: 'IMEI',
								render: (row) => (
									<span>{row.emnify.endpoint_imei ?? '---'}</span>
								),
							},
							{
								column: 'emnify',
								label: 'ICCID',
								render: (row) => <span>{row.emnify.sim_id}</span>,
							},
							{
								column: 'emnify',
								label: '',
								render: (row) => (
									<Link
										href={`/endpoint/${row.emnify.endpoint_id}/info`}
										className="text-indigo-600 hover:text-indigo-900"
									>
										<Tooltip content="Visualizar">
											<EyeIcon className="w-4 h-4" />
										</Tooltip>
									</Link>
								),
							},
						]}
						isLoading={false}
					/>
				</div>
			</div>
		</>
	);
}
