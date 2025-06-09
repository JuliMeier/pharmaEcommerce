import { useState } from "react";
import Header from "../header/Header"
import Products from "../products/Products"
import SearchProducts from "../searchProducts/SearchProducts"
import { useCart } from "../../context/CartContext";
import { Footer  } from "../footer/Footer";

const MainLayout = ({ isLoggedIn, setIsLoggedIn }) => {

    const {
      cartItems,
      countProductsCart,
      addtoCart,
      removeFromCart, 
      incrementQuantity,
      decrementQuantity
    } = useCart();

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
        countProducts={countProductsCart} 
        items={cartItems} 
        onRemoveProduct={removeFromCart} 
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        />
        <SearchProducts onCategorySelect={handleCategorySelect} onSearch={handleProductSearch} />
        <Products searchProduct={searchProduct} selectedCategory={selectedCategory} onAddProduct={addtoCart}  />
        <Footer />
    </>
  )
}

export default MainLayout