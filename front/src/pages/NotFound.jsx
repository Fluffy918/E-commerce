import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={styles.container}>
            <h2>404 - Page non trouvé</h2>
            <p>
                Désolé, la page que vous recherchez n’existe pas.
            </p>
            <Link to="/" style={styles.link}>Retour à l'accueil</Link>
        </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '5rem',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    text: {
        marginBottom: '1.5rem',
    },
    link: {
        textDecoration: 'none',
        color: '#0070f3',
        fontWeight: 500,
    }
}

export default NotFound;