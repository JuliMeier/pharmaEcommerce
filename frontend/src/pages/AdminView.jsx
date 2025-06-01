import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { ProductsAdmin} from '../components/admin/ProductsAdmin';
import { CategoriesAdmin } from "../components/admin/CategoriesAdmin";
import { OrdersAdmin } from "../components/admin/OrdersAdmin";
import { UsersAdmin } from "../components/admin/UsersAdmin";

export const AdminView = () => {
  const [activeTab, setActiveTab] = useState("products");


  return (
    <>
      <h3 className="text-center">Sistema de Administración</h3>
      <Nav className="justify-content-center" activeKey={activeTab} onSelect={setActiveTab}>
        <Nav.Item>
          <Nav.Link eventKey="products">Productos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="categories">Categorías</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="orders">Ordenes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="users" >
            Usuarios
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-4">
        {activeTab === "products" && <ProductsAdmin />}
        {activeTab === "categories" && <CategoriesAdmin />}
        {activeTab === "orders" && <OrdersAdmin />}
        {activeTab === "users" && <UsersAdmin />}
      </div>
    </>
  );
};
