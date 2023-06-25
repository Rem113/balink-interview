import User from '../models/user.js'

export default {
    findByEmail: async (email) => await User.findOne({email}),
    create: async (user) => await User.create(user),
}