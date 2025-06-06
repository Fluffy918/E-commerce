function Footer() {
    return(
        <footer style={styles.footer}>
            <p>© 2025 Mon E-commerce. Tous droits réservés.</p>
        </footer>
    )
}

const styles = {
    footer: {
        marginTop: '2rem',
        padding: '1rem',
        background: '#f5f5f5',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
    }
}

export default Footer;
