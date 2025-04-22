export async function obtenerPerfil(token) {
	try {
		const res = await fetch('/api/usuarios/perfil', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			throw new Error('No se pudo obtener el perfil');
		}

		const data = await res.json();
		return data.usuario;
	} catch (error) {
		console.error('❌ Error en obtenerPerfil:', error.message);
		throw error;
	}
}