import asyncHandler from 'express-async-handler'
import { ROLE } from '../_helpers/role.js'
import User from '../models/userModel.js'
import Restaurant from '../models/restaurantModel.js'

const addRestaurant = asyncHandler(async (req, res) => {
    const { name } = req.body
    const userToUpdate = await User.findById(req.user.id)

    if (await Restaurant.exists({ name })) {
        res.status(400)
        throw new Error('Restaurant already exists')
    }

    const role = ROLE.Restaurant


    if (userToUpdate) {
        userToUpdate.role = role
        const user = await userToUpdate.save()

        const restaurant = await Restaurant.create({
            user,
            name
        })
        if (restaurant) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                restaurant: restaurant.name
            })
        } else {
            res.status(400)
            throw new Error('Invalid restaurant data')
        }
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getRestaurant = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find({ user: req.user.id })

    res.status(200).json(restaurants)
})

const deleteRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)

    if (restaurant) {
        await restaurant.deleteOne(restaurant)
        res.json(req.params.id)
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
})

export {
    addRestaurant,
    getRestaurant,
    deleteRestaurant,
}