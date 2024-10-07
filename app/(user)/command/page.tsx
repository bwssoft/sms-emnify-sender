import { listCommandsfromComandPage } from '@/app/lib/actions';
import { Breadcrumbs } from '@/app/ui/breadcrumbs';
import { Button } from '@/app/ui/button';
import CommandsList from '@/app/ui/commands-list';
import EndpointsSearchBar from '@/app/ui/endpoint-search-bar';
import Link from 'next/link';
import React from 'react';
import SearchSection from './sections/SearchSection/Search';

const Command: React.FC = async ({
	searchParams,
}: {
	searchParams?: {
		quickFilter?: string;
		description?: string;
		name?: string;
	};
}) => {

	const commandsEntity = await listCommandsfromComandPage(searchParams);

	return (
		<>
			<div className="min-h-full">
				<div className="flex flex-col">
					<Breadcrumbs
						root="/"
						data={[
							{
								href: '/comamand',
								name: 'Comandos',
							},
						]}
					/>
					<SearchSection {...searchParams} />
					<main className="flex-1">
						<CommandsList commands={commandsEntity} />
					</main>
				</div>
			</div>
		</>
	);
};

export default Command;
