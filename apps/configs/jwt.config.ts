import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
	secret: process.env.JWT_SECRET || "JWTS3CR3T",
	expires: process.env.JWT_EXPIRES || "1d",
}));
