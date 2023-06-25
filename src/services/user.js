import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import UserRepository from '../repositories/user.js'

export default {
    register: async ({ email, password }) => {
        const user = await UserRepository.findByEmail(email)

        if (user) throw new Error('User already exists')

        const hashedPassword = await argon2.hash(password)

        const newUser = {
            email,
            password: hashedPassword
        }

        return await UserRepository.create(newUser)
    },
    login: async ({ email, password }) => {
        const user = await UserRepository.findByEmail(email)

        if (!user) throw new Error('User does not exist')

        const correctPassword = await argon2.verify(user.password, password)

        if (!correctPassword) throw new Error('Incorrect password')

        return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    }
}