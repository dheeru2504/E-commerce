import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  // const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      //  console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard container-fluid p-4 m-3">
        <div className="col-md-3 p-3">
          <AdminMenu />
        </div>
        <div className="col-md-8 ">
          <h1 className="text-center font-type">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className=" mb-3">
                <div className="card ">
                  <div className="card-header orders">
                    <div className="">
                      <Select
                        bordered={true}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="headers-heading">
                      <div className="">Shipped to</div>
                      <div className="">{o?.buyer?.name}</div>
                    </div>

                    <div className="headers-heading">
                      <div className="">Order Placed</div>
                      <div className="">{moment(o?.createdAt).fromNow()}</div>
                    </div>

                    <div className="headers-heading">
                      <div className="">Payment</div>
                      <div className="">
                        {o?.payment.success ? "Success" : "Failed"}
                      </div>
                    </div>

                    <div className="headers-heading">
                      <div className="">Quantity</div>
                      <div className="">{o?.products?.length}</div>
                    </div>
                  </div>

                  {o?.products?.map((p, i) => (
                    <div
                      className="card-body orders-card-body font-type"
                      key={p._id}
                    >
                      <div className="">
                        <img
                          src={p.photo}
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
                        <p className="card-text">Total : ₹ {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
