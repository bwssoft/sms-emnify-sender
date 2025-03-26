'use client';

import { userAuthenticate } from '@/app/lib/actions';
import { Button } from '@bwsoft/button';
import { Input } from '@bwsoft/input';

import Logo from '../../../public/logotipo.png';
import Image from 'next/image';
import { useFormState } from 'react-dom';

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
	const [errorMessage, formAction] = useFormState(userAuthenticate, undefined);
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
					<Image src={Logo} alt="Logotipo" width={120} />

					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Faça login na sua conta
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action={formAction} method="POST">
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nome do usuário
							</label>
							<div className="mt-2">
								<Input.Field
									id="username"
									name="username"
									type="username"
									autoComplete="username"
									required
									className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Senha
							</label>
							<div className="mt-2">
								<Input.Field
									id="password"
									name="password"
									type="password"
									autoComplete="password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="flex justify-end">
							<a href="/passwordRecovery">Esqueceu a senha?</a>
						</div>

						{errorMessage ? (
							<p className="text-sm text-red-500">{errorMessage}</p>
						) : (
							<></>
						)}

						<div>
							<Button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Login
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
