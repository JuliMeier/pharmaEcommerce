import { useCart } from '../../context/CartContext'
import './CountProductsItems.css'

const CountProductsItems = () => {
  const {countProductsCart} = useCart();
  return (
    <div className="count-products">
        <span className='counter-products-num'>{countProductsCart} </span>
    </div>
  )
}

export default CountProductsItems