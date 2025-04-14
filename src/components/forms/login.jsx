import React from 'react';

export default function LoginForm() {
	return (
		<form
			className="space-y-6"
			aria-label="Formulario de inicio de sesión"
		>
			<fieldset className="space-y-1">
				<label
					htmlFor="email"
					className="block text-sm font-medium text-dark-900 dark:text-dark-100"
				>
					Correo electrónico
				</label>
				<input
					type="email"
					id="email"
					name="email"
					autoComplete="email"
					required
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white placeholder:text-dark-400 dark:placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all duration-200"
					placeholder="ejemplo@correo.com"
				/>
			</fieldset>

			<fieldset className="space-y-1">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-dark-900 dark:text-dark-100"
				>
					Contraseña
				</label>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="current-password"
					required
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white placeholder:text-dark-400 dark:placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all duration-200"
					placeholder="••••••••"
				/>
			</fieldset>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 focus:ring-2 focus:ring-primary-400 text-white font-semibold rounded-2xl shadow-md transition-all duration-200"
			>
				Iniciar sesión
			</button>
		</form>
	);
}