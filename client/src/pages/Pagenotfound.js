import React from "react";
import Layout from "../components/layouts/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oop! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go back
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
