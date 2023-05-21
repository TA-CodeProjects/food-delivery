import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'
import Menu from '../models/menuModel.js'

const getRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find()

    res.json(restaurants)
})

const getRestaurant = asyncHandler(async (req,res) => {
    const restaurant = await Restaurant.findById(req.params.id)

    if (restaurant) {
        const menus = await Menu.find({restaurant: restaurant.id})

        if (menus) {
            res.json({
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                deliveryTime: restaurant.deliveryTime,
                deliveryCost: restaurant.deliveryCost,
                image: restaurant.image,
                menus: menus
            })
        } else {
            res.status(400)
            throw new Error("Menu not found")
        }
    } else {
        res.status(400)
        throw new Error("Restaurant not found")
    }
})

export {
    getRestaurants,
    getRestaurant
}