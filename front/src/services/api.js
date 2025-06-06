import axios from 'axios';

// On pointe vers le back en local, port 5000
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;