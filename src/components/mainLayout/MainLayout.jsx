import { useState } from "react";
import Header from "../header/Header"
import Products from "../products/Products"
import SearchProducts from "../searchProducts/SearchProducts"

const MainLayout = ({ onAddProduct, onCountProductsCart, countProducts, items, onRemoveProduct, onIncrement, onDecrement }) => {

    const [searchProduct, setSearchProduct] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleProductSearch = (value) => {
      setSearchProduct(value);
    }

    const handleCategorySelect = (categoryId) => {
      setSelectedCategory(categoryId);
    }

  return (
    <>
        <Header 
        countProducts={countProducts} 
        items={items} 
        onRemoveProduct={onRemoveProduct} 
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        />
        <SearchProducts onCategorySelect={handleCategorySelect} onSearch={handleProductSearch} />
        <Products searchProduct={searchProduct} selectedCategory={selectedCategory} onAddProduct={onAddProduct} onCountProductsCart={onCountProductsCart} />

    </>
  )
}

export default MainLayout