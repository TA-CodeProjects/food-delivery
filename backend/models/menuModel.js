import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'Restaurant'
        },
        item: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String
        }
    }
)

menuSchema.set('toJSON', {
    virtuals: true
});

const Menu = mongoose.model('Menu', menuSchema)

export default Menu