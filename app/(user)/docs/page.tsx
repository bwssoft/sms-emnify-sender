import React from 'react';
import { CardSection } from './sections/Cards';


export default function Docs() {
	return (
		<div className="flex justify-center items-center max-h-[calc(100%-66px)] overflow-y-auto p-4 w-full h-[calc(100%-90px)] bg-white">
			<div className="grid grid-cols-1 lg:grid-cols-2 max-h-full h-full gap-5 max-w-[1100px]">
				<CardSection />
			</div>
		</div>
	);
}
