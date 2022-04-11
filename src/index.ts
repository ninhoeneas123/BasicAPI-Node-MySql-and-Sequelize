import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./users/users-routes";
import authController from "./auth/auth-routes";
import swaggerUI from "swagger-ui-express";
import productsRouter from "./products/products-routes";
import { db } from "./database/db";
import { categoriesRoutes } from "./categories/categories-routes";
import { productRouter } from "./products/products-routes";

const app = express();

app.use(
  express.json(),
  userRouter,
  authController,
  productsRouter,
  categoriesRoutes,
  productRouter
);

app.listen(3000, async () => {
  console.log("Server running");
  await db.sync();
});
