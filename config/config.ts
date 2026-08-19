import dotenv, { config } from "dotenv";
config();

export const envConfig = {
  port: process.env.PORT,
  connectionString: process.env.ConnectionString,
  Email: process.env.Email,
  jwt_expires_in: process.env.jwt_expires_in,
  jwtSecretkey: process.env.JWT_SECRET || "default-secret",
  Password: process.env.Email_PASSWORD,
  adminEmail: process.env.ADMIN_EMAIL,
  adminUsername: process.env.ADMIN_USERNAME,
  adminPassword: process.env.ADMIN_PASSWORD,
};
