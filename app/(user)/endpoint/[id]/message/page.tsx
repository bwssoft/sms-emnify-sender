import {
	fetchEndpointMessagesById,
	listCommandsfromComandPage,
	refreshMessageDatafromMessagePage,
} from '@/app/lib/actions';
import { MessagePageForm } from '@/app/ui/form/MessagePageForm';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';

export default async function MessageEndpoint({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const query_command = '';
	const refreshMessageBinded = refreshMessageDatafromMessagePage.bind(
		null,
		`/message?endpoint_id=${params.id}`,
	);

	const messages = await fetchEndpointMessagesById(params.id);
	console.log(params.id);
	const commands = await listCommandsfromComandPage({
		quickFilter: query_command,
	});

	return (
		<div className="flex flex-col w-full h-full max-h-full overflow-hidden col-span-2">
			<div className="border-b-2 border-gray-200 flex justify-between items-center px-6 py-2.5">
				<div>
					<p className="text-sm font-semibold text-gray-900">
						Endpoint ID: {params.id}
					</p>
				</div>
				<div className="flex gap-3">
					<form action={refreshMessageBinded}>
						<button type="submit">
							<ArrowPathIcon className="w-4 h-4" />
						</button>
					</form>
					<EllipsisVerticalIcon className="w-4 h-4" />
				</div>
			</div>
			<div className="flex flex-col w-full h-full max-h-[75%]">
				<MessagePageForm
					commands={commands}
					endpoint_id={params.id}
					messages={messages}
				/>
			</div>
		</div>
	);
}
