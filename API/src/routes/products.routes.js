import { Router } from "express";

import {
    createProduct,
    deleteProduct,
    findProduct,
    findProducts,
    updateProduct
} from "../services/products.services.js";

const router = Router();

router.get("/products", findProducts);

router.get("/products/:id", findProduct);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);


export default router;