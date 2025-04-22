import React from 'react';
import AuthLayout from '@layouts/authLayout';

export default function HomePage() {
    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold mb-6 text-center text-dark-900 dark:text-white">
                Crear cuenta
            </h1>
        </AuthLayout>
    );
}