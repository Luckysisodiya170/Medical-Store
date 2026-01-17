import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

/* ================= GET ALL ORDERS ================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: OrderItem,
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= GET ORDER BY ID ================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: OrderItem
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const order = await Order.create({ userId, totalAmount });

    const orderItems = items.map(item => ({
      ...item,
      orderId: order.id
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      success: true,
      message: "Order created",
      orderId: order.id
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = req.body.status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= DELETE ORDER ================= */
export const deleteOrder = async (req, res) => {
  try {
    await OrderItem.destroy({ where: { orderId: req.params.id } });
    await Order.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      success: true,
      message: "Order deleted"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
