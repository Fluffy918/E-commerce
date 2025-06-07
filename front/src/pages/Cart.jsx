import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function Cart() {
    const {
        cartItems,
        totalAmount,
        removeFromCart,
        updateQuantity,
    } = useContext(CartContext)
    const navigate = useNavigate()

    if (cartItems.length === 0) {
        return (
            <div>
                <h2 style={styles.container}>Mon Panier</h2>
                {cartItems.map(item => (
                    <div key={item.id} style={styles.item}>
                        <img 
                            src={item.image_url} 
                            alt={item.name} 
                            style={styles.image}
                        />
                        <div style={styles.info}>
                            <h4 style={styles.name}>{item.name}</h4>
                            <p style={styles.unitPrice}>
                                Prix unitaire: {item.price.toFixed(2)} €
                            </p>
                            <label style={styles.qtyLabel}>
                                Qté:
                                <input 
                                    type="number" 
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                    style={styles.qtyInput}
                                />
                            </label>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                style={styles.removeBtn}
                            >
                                Supprimer
                            </button>
                        </div>
                        <p>
                            {(item.price * item.quantity).toFixed(2)} €
                        </p>
                    </div>
                ))}

                <div style={styles.summary}>
                    <h3>Total: {totalAmount.toFixed(2)} €</h3>
                    <button
                        onClick={() => navigate('/checkout')}
                        style={styles.checkoutBtn}
                    >
                        Passer la commande
                    </button>
                </div>
            </div>
        )
    }
}

const styles = {
    emptyContainer: {
        textAlign: 'center',
        marginTop: '2rem',
    },
    link: {
        marginTop: '1rem',
        display: 'inline-block',
        color: '#0070f3',
        textDecoration: 'none',
        fontWeight: 500,
    },
    container: {
        padding: '1rem',
        maxwidth: '800px',
        margin: '0 auto',
    },
    title: {
        marginBottom: '1.5rem',
        textAlign: 'center',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #ddd',
        paddingBottom: '1rem',
    },
    image: {
        with: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginRight: '1rem',
    },
    info: {
        flexGrow: 1,
    },
    name: {
        margin: '0 0 0.5rem',
        
    },
    unitPrice: {
            margin: '0 0 0.5rem',
    },
    qtyLabel: {
        fontSize: '0.9rem',
    },
    qtyInput: {
        width: '50px',
        marginLeft: '0.5rem',
        padding: '0.2rem',
    },
    removeBtn: {
        marginLeft: '1rem',
        background: '#e63946',
        color: '#fff',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
    }, 
    subtotal: {
        fontWeight: 600,
        marginLeft: '1rem',
    },
    summary: {
        textAlign: 'right',
        marginTop: '2rem',
    },
    checkoutBtn: {
        padding: '0.6rem 1.2rem',
        background: '#2a9d8f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
}

export default Cart;