import userRouter from '../routes/user.js'
import orderRouter from '../routes/order.js'
import BadRequestException from '../utils/error/BadRequestException.js'

export default (app) => {
    app.use('/api/users', userRouter)
    app.use('/api/orders', orderRouter)
	
	// --- Error handler ---
	app.use((error, _, response, __) => {
		console.error(error);

		if (error instanceof BadRequestException)
			response.status(400);
		else
			response.status(500);

		response.send(error.message);
	});
}