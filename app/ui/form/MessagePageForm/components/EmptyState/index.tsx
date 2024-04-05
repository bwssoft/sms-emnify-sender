import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

const EmptyState: React.FC = () => {
	return (
		<div className="flex flex-col w-full h-full justify-center items-center">
			<ChatBubbleLeftRightIcon className="w-6 h-6 stroke-gray-500" />
			<div className="text-sm font-medium">Nenhuma mensagem encontrada</div>
		</div>
	);
};

export default EmptyState;
