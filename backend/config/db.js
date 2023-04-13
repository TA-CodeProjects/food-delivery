import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default connectDB