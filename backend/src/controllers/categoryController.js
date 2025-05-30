import { Category } from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener las categorías",
        });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener la categoría",
        });
        
    }
}

export const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Falta el nombre de la categoría" });
        }
        const category = await Category.create({ title});
        res.status(201).json({message: "Categoría creada exitosamente", category });
    } catch (error) {
        res.status(500).json({
            error: "Error al crear la categoría",
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        const { title } = req.body;
        await category.update({ title });
        res.json({ message: "Categoría actualizada exitosamente", category });
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la categoría",
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        await category.destroy();
        res.json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar la categoría",
        });
        
    }
}