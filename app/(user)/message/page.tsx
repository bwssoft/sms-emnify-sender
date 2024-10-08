'use server';

import {
	fetchEndpointMessagesById,
	fetchEndpointsFilteredByName,
	listCommandsfromComandPage,
	refreshMessageDatafromMessagePage,
} from '@/app/lib/actions';
import EndpointsInput from '@/app/ui/endpoint-input';
import { MessagePageForm } from '@/app/ui/form/MessagePageForm';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { CpuChipIcon } from '@heroicons/react/24/outline';

export default async function MessagePage({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		type?: string;
		endpoint_id?: string;
		endpoint_name?: string;
		endpoint_imei?: string;
		query_command?: string;
	};
}) {
	const query = searchParams?.query || '';
	const type = searchParams?.type || undefined;
	const query_command = searchParams?.query_command || '';
	const simcards = await fetchEndpointsFilteredByName(query, type);
	const messages = await fetchEndpointMessagesById(
		searchParams?.endpoint_id ?? '',
	);

	const refreshMessageBinded = refreshMessageDatafromMessagePage.bind(
		null,
		`/message?endpoint_id=${searchParams?.endpoint_id}`,
	);

	const commands = await listCommandsfromComandPage({
		quickFilter: query_command,
	});

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[min-content_1fr] relative min-h-full">
			<EndpointsInput simcards={simcards.slice(0, 9)} />

			{/*SEGUNDA COLUNA  */}
			{searchParams?.endpoint_id && (
				<div className="grid grid-rows-[min-content_1fr] grid-cols-1">
					<div className="border-b-2 border-gray-200 flex justify-between items-center px-6 py-2.5">
						<div>
							<p className="text-sm font-semibold text-gray-900">
								{searchParams?.endpoint_name}
							</p>
							<p className="text-xs font-normal text-gray-600">
								{searchParams?.endpoint_imei}
							</p>
						</div>
						<div className="flex gap-3">
							{/* <BellIcon className="w-4 h-4" /> */}
							<form action={refreshMessageBinded}>
								<button type="submit">
									<ArrowPathIcon className="w-4 h-4" />
								</button>
							</form>
							<EllipsisVerticalIcon className="w-4 h-4" />
						</div>
					</div>
					<div className="flex flex-col max-h-[calc(80vh-60px)] md:max-h-[72vh] 2xl:max-h-[80vh]">
						<MessagePageForm
							commands={commands}
							messages={messages}
							endpoint_id={searchParams?.endpoint_id}
						/>
					</div>
				</div>
			)}

			{!searchParams?.endpoint_id && (
				<div className="flex flex-col w-full justify-center items-center col-span-1">
					<div className="text-center flex flex-col items-center">
						<CpuChipIcon className="h-8 w-8 text-gray-700" />
						<h3 className="mt-2 text-sm font-semibold text-gray-900">
							Nenhum SIM CARD selecionado
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Selecione um dispositivo para iniciar um novo chat
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
