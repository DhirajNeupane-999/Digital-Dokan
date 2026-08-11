import { Sequelize } from 'sequelize';

const connectionString = process.env.DATABASE_URL ?? "postgres://postgres:password@localhost:5432/postgres";

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;