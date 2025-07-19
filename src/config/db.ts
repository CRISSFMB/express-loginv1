import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to MongoDB:", connection.connection.host)
        console.log("READY DB")

    } catch (error) {
        console.log(error.message)
        process.exit(1) // cierra el proceso con falla
    }
}