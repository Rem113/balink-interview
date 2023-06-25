import OrderRepository from "../repositories/order.js"

const getItemPrice = async () => {
    // const response = await fetch("https://randommer.io/Number", {
    //     method: "POST",
    //     headers: {
    //         'X-Api-Key': process.env.PRICE_API_KEY
    //     }
    // })
    //
    // console.log(await response.text())
    //
    // return await response.text()

    return Math.random() * 10
}

export default {
    create: async ({client, items, user}) => {
        //if (!client.email.match(new RegExp("/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm")))
            //throw new Error('Invalid email')

        if (!items && items.length === 0) throw new Error('At least one item is required')

        if (items.some(item => !item.name || item.name.trim().length === 0))
            throw new Error('At least one item is missing a name')

        const price = (await Promise.all(items.map(_item => getItemPrice())))
            .reduce((accumulator, current) => accumulator + current, 0)

        const order = {client, items, price, createdBy: user.id}

        return await OrderRepository.create(order)
    },
    getById: async orderId => await OrderRepository.findById(orderId),
    getAll: async (userId, filters) => await OrderRepository.findForUser(userId, filters),
    updateById: async (orderId, userId, status) => {
        const order = await OrderRepository.findById(orderId)

        if (!order) return null

        if (order.createdBy.toString() !== userId) throw new Error('Forbidden')

        if (status === "PAID" && order.status !== "IN_PROGRESS") throw new Error('Invalid status')
        if (status === "CANCELED" && order.status !== "IN_PROGRESS") throw new Error('Invalid status')
        if (order.status === "PAID") throw new Error('Invalid status')
        if (order.status === "CANCELED" && status !== "IN_PROGRESS") throw new Error('Invalid status')

        return await OrderRepository.updateById(orderId, status)
    },
    deleteById: async (orderId, userId) => {
        const order = await OrderRepository.findById(orderId)

        if (!order) return null
        if (order.createdBy.toString() !== userId) throw new Error('Forbidden')

        return await OrderRepository.deleteById(orderId)
    }
}