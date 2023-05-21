import asyncHandler from 'express-async-handler'
import Stripe from "stripe";
import Restaurant from '../models/restaurantModel.js';
import Menu from '../models/menuModel.js';



const createCheckout = asyncHandler(async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const restaurant = await Restaurant.findById(req.body.restaurantId)
    if (!restaurant) {
        res.status(400)
        throw new Error('Restaurant not found')
    }
    const line_items = await Promise.all(req.body.itemsData.map( async item => {
        const storeItem = await Menu.findById(item.id)
        return {
            price_data: {
                currency: "ils",
                product_data: {
                    name: storeItem.item,
                },
                unit_amount: storeItem.price * 100
            },
            quantity: item.quantity
        }
    }));
    line_items.push({
        price_data: {
            currency: "ils",
            product_data: {
                name: 'Delivery Cost',
            },
            unit_amount: restaurant.deliveryCost * 100
        },
        quantity: 1
    })
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
           mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/order/success`,
            cancel_url: `${process.env.FRONTEND_URL}/order/cancel`,
        })
        console.log(session.id);
        res.json({ id: session.id });
    } catch(err) {
        console.log(err.message);
    }
})

export {
    createCheckout
}