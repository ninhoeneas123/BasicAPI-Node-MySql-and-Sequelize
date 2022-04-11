import { db } from "../../database/db";
import { DataTypes } from "sequelize";

export const ProductModel = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  value: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});
// ProductModel.belongsTo(category, {
//   constraint: true,
//   foreignKey: "category_id",
// });
