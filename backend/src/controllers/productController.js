import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: Category,
    });
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      stock,
      available,
      description,
      imgUrl,
      favorite,
      categoryId,
    } = req.body;
    if (!title || !price) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const product = await Product.create({
      title,
      price,
      stock,
      available,
      description,
      imgUrl,
      favorite,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el producto",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      stock,
      available,
      description,
      imgUrl,
      favorite,
      categoryId,
    } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    await product.update({
      title,
      price,
      stock,
      available,
      description,
      imgUrl,
      favorite,
      categoryId,
    });
    res.json(product);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    await product.destroy();
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el producto",
    });
  }
};
