import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (dishIndex) => {
        setCartItems((prevItems) => ({
            ...prevItems,
            [dishIndex]: (prevItems[dishIndex] || 0) + 1,
        }));
    };

    const removeFromCart = (dishIndex) => {
        if (cartItems[dishIndex] > 0) {
            setCartItems((prevItems) => ({
                ...prevItems,
                [dishIndex]: prevItems[dishIndex] - 1,
            }));
        }
    };

    const getTotalQuantity = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
