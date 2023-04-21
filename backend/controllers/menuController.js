import asyncHandler from 'express-async-handler'
import Restaurant from '../models/restaurantModel.js'
import Menu from '../models/menuModel.js'

const addMenuItem = asyncHandler(async (req, res) => {
    const { item, description, price, image } = req.body

    const restaurant = await Restaurant.findById(req.params.id)

    if (restaurant) {
        const menu = await Menu.create({
            restaurant, item, description, price, image
        })
        if (menu) {
            res.status(201).json(menu)
        } else {
            res.status(400)
            throw new Error("Invalid menu data")
        }
    } else {
        res.status(400)
        throw new Error('Restaurant not found')
    }
})

const deleteMenuItem = asyncHandler(async (req, res) => {
    const menu = await Menu.findById(req.params.id)

    if (menu) {
        await menu.deleteOne(menu)
        res.json(req.params.id)  
    } else {
        res.status(404)
        throw new Error('Menu not found')
    }
})

const getMenuItems = asyncHandler(async (req, res) => {
    const items = await Menu.find({restaurant: req.params.id})

    if (items) {
        res.status(200).json(items)
    } else {
        res.status(400)
        throw new Error('Items not found')
    }
})

const updateMenuItem = asyncHandler(async (req, res) => {
    const item = await Menu.findById(req.params.id)

    if (item) {
        item.item = req.body.item || item.item
        item.description = req.body.description || item.description
        item.price = req.body.price || item.price
        item.image = req.body.image || item.image
    

    const updateItem = await item.save()

    if (updateItem) {
        res.status(201).json(updateItem)
    } else {
        res.status(400)
        throw new Error("Invalid item data")
    }

    } else {
        res.status(404)
        throw new Error('Item not found')
    }
})

export {
    addMenuItem,
    getMenuItems,
    deleteMenuItem,
    updateMenuItem
}