import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { Menu, X, Search} from "lucide-react"

function Header() {
    const { user, logout } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    function handleSearch() {
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }


    return(
        <header style={styles.header}>
            <nav style={styles.navLeft}>
                <Link to="/" style={styles.link}>Accueil</Link>
                <Link to="/cart" style={styles.link}>
                    Panier ({cartItems.length})
                </Link>
            </nav>

            <form onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
            }} style={styles.searchContainer}>
                <input type="text" placeholder="Rechercher un article..." style={styles.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button onClick={handleSearch} className="hidden md:block hover:text-gray-300 transition">
                    <Search size={24}/>
                </button>
            </form>

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
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'cenetr',
        gap: '05rem',
    },
    search: {
        padding: '0.4rem 0.6rem',
        borderRadius: '5px',
        border: 'none',
        background: '#374151',
        color: '#fff'
    }
}

export default Header;