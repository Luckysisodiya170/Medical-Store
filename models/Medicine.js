import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Medicine = sequelize.define(
  "Medicine",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    manufacturer: { type: DataTypes.STRING },
    mfg_date: { type: DataTypes.DATE },
    expiry_date: { type: DataTypes.DATE },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: "medicines" }
);

export default Medicine;
