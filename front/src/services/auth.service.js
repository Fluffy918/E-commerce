import api from "./api.js";

export function register(credentials) {
    // credentials = { email, password }
    return api.post('/auth/register', credentials)
}

export function login(credentials) {
    return api.post('/auth/login', credentials)
}