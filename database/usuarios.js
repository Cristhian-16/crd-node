import mongoose from 'mongoose'
import 'dotenv/config'

const db = process.env.MONGO_CNN

export const connectDB = async () => {
  try {
    await mongoose.connect(db)
    console.log('Servidor Conectado')
  } catch (error) {
    throw new Error(error.message)
  }
}
