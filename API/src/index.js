import express from 'express';
import "dotenv/config"
import {PORT} from './config.js';
import { sequelize } from './db.js';
import "./models/Product.js";
import productsRoutes from './routes/products.routes.js';

const app = express();

try {
app.use(express.json());
app.listen(PORT);
app.use(productsRoutes)

await sequelize.sync();
console.log(`Server listening on port ${PORT}`);
} catch (error) {

console.log(`There was an error on initialization:`);
}