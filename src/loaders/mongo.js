import mongoose from 'mongoose'

export default async (url) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}