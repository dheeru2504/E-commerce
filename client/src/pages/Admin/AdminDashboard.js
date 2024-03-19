import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin-Dashboard"}>
      <div className="container-fluid p-4 m-3 font-type" style={{ width: "97%" }}>
        <div className="row">
          <div className="col-md-3">
            <div>
              <AdminMenu />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth.user.name}</h3>
              <h3>{auth.user.email}</h3>
              <h3>{auth.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
