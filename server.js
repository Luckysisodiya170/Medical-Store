import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Order from "./models/Order.js";
import OrderItem from "./models/OrderItem.js";
import orderRoutes from "./routes/orderRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js";


const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await Admin.create({
    name: "Super Admin",
    email: "admin@medical.com",
    password: hashedPassword
  });
  
  console.log("Admin created");
};

// createAdmin();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", authRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/admin", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);


Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

app.get("/", (req, res) => {
  res.status(200).send("Backend is running!");
});


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected");

    await sequelize.sync();
    console.log("Database Synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
})();
