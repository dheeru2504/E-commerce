import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      {/* <hr /> */}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - shop now",
  description: "MERN Stack Project",
  keywords: "html,css,react,node,mongodb,javascript,nodemon,npm",
  author: "Dheeraj",
};

export default Layout;
