import express from 'express'
import { getRestaurant, getRestaurants } from '../controllers/orderController.js'

const router = express.Router()

router
    .route('/')
    .get(getRestaurants)

router
    .route('/:id')
    .get(getRestaurant)

export default router