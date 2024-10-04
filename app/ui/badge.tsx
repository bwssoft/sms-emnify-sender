import React, { ReactNode } from 'react';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';
import { Button } from './button';

export type IBadgeType = React.HTMLAttributes<HTMLSpanElement> & {
	children: ReactNode;
	clear?: boolean;
	onClearClick?: () => void;
};

const Badge: React.FC<IBadgeType> = ({
	children,
	clear = false,
	onClearClick,
	className,
	...props
}) => {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-md bg-gray-100 border border-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600',
				className,
			)}
			{...props}
		>
			{children}
			{clear && (
				<Button
					type="button"
					className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
					onClick={() => onClearClick && onClearClick()}
				>
					<span className="sr-only">Remove</span>
					<svg
						viewBox="0 0 14 14"
						className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75"
					>
						<path d="M4 4l6 6m0-6l-6 6" />
					</svg>
					<span className="absolute -inset-1" />
				</Button>
			)}
		</span>
	);
};

export default Badge;
