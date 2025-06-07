import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService} from "../services/auth.service.js";

function register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');

        try {
            await registerService({ email, password });
            navigate('/login');
        } catch (err) {
            console.error("Erreur lors de l'inscription :", err);
            const msg = err.res?.data?.message || 'Erreur lors de l\'inscription';
            setError(msg);
        }
    }

    return (
        <div styles={styles.container}>
            <h2 style={styles.title}>Inscription</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <label>Mot de passe</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.submitBtn}>S'inscrire</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        padding: '1rem',
        maxWidth: '400px',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gape: '0.8rem',
    },
    input: {
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitBtn: {
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }

}