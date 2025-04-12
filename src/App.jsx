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
  const [products, setProducts] = useState([])

  // useEffect(() => {
  //  const fecthData = async () => {
  //   const data = await fetcher("categories")
  //   setCategories(data)
  //  }
  //   fecthData()
  // }, [])

    // const handleCategoryClick = (id) => {
    //   fetch(`http://localhost:3001/products?catId=${id}`)
    //   .then(response => response.json())
    //   .then(data => {
      
    //   setProducts(data)
    //   console.log(products)
    // })
    //   console.log('Category clicked', id)
    // }


  return (
    <>
    <Header />
    <DropDownCategories />
    <Products />
    {/* <ProductItemCard productsData={products} /> */}
    </>
  )
}

export default App
