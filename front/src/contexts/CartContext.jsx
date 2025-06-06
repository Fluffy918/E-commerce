import React from "react";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export function CartContext({ children }) {
    // On stocke le panier dans localStorage pour persistance
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    )

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    // Ajouter au panier (avec quantité par défaut = 1)
    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.id === product.id)
            if (exist) {
                return prev.map(item => 
                    item.id === product.id
                      ? { ...item, quantity: item.quantity + quantity}
                      : item
                )
            } else {
                return [...prev, { ...product, quantity }]
            }
        })
    }

    // Supprimer un produit du panier
    const removeFromCart = productId => {
        setCartItems(prev => prev.filter(item => item.id !== productId))
    }

    // Mettre à jour la quantité 
    const updateQuantity = (productId, newQty) => {
        setCartItems(prev => 
            prev.map(item =>
                item.id === productId ? { ...item, quantity: newQty }
                : item
            )
        )
    }

    // Vider le panier
    const clearCart = () => {
        setCartItems([])
    }

    // Calculer le total du panier
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )
    
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalAmount
            }}
        >
            {children}
        </CartContext.Provider>
    )
}