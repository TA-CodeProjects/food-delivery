import express from 'express'
import { protect, restaurant } from '../middleware/authMiddleware.js'
import { addRestaurant, deleteRestaurant, getRestaurant } from '../controllers/restaurantController.js'
import { addMenuItem, deleteMenuItem, getMenuItems, updateMenuItem } from '../controllers/menuController.js'

const router = express.Router()


router
    .route('/')
    .post(protect, addRestaurant)
    .get(protect, restaurant, getRestaurant)

router
    .route('/:id')
    .delete(protect, restaurant, deleteRestaurant)
    .post(protect, restaurant, addMenuItem)
    .get(protect, restaurant, getMenuItems)

router
    .route('/menu/:id')
    .delete(protect, restaurant, deleteMenuItem)
    .put(protect, restaurant, updateMenuItem)


export default router