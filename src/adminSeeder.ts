import bcrypt from "bcrypt";
import { envConfig } from "../config/config";
import User from "./Database/models/userModel";

const adminSeeder = async () => {
  if (!envConfig.adminEmail || !envConfig.adminUsername || !envConfig.adminPassword) {
    console.warn("Admin seeder skipped: ADMIN_EMAIL, ADMIN_USERNAME, or ADMIN_PASSWORD is missing.");
    return;
  }

  const existingUser = await User.findOne({
    where: {
      email: envConfig.adminEmail,
    },
  });

  if (!existingUser) {
    await User.create({
      username: envConfig.adminUsername,
      password: bcrypt.hashSync(envConfig.adminPassword as string, 8),
      email: envConfig.adminEmail,
      role: "admin",
    });

    console.log("Admin user seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

export default adminSeeder;
