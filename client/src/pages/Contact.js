import React from "react";
import Layout from "../components/layouts/Layout";
import { useRef } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_4lw0qmq",
      "template_j2xq6eg",
      form.current,
      "SvC8VTTG3EnPMg2l8"
    );
    e.target.reset();
    toast.success("Sent Successfully");
  };
  return (
    <Layout title={"Contact Us"}>
      <div class="row align-items-center contactus register">
        <div className="col-md-3 col-sm-6">
          <h2 className=" p-2 text-center">CONTACT US</h2>

          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Mail"
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                name="message"
                rows="7"
                className="form-control"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
