import Sequelize from "sequelize";
import sequelize from "../connection";

const { DataTypes } = Sequelize as any;

class User extends (Sequelize as any).Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
