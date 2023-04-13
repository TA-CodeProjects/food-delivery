import express from 'express'
import { deleteUser, getUser, getUsers, loginUser, registerUser, updateUser } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)
    
router.route('/:id')
    .delete(protect, admin, deleteUser)

router.post('/login', loginUser)

router
    .route('/profile')
    .get(protect, getUser)
    .put(protect, updateUser)

export default router