import { fetchEndpointUsageById } from '@/app/lib/actions';
import { EmptyState } from '@/app/ui/components/@composition/EmptyState';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export default async function Example({ params }: { params: { id: string } }) {
	const usage = await fetchEndpointUsageById(params.id);
	if (!usage) {
		return (
			<EmptyState.Root>
				<EmptyState.Icon icon={ExclamationCircleIcon} />
				<EmptyState.Title text="Nenhum dado encontrado" />
			</EmptyState.Root>
		);
	}
	return (
		<div className="sm:flex sm:w-full">
			<div className="sm:w-full">
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Mês atual
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Estatisticas de custo do mês atual
					</p>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Custo
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.current_month.data.cost}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.current_month.data.volume}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume RX
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.current_month.data.volume_rx}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume TX
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.current_month.data.volume_rx}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div className="sm:w-full">
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Mês passado
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Estatisticas de custo do mês passado
					</p>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Custo
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.last_month.data.cost}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.last_month.data.volume}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume RX
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.last_month.data.volume_rx}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								Volume TX
							</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{usage.last_month.data.volume_rx}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}
