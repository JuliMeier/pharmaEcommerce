import { DataTypes } from 'sequelize'
import { db } from '../config/db.js'

export const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'Roles',
});