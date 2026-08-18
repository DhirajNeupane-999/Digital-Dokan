import Sequelize from "sequelize";
import sequelize from "../connection";

const { DataTypes } = Sequelize as any;

class categoryModel extends (Sequelize as any).Model {
    declare id: string;
    declare CategoryName: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

categoryModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true,
    }
);

export default categoryModel;

