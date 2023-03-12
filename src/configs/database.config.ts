import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  driver: String(process.env.DB_DRIVER || "mysql"),
  host: String(process.env.DB_HOST || "127.0.0.1"),
  port: Number(process.env.DB_PORT || 3306),
  name: String(process.env.DB_DATABASE || "my_db"),
  username: String(process.env.DB_USERNAME || "root"),
  password: String(process.env.DB_PASSWORD || "toor"),
  timezone: String(process.env.DB_TIMEZONE || process.env.TZ || "+07:00"),
  ...((process.env.DATABASE_URL || process.env.DB_URI) && {
    uri: String(process.env.DB_URI || process.env.DATABASE_URL),
  }),
}));
