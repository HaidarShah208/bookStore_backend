import express from 'express';
import { getAllOrders, getOrders, placeOrder, updateOrder } from '../controllers/order.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post('/orderNow',isAuthenticated,placeOrder)
router.get('/getOrders',isAuthenticated,getOrders)
router.get('/getAllOrders',isAuthenticated,getAllOrders)
router.put('/updateOrders/:id',isAuthenticated,updateOrder)

export default router;