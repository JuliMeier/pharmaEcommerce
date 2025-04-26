import Header from "../header/Header"
import DropDownCategories from "../dropDownCategories/DropDownCategories"
import Products from "../products/Products"

const MainLayout = ({ onAddProduct, onCountProductsCart, countProducts, items, onRemoveProduct, onIncrement, onDecrement }) => {
  return (
    <>
        <Header 
        countProducts={countProducts} 
        items={items} 
        onRemoveProduct={onRemoveProduct} 
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        />
        <DropDownCategories />
        <Products onAddProduct={onAddProduct} onCountProductsCart={onCountProductsCart} />

    </>
  )
}

export default MainLayout