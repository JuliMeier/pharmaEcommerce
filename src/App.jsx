import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/header/Header';
import { fetcher } from './fetcher';
import DropDownCategories from './components/dropDownCategories/DropDownCategories';
import ProductItem from './components/productItemCard/ProductItemCard';
import ProductItemCard from './components/productItemCard/ProductItemCard';
import Products from './components/products/Products';

function App() {
  const [categories, setCategories] = useState([])
  const [countProductsCart, setCountProductsCart] = useState(0);

  const handleCountProductsCart = () => {
    setCountProductsCart(prevCount => {
        const newCount = prevCount + 1;
        return newCount;
    });
  }

  const [cartItems, setCartItems] = useState([])
 
  

    const handleAddProduct = (product) => {
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find(item => item.title === product.title);

        if(existingProduct){
          return prevItems.map(item =>
            item.title === product.title ? {...item, quantity: item.quantity + 1} : item
           )
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      })
      
    }

    const handleRemoveProduct = (title) => {
      setCartItems((prevItems) => prevItems.filter(item => item.title !== title) )
    }

  return (
    <>
    <Header  countProducts={countProductsCart} items={cartItems} onRemoveProduct={handleRemoveProduct} />
    <DropDownCategories />
    <Products onAddProduct={handleAddProduct} onCountProductsCart={handleCountProductsCart} />
    </>
  )
}

export default App
