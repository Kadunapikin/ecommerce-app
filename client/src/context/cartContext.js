import { useContext, createContext, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(prev => !prev)

    const addProduct = (product) => {
        const isExisting = products.find((p) => p.id === product.id)

        if (isExisting){
            setProducts(prev => {
                const upDatedProducts = prev.map((p) => {
                    return p.id === product.id
                    ? {...p, quantity: p.quantity + 1}
                    : p
                }) 
                return upDatedProducts;
            })
        } else {
            setProducts(prev => {
                return [...prev, product]
            })
        }
    }

    const removeProduct = (product) => {
        setProducts(prev => {
            const filteredProducts = prev.filter((p) => p.id !== product.id);
            return filteredProducts;
        })
    }

    return <cartContext.Provider value={{
        isOpen,
        toggleCart,
        addProduct,
        removeProduct,
        products
    }}>
        {children}
    </cartContext.Provider>
}

export const useCartContext = () => {
    return useContext(cartContext);
}