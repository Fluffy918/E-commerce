import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Header() {
    const { user, logout } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext)

    return(
        <header style={styles.header}>
            <nav style={styles.navLeft}>
                <Link to="/" style={styles.link}>Accueil</Link>
                <Link to="/cart" style={styles.link}>
                    Panier ({cartItems.length})
                </Link>
            </nav>

            <nav style={styles.navRight}>
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/admin/products" style={styles.link}>
                                Administration
                            </Link>
                        )}
                        <button onClick={logout} style={styles.logoutBtn}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Connexion</Link>
                        <Link to="/register" style={styles.link}>Inscription</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    navLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    navRight: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        marginRight: '1rem',
        textDecoration: 'none',
        color: '#0070f3',
        fontWeight: 500,
    },
    logoutBtn: {
        padding: '0.4rem 0.8rem',
        background: '#e63946',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
}

export default Header;