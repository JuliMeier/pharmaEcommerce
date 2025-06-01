import { DataTypes} from 'sequelize'
import { db } from '../config/db.js'

export const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});