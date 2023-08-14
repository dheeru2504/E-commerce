import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { updateProductController } from "../controllers/productController.js";

//route object
const router = express.Router();

//routing
//Register || METHOD->POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forget password
router.post("/forgot-password", forgetPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user routes auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin routes auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//upDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrderController);

//orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

//order startus update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
