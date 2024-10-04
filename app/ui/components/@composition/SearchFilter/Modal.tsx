import React from 'react';
import { ISearchFilterModalType } from './types/searchFilter.modal.type';
import { Modal } from '@bwsoft/modal';
import { Button } from '@bwsoft/button';
import { cn } from '@/app/utils/cn';
import { Spinner } from '@bwsoft/spinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const SearchFilter: React.FC<ISearchFilterModalType> = ({
	children,
	onCancel,
	onConfirm,
	peddingRequest = false,
	onReset,
  className,
	...props
}) => {
	const onHandleCancel = () => {
		onCancel && onCancel();
		props.onClose();
	};

	const onHandleConfirm = () => {
		onConfirm && onConfirm();
	};

	const buttonClassName = 'w-fit';

	return (
		<Modal
			position="left"
			classNameHeader="justify-end"
			className={
        cn(
          "!w-full lg:!w-[30%]",
          className,
        )
      }
			{...props}
		>
			<div className="flex justify-between flex-col overflow-hidden w-full overflow-y-auto h-full">
				<div className='max-h-full overflow-y-auto app-scrollbar pb-5 pr-1'>
				{children}
				</div>

				<div className="flex w-full justify-end p-1  gap-2">
					{onReset && (
						<Button
							className={cn(
								buttonClassName,
								'gap-2 text-indigo-500 bg-transparent border  border-indigo-500 group hover:text-white',
							)}
							onClick={onReset}
						>
							<ArrowPathIcon className="w-4 h-4 stroke-indigo-500 transition-all group-hover:stroke-white" />
							Limpar Filtros
						</Button>
					)}

					<Button
						onClick={onHandleCancel}
						className={cn(
							buttonClassName,
							'bg-indigo-100 text-indigo-700 hover:text-white',
						)}
					>
						Cancelar
					</Button>
					<Button
						onClick={onHandleConfirm}
						className={cn(
							buttonClassName,
							'disabled:bg-indigo-400 disabled:cursor-not-allowed',
						)}
						disabled={peddingRequest}
					>
						{peddingRequest ? (
							<Spinner className="w-4 h-4 m-0" />
						) : (
							'Aplicar Filtro'
						)}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default SearchFilter;
