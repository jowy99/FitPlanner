import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const navigate = useNavigate(); // <-- Hook para redireccionar

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Error al registrar');
                return;
            }

            // Guardamos el token de forma segura
            localStorage.setItem('token', data.token);

            // Redirigimos al home
            navigate('/');
        } catch (error) {
            console.error('❌ Error al registrar:', error);
            alert('Error inesperado');
        }
    };

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			{/* Nombre */}
			<div>
				<label htmlFor="nombre" className="block text-sm font-medium text-dark-900 dark:text-dark-100">
					Nombre completo
				</label>
				<input
					type="text"
					id="nombre"
					name="nombre"
					required
					value={formData.nombre}
					onChange={handleChange}
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition"
					placeholder="Tu nombre"
				/>
			</div>

			{/* Email */}
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-dark-900 dark:text-dark-100">
					Correo electrónico
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					value={formData.email}
					onChange={handleChange}
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition"
					placeholder="ejemplo@correo.com"
				/>
			</div>

			{/* Contraseña */}
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-dark-900 dark:text-dark-100">
					Contraseña
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					value={formData.password}
					onChange={handleChange}
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition"
					placeholder="••••••••"
				/>
			</div>

			{/* Confirmar contraseña */}
			<div>
				<label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-900 dark:text-dark-100">
					Confirmar contraseña
				</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
					value={formData.confirmPassword}
					onChange={handleChange}
					className="w-full px-4 py-2 rounded-2xl border border-dark-200 dark:border-dark-500 bg-white dark:bg-[#2b2b2b] text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition"
					placeholder="••••••••"
				/>
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-md transition"
			>
				Crear cuenta
			</button>
		</form>
	);
}