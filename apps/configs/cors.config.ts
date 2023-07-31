import { registerAs } from "@nestjs/config";

export default registerAs("cors", () => ({
	origin: process.env.CORS_ORIGIN || "*",
	methods: process.env.CORS_METHOD || "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: process.env.CORS_ALLOWED_HEADERS || "*",
	preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE == "true" || false,
	optionsSuccessStatus: Number(process.env.CORS_SUCCESS_STATUS) || 204,
	exposedHeaders: process.env.CORS_EXPOSED_HEADERS || "*",
	credentials: process.env.CORS_CREDENTIALS == "true" || true,
	maxAge: Number(process.env.CORS_MAX_AGE) || 600,
}));
