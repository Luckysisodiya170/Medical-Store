import User from "../models/User.js";
import Medicine from "../models/Medicine.js";
import Order from "../models/Order.js";
import { Op } from "sequelize";

export const dashboardSummary = async (req, res) => {
  try {
    const customerCount = await User.count();

    const medicineCount = await Medicine.count();

    const orderCount = await Order.count();

    const lowStockCount = await Medicine.count({
      where: {
        stock: {
          [Op.lte]: 10 // threshold for low stock
        }
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        customers: customerCount,
        medicines: medicineCount,
        orders: orderCount,
        lowStockMedicines: lowStockCount
      }
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
