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
            const existing = prevItems.find(item => item.title === product.title);
            if(existing) {
                return prevItems.map(item => 
                    item.title === product.title
                    ? {...item, quantity: item.quantity + 1}
                    : item
                );
            } else {
                return [...prevItems, {...product, quantity: 1}]
            }
        });
        setCountProductsCart(prev => prev + 1)
    }

    const removeFromCart = (title) => {
        const toRemove = cartItems.find(item => item.title === title)
        
        if(toRemove){
            setCartItems((prev) => prev.filter(item => item.title !== title));
            setCountProductsCart(prev => Math.max(prev - toRemove.quantity, 0))
        }
    };

    const incrementQuantity = (title) => {
        setCartItems(prev => 
            prev.map(item => 
                item.title === title
                ? {...item, quantity: item.quantity + 1}
                : item
            )
        );
        setCountProductsCart(prev => prev + 1)
    }

    const decrementQuantity = (title) => {
        const item = cartItems.find(i => i.title === title);
        if(!item || item.quantity <= 0) return;

        setCartItems(prev => 
            prev.map(item => 
                item.title === title
                ? {...item, quantity: item.quantity - 1}
                : item
            )
            .filter(item => item.quantity > 0)
        );
        setCountProductsCart(prev => Math.max(prev - 1, 0));
        
    }

    return (
        <CartContext.Provider value={{cartItems,countProductsCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}



