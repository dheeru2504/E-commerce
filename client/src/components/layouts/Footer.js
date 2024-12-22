import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";



const Footer = () => {

  return (
    // <div className="footer py-5">
    //   <h4 className="text-center">All rights Reserved &copy; Dheeraj</h4>
    //   <p className="text-center mt-3">
    //     <Link to="/about" className="hover-underline-animation">

    //       About
    //     </Link>|<Link to="/contact" className="hover-underline-animation">Contact</Link>|
    //     <Link to="/policy" className="hover-underline-animation">Privacy Policy</Link>
    //   </p>
    // </div>
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-4 ">
                <div className="footer-info">
                  <h3>H Square Decor</h3>
                  <p>
                    Najibabad , Bijnor <br />
                    Uttar Pradesh, India<br /><br />

                    <strong>Phone:</strong> +91 8449257926<br />
                    <strong>Phone:</strong> +91 7088257926<br />
                    <strong>Email: </strong><a href="mailto:helpinghendd@gmail.com" style={{ textDecoration: "none", color: "white" }}>helpinghendd@gmail.com</a> <br />

                  </p>
                  <div className="social-links mt-3">
                    <a href="#" className="twitter"><FaTwitter /></a>
                    <a href="#" className="facebook"><FaFacebookF /></a>
                    <a href="#" className="instagram"><FaInstagram /></a>
                    <a href="#" className="google-plus"><FaLinkedinIn /></a>

                  </div>
                </div>
              </div>
              <div className="col-4  footer-links">
                <h4>Know More</h4>
                <ul>
                  <li><Link to="/" className="">Home</Link></li>
                  <li><Link to="/about" className="">About</Link></li>
                  <li><Link to="/policy" className="">Privacy Policy</Link></li>
                  {/* <li><Link to="/termsOfUse" className="">Terms of Use</Link></li> */}
                  <li><Link to="/faqs" className="">FAQ</Link></li>


                </ul>
              </div>
              <div className="col-4  footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link to="/return_policy" className="">Retrurn Policy</Link></li>
                  <li><Link to="/track_shipment" className="">Track Your Shipment</Link></li>
                  <li><Link to="/contact" className="">Reach us</Link></li>
                  {/* <li><Link to="/termsOfUse" className="">Terms of Use</Link></li> */}
                  <li><Link to="/faqs" className="">Return & Refunds</Link></li>

                </ul>
              </div>

              {/* <div className="col-lg-4  footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                <form action method="post">
                  <input type="email" name="email" /><input type="submit" defaultValue="Subscribe" />
                </form>
              </div> */}


            </div>
            <div className="copyright">
              © Copyright <strong><span>Helping Hand</span></strong>. All Rights Reserved
            </div>
          </div>
        </div>

      </footer>{/* End Footer */}


    </>
  );
};

export default Footer;
