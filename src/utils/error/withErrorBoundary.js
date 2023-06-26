/**
 * Wrap an endpoint with try-catch closure in order to redirect the error to express
 * error-handler.
 */
export default function withErrorBoundary(endpoint) {
	return async function wrapper(request, response, next) {
		try {
			await endpoint(request, response, next);
		}
		catch (error) {
			next(error);
		}
	};
}
