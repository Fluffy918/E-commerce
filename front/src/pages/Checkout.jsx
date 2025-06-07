import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/order.service";

function Checkout() {
    const { user } = useContext(AuthContext)
    const { cartItems, totalAmount, clearCart } = useContext(CartContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleOrder = () => {
        if (!user) {
            navigate('/login')
            return
        }

        setLoading(true)
        setError('')

        const orderData = {
            total_amount: totalAmount,
            items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price
            }))
        }

        createOrder(orderData)
            .then(() => {
                clearCart()
                navigate('/')
            })
            .cathch(err => {
                console.error("Erreur lors de la création de la commande: ", err);
                setError('Impossible de valider la commande.')
                setLoading(false)
                
            })
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Confirmation de la commande</h2>
            {error && <p style={styles.error}>{error}</p>}
            <p style={styles.summaryText}>Montant total: {parseFloat(totalAmount).toFixed(2)} €</p>
            <button
                onClick={handleOrder}
                disabled={loading || cartItems.length === 0}
                style={styles.orderBtn}
            >
                {loading ? 'Traitement...': 'Valider ma commande'}
            </button>
        </div>
    )
}

const styles = {
    container: {
        padding: '1rem',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: {
        marginBottom: '1.5rem',
    },
    summaryText: {
        fontSize: '1.2rem',
        marginBottom: '1.5rem',
    },
    orderBtn: {
        padding: '0.6rem 1.2rem',
        background: '#2a9d8f',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
    }
}

export default Checkout;