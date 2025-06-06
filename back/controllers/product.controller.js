import productModel from '../models/product.model.js';

async function getProducts(req, res, next){
    try {
        const products = await productModel.getAllProducts()
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProduct(req, res, next){
    try {
        const product = await productModel.getProductById(req.params.id)
        if (!product) return res.status(404).json({ message: 'Produit non trouvé'})
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function createProduct(req, res, next){
    try {
        const newProductId = await productModel.createProduct(req.body)
        res.status(201).json({ id: newProductId, ...req.body })
    } catch (err) {
        next(err)
    }
}

async function updateProduct(req, res, next){
    try {
        await productModel.updateProduct(req.params.id, req.body)
        res.json({ message: 'Produit mis à jour'})
    } catch (err) {
        next(err)
    }
}

async function deleteProduct(req, res, next){
    try {
        await productModel.deleteProduct(req.params.id)
        res.json({ message: 'Produit supprimé'})
    } catch (err) {
        next(err)
    }
}

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};