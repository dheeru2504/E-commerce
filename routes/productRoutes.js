import express from "express";
import multer from "multer";


import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// import formidable from "express-formidable";
import {
  bulkUploadProducts,
  // brainTreePaymentController,
  // braintreeTokenController,
  createOrderController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductControllerAdmin,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  verifyPaymentController,
} from "../controllers/productController.js";

const router = express.Router();
// Multer configuration
// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
// adjust destination as needed

//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.single('photo'),
  createProductController
);
//bulk upload products
router.post("/bulk-create-product", requireSignIn,
  isAdmin, upload.single("file"), bulkUploadProducts);
//Update profduct route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  upload.single('photo'),
  updateProductController
);

//get products
router.get("/get-product", getProductController);
//get products for Admin
router.get("/get-product-admin", getProductControllerAdmin);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
// router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", requireSignIn,
  isAdmin, deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
// router.get("/braintree/token", braintreeTokenController);

//payments
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//create order for razor pay
router.post("/create-order", requireSignIn, createOrderController);
//verify payment
router.post("/verify-payment", requireSignIn, verifyPaymentController);

export default router;
