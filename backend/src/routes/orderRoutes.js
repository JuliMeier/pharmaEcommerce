import { Router } from 'express'
import { getOrders, getOrderById, createOrder, deleteOrder, updateOrderStatus } from '../controllers/orderController.js'
import { getOrdersByUserId } from '../controllers/orderController.js';



const router = Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.delete('/:id', deleteOrder)
router.put('/:id', updateOrderStatus)
router.get('/history/:userId', getOrdersByUserId);

export default router