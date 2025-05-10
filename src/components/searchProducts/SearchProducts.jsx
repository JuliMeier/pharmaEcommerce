import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchProducts.css";
import { DropdownDivider } from "react-bootstrap";

function SearchProducts({ onSearch, onCategorySelect }) {
  return (
    <>
      <div className="mx-4">
        <InputGroup className="mb-3 mt-3">
          <DropdownButton
            variant="outline-secondary"
            title="Categorias"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={() => onCategorySelect(1)}>
              Cuidado Personal
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(2)}>
              Cuidados Generales
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(3)}>
              Maquillaje
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(4)}>
              Perfume
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(5)}>
              Accesorios
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(6)}>
              Mundo Bebé
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onCategorySelect(7)}>
              Regaleria
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item onClick={() => onCategorySelect(null)}>
              Todos los Productos
            </Dropdown.Item>
          </DropdownButton>
          <Form.Control
            onChange={(e) => onSearch(e.target.value)}
            className="placeholder-italic"
            aria-label=""
            placeholder="Buscar por nombre producto o marca"
          />
        </InputGroup>
      </div>
    </>
  );
}

export default SearchProducts;
