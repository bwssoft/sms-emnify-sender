'use client';

import React from 'react';
import { Bars4Icon, CpuChipIcon } from '@heroicons/react/24/outline';
import Card from '@/app/ui/components/Card';
import { FooterLink } from '@/app/ui/components/Card/components';

const links = [
	{
		name: 'Mensagens',
		href: '/message',
		description:
			'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.',
		icon: Bars4Icon,
	},
	{
		name: 'SIMCards',
		href: '/endpoint',
		description:
			'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.',
		icon: CpuChipIcon,
	},
];

const CardSection: React.FC = () => {
	const sizeStyleCards = 'min-h-[220px] max-h-[220px]';
	return (
		<React.Fragment>
			{links.map((link) => (
				<Card
					key={link.name}
					className={sizeStyleCards}
					description={link.description}
					title={link.name}
					Icon={link.icon}
					footerLink={{
						href: link.href,
						text: <FooterLink label="Acessar" />,
					}}
				/>
			))}
		</React.Fragment>
	);
};

export default CardSection;
