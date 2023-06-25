import OrderService from "../services/order.js";

const validateOrder = ({ client, items }) => {
    const errors = {}

    if (!client) errors.client = 'Client is required'

    else if (!client.name || client.name.trim().length === 0
        || !client.email || client.email.length === 0) {
        errors.client = 'Client name and email are required'
    }

    return errors
}

export default {
    create: async (req, res) => {
        const { client, items } = req.body
        const { user } = req

        const errors = validateOrder({ client, items })

        if (Object.keys(errors).length > 0) return res.status(400).json({ errors })

        try {
            console.log('Creating order for user:', user.id)
            const order = await OrderService.create({ client, items, user })
            return res.status(201).json(order)
        } catch (error) {
            console.error('Failed to create an order for user:', user.id)
            return res.status(500).json({ message: error.message })
        }
    },
    getById: async (req, res) => {
        const { user } = req
        const { id } = req.params

        try {
            const order = await OrderService.getById(id, user.id)

            if (!order) return res.status(404).json({ message: 'Order not found' })

            if (order.createdBy.toString() !== user.id) return res.status(403).json({ message: 'Forbidden' })

            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    getAll: async (req, res) => {
        const { user } = req
        const filters = req.query

        try {
            const orders = await OrderService.getAll(user.id, filters)
            return res.status(200).json(orders)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateById: async (req, res) => {
        const { user } = req
        const { id } = req.params
        const { status } = req.body

        if (!status) return res.status(400).json({ message: 'Status is required' })

        try {
            const order = await OrderService.updateById(id, user.id, status)

            if (!order) return res.status(404).json({ message: 'Order not found' })
            return res.status(200).json(order)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteById: async (req, res) => {
        const { user } = req
        const { id } = req.params

        try {
            const order = await OrderService.deleteById(id, user.id)

            if (!order) return res.status(404).json({ message: 'Order not found' })
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}