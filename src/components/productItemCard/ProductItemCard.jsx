import React, { useState } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";

const ProductItemCard = ({
  title,
  price,
  imgUrl,
  stock,
  onCountProductsCart,
  onAddProduct
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
          <Card.Img height={400} variant="top" src={imgUrl} />
          <Card.Body>
            <Card.Title className="text-center">{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">
              {price}
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
