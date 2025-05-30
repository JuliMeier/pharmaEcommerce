import { DataTypes} from 'sequelize'
import { db } from '../config/db.js'

export const Order = db.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: DataTypes.FLOAT,
    allowNull: false,
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});