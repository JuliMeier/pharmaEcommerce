import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(()=> {
        try {
            const stored = localStorage.getItem('cartItems');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error al leer cartItems:', e);
            return [];
        }
    });
    const [countProductsCart, setCountProductsCart] = useState(()=> {
        try {
            const stored = localStorage.getItem('countProductsCart');
            return stored ? Number(stored) : 0;
        } catch (error) {
            console.error("Error al leer countProductsCart:", e);
            return 0;
        }
    });


    useEffect(()=> {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('countProductsCart', countProductsCart.toString())
    }, [cartItems, countProductsCart])

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find(item => item.id === product.id);
            if(existing) {
                return prevItems.map(item => 
                    item.id=== product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            } else {
                return [...prevItems, {...product, quantity: 1}]
            }
        });
        setCountProductsCart(prev => prev + 1)
    }

    const removeFromCart = (id) => {
        const toRemove = cartItems.find(item => item.id === id)
        
        if(toRemove){
            setCartItems((prev) => prev.filter(item => item.id!== id));
            setCountProductsCart(prev => Math.max(prev - toRemove.quantity, 0))
        }
    };

    const incrementQuantity = (id) => {
        setCartItems(prev => 
            prev.map(item => 
                item.id === id
                ? {...item, quantity: item.quantity + 1}
                : item
            )
        );
        setCountProductsCart(prev => prev + 1)
    }

    const decrementQuantity = (id) => {
        const item = cartItems.find(i => i.id === id);
        if(!item || item.quantity <= 0) return;

        setCartItems(prev => 
            prev.map(item => 
                item.id === id
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter(item => item.quantity > 0)
        );
        setCountProductsCart(prev => Math.max(prev - 1, 0));
        
    }

    const clearCart = () => {
        setCartItems([]);
        setCountProductsCart(0);
    }

    return (
        <CartContext.Provider value={{cartItems,countProductsCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}



