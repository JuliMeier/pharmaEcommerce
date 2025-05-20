import { Product } from "../models/Product.js";


export const findProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

export const findProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product)
        return res.status(404).send({ message: "Producto no encontrado" });

    res.send(product);
}

export const createProduct = async (req, res) => {
    const { id,
        catId,
        title,
        price,
        stock,
        available,
        imageUrl,
        favorite, } = req.body;


    if (!title || !price)
        return res.status(400).send({ message: "Título y precio son campos requeridos" });

    const newProduct = await Product.create({
        id,
        catId,
        title,
        price,
        stock,
        available,
        imageUrl,
        favorite,
    });

    res.send(newProduct)
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        catId,
        title,
        price,
        stock,
        available,
        imageUrl,
        favorite, } = req.body;


    if (!title || !price)
        return res.status(400).send("Título y precio son campos requeridos");

    // Find the Product
    const product = await Product.findByPk(id);

    if (!product)
        return res.status(404).send({ message: "Producto no encontrado" });

    // Update it
    await product.update({
        id,
        catId,
        title,
        price,
        stock,
        available,
        imageUrl,
        favorite,
    });

    await product.save();

    res.send(product);

};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product)
        return res.status(404).send({ message: "Producto no encontrado" });

    await product.destroy();

    res.send(`Producto con id: ${id} eliminado`);
}