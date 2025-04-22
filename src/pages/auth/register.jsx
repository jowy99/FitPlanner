import React from 'react';
import AuthLayout from '@layouts/authLayout';
import RegisterForm from '@components/forms/register';

export default function RegisterPage() {
	return (
		<AuthLayout>
			<h1 className="text-2xl font-bold mb-6 text-center text-dark-900 dark:text-white">
				Crear cuenta
			</h1>
			<RegisterForm />
		</AuthLayout>
	);
}