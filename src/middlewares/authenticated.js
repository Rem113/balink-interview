import jwt from 'jsonwebtoken'

import User from "../models/user.js"

export default async (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization || authorization.length === 0)
        return res.status(401).json({message: 'Authorization header is required'})

    if (!authorization.startsWith("Bearer "))
        return res.status(401).json({message: 'Authorization header is invalid'})

    const token = authorization.substring('Bearer '.length)

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id)

        if (!user) return res.status(401).end('Unknown user')

        req.user = user
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') return res.status(403).end('Token expired')
        else if (error.name === 'JsonWebTokenError') return res.status(401).end('Invalid signature')
        else return res.status(500).end('An error has occurred while authorizing the request')
    }
}