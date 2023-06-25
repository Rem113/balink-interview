import mongoose from 'mongoose'

export const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

export default itemSchema