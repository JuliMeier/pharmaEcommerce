import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/header/Header';
import DropDownCategories from './components/dropDownCategories/DropDownCategories';
import ProductItem from './components/productItemCard/ProductItemCard';
import ProductItemCard from './components/productItemCard/ProductItemCard';
import Products from './components/products/Products';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import MainLayout from './components/mainLayout/MainLayout';
import AuthLayout from './components/authLayout/AuthLayout';

function App() {
  const [categories, setCategories] = useState([])
  const [countProductsCart, setCountProductsCart] = useState(0);
  const [cartItems, setCartItems] = useState([])

  const handleCountProductsCart = () => {
    setCountProductsCart(prevCount => {
        const newCount = prevCount + 1;
        return newCount;
    });
  }

  const handleDecreaseCountProductsCart = (amount = 1) =>{
    setCountProductsCart(prevCount => {
      const newCount = prevCount - amount;
      return newCount;
      });
  }

  
 
  

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
      const productToRemove = cartItems.find((item)=>item.title === title)
   
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.title !== title)
        );
      
        if(productToRemove){
          handleDecreaseCountProductsCart(productToRemove.quantity)
        }

      }
    

    const handleIncrementQuantity = (title) => {
      setCartItems((prevItems)=> 
        prevItems.map((item) => 
        item.title === title
        ? {...item, quantity: item.quantity + 1}
        : item
        )
      )
      handleCountProductsCart()
    }

    const handleDecrementQuantity = (title) => {
      setCartItems((prevItems)=> 
        prevItems.map((item) => 
        item.title === title
        ? {...item, quantity: item.quantity - 1}
        : item
        )
        .filter((item) => item.quantity > 0)
      )
      handleDecreaseCountProductsCart()
    }

  return (
    <>  
    <BrowserRouter>
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path="/auth/login" element={<LoginPage />} /> 
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={
            <MainLayout 
            onAddProduct={handleAddProduct} 
            onCountProductsCart={handleCountProductsCart}
            countProducts={countProductsCart}
            items={cartItems}
            onRemoveProduct={handleRemoveProduct}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
            />
          } 
        />
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
