import { DataTypes} from 'sequelize'
import { db } from '../config/db.js'


export const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: DataTypes.STRING,
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
})