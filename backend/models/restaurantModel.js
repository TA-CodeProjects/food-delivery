import mongoose from 'mongoose'
import menuSchema from './menuModel.js';

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
    },
    {
        timestamps: true,
    }
)


restaurantSchema.set('toJSON', {
    virtuals: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant