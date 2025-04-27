import { useEffect, useState } from "react";
import ProductItemCard from "../productItemCard/ProductItemCard";
import { Modal, Button, Badge } from 'react-bootstrap'

const Products = ({ onCountProductsCart, onAddProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3001/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    fetchData();
  }, []);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true)
    
  }

  const handleAddToCartFromModal = () => {
    onAddProduct(selectedProduct)
    onCountProductsCart()
    setShowModal(false)
  }

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
              onImageClick={()=> handleImageClick(product)}
            />
          </div>
        ))}
      </div>

      {
        selectedProduct && (
          <Modal show={showModal} onHide={()=> setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="img-fluid" />
              <p>Precio: ${selectedProduct.price} </p>
            </Modal.Body>
            <Modal.Footer>
              { selectedProduct.stock > 0 ? 
              <Button variant="success" onClick={handleAddToCartFromModal}>Agregar al carrito</Button>
            : <Badge bg="danger">Sin stock</Badge> }
              
            </Modal.Footer>
          </Modal>
        )
      }
    </>
  );
};

export default Products;
