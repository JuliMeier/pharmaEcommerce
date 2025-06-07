import { Router } from 'express'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'

const router = Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/',authenticate, authorizeAdmin, createCategory)
router.put('/:id', authenticate, authorizeAdmin, updateCategory)
router.delete('/:id',authenticate, authorizeAdmin, deleteCategory)

export default router;