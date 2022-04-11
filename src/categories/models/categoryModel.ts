import { db } from "../../database/db";
import { DataTypes } from 'sequelize'


export const CategoryModel = db.define("category", {
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
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
})
// CategoryModel.belongsTo(product, {
//   constraint: true,
//   foreignKey: "category_id",
// });
