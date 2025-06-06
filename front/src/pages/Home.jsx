import { useState, useEffect } from "react";
import { fetchProducts } from "../services/product.service";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                console.error("Erreur lors du chargement des produits :", err);
                
            })
    }, [])

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Catalogue des Produits</h1>
            <div style={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: '1rem',
    },
    title: {
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
    }
}

export default Home;