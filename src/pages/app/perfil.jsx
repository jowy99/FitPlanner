import React, { useEffect, useState } from 'react';
import { obtenerPerfil } from '@services/perfil';

export default function PerfilPage() {
	const [perfil, setPerfil] = useState(null);
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			console.warn('No hay token, redirigiendo...');
			// Aquí puedes redirigir a login si quieres
			return;
		}

		obtenerPerfil(token)
			.then((usuario) => {
				setPerfil(usuario);
			})
			.catch((err) => {
				console.error('Error al cargar perfil', err);
			})
			.finally(() => {
				setCargando(false);
			});
	}, []);

	if (cargando) return <p className="text-center">Cargando perfil...</p>;

	return (
		<div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-dark-800 rounded-xl shadow-lg">
			<h1 className="text-2xl font-bold mb-4 text-dark-900 dark:text-white">Perfil del usuario</h1>
			<ul className="space-y-2 text-dark-700 dark:text-dark-200">
				<li><strong>Nombre:</strong> {perfil.nombre}</li>
				<li><strong>Email:</strong> {perfil.email}</li>
				<li><strong>Rol:</strong> {perfil.rol}</li>
				<li><strong>Registrado en:</strong> {new Date(perfil.creado_en).toLocaleDateString()}</li>
			</ul>
		</div>
	);
}