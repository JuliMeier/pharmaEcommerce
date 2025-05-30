import { DataTypes} from 'sequelize'
import { db } from '../config/db.js'

export const OrderStatus = db.define('OrderStatus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
});