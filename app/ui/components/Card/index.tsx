'use client';

import React, {
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
	SVGProps,
} from 'react';
import {
	CardContent,
	CardHeader,
	CardHeaderAddOn,
	CardSubtitle,
	CardTitle,
	CardTitleContainer,
	Card as Root,
} from '@bwsoft/card';
import { cn } from '@/app/utils/cn';

type ICardProps = {
	title?: string;
	description?: string;
	className?: string;
	Icon?: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string;
			titleId?: string;
		} & RefAttributes<SVGSVGElement>
	>;
	footerLink?: {
		href: string;
		text: ReactNode;
	};
};

const CardWithIcon: React.FC<Required<Pick<ICardProps, 'Icon'>>> = ({
	Icon,
}) => {
	return (
		<CardHeaderAddOn>
			<div className="rounded-lg w-16 h-16 p-5 bg-indigo-600 shadow-lg">
				<Icon className="text-white h-6 w-6" />
			</div>
		</CardHeaderAddOn>
	);
};

const CardWithFooterLink: React.FC<
	Required<Pick<ICardProps, 'footerLink'>>
> = ({ footerLink: { href, text } }) => {
	return (
		<CardContent className="flex items-center rounded-bl-2xl rounded-br-2xl bg-slate-50 p-6 md:px-8">
			<a
				href={href}
				download
				className=" text-base font-medium text-indigo-700 hover:text-indigo-600"
			>
				{text}
			</a>
		</CardContent>
	);
};

const Card: React.FC<ICardProps> = ({
	className,
	title,
	description,
	Icon,
	footerLink,
}) => {
	return (
		<Root className={cn('w-full', className)}>
			<CardHeader>
				<CardTitleContainer>
					<CardTitle>{title}</CardTitle>
					<CardSubtitle>{description}</CardSubtitle>
				</CardTitleContainer>
				{Icon && <CardWithIcon Icon={Icon} />}
			</CardHeader>
			{footerLink && <CardWithFooterLink footerLink={footerLink} />}
		</Root>
	);
};

export default Card;
