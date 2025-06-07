import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { login as loginService} from "../services/auth.service";
import '../Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginService({ email, password })
            // Le back doit renvoyer { token, user: { id, email, role } }
            const { token, user} = res.data
            login(token, user)
            navigate('/')
        } catch (err) {
            console.error(err);
            setError('Identifiants invalides')
        } 
     }

     return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <label>Email</label>
            <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <label>Mot de passe</label>
            <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Se connecter</button>
        </form>
     )
}

export default Login