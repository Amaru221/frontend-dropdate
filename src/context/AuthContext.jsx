import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    // Función interna para procesar el token y devolver el objeto user
    const processToken = (token, email) => {
        try {
            const decoded = jwtDecode(token);
            const roles = decoded.roles || [];
            return {
                token,
                email,
                roles,
            };
        } catch (error) {
            console.error("Error decodificando el token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
            const userData = processToken(token, email);
            if (userData) {
                setUser(userData);
            } else {
                logout(); // Si el token es basura, limpiamos
            }
        }
        setIsLoadingUser(false);
    }, []);

    const login = (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        const userData = processToken(token, email);
        setUser(userData);
        setIsLoadingUser(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser(null);
        setIsLoadingUser(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
            {children}
        </AuthContext.Provider>
    );
};