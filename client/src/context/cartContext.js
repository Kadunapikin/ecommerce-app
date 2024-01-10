import { useContext, createContext, useState } from "react";

const cartContext = createContext();

export const cartProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(prev => !prev)

}

export const useCartContext = () => {
    return useContext(useCartContext);
}