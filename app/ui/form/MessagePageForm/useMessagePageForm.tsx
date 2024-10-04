'use client';

import React, { useCallback, useEffect } from 'react';
import { useMessagePageFormContext } from './context/useMessagePageFormContext';
import { Command } from '@/app/lib/definitions';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@bwsoft/tooltip';
import { Badge } from '@bwsoft/badge';

export const schema = z.object({
	payload: z.string().optional(),
});

export type IMessagePageFormData = z.infer<typeof schema>;

export const useMessagePageForm = () => {
	const { dispatch, state } = useMessagePageFormContext();

	const { register, setValue, resetField, watch, getValues } =
		useForm<IMessagePageFormData>({
			resolver: zodResolver(schema),
			values: {
				payload: state['CURRENT_COMMAND'].command,
			},
		});

	const badgeClassName = 'bg-gray-400 border-gray-400 text-white';

	const onHandleClickCommand = (command: Command) => {
		dispatch({ type: 'CURRENT_COMMAND', payload: command });
		setValue('payload', command.command);
	};

	const CommnadFormater = (command: Command) => {
		const commandCode = command?.command;
		const variables = command?.variables;
		const commandSteps = commandCode?.split(/\[(\w+)\]/g);

		return (
			<React.Fragment>
				{commandSteps?.map((step, key) => {
					const variable = variables?.find((props) => props.name === step);
					if (variable) {
						return (

							<TooltipProvider key={key}>
								<TooltipTrigger>
									<span>
										<Badge label={variable.name} className={badgeClassName}></Badge>
									</span>
								</TooltipTrigger>
								<TooltipContent>
									{variable.description || ''}
								</TooltipContent>
							</TooltipProvider>
							// <Tooltip
							// 	key={key}
							// 	//className="z-[99]"
							// 	//content={variable.description || ''}
							// >

							// </Tooltip>
						);
					}

					return <span key={key}>{step}</span>;
				})}
			</React.Fragment>
		);
	};

	useEffect(() => {
		if (!watch('payload')) {
			onCloseModal();
		}
	}, [watch('payload')]);

	const showModal = useCallback(
		() => state['MODAL_HELPER_COMMAND'],
		[state['MODAL_HELPER_COMMAND']],
	);

	const onCloseModal = () => {
		dispatch({ type: 'MODAL_HELPER_COMMAND', payload: false });
	};

	const onHandleSubmit = () => {
		resetField('payload');
		onCloseModal();
	};

	const currentCommand = state['CURRENT_COMMAND'];

	return {
		onHandleClickCommand,
		showModal,
		onCloseModal,
		currentCommand,
		register,
		onHandleSubmit,
		CommnadFormater,
		resetField,
	};
};
