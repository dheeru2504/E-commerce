import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { NavLink } from "react-router-dom";
import "../../styles/CartStyles.css";
import { Spinner } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      //console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirmCancellation = window.confirm('Are you sure you want to cancel this order? This action cannot be undone.');
    if (confirmCancellation) {
      setCancellingOrderId(orderId); // Start spinner
      try {
        const response = await axios.put(`${process.env.REACT_APP_API}api/v1/auth/user_orders/${orderId}`, {}, {

        });
        if (response.data.success) {
          getOrders(); // Re-fetch orders to update the UI
        } else {
          console.log('Failed to cancel order');
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        // Handle error (e.g., showing an error message to the user)
      }
      finally {
        setCancellingOrderId(null); // Stop spinner regardless of outcome
      }
    }

  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token,]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-4 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center font-type">All Orders </h1>

            {orders?.map((o, i) => {
              return (
                <div className="mb-2">
                  <div className="card font-type">
                    <div className="card-header orders">
                      <div className="headers-heading">
                        <div className=" ">status</div>
                        <div className="">{o?.status}</div>
                      </div>

                      <div className="headers-heading">
                        <div className="">shipped to</div>
                        <div className="">{o?.buyer?.name}</div>
                      </div>

                      <div className="headers-heading">
                        <div className="">order placed</div>
                        <div className="">{moment(o?.createdAt).fromNow()}</div>
                      </div>

                      <div className="headers-heading">
                        <div className="">payment</div>
                        <div className="">
                          {o?.payment.success ? "Success" : "Failed"}
                        </div>
                      </div>

                      <div className="headers-heading">
                        <div className="">quantity</div>
                        <div className="">{o?.products?.length}</div>
                      </div>
                    </div>

                    {o?.products?.map((p, i) => (
                      <div className="card-body orders-card-body" key={p._id}>
                        <div className="">
                          <img
                            src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          // width="100%"
                          // height={"100rem"}
                          />
                        </div>
                        <div className="col-lg-7 col-xl-8 col-md-6 col-sm-5 .col-3  ms-5 card-detail">
                          <h5 className="card-title"> {p.name} </h5>
                          {/* <p>{p.name}</p> */}
                          {/* <p className="card-text">{p.description}</p> */}
                          <p className="card-text">Price : ₹ {p.price}</p>
                          {o?.status === "Cancel" && (
                            <p>This ordered has been cancelled</p>
                          )}
                        </div>

                        <div className="text-center mt-3 ms-3  d-flex flex-column">
                          <NavLink
                            to={`/product/${p.slug}`}
                            className="btn btn-outline-info mb-3"
                          >
                            View Product
                          </NavLink>
                          {o?.status === 'Not Processed' && o?.products?.length === 1 && (
                            <NavLink
                              // style={{ color: "white" }}
                              key={+o._id} // Assuming each order has a unique _id
                              onClick={() => cancelOrder(o._id)}
                              className="btn btn-outline-secondary"
                            >
                              {cancellingOrderId === o._id ? <Spinner /> : 'Cancel'}
                            </NavLink>
                          )}
                        </div>

                      </div>

                    ))}
                    {o?.status === 'Not Processed' && o?.products?.length >= 2 && (
                      <NavLink
                        style={{ marginRight: "2rem" }}
                        key={o._id} // Assuming each order has a unique _id
                        onClick={() => cancelOrder(o._id)}
                        className="card-footer btn btn-outline-secondary float-end "
                      >
                        {cancellingOrderId === o._id ? <Spinner /> : 'Cancel All'}
                      </NavLink>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
