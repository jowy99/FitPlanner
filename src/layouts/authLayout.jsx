import React from 'react';

export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <main className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6">
          {children}
        </main>
      </div>
    );
  }