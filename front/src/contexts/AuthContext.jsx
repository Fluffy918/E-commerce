import React from "react";
import { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    // On stocke le token et les infos user
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [token, setToken] = useState(localStorage.getItem('token') || '')

    // À chaque changement de token, on met à jour Axios et le localStorage
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            delete api.defaults.headers.common['Authorization']
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }, [token, user])

    // Fonction pour se connecter
    const login = (tokenReceived, userData) => {
        setToken(tokenReceived)
        setUser(userData);
    }

    // Fonction pour se déconnecter
    const logout = () => {
        setToken('')
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}