import { Order } from "../models/Order.js";
import { OrderDetail } from "../models/OrderDetail.js";
import { Product } from "../models/Product.js";
import { OrderStatus } from "../models/OrderStatus.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        OrderStatus,
        {
          model: OrderDetail,
          include: Product,
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        OrderStatus,
        {
          model: OrderDetail,
          include: Product,
        },
      ],
    });
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, statusId, total, items } = req.body;
    const order = await Order.create({ userId, statusId, total });
    for (const item of items) {
      const product = await Product.findByPk(item.productId)

      if(!product || product.stock < item.quantity){
        return res.status(400).json({error: `Stock insuficiente para el product: ${product ? product.title : item.productId}`})
      }

      await OrderDetail.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      });
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({ message: "Pedido creado", orderId: order.id });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el pedido" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
    await order.destroy();
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { statusId } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
    await order.update({ statusId });
    res.json({ message: "Estado del pedido actualizado", order });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado del pedido" });
  }
}
