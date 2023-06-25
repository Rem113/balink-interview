import Order from '../models/order.js'

export default {
    create: async order => await Order.create(order),
    findById: async orderId => await Order.findOne({_id: orderId}),
    findForUser: async (userId, filters) => {
        const page = filters?.page || 1
        const offset = filters?.offset || 0
        const fields = filters?.fields
        return await Order.find({createdBy: userId}, fields, { skip: offset * page, limit: 10 })
    },
    updateById: async (orderId, status) => await Order.updateOne({_id: orderId}, {status}),
    deleteById: async orderId => await Order.deleteOne({_id: orderId})
}