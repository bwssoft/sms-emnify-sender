'use client';
import { useFormStatus } from 'react-dom';
import { Spinner } from './components/Spinner';

export function Button({
	children,
	...props
}: React.ComponentPropsWithoutRef<'button'> & { children: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<button {...props} disabled={props.disabled || pending}>
			{!pending ? children : <Spinner />}
		</button>
	);
}
