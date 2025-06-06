import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <NavLink to="/" style={styles.link} activeStyle={styles.activeLin}>
                Accueil
            </NavLink>
            <NavLink to="/cart" style={styles.link} activeStyle={styles.activeLin}>
                Panier
            </NavLink>
            <NavLink to="/login" style={styles.link} activeStyle={styles.activeLin}>
                Connexion
            </NavLink>
            <NavLink to="/register" style={styles.link} activeStyle={styles.activeLin}>
                Inscription
            </NavLink>
        </nav>
    )
}

const styles = {
    nav: {
        display: 'flex',
        gap: '1rem',
        padding: '1rem 2rem',
        background: '#fafafa',
        borderBottom: '1px solid #ddd',
    },
    link: {
        textDecoration: 'none',
        color: '#555',
        fontWeight: '500',
    },
    activeLink: {
        color: '#0070f3',
        fontWeight: 700,
    }
}

export default Nav;