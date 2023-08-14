import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { NavLink } from "react-router-dom";
import "../../styles/CartStyles.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

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
                <div className="">
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
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8 ms-5">
                          <h5 className="card-title"> {p.name} </h5>
                          {/* <p>{p.name}</p> */}
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">Price : ₹ {p.price}</p>
                        </div>
                        <div className="text-center mt-3 ms-3">
                          <NavLink
                            to={`/product/${p.slug}`}
                            className="btn btn-outline-primary "
                          >
                            View Product
                          </NavLink>
                        </div>
                      </div>
                    ))}
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
