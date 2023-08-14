import React from "react";
import Layout from "../components/layouts/Layout";

const About = () => {
  return (
    <Layout title={"About - Ecommerce App"}>
      <div className="container-fluid align-items-center justify-content-center">
        <div class="row  contactus">
          <div class="col-md-4">
            <img
              src="/images/about.jpg"
              alt="about us"
              style={{ width: "100%" }}
              About
              Us
            />
          </div>
          <div class="col-md-6">
            <h1 className=" p-2 text-center"> About</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
