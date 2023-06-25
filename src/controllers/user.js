import UserService from '../services/user.js'

const validateUserParams = (email, password) => {
    const errors = {}

    if (!email || email.trim().length === 0) {
        errors.email = 'Email required'
    }

    if (!password || password.trim().length === 0) {
        errors.password = 'Password required'
    }

    return errors
}

export default {
    register: async (req, res) => {
        const { email, password } = req.body

        const errors = validateUserParams(email, password)

        if (errors.email) return res.status(400).json({ error: errors.email })
        if (errors.password) return res.status(400).json({ error: errors.password })

        try {
            console.log("Creating new user with email:", email)
            const newUser = await UserService.register({ email, password })
            return res.status(201).json(newUser)
        } catch (error) {
            console.error("Could not create new user, reason:", error.message)
            return res.status(500).json({ error: 'Could not create new user' })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body

        const errors = validateUserParams(email, password)

        if (errors.email) return res.status(400).json({ error: errors.email })
        if (errors.password) return res.status(400).json({ error: errors.password })

        console.log("Logging in user with email:", email)

        try {
            const token = await UserService.login({ email, password })
            return res.status(200).json({ token })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}