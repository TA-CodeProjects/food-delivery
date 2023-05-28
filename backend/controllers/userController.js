import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Restaurant from '../models/restaurantModel.js'
import generateToken from '../utils/jwt.js'
import { ROLE } from '../_helpers/role.js'

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (await User.exists({ email })) {
        res.status(400)
        throw new Error('User already exists')
    }
    const role = ROLE.Client

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})



const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.deleteOne(user)
        res.json(req.params.id)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    loginUser,
    registerUser,
    getUser,
    updateUser,
    getUsers,
    deleteUser
}