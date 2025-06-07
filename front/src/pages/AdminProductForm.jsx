import { useState, useEffect, useContext } from "react";
import { fetchProductById, createProduct, updateProduct } from "../services/product.service.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";

function AdminProductForm() {
    const { user } = useContext(AuthContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        stock: 0,
        category: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    // Sécurité : seul l’admin peut accéder
    if (!user || user.role !== 'admin') {
        return <p style={styles.accesDenied}>Accès refusé: réservé aux administrateurs</p>
    }

    // Si on est en mode édition, on charge le produit

    useEffect(() => {
        if (id) {
            fetchProductById(id)
                .then(res => {
                    setFormData(res.data)
                })
                .catch(err => {
                    console.error('Erreur lors du chargement du produit:', err);
                    setError('Impossible de charger le produit à modifier')
                })
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (id) {
                await updateProduct(id, formData)
            } else {
                await createProduct(formData)
            }
            navigate('/')
        } catch (err) {
            console.error('Erreur lors de la sauvegarde du produit:', err);
            setError('Impossible de sauvegarder le produit')
            setLoading(false)
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>
                {id ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
            </h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <label>Nom</label>
                <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <label>Description</label>
                <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                />

                <label>Prix (€)</label>
                <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                    style={styles.input}
                />

                <label>URL de l'image</label>
                <input 
                    type="text" 
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    style={styles.input}
                />

                <label>Catégorie</label>
                <input 
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={styles.input} 
                />

                <button type="submit" style={styles.submitBtn} disabled={loading}>
                    {loading ? (id ? 'Mise à jour...' : 'Création') : (id ? 'Mettre à jour' : 'Créer')}
                </button>

                
            </form>
        </div>
    )
}

const styles = {
    accesDenied: {
        textAlign: 'center',
        color: 'red',
        marginTop: '2rem',
    },
    container: {
        padding: '1rem',
        maxWidth: '500px',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
    },
    input: {
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        padding: '0.5rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical',
        minHeight: '80px',
    },
    submitBtn: {
        marginTop: '1rem',
        padding: '0.6rem 1.2rem',
        background: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
}

export default AdminProductForm;