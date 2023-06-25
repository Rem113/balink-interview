import UserService from '../services/user.js'
import BadRequestException from '../utils/error/BadRequestException.js'
import withErrorBoundary from '../utils/error/withErrorBoundary.js';

// When we open the file, we need to look at the main module of the file at the 1st glance.
// Utilitaries like your validateUserParams() function can be found below the main module.


export default {
	register: withErrorBoundary(async ({ email, password }, response) => {
		validateUserParams(email, password);

		console.log("Creating new user with email:", email)
		const newUser = await UserService.register({ email, password });

		return response.status(201)
			.json(newUser);
	}),

	login: withErrorBoundary(async ({ email, password }) => {
		validateUserParams(email, password);

		console.log("Logging in user with email:", email);
		const token = await UserService.login({ email, password });
		return res.status(200).json({ token });
	}),
}


// ---- Utils ----

function validateUserParams(email, password) {
	if (!email?.trim())
		throw new BadRequestException("Email required");

	if (!password?.trim())
		throw new BadRequestException("'Password required'");
}
