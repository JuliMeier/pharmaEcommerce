import { DataTypes} from 'sequelize'
import { db } from '../config/db.js'

export const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }, 
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    imgUrl: DataTypes.STRING,
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
});