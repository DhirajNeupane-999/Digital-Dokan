import Sequelize from 'sequelize';
import sequelize from '../connection';

const { DataTypes } = Sequelize as any;

class Product extends (Sequelize as any).Model {
    declare id: string;
    declare productName: string;
    declare productDescription: string;
    declare productPrice: number;
    declare productStock: number;
    declare discountPrice: number;
    declare email: string;
    declare role: string;
    declare productImageUrl: string;
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        productStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        discountPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('customer', 'admin'),
            defaultValue: 'customer',
        },
        productImageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: true,
    }
);

export default Product;

