import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

import { sendMail } from "./emailController.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, Security_Question } =
      req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!Security_Question) {
      return res.send({ message: "Answer is required" });
    }
    //check user exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      Security_Question,
    }).save();

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Occur during Registration",
      error,
    });
  }
};

//LOGIN || PoST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is Not Registere",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//forgetPasswordController
export const forgetPasswordController = async (req, res) => {
  try {
    const { email, Security_Question, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!Security_Question) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //check
    const user = await userModel.findOne({ email, Security_Question });
    //validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong email or password",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: " Password Resetted Successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Oops! Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("protected routes");
  } catch (error) {
    // console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error,
    });
  }
};

//All orders
export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


//cancel order
export const userOrderStatusController = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to cancel this order" });
    }

    if (order.status === 'Not Processed') {
      order.status = 'Cancel'; // Assuming "Cancel" is a valid status in your schema
      await order.save();

      const buyer = await userModel.findById(order.buyer);
      if (!buyer) {
        return res.status(404).json({ message: "Buyer not found" });
      }
      const buyerEmail = buyer.email; // Assume you have the buyer's email
      const subject = 'Order Cancellation Confirmation';
      const text = `Your order ${orderId} has been successfully cancelled.`;
      const html = `
      <p>Dear ${buyer.name},</p>
      
      <p>We have received your request to cancel your order <strong>#${orderId}</strong>. Your order has been successfully canceled.</p>
      
      <h3>Refund Information:</h3>
      <p>- If you have already made a payment, your refund will be processed within 7-10 business days. The amount will be credited back to the original method of payment.</p>
      
      <p>We regret any inconvenience this may have caused. If you have any questions or need further assistance, please do not hesitate to contact our customer support team.</p>
      
      <p>Thank you for shopping with us.</p>
      
      <p>Best regards,<br>
      H Square Decor<br>
      Customer Support<br>
      helpinghendd@gmail.com</p>
      `;

      await sendMail(buyerEmail, subject, text, html);
      // console.log(buyerEmail, " ", subject, " ", text, " ", html);
      // console.log("email sent")
      // res.json({ message: "Order canceled successfully and email sent" })
      res.json({ success: true, message: "Order canceled successfully", order });
    }
    else {
      res.status(400).json({ success: false, message: "Order cannot be canceled at its current status" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating order",
      error: error.message,
    });
  }
};


