import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { ROLE } from '../_helpers/role.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decode = jwt.verify(token, process.env.JWT_KEY)

            req.user = await User.findById(decode.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const restaurant = (req, res, next) => {
    if (req.user && req.user.role === ROLE.Restaurant) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized, as restaurant')
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.role === ROLE.Admin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized, as admin')
    }
}

export { protect, restaurant, admin }