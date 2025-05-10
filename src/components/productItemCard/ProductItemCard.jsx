import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { FaHeart, FaRegHeart} from "react-icons/fa"

const ProductItemCard = ({
  title,
  price,
  imgUrl,
  stock,
  favorite,
  onCountProductsCart,
  onAddProduct,
  onImageClick,
  onHandleFavorite
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => {
    onCountProductsCart();
    setShowToast(true);
    onAddProduct({title, price, imgUrl, stock })
    
  };

  return (
    <>
      <div className="col-md-4">
        <Card style={{ width: "22rem" }} className="mx-3">
          <div className="d-flex justify-content-end mt-2 me-2" onClick={onHandleFavorite} style={{cursor: "pointer"}} >
          {favorite ? <FaHeart /> : <FaRegHeart />} 
          </div>
          <Card.Img height={400} variant="top" src={imgUrl} onClick={onImageClick} style={{cursor: "pointer"}} />
          <Card.Body>
            <Card.Title className="text-center">{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">
              ${price}
            </Card.Subtitle>

            <div className="d-grid gap-2">
              <Button
                variant={stock > 0 ? "success" : "secondary"}
                size="lg"
                disabled={stock <= 0}
                onClick={handleButtonClick}
              >
                {stock > 0 ? "Agregar al carrito" : "Sin stock"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          delay={1500}
          autohide
        >
          <Toast.Body className="text-white">Producto agregado</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductItemCard;
