import { fetchEndpointById, isAdmOrSupport } from '@/app/lib/actions';
import { EmptyState } from '@/app/ui/components/@composition/EmptyState';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ViewSectionContentSection } from './section';

export default async function Example({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const endpoint = await fetchEndpointById(params.id);
	const isUserAdm = await isAdmOrSupport();
	if (!endpoint) {
		return (
			<EmptyState.Root>
				<EmptyState.Icon icon={ExclamationCircleIcon} />
				<EmptyState.Title text="Nenhum dado encontrado" />
			</EmptyState.Root>
		);
	}
	return (
		<div>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">
					Dados básicos
				</h3>
				<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
					Segue abaixo dados do cadastro do endpoint
				</p>
			</div>
			<div className="mt-6 border-t border-gray-100">
			 	<ViewSectionContentSection  isUserAdm={isUserAdm} endpoint={endpoint} />
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Tags
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							<ul role="list" className="leading-8">
								{endpoint.tags?.split(',').map((tag, index) => (
									<li className="inline" key={tag + index}>
										<span className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
											<div className="absolute flex flex-shrink-0 items-center justify-center">
												<span
													className="h-1.5 w-1.5 rounded-full bg-rose-500"
													aria-hidden="true"
												/>
											</div>
											<div className="ml-3 text-xs font-semibold text-gray-900">
												{tag}
											</div>
										</span>{' '}
									</li>
								))}
							</ul>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
