import productModel from "../models/productModel.js";
// import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import fs from "fs";
import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
import userModel from "../models/userModel.js";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import { get } from "http";
import { sendMail } from "./emailController.js";
import crypto from "crypto"
// import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;


dotenv.config();


// Multer configuration
// const upload = multer({ dest: 'uploads/' }); // adjust destination as needed


//payment gateway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY,
// });

//razor pay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createProductController = async (req, res) => {
  try {
    console.log("hello")
    const { name, description, price, category, quantity, shipping } =
      req.body;
 const img = req.file;
//  console.log(photo)
    let photo = '';
 
    
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !img :
        return res.status(500).send({ error: "Image is Required" });
    }

    // Check if an image was uploaded
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      photo = result.secure_url;
      // console.log(imageUrl)
  }
 
 

    const products = new productModel({ name, description,price,category,quantity,photo, slug: slugify(name) });
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      // .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALl Products ",
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      // .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.body;
    const  img  = req.file;
    let photo='';
    // console.log(photo)
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo:
        return res
          .status(500)
          .send({ error: "photo is Required" });
    }
    
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
     photo = result.secure_url;
      // console.log(imageUrl)
  }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { name, description,price,category,quantity,photo,shipping, slug: slugify(name) },
      { new: true }
    );
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    console.log(photo)
    await products.save();
    // console.log(products)
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      // .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      // .select("-photo");
    res.json(resutls);
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      // .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get products by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

// Endpoint to create an order
export const createOrderController = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // Amount in smallest currency unit, e.g., 100 paise = 1 INR
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
};

//verify payment,
export const verifyPaymentController = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature, cart } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature) {
      return res.status(400).json({ msg: 'Transaction not legit!' });
    }

    const order = await new orderModel({
      products: cart,
      payment: {
        id: razorpayPaymentId,
        order_id: razorpayOrderId,
        signature: razorpaySignature,
        success : true
      },
      buyer: req.user._id,
    }).save();

    res.json({ status: 'ok' });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying payment");
  }
};
//payment gateway api
//token
// export const braintreeTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
    //console.log(error);
//   }
// };

// //payment
// export const brainTreePaymentController = async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = cart.reduce((acc, item) => acc + item.price, 0);

//     gateway.transaction.sale({
//       amount: total.toFixed(2), // Ensure the amount is a string with two decimal places
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true,
//       },
//     }, async (error, result) => {
//       if (error) {
//         return res.status(500).json({ message: "Transaction error", error });
//       }
//       if (result.success) {
//         const order = await new orderModel({
//           products: cart,
//           payment: result,
//           buyer: req.user._id,
//         }).save();

//         const buyer = await userModel.findById(order.buyer);
//         if (!buyer) {
//           return res.status(404).json({ message: "Buyer not found" });
//         }

//         const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//         const buyerEmail = buyer.email;
//         const subject = `Your Order Confirmation - ${order._id}`;
//         const html = `
//           <p>Dear ${buyer.name},</p>
          
//           <p>Thank you for shopping with us! We're excited to let you know that your order ${order._id} has been successfully placed and is now being processed. Here are the details of your purchase:</p>
          
//           <h3>Order Date: ${date}</h3>
//           <p>Your order will be shipped to the address provided as soon as it is ready. You will receive a shipping confirmation email with a tracking number so you can monitor the delivery status of your order.</p>
          
//           <p>If you need to make any changes to your order or if you have any questions, please contact us at hsqauredecor@gmail.com.</p>
          
//           <p>Thank you for shopping with us.</p>
          
//           <p>Best regards,<br>
//           H Square Decor<br>
//           Customer Support<br>
//           hsqauredecor@gmail.com</p>
//           `;

//         await sendMail(buyerEmail, subject, "", html); // Assuming sendMail is correctly implemented elsewhere
//         res.json({ ok: true });
//       } else {
//         res.status(500).json({ message: "Transaction failed", result });
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

