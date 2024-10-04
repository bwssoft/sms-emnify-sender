import React from 'react';
import * as Tooltip from '@bwsoft/tooltip';
import { ArrowPathIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { ISearchFilterTriggerType } from './types/searchFilter.trigger.type';
import { cn } from '@/app/utils/cn';
import { useActiveFilterManager } from './hooks/useActiveFilterManager';
import Counter from './Counter';

const Trigger = <T extends object> (props: ISearchFilterTriggerType<T>) => {
	const amountFilters = useActiveFilterManager({ ...(props as any) });

	const shouldDisplayNotification = () => {
		if (props.filterEnabled != true) {
			return null;
		}
    
		return <Counter {...props} />;
	};

	const CounterElement = shouldDisplayNotification();

	return (
		<div className="flex h-full w-fit gap-2 items-center">
			<Tooltip.TooltipProvider disableHoverableContent delayDuration={100}>
				<Tooltip.Tooltip>
					<Tooltip.TooltipTrigger type="button">
						<div
							onClick={props.onClick}
							className="flex relative justify-center items-center p-2 w-9 h-9 group hover:bg-gray-200 transition-all bg-gray-100 cursor-pointer rounded-full"
						>
							<FunnelIcon className="w-6 h-6 stroke-gray-500 group-hover:stroke-gray-600 transition-all" />
							{CounterElement}
						</div>
					</Tooltip.TooltipTrigger>
					<Tooltip.TooltipContent
						side={'right'}
						className="flex items-center bg-gray-100 h-9 rounded-md"
					>
						<p className="text-gray-800 text-md font-semibold">Filtros</p>
					</Tooltip.TooltipContent>
				</Tooltip.Tooltip>
			</Tooltip.TooltipProvider>
			<Tooltip.TooltipProvider disableHoverableContent delayDuration={100}>
				<Tooltip.Tooltip>
					<Tooltip.TooltipTrigger onClick={props.onReset} type="button">
						<ArrowPathIcon
							className={cn(
								'w-9 h-9 stroke-gray-500 animate-in slide-in-from-left-1 duration-300 cursor-pointer hover:bg-gray-100 p-2 rounded-full hover:stroke-gray-600 transition-all',
								amountFilters > 0 ? 'block' : 'hidden',
							)}
						/>
					</Tooltip.TooltipTrigger>
					<Tooltip.TooltipContent
						side={'right'}
						className="flex items-center bg-gray-100 h-9 rounded-md"
					>
						<p className="text-gray-800 text-md font-semibold">Limpar</p>
					</Tooltip.TooltipContent>
				</Tooltip.Tooltip>
			</Tooltip.TooltipProvider>
		</div>
	);
};

export default Trigger;