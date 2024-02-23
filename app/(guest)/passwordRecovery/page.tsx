'use client';

import { recoverUserPassword } from '@/app/lib/actions'; // Importe a função aqui
import { Button } from '@/app/ui/button';
import Logo from '../../../public/logotipo.png';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';

export default function PasswordRecovery() {
	const [username, setUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		try {
			await recoverUserPassword(new FormData(event.target));
			alert('Senha alterada com sucesso!');
		} catch (error: any) {
			alert('Erro ao alterar a senha: ' + error.message);
		}
	};

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
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Digite seu nome de usuário
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="username"
									autoComplete="username"
									required
									className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="new_password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Digite a nova senha
							</label>
							<div className="mt-2">
								<input
									id="new_password"
									name="new_password"
									type="password"
									autoComplete="new-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<Button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Confirmar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
