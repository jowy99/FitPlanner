import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [usuario, setUsuario] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const tokenGuardado = localStorage.getItem('token');
		if (tokenGuardado) {
			setToken(tokenGuardado);
			// Aquí podrías hacer un fetch para obtener los datos del usuario
			// con ese token, por ejemplo: /api/usuarios/me
		}
	}, []);

	const login = (nuevoToken) => {
		localStorage.setItem('token', nuevoToken);
		setToken(nuevoToken);
		// También puedes hacer fetch para guardar el usuario
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUsuario(null);
	};

	return (
		<AuthContext.Provider value={{ token, usuario, setUsuario, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}