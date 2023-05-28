import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Menu from './models/menuModel.js'

dotenv.config()

connectDB()


const getData = async () => {
    try {
        const deleteMenu = await Menu.deleteMany({restaurant: "646df3fc9490de419d26eb57"})
        const menu = await Menu.find()
        console.log(menu);
        process.exit(1)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
    
}


getData()
