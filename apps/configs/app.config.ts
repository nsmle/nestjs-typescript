import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
	name: process.env.APP_NAME || "NestJs Typescript Template",
	env: process.env.APP_ENV || "local",
	key: process.env.APP_KEY || null,
	debug: process.env.APP_ENV || true,
	host: process.env.APP_HOST || "http://localhost",
	port: process.env.APP_PORT || 5000,
	url: process.env.APP_URL || `http://localhost:5000`,
	version: process.env.APP_VERSION || "v1",
}));
