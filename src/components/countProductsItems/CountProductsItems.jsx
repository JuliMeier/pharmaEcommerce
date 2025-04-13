import './CountProductsItems.css'

const CountProductsItems = ({countProducts}) => {
  return (
    <div className="count-products">
        <span className='counter-products-num'>{countProducts} </span>
    </div>
  )
}

export default CountProductsItems