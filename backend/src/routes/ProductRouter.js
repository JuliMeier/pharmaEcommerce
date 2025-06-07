import { Router } from 'express'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'

const router = Router()

router.get('/', getProducts) 
router.get('/:id', getProductById)
router.post('/', authenticate, authorizeAdmin, createProduct)
router.put('/:id', authenticate, authorizeAdmin, updateProduct)
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct)


export default router;