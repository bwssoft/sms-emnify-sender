'use client';

import React from 'react';
import { SearchFilter } from '.';
import { useSearchFilter } from './hooks/useSearchFilter';
import { ISearchFilterComponentType } from './types/searchFilter.component.types';
import { ISearchFilterTriggerType } from './types/searchFilter.trigger.type';

const Component = <T extends object> ({ children, ...props }: ISearchFilterComponentType<T>) => {
	const { modalFilters, onHandleModalFilter } = useSearchFilter();

  const triggerProps: ISearchFilterTriggerType<T> = props as ISearchFilterTriggerType<T>;

  const onHandleTrigger = () => {
    if(triggerProps.onClick) {
      triggerProps.onClick();
    }

    onHandleModalFilter();
  }

	return (
		<React.Fragment>
			<SearchFilter.Trigger
				onClick={onHandleTrigger}
        {...triggerProps}
			/>
			<SearchFilter.Modal
				onClose={() => onHandleModalFilter(false)}
				open={modalFilters}
				position="left"
				classNameHeader="justify-end"
			>
				{children}
			</SearchFilter.Modal>
		</React.Fragment>
	);
};

export const ComponentApp = <T extends object> (props: ISearchFilterComponentType<T>) => {
	return (
		<SearchFilter.Root>
			<Component {...props} />
		</SearchFilter.Root>
	);
};
