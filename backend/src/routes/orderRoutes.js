import { Router } from 'express'
import { getOrders, getOrderById, createOrder, deleteOrder, updateOrderStatus, getOrdersByUserId } from '../controllers/orderController.js'
import { authenticate } from '../middleware/authenticate.js'
import { authorizeAdmin } from '../middleware/authorizeAdmin.js'

const router = Router()


router.get('/', authenticate, authorizeAdmin, getOrders)
router.get('/:id', authenticate, authorizeAdmin getOrderById)
router.post('/', authenticate, createOrder)
router.delete('/:id', authenticate, authorizeAdmin, deleteOrder)
router.put('/:id', authenticate, authorizeAdmin, updateOrderStatus)
router.get('/history/:userId', getOrdersByUserId);


export default router