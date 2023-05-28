import mongoose from 'mongoose'
import Menu from './menuModel.js';

const restaurantSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        deliveryTime: {
            type: String,
            required: true,
        },
        deliveryCost: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)


restaurantSchema.pre('deleteOne', { document: true }, async function (next) {
    await Menu.deleteMany({ restaurant: this._id })
    next()
})

restaurantSchema.set('toJSON', {
    virtuals: true
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant