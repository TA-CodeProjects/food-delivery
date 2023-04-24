import mongoose from 'mongoose'

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


restaurantSchema.set('toJSON', {
    virtuals: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant