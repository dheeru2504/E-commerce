import React from "react";
import Layout from "../components/layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy"}>
      <div class="container_section row align-items-center contactus">
        {/* <div class="col-md-5">
          <img
            src="/images/policy.jpg"
            alt="about us"
            style={{ width: "100%" }}
            About
            Us
          />
        </div> */}
        <div class="col-md-12">
          <h1 className=" p-2 text-center"> Our Policy</h1>
          <p>At H Square Decor, we are committed to safeguarding your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website or interact with our services.</p>
          <p className="fw-bold">Information We Collect</p>
          <p>We collect various types of information to provide and improve our services to you:</p>
          <ul>
            <li><span className="fw-bold">Personal Information:</span> When you make a purchase or create an account on our website, we may collect personal information such as your name, email address, shipping address, and payment details.</li>
            <li><span className="fw-bold">Device Information: </span>We may collect information about the device you use to access our website, including your IP address, browser type, and operating system.</li>
            <li><span className="fw-bold">Usage Information:</span> We may collect information about how you interact with our website, such as the pages you visit and the actions you take.</li>
            <li><span className="fw-bold">Cookies:</span> We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.</li>
          </ul>
          <p>How We Use Your Information</p>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Customize and improve our website and services</li>
            <li>Send you promotional offers and marketing communications</li>
            <li>Detect and prevent fraud and abuse</li>
          </ul>
          <p className="fw-bold">Information Sharing and Disclosure</p>
          <p>We may share your personal information with third-party service providers who assist us in providing and improving our services. These service providers are obligated to protect your information and only use it for the purposes specified by us.</p>
          <p>We may also disclose your information in response to legal requests or to comply with applicable laws and regulations.</p>
          <p className="fw-bold">Data Security</p>
          <p>We take the security of your information seriously and employ appropriate technical and organizational measures to protect it from unauthorized access, alteration, disclosure, or destruction.</p>
          <p className="fw-bold">Your Choices</p>
          <p>You can choose not to provide certain information, although this may limit your ability to use certain features of our website.</p>
          <p>You can also opt-out of receiving promotional communications from us by following the instructions provided in the communication or by contacting us directly.</p>
          <p>Compliance and Transparency</p>
          <p>We are a responsible corporate entity and comply with all applicable laws and regulations. As part of our commitment to transparency and trust, our GST number is <span className="fw-bold">09MAVPS3871E1ZP</span>. This is to ensure you are informed of our adherence to tax regulations and standards.</p>
          <p className="fw-bold">Changes to this Privacy Policy</p>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this Privacy Policy periodically for any updates.</p>
          <p> </p>
          <p className="fw-bold">Contact Us</p>
          <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at  hsqauredecor.com.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
