import mongoose from 'mongoose'

import ClientSchema from './client.js'
import ItemSchema from './item.js'

const orderSchema = new mongoose.Schema({
    client: {
        type: ClientSchema,
        required: true,
    },
    items: [
        {
            type: ItemSchema,
            required: true,
        }
    ],
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'PAID', 'CANCELLED'],
        default: "IN_PROGRESS",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

export default mongoose.model('Order', orderSchema, 'Orders')