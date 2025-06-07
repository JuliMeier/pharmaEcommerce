import { Router } from 'express'
import { getOrders, getOrderById, createOrder, deleteOrder, updateOrderStatus } from '../controllers/orderController.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'

const router = Router()

router.get('/', authenticate, authenticate, getOrders)
router.get('/:id', authenticate, getOrderById)
router.post('/',authenticate, createOrder)
router.delete('/:id', authenticate, authorizeAdmin, deleteOrder)
router.put('/:id', authenticate, authorizeAdmin, updateOrderStatus)

export default router