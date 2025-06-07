import { useEffect, useState } from "react";
import ProductItemCard from "../productItemCard/ProductItemCard";
import { Modal, Button, Badge } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const Products = ({
  searchProduct,
  selectedCategory,
}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:4000/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(searchProduct.toLowerCase());
      
    const matchCategory = selectedCategory ? product.categoryId === selectedCategory : true;
    return matchTitle && matchCategory;
  });

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCartFromModal = () => {
    addToCart(selectedProduct);
    setShowModal(false);
  };

  const toogleFavorite = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, favorite: !product.favorite }
          : product
      )
    );
  };

  return (
    <>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4">
            <ProductItemCard
              title={product.title}
              price={product.price}
              imgUrl={product.imgUrl}
              stock={product.stock}
              description={product.description}
              favorite={product.favorite}
              onAddProduct={()=> addToCart(product)}
              onImageClick={() => handleImageClick(product)}
              onHandleFavorite={() => toogleFavorite(product.id)}
            />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              className="img-fluid"
            />
            <p><strong>Precio: </strong> ${selectedProduct.price} </p>
            <p><strong>Descripción: </strong> {selectedProduct.description}</p>
          </Modal.Body>
          <Modal.Footer>
            {selectedProduct.stock > 0 ? (
              <Button variant="success" onClick={handleAddToCartFromModal}>
                Agregar al carrito
              </Button>
            ) : (
              <Badge bg="danger">Sin stock</Badge>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Products;
