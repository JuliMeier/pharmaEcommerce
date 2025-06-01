import { User } from './User.js'
import { Role } from './Role.js'
import { Order } from './Order.js'
import { OrderStatus } from './OrderStatus.js'
import { OrderDetail } from './OrderDetail.js'
import { Product } from './Product.js'
import { Category } from './Category.js'



export const setupAssociations = () => {

    User.belongsTo(Role, {foreignKey: 'roleId', onDelete: 'CASCADE'})
    Role.hasMany(User, {foreignKey: 'roleId', onDelete: 'CASCADE'})

    Order.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'})
    User.hasMany(Order, {foreignKey: 'userId', onDelete: 'CASCADE'})

    Order.belongsTo(OrderStatus, {foreignKey: 'statusId', onDelete: 'CASCADE'})
    OrderStatus.hasMany(Order, {foreignKey: 'statusId', onDelete: 'CASCADE'})

    OrderDetail.belongsTo(Order, {foreignKey: 'orderId', onDelete: 'CASCADE'})
    Order.hasMany(OrderDetail, {foreignKey: 'orderId', onDelete: 'CASCADE'}) 

    OrderDetail.belongsTo(Product, {foreignKey: 'productId', onDelete: 'CASCADE'})
    Product.hasMany(OrderDetail, {foreignKey: 'productId', onDelete: 'CASCADE'})

    Product.belongsTo(Category, {foreignKey: 'categoryId', onDelete: 'CASCADE'})
    Category.hasMany(Product, {foreignKey: 'categoryId', onDelete: 'CASCADE'})


}



