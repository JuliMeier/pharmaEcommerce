import { useEffect, useState } from "react";
import ProductItemCard from "../productItemCard/ProductItemCard";

const Products = ({ onCountProductsCart, onAddProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3001/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <ProductItemCard
              title={product.title}
              price={product.price}
              imgUrl={product.imgUrl}
              stock={product.stock}
              onCountProductsCart={onCountProductsCart}
              onAddProduct={onAddProduct}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
