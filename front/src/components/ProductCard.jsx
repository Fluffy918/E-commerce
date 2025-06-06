import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        
            <div>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        style={styles.image}
                    />
                    <h3 style={styles.name}>{product.name}</h3>
                    <p style={styles.price}>{product.price.toFixed(2)} €</p>
                </Link>
            </div>
        
    )
}

const styles = {
    card: {
        background: '#fff',
        borderRadius: '6px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'transform 0.1s',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
    },
    name: {
        margin: '0.5rem 0',
        color: '#333',
    },
    price: {
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: '#0070f3',
    }
}

export default ProductCard;