import React, { useState, useEffect } from "react";
import Layout from "./../components/layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import Logo from "../assets/Logo1.png"


const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [order, setOrder] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      console.log(cart);
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      // return total.toLocaleString("en-US", {
      //   style: "currency",
      //   currency: "INR",
      // });
      return total;
    } catch (error) {
      // console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      // console.log(error);
    }
  };




  // console.log("key = ", process.env.REACT_APP_RAZORPAY_KEY);
  // console.log("api = ", process.env.REACT_APP_API);
  // Fetch Razorpay order from backend
  const getRazorpayOrder = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-order`, { amount: totalPrice() * 100 });
      setOrder(data); // Assuming 'data.id' is the order ID from Razorpay
      console.log(order);

    } catch (error) {
      console.error('Error fetching Razorpay token:', error);
    }
  };

  useEffect(() => {
    if (auth?.token && cart.length > 0) {
      getRazorpayOrder();
    }
  }, [auth?.token]);

  const handlePayment = () => {
    // setLoading(true);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount, // Assuming totalPrice returns total in Rupees, convert to Paise
      currency: order.currency,
      name: 'Helping Hand',
      description: 'Test Transaction',
      // image: { Logo },
      order_id: order.id, // Use Razorpay order ID here
      handler: async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        try {
          await axios.post(`${process.env.REACT_APP_API}/api/v1/product/verify-payment`, {
            orderCreationId: order.id,
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
            cart
          });
          // setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
          toast.success("Payment successful");
          navigate("/dashboard/user/orders");
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: auth?.user?.name,
        email: auth?.user?.email,
        contact: auth?.user?.phone
      },
      theme: {
        color: "#19A7CE"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/v1/product/braintree/token`);
  //     setOrder(data?.order);
  //   } catch (error) {
  //     //console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post(`/api/v1/product/braintree/payment`, {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     // console.log(error);
  //     setLoading(false);
  //   }
  // };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-4 m-3">
              {cart?.map((p) => (
                <div className="row flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={p.photo}
                      className="cart-image"
                      alt={p.name}

                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 50)}</p>
                    <p>Price : ₹ {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : ₹{totalPrice()}.00 </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              {/* For Payment */}
              <div className="mt-2">
                {!order.id || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    {/* <DropIn
                      options={{
                        authorization: order,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    /> */}

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={!auth?.token || cart.length === 0}
                    >
                      {loading ? "Processing ...." : "Checkout"}

                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
