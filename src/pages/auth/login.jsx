import React from 'react';
import AuthLayout from '@layouts/authLayout.jsx';
import LoginForm from '@components/forms/login.jsx';

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Iniciar sesión
      </h1>
      <LoginForm />
    </AuthLayout>
  );
}