'use client';
import Card from '@/app/ui/components/Card';
import React from 'react';
import {
	ChatBubbleLeftRightIcon,
	CpuChipIcon,
} from '@heroicons/react/24/outline';
import { FooterLink } from '@/app/ui/components/Card/components';

export const CardSection: React.FC = () => {
	const sizeStyleCards = 'min-h-[220px] max-h-[220px]';
	const footerLabel = FooterLink({ label: 'Baixar arquivo' });

	return (
		<React.Fragment>
			<Card
				title="Envio de mensagens"
				description="Documento PDF contendo instruções para realizar envio de mensagens Emnify"
				Icon={ChatBubbleLeftRightIcon}
				className={sizeStyleCards}
				footerLink={{
					href: '/docs/tutorial-envio-de-mensagens-emnify-bws-app.pdf',
					text: footerLabel,
				}}
			/>
			<Card
				title="Endpoints"
				description="Documento PDF contendo instruções sobre como utilizar a tela de endpoints"
				Icon={CpuChipIcon}
				className={sizeStyleCards}
				footerLink={{
					href: '/docs/tutorial-tela-de-endpoints-emnify-bws-app.pdf',
					text: footerLabel,
				}}
			/>
			<Card
				title="Alteração de senha"
				description="Documento PDF contendo instruções sobre como alterar a sua senha"
				Icon={CpuChipIcon}
				className={sizeStyleCards}
				footerLink={{
					href: '/docs/tutorial-mudança-de-senha-emnify-bws-app.pdf',
					text: footerLabel,
				}}
			/>
			<Card
				title="Comandos"
				description="Documento PDF contendo instruções sobre como realizar registro de comandos"
				Icon={CpuChipIcon}
				className={sizeStyleCards}
				footerLink={{
					href: '/docs/tutorial-tela-de-comando-emnify-bws-app.pdf',
					text: footerLabel,
				}}
			/>
		</React.Fragment>
	);
};
