import express from 'express'
import { addOrderItems, getMyOrders, updateOrderToDelivered, updateOrderToPaid, getOrderById, getOrders } from './order/orderAction';
import { authenticateToken } from '../middleware/authToken';

const orderRoutes = express.Router()

orderRoutes.route('/').post(authenticateToken, addOrderItems).get(authenticateToken, getOrders);
orderRoutes.route('/mine').get(authenticateToken, getMyOrders);
orderRoutes.route('/:id').get(authenticateToken, getOrderById);
orderRoutes.route('/:id/pay').put(authenticateToken, updateOrderToPaid);
orderRoutes.route('/:id/deliver').put(authenticateToken, updateOrderToDelivered);

export default orderRoutes