import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { fetchProductById } from "../services/product.service";

function ProductDetail() {
    const { id} = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProductById(id)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                console.error("Erreur lors du chargement du produit :", err);
                setError('Produit non trouvé')
            })
    }, [id]);

    if (error) {
        return <p style={{ color: 'red', textAlign: 'center'}}>{error}</p>
    }

    if (!product) {
        return <p style={{ textAlign: 'center'}}>Chargement...</p>
    }

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <img 
                    src={product.image_url}
                    alt={product.name}
                    style={styles.image}
                />
            </div>
            <div style={styles.details}>
                <h2 style={styles.name}>{product.name}</h2>
                <p style={styles.description}>{product.description}</p>
                <p style={styles.price}>Prix: {product.price.toFixed(2)}&rbrace</p>
                <button onClick={() => addToCart(product)} style={styles.addButton}>
                    Ajouter au panier
                </button>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexwrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        padding: '1rem',
    },
    imageContainer: {
        flex: '0 0 300px',
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    details: {
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    name: {
        fontSize: '2rem',
        marginBottom: '0.5rem',
    },
    description: {
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: 600,
    },
    addButton: {
        padding: '0.6rem 1.2rem',
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem',
    }
}

export default ProductDetail;