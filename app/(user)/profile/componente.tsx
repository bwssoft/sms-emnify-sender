'use client';
import { auth } from '@/auth';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Session } from 'next-auth/types';
import { useEffect, useState } from 'react';

export default function Component() {
	const [session, setSession] = useState<Session | null>(null);

	const onHandleGetSession = async () => {
		const response = await auth();
		setSession(response);
	};

	useEffect(() => {
		onHandleGetSession();
	}, []);

	return (
		<div className="flex items-center space-x-1">
			<p className="text-gray-600 text-[.9em] font-medium">
				{session?.user.name}
			</p>
			<UserCircleIcon className="w-5 h-5 text-gray-600" />
		</div>
	);
}
