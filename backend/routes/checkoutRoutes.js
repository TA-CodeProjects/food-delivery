import express from 'express'
import { createCheckout } from '../controllers/checkoutController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router
    .route('/')
    .post(protect, createCheckout)

export default router