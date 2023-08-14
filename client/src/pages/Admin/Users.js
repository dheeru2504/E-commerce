import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Users"}>
      <div className="container-fluid p-4 m-3">
        <div className="row">
          <div className="col-md-3 p-3">
            <AdminMenu />
          </div>
          <div className="col-md-3">
            <h1>Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
